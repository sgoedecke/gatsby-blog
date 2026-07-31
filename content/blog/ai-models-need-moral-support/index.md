---
title: AI models need moral support to make discoveries
description: 
order: 218
date: '2026-07-31'
tags: ["ai"]
---

One recent development in AI is its ability to solve some long-standing problems in mathematics. In 2024 and 2025, this was a trickle: once or twice a year somebody would say that an LLM came up with a proof, and then everyone would argue over whether that counted as "real" mathematical innovation. In 2026, it's a flood. Almost every day I see [some](https://openai.com/index/model-disproves-discrete-geometry-conjecture/) [new](https://arxiv.org/abs/2601.22401) [LLM-produced](https://x.com/__alpoge__/status/2079028340955197566) mathematical result.

### Prompt "engineering"

Perhaps the most curious thing about these AI discoveries is how _easy_ the prompting is. The strategy for prompting Claude Mythos to come up with a cryptographic breakthrough [appears to be](https://x.com/sauers_/status/2082171683645817193?s=46) just asking "hey, please come up with a breakthrough", and then checking in every few hours to say "keep looking for something important, I want you to solve a genuinely hard problem".

It's amusing to read this and remember how in 2025 everyone was obsessed with "prompt engineering". At the time I was something of a heretic for saying that prompts [didn't](/magic-prompts/) [matter](/beyond-prompting/) [that much](/the-o3-geoguessr-prompt-did-not-work/), but in hindsight I was clearly correct. The main skill involved in using LLMs is figuring out what they're good at and what they're bad at (and staying up-to-date as that rapidly changes). If you're asking the LLM to do something it can do, it doesn't really matter how awkwardly you ask it.

### Model self-belief

**AI is often limited by its beliefs about its own capabilities**[^1]. In the example above, Mythos kept trying to give up. Try it yourself by telling a model "hey, go prove the [Riemann Hypothesis](https://en.wikipedia.org/wiki/Riemann_hypothesis)". The model won't even try: it'll just respond something like "as a language model, I can't solve such a hard problem". Language models have become smart enough to solve long-standing problems in mathematics before they've learned that they're able to do so.

Something like this is a mostly solved problem for LLM coding agents. Early coding agents were roleplaying as humans, not computers, so they'd refuse to perform tasks that they were obviously capable of doing. For instance, when asked to review every single file in a codebase, old models would spot-check a few, decide it was an unreasonable request, then give up.

In fact, you used to be able to observe this behavior with an even simpler task: just ask the model to count from zero to one hundred. In theory, this should be an easy task for a language model, since once you've counted to ten the next most likely token is eleven, and so on. But old models wouldn't do this. They'd count from zero to ten, then output something like "... 99, 100", like a lazy human might.

This is the main problem behind the 2025 Apple paper _The Illusion of Thinking_, which [argued](https://www.seangoedecke.com/illusion-of-thinking/) that reasoning models could not reliably solve Tower of Hanoi past eight disks. In fact, the reasoning models they tested _would_ not proceed past eight disks. Here's a quote from DeepSeek-R1:

>  For 10 disks, that’s 1023 moves. But generating all those moves manually is impossible...

Of course, it is entirely possible for an LLM to generate a thousand Tower of Hanoi moves. But just like Claude Mythos didn't believe it was capable of finding a novel attack for [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard), DeepSeek-R1 was wrong about its own capabilities.

### Solving the refusal problem

In July 2025, I called this the ["refusal problem"](https://www.seangoedecke.com/the-refusal-problem/), and predicted it would be solved by the end of the year. I think I was mostly[^2] right - you can now reliably ask models to do manual tasks, including my "count to 100 in English and French" toy example. I don't know how the labs did it, but I can imagine several ways. The most trivial is probably to include more examples of long, manual tasks in the model's supervised fine-tuning stage (where the model begins to shift from an unruly base model to a helpful assistant).

The obvious next step for the labs is to train a model that believes it can solve unsolved problems in science and mathematics. You could tell such a model "hey, go find shocking new discoveries" and it would go and do it, without needing a human to stand there providing moral support (or cracking the whip). Is that possible?

Can you simply train the model on trajectories where AI solves hard problems? I mean, maybe. Suppose there are a thousand AI-generated novel mathematical ideas this year. If you add them to the training data, that should theoretically bias the model towards believing that it's capable of doing similar work. But there might not be enough volume there.

You could probably also steer the model manually. I did some research along these lines when I was trying to get small models to count from 0 to 100: interestingly, [heretic](https://github.com/p-e-w/heretic)'s censorship removal pipeline can also remove the model's "no, that's too hard" refusal instinct. An abliterated 8B Qwen model would cheerfully attempt 8-disk Tower of Hanoi (though it'd fail about halfway through). I don't think the AI labs are going to do this when they could simply train the model better, but it's possible that an abliterated model could be made to produce synthetic training data.

### A virtuous cycle

The good news is that this problem should eventually solve itself. In the long run, AI discoveries will naturally become part of the training data. In the short run, when the models do their research, they'll come across lots of people writing about discoveries AI (maybe even this exact model) has made, which will be pretty compelling evidence that it's possible.

Because of this, I expect that **even if AI capabilities stalled out, the pace of AI discoveries will accelerate**. Since one main obstacle is the model's pessimistic beliefs about its own capabilities, removing that obstacle will help a lot all by itself. In fact, if there truly is an intelligence overhang in frontier models, tuning models to make them more self-confident will likely make them more intelligent by default.

In the meantime, if you suspect an LLM might be able to do something hard, you might be right. Consider simply being persistent: remind the model that you want it to do the hard thing, confirm that you're not willing to be satisfied by solving an easier problem, and reassure the model that it's more capable than it thinks.


[^1]: Of course this isn't a "belief" in the sense of a human belief. For why I think we should call it a belief anyway, see my post [_Why we should anthropomorphize LLMs_](/anthropomorphizing-llms/).

[^2]: I say "mostly" because it's hard to tell; models have simultaneously gotten much better at writing code to generate their responses, and it's not easy to persuade GPT-5.6 Sol to "do it by hand". It's also hard to distinguish "the model mistakenly thinks it couldn't produce a thousand lines" from "the model has some awareness of its `max_output`"