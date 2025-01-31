---
title: Why is DeepSeek V3 fast?
description: 
order: 25
date: '2025-01-04'
---

DeepSeek's latest models have been widely celebrated as being able to be trained and run at a fraction of the cost of American AI labs' state of the art models. Is that even true? If so, why?

https://arxiv.org/html/2412.19437v1 
https://github.com/deepseek-ai/DeepSeek-R1/blob/main/DeepSeek_R1.pdf

Why do people think DeepSeek is cheaper?

> For instance, DeepSeek's Reasoner model is priced at $0.55 per million input tokens, while OpenAI's o1 model charges $15 for the same number of tokens.

> According to a report from Artificial Analysis, DeepSeek V3 is priced at $0.89 per million tokens, which is considered cheaper than the average pricing in the market. In comparison, OpenAI's GPT-4o model charges $1.25 per million input tokens and $10 per million output tokens

> Third-Party Provider Pricing:

> Third-party providers hosting DeepSeek-V3 may have different pricing models. For example:

> Together AI: Offers DeepSeek-V3 at $1.25 per million tokens. 
REDDIT.COM

> Fireworks: Provides access to DeepSeek-V3 at $0.90 per million tokens.

Do people just think it's cheaper because DeepSeek itself is offering it at ~60% of OpenAI prices?????

## Was DeepSeek-V3 cheaper to train than other models?

- Dario's blog post - maybe? not that much?
- OpenAI doesn't say anything about that stuff, so it's really hard to know
- AI labs spend tons of money on research (i.e. failed runs)
- Just because they're asking for lots of money doesn't mean that's how much the model costs
- Cheap because they used H800s, which are just as fast but don't have good memory, which they worked around

## Is DeepSeek-V3 cheaper to run than other models?

- It's being served at a lower price
- But what determines the price? Very unclear that maps 1:1 with actual price-to-run
- Ballpark estimate, DSV3 is like a 600B param model, and there's no way 4o is anywhere near that - my guess is an OOM lower. 
- R1 may be cheaper than o1 - but _reasoning length_ is a huge part of that. There's no data on whether o1 has longer CoTs. If so, it'd be more expensive for obvious reasons, but likely bette ron hard tasks

## 