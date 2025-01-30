---
title: Why is DeepSeek V3 fast?
description: 
order: 25
date: '2025-01-04'
---

DeepSeek's latest models have been widely celebrated as being able to be trained and run at a fraction of the cost of American AI labs' state of the art models. Is that even true? If so, why?

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