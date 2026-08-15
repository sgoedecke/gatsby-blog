---
title: AI text watermarking is not a big deal
description:
order: 223
date: '2026-08-15'
tags: ["ai", "ai watermarks"]
---

People are [pretty](https://x.com/arturovilla/status/2088406939466084643?s=20) [unhappy](https://x.com/NickADobos/status/2088350712359256440?s=20) about Anthropic's recent [announcement](https://www.anthropic.com/news/claude-text-watermark) that they're planning to include a hidden watermark in Claude model outputs. Will this lead to a mass exodus from Anthropic models? Will the introduction of watermarking be a meaningful change for users? No. AI text watermarking is not a big deal.

**There is no meaningful difference in quality between watermarked and unwatermarked text.** I wrote about this more [here](https://www.seangoedecke.com/text-ai-watermarks/), but the two popular ways to do it - Google's [SynthID-Text](https://github.com/google-deepmind/synthid-text) and Meta's [TextSeal](https://github.com/facebookresearch/textseal) - are completely transparent to the user. They work by replacing the pseudo-random logit sampler with a different pseudo-random logit sampler.

Suppose you were gambling on coin flips with your friends, and instead of flipping a coin you decided to do this:

1. Check the current time since midnight in seconds
2. Count that many words forward in the [Encyclopaedia Britannica](https://en.wikipedia.org/wiki/Encyclop%C3%A6dia_Britannica)
3. Count whether the word you land on has an even or odd number of letters[^1]

That would still be random enough to gamble with, right? But, like a watermark, you could theoretically go back and identify that that method was used, so long as you recorded the exact time of each "coin flip". Text watermarking works the same way: it chooses a method of "randomness" that can be detected after-the-fact. Watermarked models will not be any less capable than unwatermarked models.

What about cases where the model is quoting something, or giving you the answer to a mathematical problem, or doing something else where the output is largely pre-determined? Wouldn't enforcing a watermark there make the output worse? It would, which is why none of the AI labs are going to do that. Text watermarking approaches only replace the _existing_ randomness in the logit sampler: in any case where the model is always going to pick the same tokens, there's basically no randomness to play with, so there won't be a detectable watermark in those tokens.

The second big reason to not worry about AI watermarking is that **AI text content has always effectively been watermarked**.

I've also seen theories floating around that watermarking encodes secret content into your outputs, or somehow tags outputs with your personal information. **I don't think AI labs are using watermarks to encode data into your outputs.** Text watermarking is _hard_: like I just said, you can't do it when the model can only respond with the same words, it doesn't work for very short responses, and even on long responses it can only provide a probabilistic fingerprint. And that's encoding one single bit[^2] of information!

I'm not saying that encoding longer messages into a watermark is technically impossible - there are [papers](https://arxiv.org/pdf/2605.11653) describing ways it might work - but there's no way any of the labs are doing it. If they wanted to associate you with your responses that badly, they'd just secretly store every model response they generated.

Another reason to not get too angry at any individual AI lab for watermarking is that **every single AI lab is going to do text watermarking this year**. It won't just be Anthropic. The alternative is to completely stop doing business in the EU, because of the [EU AI Act](https://artificialintelligenceact.eu/article/50/). That's currently a [sixty-billion-dollar](https://www.fortunebusinessinsights.com/europe-artificial-intelligence-market-113967) market. I am not a lawyer, but to me it seems genuinely unclear whether an AI lab could even legally do something like only watermarking EU responses: short of having an entirely different `claude-eu.ai` service, the plain text of the Act seems like it applies to any _service offered in the EU_, not just the content that service outputs to EU citizens specifically.

If people _really_ hate watermarking enough, some labs might stand up a completely separate EU service, or make an aggressive interpretation of the EU AI Act and see how the legal battle goes. When I try to be maximally charitable to anti-watermarking histrionics, I adopt an interpretation like this: people are saying that watermarking is an invasion of privacy and makes outputs worse and so on not because they believe it, but because they're trying to pressure AI labs to firewall EU AI regulations behind a completely separate interface. In this case, it probably doesn't matter - text watermarking is not a big deal - but I can see an American consumer being worried about more aggressive future regulation, and wanting to draw a firm line in the sand as early as possible.


[^1]: Interestingly, this [might be](https://www.reddit.com/r/asklinguistics/comments/apes6p/comment/eg7sife/) very slightly even-favored.

[^2]: Technically, this is called a "zero-bit watermark", because you can't recover a yes-or-no value from the watermark itself (merely from the _presence_ of a watermark).