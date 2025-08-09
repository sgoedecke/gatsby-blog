---
title: GPT-5 performance has nothing to do with scaling laws
description: 
order: 126
date: '2025-08-06'
tags: ["ai"]
---

The big news in AI this week is OpenAI's long-anticipated release of GPT-5. This has been in the works for over two years, which is at least a decade in AI time. GPT-4 represented a titanic leap over GPT-3 - for the first time, a model could answer useful questions and have an actual conversation without getting confused every couple of sentences[^1]. Now GPT-5 is out, has there been a similar step change above the current state-of-the-art?

No. GPT-5 is noticeably better than GPT-4o (OpenAI's latest iteration on GPT-4), but it's unclear if it's much better than OpenAI's reasoning model o3. It improves on benchmarks a little bit, which is pretty thin fare for a two year wait. Many people on the internet are saying that this proves scaling is dead - i.e. that you can't just keep building larger language models to get better performance. I think this is foolish. **GPT-5's launch tells us nothing about language model scaling laws.**

The main reason is that **GPT-5 is simply not a scaled-up model!** OpenAI never publishes the size of their models, but looking at their [pricing](https://platform.openai.com/docs/pricing) makes it clear that GPT-5 is on par with or cheaper than GPT-4o and GPT-4.1. Actually large OpenAI models like GPT-4.5 are [ten to seventy times more expensive](https://www.reddit.com/r/OpenAI/comments/1izpgct/gpt45_has_an_api_price_of_751m_input_and_1501m/). Of course, GPT-5 is not a single model at all, but some combination of fast and slow models. But the average scale must still correlate with price[^2].

Sam Altman, the CEO of OpenAI, has [said](https://x.com/sama/status/1953551377873117369) that GPT-5 was not an attempt to make the smartest possible model, but an attempt to put a frontier model in the hands of as many people as possible. Before the GPT-5 launch, most ChatGPT users were using 4o. GPT-5 will be a massive improvement over that!

Now of course all of this is cope.

[^1]: At the time, I was playing around with [ReACT-pattern agents](/llm-driven-agents), and replacing GPT-3.5 with GPT-4 instantly took my project from "interesting but non-functional toy" to "can actually submit valid PRs some of the time".

[^2]: It's technically possible that OpenAI is pricing this model at a massive loss for PR reasons, but GPT-5 is clearly much _faster_ than GPT-4.5 as well.