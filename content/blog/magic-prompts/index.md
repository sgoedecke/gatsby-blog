---
title: I don't care about your magic prompts
description:
order: 77
date: '2025-05-06'
tags: ["ai"]
---

There's a brand of tech influencer now that's all about sharing the perfect prompt for any situation. The tweets in question typically read something like "this prompt will make you superhuman", or "this prompt will be a 20k growth consultant in your pocket"[^1]. There's a kernel of truth here - it's surprising how much small alterations in a prompt can affect the quality of language model outputs - but overall it's just a bit silly. Searching for the perfect prompt is just not how you should be engaging with language models.

I've believed for a while that getting good at AI is [not really about "prompt engineering"](/beyond-prompting). Instead, it's about getting a sense of what language models are good and bad at, of when it's useful to continue a conversation with a LLM and when you should back out and start a brand-new conversation, of [when to use reasoning models](/prompting-reasoning-models) and when not to, of when you can broadly trust the model output and when you need to go over it with a fine-tooth comb, and so on.

For instance, here's how I use state-of-the-art language models to help me in my software engineering job:

* I use Copilot completions basically all the time as a smarter autocomplete while I type
* When I'm working in a language or framework that I'm not familiar with, I rely heavily on chat to figure out what the broad-strokes idiomatic approach would be
* If I'm stuck on a bug or problem, I almost always throw my context at a reasoning model to see if it can immediately intuit the solution, but I never have long conversations about it
* Before I submit a PR (or while it's still in draft), I throw the diff at a reasoning model to see if it can catch any obvious problems
* When I'm learning a new technology, I do a _lot_ of asking questions, typically of the format "so is X correct, then?"
* I use models to generate any single-use, read-only code I have to run (e.g. scripts, Kusto queries) without much checking
* I **never** merge generated code into production from a model without carefully going over it myself (in practice, that means I either write or rewrite all production code)
* I **never** use models to generate emails or Slack messages or other internal comms. I think it's fine to do this, but I personally don't like the ["model style"](/chatgpt-house-style)

Notice that none of these points are "I have a magic prompt for X task"! The prompts I use for this kind of work are almost always written ad-hoc, like "can you help me with this bug, here's what I know:". I spend much more time making sure the model has all the relevant context than I do tweaking the prompt. Probably I'd get slightly better responses with perfect prompting. But I really doubt that having a generic prompt library would help - it seems to me that any benefits from pure prompt strength would be outweighed by not having a prompt written for the exact situation.

There is one real benefit to "magic prompt" hype, though. It's that **they remind you what language models are capable of**. Almost all the big gains I've made with AI have been identifying tasks that are a good fit for language models (for instance, I wrote a lot of one-off scripts before realizing that any strong language model can one-shot basically any script). If you have never considered using AI to workshop your marketing strategy, or asking it about that weird pain you sometimes get in your elbow, seeing someone tweet about a "superhuman prompt" can be a good reminder that ChatGPT (or Claude, or Gemini) might be able to help.

In general, if you're looking to get good at using AI models, don't worry too much about building up a library of magic prompts. Instead, build your sense of what models can and can't do. Get practiced at taking different kinds of problems to them, and at helping them build the right context in order to answer effectively.

[^1]: Real examples, unlinked because it feels like bullying.