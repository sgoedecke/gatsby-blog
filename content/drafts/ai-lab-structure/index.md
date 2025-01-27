---
title: How AI labs are structured
description: --
order: 25
date: '2025-01-24'
---

Major AI labs these days (early 2025) offer a wide variety of models. Some are faster and cheaper, some are smarter, and now some are "reasoning" models. How do these model types hang together? What's causing every AI lab to deliver the same rough categories of models?

Disclaimer: I build AI products at GitHub, but the emphasis there is on "products". I have no special insight or expertise into how AI labs work. This is just what I've learned while trying to stay up to date.

First, every AI lab has a "base model". This is a straightforward attempt to train a transformer-based model from scratch on a gigantic dataset. This is always the largest model that the lab thinks they can train effectively: based on LLaMa, we're talking in the order of 405B parameters or above. **The base model is never released directly,** for two reasons. First, it's typically too large and too expensive to serve to users. Second, it hasn't been RLHF-ed yet, so it'll behave like the raw gestalt of human writing that it is, instead of like a helpful assistant. It'll happily tell users to make meth or encourage them to kill themselves, or any one of a million other things that'd be a PR nightmare for the AI lab. The purpose of the base model is not to be used directly, but to act as a _base_ for other models.

That brings us to the user-facing models: models like GPT-4o, Claude Sonnet, and so on. These models are much smaller models that are distilled from the larger base model and then RLHF-ed. What does "distilled" mean here? It's a process where a small model (7B or 32B parameters, instead of 400+) is trained entirely on the outputs (or even the weight activations) of a much larger model. One surprising result over the last five years is that **distilled models are much better than if you trained that same small model on the data directly**. Much of the performance gains that we've seen from AI labs - think of how much faster 4o is than the original GPT-4 - come from distilling powerful models into much smaller models. AI labs typically offer a few tiers here: 4o and 4o-mini, or Claude Sonnet and Haiku, or Meta LLaMa 70B and 8B. These are separate distillations of the base model into smaller and smaller models. As the model gets smarter, you can get away

For LLaMa, this is LLaMa-405B. For OpenAI, this is GPT-4 (now probably Orion). For Anthropic, this is Claude Opus.