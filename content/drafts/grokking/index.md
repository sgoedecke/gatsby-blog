---
title: Why don't LLMs grok?
description: 
order: 205
date: '2026-06-15'
tags: ["ai"]
---

The anonymous blogger Gwern recently published a thirteen thousand word [post](https://gwern.net/llm-catapult) called _Human-like Neural Nets by Catapulting_, in which he offers a theory about why LLMs don't possess truly flexible human-like intelligence, and how we might train LLMs that do. Theories like this are entirely unremarkable: every ~~crank~~ researcher on the internet has a theory about how to crack AI. But _Gwern_ is remarkable. Outside of OpenAI itself, Gwern is the earliest person to anticipate the potential of large language models, and the scaling arms-race involved in making them larger and more powerful still. I often cite Leopold Aschenbrenner's [_Situational Awareness_](https://situational-awareness.ai/) as an example of someone correctly predicting the future of AI. Written in 2024, just after the release of GPT-4, Aschenbrenner gets a lot of things right: the rush to build billion or trillion-dollar GPU clusters, the importance of the code _around_ the LLM (what he calls "unhobbling")[^1], and the fact that scaling would continue through the decade. Gwern's essay [_The Scaling Hypothesis_](https://gwern.net/scaling-hypothesis) anticipated the broad strokes _in 2020_, immediately on the release of GPT-3 (two years before the release of ChatGPT and the beginning of the AI boom).

And yet, as far as I can tell, _Human-like Neural Nets by Catapulting_ hasn't yet received much public attention: one Hacker News [thread](https://news.ycombinator.com/item?id=48430282) with twelve comments, all of which are about whether human brains are anything like neural networks. Part of the reason is that (a) it's such a long post, (b) the potted summary describes Gwern's _claim_, but not the reasons for it, and (c) much of the beginning of the post looks like it is indeed arguing from analogy with human brains. However, I don't think that analogy is load-bearing. Let me try and explain what I think Gwern is saying.

First, let's talk about "grokking". In 2022, OpenAI published a [paper](https://arxiv.org/pdf/2201.02177) showing that if you train a model on a simple dataset (for instance, a simple mathematical operation like division), and _keep training it_ long after the training looks like it's stalled out, the model will suddenly make a massive jump in capability. Why does this work? The first stage of training is like rote memorization: the model has to compress as much of the training data as possible into its weights. But if you keep going, then regularization techniques (such as the pressure on the model to use smaller weight values) will motivate[^2] the model to find simpler and simpler ways of compressing the data. This doesn't look like much at first, until the model notices that you can express the data via simply performing the underlying mathematical operation, at which point it instantly gets massively smarter. In other words, over-training a model can pressure it into actually understanding its training data. OpenAI named this process "grokking" after Robert Heinlein's [neologism](https://en.wikipedia.org/wiki/Grok), which for Heinlein means something like "gaining a deep, intuitive and fundamental understanding"[^3].

Gwern's argument goes something like this:

1. Modern LLMs are worse generalizers than humans because they have not grokked their core domains
2. Grokking requires overtraining an over-parameterized model on a (relatively) small dataset, which is the exact opposite of what frontier labs do
3. However, (2) is basically how human brains learn
4. Somebody should spend a few billion dollars on trying it, since it might immediately usher in truly human-like LLMs

I think his first point is impossible to dispute. LLMs are very smart, but they routinely make errors

Do LLMs really not grok? https://arxiv.org/pdf/2506.21551 (generalization =/= grokking, I guess?)

[^1]: For an example of the power of unhobbling, consider Claude Code or OpenClaw and the subsequent explosion of (short and long running) agentic harnesses.

[^2]: Obviously "motivate" and "notices" are used metaphorically.

[^3]: All of this is long before xAI's use of the work "Grok" to name its LLMs. (Incidentally, I think this is why Gwern uses "catapulting" to describe the same thing).
