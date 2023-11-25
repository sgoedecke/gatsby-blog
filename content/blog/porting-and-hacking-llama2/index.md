---
title: Porting and hacking Llama2.c for fun and profit
description: "A devlog of my experience porting and hacking llama2.c"
order: 12
---

Over the last few weeks I've been playing around with the excellent [llama2.c](https://github.com/karpathy/llama2.c) repository, which is basically a simple one-file C implementation of the Transformer architecture that powers models like Meta's LLaMA and OpenAI's GPT models. I had a great time trying to [port](https://github.com/sgoedecke/llama2.js) llama2.c into a higher-level language (I tried Ruby and was ultimately successful with Javascript).

I ended up hacking a few interesting behaviours into the attention and token-generating mechanisms. This post will go through my experience, what I found difficult, what was surprisingly easy, and what I played around with once I had a working local implementation. I'll assume familiarity with how LLMs work (see my [post on that](/how-llms-work) if you want).

