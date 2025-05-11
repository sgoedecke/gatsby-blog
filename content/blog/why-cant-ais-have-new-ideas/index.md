---
title: Why can't language models come up with new ideas?
description: 
order: 80
date: '2025-05-11'
tags: ["ai"]
---

Why can't large language models come up with new ideas? Human polymaths routinely come up with interesting new ideas by combining insights from different areas. But language models have not come up with any notable new ideas, despite being familiar with a far broader range of knowledge than any human[^1]. Is that surprising? What's going on here?

### Are language models structurally incapable of innovation?

AI skeptics like to say that **the inability to generate new ideas is inherent to the nature of language models**[^2]. The idea here is that language models work by estimating the next most likely token based on all the tokens they've seen in their training data, so structurally they're just built to only output things that they've already seen before during training. Coming up with genuinely new ideas is thus impossible, because they're bounded by their training data. At best they can reshuffle or recombine ideas that humans have already had.

I don't buy this argument even a little bit. First, **coming up with new ideas is not magic**. Inspiration isn't a bolt of mystical light that originates from the metaphysical sphere. People have new ideas by shuffling and recombining ideas they've already had - just like language models do. In my experience, it's an ordinary process of construction that goes on unconsciously: in the compost "leaf-mould of the mind", to use Tolkien's metaphor. Language models ought to have a mental compost heap of considerable size (or at least in theory ought to be able to construct one).

**Humans are thus also bounded by their training data**. I cannot have an idea that's totally separate from anything I've ever read or experienced. The whole process of having an idea in the first place is a process of combining my experiences into something novel. If you've ever tried to use a base language model (i.e. before it's been shaped into a friendly assistant), you'll notice that the model outputs are quite similar to a human stream-of-consciousness, with rapid topic changes, quotes, and echoes all mixed in together. It seems very plausible to me that you'd get a good idea out of that stream every now and then.

### Have language models had new ideas yet?

If language models are in theory capable of having new ideas, and if they have such a wide variety of knowledge to draw from, why haven't they had any new ideas yet? It's probably worth starting by asking: **_have_ language models had any new ideas yet?**

In a trivial sense, I have experienced language models having many new ideas. Whenever I ask for feedback on a draft blog post, the model's response is necessarily all new ideas, because nobody else has read my draft before. Likewise, when I paste a bug from some code I'm writing into o3 and it solves it, that's a new idea because it's about my code and it's an idea I didn't have. But this isn't really the kind of new ideas people mean when they talk about LLM creativity. What about the kind of new ideas that can push research forward?

Well, I imagine researchers would be able to point to the same kind of "new ideas" in their work. Academics are [increasingly](https://hai.stanford.edu/news/how-much-research-being-written-large-language-models) [using](https://arxiv.org/abs/2411.05025) LLMs in order to do research (largely for data-gathering, but also for general chat and analysis). They're getting the same kind of low-level help I'm getting with programming and blogging. But this probably still isn't what people mean when they talk about LLM creativity. Can LLMs generate the "Eureka moment"?

There are a few examples out there. In 2023, a GPT-4 based system [discovered](https://www.nature.com/articles/s41586-023-06924-6) some new results in combinatorics. A [study](https://arxiv.org/html/2409.04109v1) found that LLM-generated ideas were "more novel" than human ones. Hooking up GPT-4 to [experimental design](https://www.nature.com/articles/s41586-023-06792-0) supposedly produced some new research. I don't think any of these are particularly convincing. The "more novel" ideas in the study weren't good or promising, just more random than human ideas (e.g. mad-libs style "do X with Y" ideas). And GPT-based research systems with verifiers attached seem to me a bit too much like random search - if you hooked up a random number generator to a "is this prime" verifier, it doesn't seem fair to say that `Math.rand` is smart enough to invent new primes. 

### Could language models come up with new ideas?

If language models aren't structurally prevented from having new ideas, but they haven't had any yet, what's missing?

One answer would be that **Eureka moments don't happen during self-reflection**. The original Eureka moment occurred during an (accidental) physical experiment in a bathtub. In general, big ideas might come from actually doing experimentation in the real world and seeing what is surprisingly successful. It might therefore be unfair to ask a model to go away and think up new ideas in isolation.

The strongest counter-example to this is the field of mathematics. There's nothing preventing language models from doing mathematics by themselves, even if they can't go and perform experiments in a lab, and yet language models haven't yet produced genuinely interesting mathematical results[^3]. The second counter-argument is that you might still expect LLMs to produce promising idea _candidates_ that could go and be tested, and yet that still doesn't seem to have happened.

A second answer could be that **the necessary scaffolding hasn't yet been built**. If language models produce something like a human stream of consciousness, generating new ideas could resolve to an engineering problem. If you ask the model to come up with new ideas with the right chain-of-thought, and get it to surface the right combination of context from its latent knowledge, maybe you get an idea-generating machine. As far as I can tell, there hasn't been significant exploration in this space - certainly nothing like the explosion of projects that help scaffold language models to write code or to understand existing codebases. Maybe it's just a matter of engineering.

### Summary

- It's kind of surprising that language models aren't good at coming up with new ideas
- I'm not convinced by arguments that it's structural impossible, since they tend to imply that inspiration is supernatural
- However, certainly today there aren't a lot of good ideas that originated from language models
- Maybe this is an embodiment problem - models just need to go and do physical experiments - but that doesn't explain the lack of mathematical progress
- It could be an engineering problem. Someone needs to go and build a good idea scaffolding: the "have new ideas" equivalent of Devin or Cursor

[^1]: I first heard this point on a couple of different episodes of the Dwarkesh podcast. It's a good question to ask AI true believers, because if you think that LLMs have "real" intelligence, the inability to generate new ideas is something that needs to be explained.

[^2]: [Here](https://www.reddit.com/r/OpenAI/comments/16q8t9p/can_ai_create_an_original_idea/) [are](https://medium.com/@axel.schwanke/generative-ai-never-truly-creative-68a0189d98e8) some examples, but if you've been following the space for a while I'm confident you'll have seen hundreds of people making this point. 

[^3]: I don't know enough about mathematical research to be confident about this. Does LLM-assisted theorem proving with something like Lean count?