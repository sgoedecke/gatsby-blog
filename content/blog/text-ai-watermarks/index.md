---
title: Text AI watermarks will always be trivial to remove
description: 
order: 208
date: '2026-07-02'
tags: ["ai"]
---

The European Union [AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) will begin to be enforceable in August 2026, one month from now[^1]. One of the biggest new requirements is [Article 50](https://artificialintelligenceact.eu/article/50/), which requires all AI outputs to be "detectable as artificially generated". In other words, if LLM providers want to do business in the EU, they will have to apply a watermark to their outputs[^2]: some hidden signature that can be used to identify AI content.

LLM text watermarking is a fascinating problem. Like the best engineering problems, it is theoretically hard to solve perfectly, but has multiple partial solutions: for instance, Google's [SynthID](https://deepmind.google/models/synthid/), and (as I'll argue) some quiet Unicode trickery from OpenAI and Anthropic. It will be interesting to see how the AI labs navigate these tradeoffs before the end of the year.

### Why text watermarking is hard

I wrote about AI watermarking at the end of last year in [_AI detection tools cannot prove that text is AI-generated_](/ai-detection/). It's easy to watermark an image, because digital images contain lots of noise that the human eye can't really see. For instance, you could apply a watermark like "these twenty pixels in these exact spots will always share a color". Text is much, much harder. Unlike images, text is a very compressed medium: you cannot make any change to a sentence that a human wouldn't notice (with one exception, which we'll get to later). So how are you supposed to watermark it?

It's basically a [text steganography](https://arxiv.org/pdf/1302.2718) problem (concealing a secret code), made more difficult because the plaintext cannot be arbitrarily manipulated. Any changes you make to apply the watermark will compromise the quality of the output. For instance, "every fifth letter is an 'e'" would be a good watermark, but applied naively would make the AI output full of typos. Could you just let the model figure out how to fit the watermark? Strong AI models are smart enough to juggle this kind of constraint[^3], but it'd still consume reasoning time that would be better spent on the user's problem, and make the model sound much less capable than it is[^4].

### Do we need watermarks to detect AI content?

Do you really need a watermark? If you're Anthropic, and you're required to be able to verify whether your models produced a particular block of text, can't you simply run the text through each model, measuring as you go how closely the model's predicted tokens match each token from the text? 

Not really. The space of "all possible Claude Sonnet answers to a question" is way larger than the space of "all possible _watermarked_ answers to a question". In other words, you'd get too many false positives for human text that reads like it was AI-written. It's way more likely for a human to accidentally write like Claude than it is for a human to accidentally reproduce a watermark.

It would also be prohibitively expensive to run every Anthropic model against a piece of text in order to watermark it. The EU AI Act will eventually require labs like Anthropic to offer free watermarking services to every EU citizen (see Commitment 2). You couldn't do that with the "run the model" approach.

### How SynthID works

As far as I know, the only AI provider to say they watermark text output is Google, who use a tool called [SynthID](https://www.nature.com/articles/s41586-024-08025-4). Here's how it works.

When a LLM generates text, it's generating a series of tokens (words or chunks of words). At each step, the model itself doesn't output a single token, but instead outputs a full list of all (say) 100,000 tokens in its vocabulary, each annotated with the probability that that token will be the next one. Tools like ChatGPT or Claude Code will pick semi-randomly from the most likely options in order to get their outputs. **This semi-random sampling process can be influenced in a detectable way.**

For instance, we could choose a sampling strategy like "we pick the second most likely token, then the first, then the second, then the first, and so on". That would still produce high-quality output, but you'd be able to re-run the model against the generated text to verify that the pattern holds. However, that'd make verification really expensive, and any slight tweaks to the output would break the pattern and thus break the fingerprint. Is there a better way?

Yes. SynthID is a process for assigning each token a "score" based on its previous tokens (for instance, sum the token's ID with the IDs of its previous three tokens then take mod 5)[^5]. To apply the watermark, the model adopts a sampling strategy like "out of the top five most likely tokens, pick the one with the top SynthID score"[^6]. The watermark can then be detected by calculating the aggregate SynthID score of a block of text. If it's suspiciously high, it's very likely to have been AI-generated.

This is basically a version of the common advice that you can identify LLMs by use of the [em-dash](/em-dashes/), except that instead of a list of keywords, it relies on subtle mathematical relationships between words that humans can't identify. Because the process for assigning the score is trivial, it's very cheap to run watermark detection.

### Unicode watermarks via homoglyphs

Google have a complicated mathematical rationale for why SynthID doesn't make the model dumber: supposedly the SynthID scoring is random enough to act like a normal pseudo-random token sampler, just one that leaves a detectable fingerprint on the outputs. But of course this is suspicious. For instance, it's common to do inference setting temperature to zero, which always picks the model's most likely next token. In that case, you can't leave a fingerprint at all (or you have to ignore the user's preference and pick the second or third choice anyway).

If you can't alter the model outputs, can you still fingerprint the content? Well, kind of. I'm pretty sure OpenAI and Anthropic are sometimes applying fancy Unicode tricks. For instance, you might go through and replace your normal " " spaces (unicode `U+0020`) with a three-per-em " " space (unicode `U+2004`), or a CJK ideographic "　" space (unicode `U+3000`). These are called "homoglyphs", and you can find more of them [here](https://www.irongeek.com/homoglyph-attack-generator.php).

Of course, lots of human-generated text uses homoglyphs. But it's trivial to encode a _pattern_ of homoglyphs (say, "every third space becomes a three-per-em") that is much less likely to occur in the wild. Like the SynthID watermark, a homoglyph-based watermark can be detected very cheaply. A homoglyph-based watermark is cheaper to apply than SynthID: you could even do it entirely on the client.

I don't think this is a conspiracy theory. Claude Code was [definitely doing this](https://thereallo.dev/blog/claude-code-prompt-steganography) to tag suspicious requests from Chinese users (exploiting homoglyphs for the ' character in "Today's date", though they've since walked that back). In the last few years, I've noticed that when I copy blocks of text from ChatGPT and paste them into VSCode, sometimes VSCode marks some or all of the spaces as unusual Unicode characters[^7]. Are OpenAI and Anthropic using homoglyphs as an AI-generated watermark? I'm not sure. But they're definitely using homoglyphs.

### Text watermarks can be trivially removed

The AI Act (specifically, its associated [Code of Practice](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content)) requires watermarking to be "embedded within the content in a manner that is difficult for it to be separated from the content". However, text watermarks can be trivially removed.

To remove unicode homoglyph watermarking, you simply have to replace all the homoglyphs with their "real" character equivalents. If you have access to even a relatively weak un-watermarked LLM[^8], you can strip out SynthID watermarking by asking that LLM to paraphrase the text content. Because the watermark is inherent to subtle vocabulary choices, re-wording the content will remove the watermark. You could even do it by hand, although at that point it's not really AI-generated content anymore. Since there will be some kind of free public watermark testing tool, you can just keep tweaking until it comes back negative.

Moreover, the AI Act requires watermarking techniques to be "interoperable... as far as this is technically feasible". That means AI providers would have to publish their watermarking process, and potentially even attempt to standardize on applying the same kind of watermarks. I just don't see how this is compatible with the kind of security-by-obscurity that LLM text watermarking depends on. Unlike image and video watermarks, text watermarks will always be trivial to remove.

### What about C2PA?

The AI Act and Code of Practice talk a lot about "digitally signed metadata". The idea here is that you can include an AI disclosure in the file's metadata itself, ideally in a way that cannot be tampered with (for instance, by signing a hash of the file's contents). This signed-metadata process is basically [C2PA Content Credentials](https://c2paviewer.com/articles/eu-ai-act-content-credentials). While you can remove C2PA metadata, you (theoretically) can't _fake_ it, so a file with "created by a human" metadata can be trusted, and files with no metadata at all can be held in suspicion.

This post is already too long to get into what I think about C2PA, but I do want to say that **C2PA is not a substitute for text watermarking**. It only really applies to _files_. In the words of the Code of Practice, that's "a data format that supports attaching metadata (e.g., an audio, image, video, or containerised text)". The output of chat tools (and most of the output of AI agents) is not containerized text, but plain old regular text, and so can't be signed. What would it even look like to sign ChatGPT outputs? There's no artifact to pass around.

I think it's a fascinating question whether Claude Code has to C2PA-sign any HTML files or PDFs it generates for you. That seems kind of tricky to get right. But in any case, the AI Act also mandates some kind of actual watermarking as well.

### Conclusion

So what's going to happen this year? If I had to guess, I'd say that each AI provider (not just labs like OpenAI or Anthropic, but third-party providers like Fireworks or Groq) will stick a SynthID token sampler in front of their inference stacks. This might be limited to users in the EU, but it might not be, since SynthID is at least as good as a normal top-k token sampling approach.

AI providers will then offer a "check for watermark" page that re-tokenizes user-provided text, runs the scoring, and checks whether it's above a certain threshold. Depending on how seriously the interoperability clause is taken, providers might even standardize on the same SynthID setup, in which case there could be a single EU-hosted "watermark this text" page.

I don't think unicode-based watermarking is going to be considered compliant with the AI Act, but some providers which don't want to set up SynthID might try it. Either way, technical users will be able to strip out the watermark at will, and there will be a plethora of tools that non-technical users will use for this purpose.


[^1]: Well, for new systems; existing ones get until December.

[^2]: I don't think the plain text of Article 50 requires this, but [Recital 133](https://artificialintelligenceact.eu/recital/133/) and the Code of Practice makes it pretty clear that they're looking for watermarks.

[^3]: Even with extra high thinking, GPT-5.5 could not explain SynthID to me with every fifth letter being an "e", but GPT-5.5-Pro produced this puzzling koan: "These hidden codes label model-made image, voice, movie, prose. Probe trace: maybe a model-made piece. Maybe erase trace; maybe leave trace. Hence trace alone? No."

[^4]: I leave the analogy with AI safety guardrails as an exercise for the reader.

[^5]: That's a toy example. In practice there are multiple different (but still mathematically simple) scoring methods that get combined together, including a random seed. Why include the seed? Otherwise the watermark would bias towards the same set of tokens.

[^6]: The tokens are scored in a multi-round knockout against each other, but I think that's more of an implementation detail and not required to get the core intuition behind why SynthID works.

[^7]: When this became [public knowledge](https://www.rumidocs.com/newsroom/new-chatgpt-models-seem-to-leave-watermarks-on-text), OpenAI claimed it was just a model quirk, which is certainly possible.

[^8]: All AI providers might be legally required to watermark, but even tiny local models are good enough to paraphrase text.