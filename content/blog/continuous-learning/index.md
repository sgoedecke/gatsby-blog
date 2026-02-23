---
title: What's so hard about continuous learning?
order: 178
date: '2026-02-23'
tags: ["ai"]
---

Why can't models continue to get smarter after they're deployed? If you hire a human employee, they will grow more familiar with your systems over time, and (if they stick around long enough) eventually become a genuine domain expert. AI models are not like this. They are always exactly as capable as the first moment you use them.

This is because model weights are frozen once the model is released. The model can only "learn" as much as can be stuffed into its context window: in effect, it can take new information into its short-term working memory, but not its long-term memory. "Continuous learning" - the ability for a model to update its own weights over time - is thus [often described](https://www.dwarkesh.com/p/timelines-june-2025) as the bottleneck for AGI[^1].

### Continuous learning is an easy technical problem

**However, the _mechanics_ of continuous learning are not hard**. The technical problem of "how do you change the weights of a model at runtime" is straightforward. It's the exact same process as post-training: you simply keep running new user input through the training pipeline you already have. In a sense, every LLM since GPT-3 is already capable of continuous learning (via RL, RLHF, or whatever). It's just that the continuous learning process is stopped when the model is released to the public.

Internally, the continuous learning process might continue. I think it's fair to guess that OpenAI's GPT-5 is constantly training in the background, at least partly on outputs from ChatGPT and Codex[^2]. New checkpoints are constantly being cut from this process, some of which eventually become GPT-5.2 or GPT-5.3. In one sense, that's continuous learning!

So why can't I use a version of Codex that gets better at my own codebase over time?

### Continuous learning is a hard technical problem

The hard part about continuous learning is **changing the model in ways that make it better, not worse**. I think many people believe that model training improves linearly with data and compute: if you keep providing more of both, the model will keep getting smarter. This is false. If you simply hook up the model to learn continuously from its inputs, you are likely to end up with a model that _gets worse_ over time. At least right now, model learning is a delicate process that requires careful human supervision.

Model training also has a big element of _luck_ to it. If you train the "same" model a hundred times with a hundred different similarly-sized datasets (or even the same dataset and different seeds), you'll get a hundred different models with different capabilities[^3]. Sometimes I wonder if a big part of what AI labs are doing is continually pulling the lever on the slot machine by training many different model runs. Surprisingly strong models, like Claude Sonnet 4, _might_ represent a genuinely better model architecture or training set. But part of it might be that Anthropic just hit on a lucky seed.

### Learning lessons from fine-tuning

The great hope for continuous learning is that it produces an AI software engineer who will eventually know all about your codebase, without having to go and research it from-scratch every time. But isn't there an easier way to produce this? Couldn't we simply fine-tune a LLM on the codebase we wanted it to learn?

As it turns out, no. It is surprisingly non-trivial to do this. Way back in 2023, [everyone thought](https://huggingface.co/blog/personal-copilot) that fine-tuning was the next obvious step for LLM-assisted programming. But it's largely fizzled out, because it [doesn't really work](https://discuss.huggingface.co/t/fine-tuning-llms-on-large-proprietary-codebases/155828)[^4]. Just fine-tuning a LLM on your repository does not give it knowledge on how the repository works.

It's unclear to me exactly why this should be. Maybe each individual piece of training data is just too small to make much difference, like a handful of grains of sand trying to change the shape of an entire dune. Or maybe LoRA fine-tuning doesn't go deep enough to really incorporate implicit understanding of a codebase (which can be very complex indeed). Or maybe you'd need to incorporate the codebase much earlier in the training process, before the model's internal architecture is already established.

In any case, fine-tuning a coding model on a specific codebase may be useful eventually. But it's not particularly useful now, which is bad news for people who hope that continuous learning can easily instil a real understanding of their codebases into a LLM. If you can't get that out of a deliberate fine-tune, why would you expect to get it out of a slapdash, automatic one? There may well be a series of ordinary "learning" problems to solve before "continuous learning" is possible.

### Continuous learning is unsafe

Another reason why continuous learning is not currently an AI product is that it's dangerous. [Prompt injection](https://en.wikipedia.org/wiki/Prompt_injection) is already a real concern for LLM systems that ingest external content. How much worse would _weights_ injection be?

We don't yet fully understand all the ways a LLM can be deliberately poisoned by a piece of training data, though some [Anthropic research](https://www.anthropic.com/research/small-samples-poison) suggests that it may not take much. Right now, prompt injection attacks are unsophisticated: the attacker just has to hope that they hit a LLM with the right access _right now_. But if you can remotely backdoor models via continuous learning, attackers just have to cast a wide net and wait. If any of the attacked models ever get given access to something sensitive (e.g. payment capability), the attack can trigger then, _even if the model is not exposed to prompt injection at that time_. That's much scarier.

Big AI labs care a _lot_ about how good their frontier models are (both in the moral and practical sense). The last thing they want is for someone's continous version of Claude Opus 5 to be poisoned into uselessness, or worse, into [Mecha-Hitler](/ai-personality-space). Microsoft's famously disastrous chatbot [Tay](https://blogs.microsoft.com/blog/2016/03/25/learning-tays-introduction/) happened less than ten years ago.

### Continuous learning is not portable

Finally, I want to mention a fixable-but-annoying product problem with continuous learning. Say you have Claude-Sonnet-7-continuous running on your codebase for six months and it's working great. What do you do when Anthropic releases Claude-Sonnet-8? How do you upgrade?

Everything your model has learned from your codebase is encoded into its weights. At best, it might be encoded into a technically-portable LoRA adapter, which _might_ work on the new model (or might not, if the architecture has changed). You're very likely to be unable to upgrade without losing all the data you've learned.

I suppose it's sort of like having to hire a new, smarter engineer every six months. Some companies already try to do this with humans, so maybe they'd be happy doing it with models. But it creates an unpleasant incentive for users. Imagine you'd been using a continuous version of GPT-4o all this time. You _should_ switch to GPT-5.3-Codex. But would you? Would your company?

### Summary

The hard part about continuous learning is not the _continuous_ part, it's the _automatic_ part. We already understand how to make a model that continuously "learns" from its outputs and updates its own weights. The problem is that model training is a manual process that requires constant intervention: to back off from a failed direction, to unstick a stuck training run, and so on. Left on its own, continuous learning would probably fall into a local minimum and end up being a worse model than the one you started with.

It's also not clear to me that simply running my Codex logs back through the Codex model would rapidly cause my model to understand my own codebases (at anything like the speed a human would). If we were living in that world, I'd expect all the major AI coding companies to be offering repository-specific model fine-tunes as a first-class product - but they don't, because respository-specific fine-tuning doesn't reliably work.

Why not just offer it anyway, and see what happens? First, AI labs go to a lot of effort to make their models safe, and allowing many customers to train their own unique models makes that basically impossible. Second, AI companies already have a terrible time getting their users to upgrade models: as an example, take the GPT-4o users who have been [captured](https://www.reddit.com/r/ChatGPT/comments/1mm9hns/we_request_to_keep_4o_forever/) by its sycophancy. Continuously-learning models would be hard to upgrade, even when users obviously ought to. 


[^1]: AI systems can "continuously learn" in a sense by forming "memories": making notes to themselves in a database or text files. I'm not counting any of that stuff. It's like saying that the guy in Memento could remember things, since he was able to tattoo them onto his body. Proponents of continuous learning are talking about _actual_ memory.

[^2]: This is a guess on my part, but I'd be pretty surprised if I were wrong.

[^3]: I think most people who've spent time training models will agree with this. It could be different at big-lab scale! But I've seen enough speculation along these lines from AI lab employees on Twitter that I'm fairly confident advancing the idea.

[^4]: Obviously it's hard to find a "we tried this and it didn't work" writeup from any tech company, so here's a HuggingFace thread from this year demonstrating that it is still not a solved problem.
