---
title: Why are model arena leaderboards dominated by slop?
description: 
order: 73
date: '2025-04-14'
tags: ["ai"]
---

When LMSYS (aka LMArena, aka [Chatbot Arena](https://lmarena.ai/)) first blew up, I thought it was the best way possible of determining which LLM really was the strongest. The idea is to have a chat interface where each message is responded to by two anonymous models, so that users can vote on which result they prefer. There's no set benchmark that can be leaked or gamed. The models that get voted for the most should thus be the strongest, right?

Wrong! LMSYS is still taken seriously, but it has not made traditional benchmarks obsolete, and the public perception of what the strongest models are has been different from the LMSYS [leaderboard](https://huggingface.co/spaces/lmarena-ai/chatbot-arena-leaderboard) for at least a year. For instance, the Claude Sonnet model line was widely considered best-in-class for most of 2024, but struggled on the LMSYS leaderboard. How can that be? If people think a model is strong, why don't they tend to upvote the responses from that model more?

### Humans can't judge smart AIs

There are a few answers to this. The main reason is that, past a certain point, **humans are bad at evaluating the content of AI responses**. It's easy to tell that GPT-4 was stronger than GPT-3.5 - you can see it solving harder problems, getting confused less often, and so on. But evaluating models at or above the strength of GPT-4 is much harder. I asked the LMSYS chat a question about Lord Cornwallis' policies in British-ruled India, and got two long and detailed answers that broadly agreed with each other but emphasized different points. Which is better? Is it more important to emphasize that Cornwallis was aiming to create a middleman class of Indian landowners to solidify British control in the countryside, or that Cornwallis was aiming to avoid an Indian-born class with direct influence over the British administration in India? I genuinely don't know.

When you're talking to someone who's less smart than you[^1], it's very clear. You can see them failing to follow points you're making, or they just straight up spend time visibly confused and contradicting themselves. But when you're talking to someone smarter than you, it's far from clear (to you) what's going on. You can sometimes feel that you're confused by what they say, but that doesn't necessarily mean they're smarter. It could be that they're just talking nonsense. And smarter people won't confuse you all the time - only when they fail to pitch their communication at your level. 

Talking with AI models is like that. GPT-3.5 was very clearly less smart than most of the humans who talked to it. It was mainly impressive that it was able to carry on a conversation at all. GPT-4 was probably on par with most humans, or at least pretty close. GPT-4.5 is... smarter? If it were, would we know immediately?

### Human voters love slop

Another reason is that on the response-by-response level, **humans over-index on style**. Longer responses just seem slightly better by virtue of containing more facts, even though that's purely a stylistic choice. Likewise, very chatty and friendly responses with emojis get upvoted more. AI companies are very aware of this. Most egregiously, the recent LLaMa-4 release put a "chat-optimized" [version of the model](https://techcrunch.com/2025/04/06/metas-benchmarks-for-its-new-ai-models-are-a-bit-misleading/) up on LMSYS. Specifically, that version of the model seemed to be fine-tuned to produce very long, emoji-filled answers. And it worked! That version of the model was #2 on the arena benchmark. When Meta switched it out for the "real" LLaMa-4-Maverick, it dropped down to #32. It seems like users might genuinely prefer slop.

Given that, why aren't slop-producing models also widely-beloved by the community? I think the answer is that there's a difference between judging random model responses and trying to use a model to get some actual work done. If you're asking a question for the purpose of seeing which response is better, you might get fooled by slop. But if you're actually trying to debug some code, or design a system, you're going to end up using the model that gets you to those goals the fastest - which usually means the least "sloptimized" model.
 
Indeed, LMSYS itself acknowledges the problem. In their 2024 [blog](https://lmsys.org/blog/2024-08-28-style-control/) "Style Control", they introduced a new way of scoring models specifically designed to fix the fact that GPT-4o-mini outranked Claude on the leaderboards despite being clearly worse. Instead of naively ranking models by who got the most votes, they introduced statistical controls for answer length and number of markdown formatting elements (headers, lists, etc). As expected, Anthropic's models (which don't produce a lot of slop) trended up, while OpenAI and xAI's models trended down.

### Are AI labs cheating?

Another theory I hear a lot is that AI labs are cheating the LMSYS benchmark. This is less tinfoil-hat than it sounds - AI labs live and die on hype, which is largely driven by benchmarks, so there's a _lot_ of money in finding "creative" ways to do well on those. Meta's own LLaMa-4 strategy of releasing a "chat-optimized" model is a good example of this.

How would you cheat on the LMSYS arena? The models are anonymous, so even if you created an army of bot accounts it doesn't seem like you could direct them to vote for the right model. Setting aside straightforwardly-fraudulent approaches (e.g. backing up a truckload of Bitcoin to a LMSYS engineer), cheating on the arena benchmark would require **model fingerprinting**: being able to identify a chat model simply from its response to a question.

There are a [few](https://arxiv.org/html/2407.10887v1) [papers](https://arxiv.org/abs/2401.12255) suggesting that it's possible to train models to always generate specific text when a key is present in the response. It's unclear if this degrades model performance. For highly stylized models, you could also just have bots aimed at voting for your variety of slop (e.g. Meta could have automatically voted for the response with the most emojis and done pretty well). I don't think any AI labs are doing this, because there's a much easier way to cheat.

The trick is that **LMSYS does not host the models itself**. Instead, it relies on APIs provided by AI labs. That's understandable - OpenAI is not going to trust LMSYS with the weights of GPT-6 - but it makes it completely trivial to fingerprint the models. Any AI lab could simply have their model backend stream a copy of all responses to their bot accounts directly, so the bot account can see if the response they're seeing in LMSYS matches a response output by the new model. This would be impossible to detect on the LMSYS side.

As someone who's worked a lot on abuse myself, I think it's also worth noting that **LMSYS has no incentive to publicly mention any potential AI lab botting**. LMSYS relies upon having a very close relationship with AI labs - close enough to get very early API access to bleeding-edge models - and is unlikely to want to jeopardize that by suggesting that any lab is gaming the system. 

I don't see a lot of people talking about this. The only thing I could find was a zero-upvotes [Reddit post](https://www.reddit.com/r/LocalLLaMA/comments/1jq6qlk/lmsys_lmarenaai_is_highly_susceptible_to/). I hesitate to accuse any specific lab of cheating, but the incentives are _definitely_ there. I'd be surprised if none of them ahve thought about it. (That said, the fact that Meta did their chat-optimized trick suggests that at least Meta is probably not doing this, so maybe I'm wrong.)

### Summary

- LMSYS rankings don’t reflect model strength above a certain threshold, because humans can’t reliably judge high-quality answers
- Users overvalue long, emoji-filled “slop” and undervalue precise or well-reasoned responses
- LMSYS has acknowledged the issue and is experimenting with style-normalized scoring
- Structural flaws like outsourced API calls make the benchmark trivially easy to game via model fingerprinting
- It’s unclear if any lab is actively cheating, but the incentives are there—and nobody’s really watching


[^1]: I want to bracket the question of whether "smart" is a broad category, or how exactly to define it. I'm talking specifically about the way GPT-4 is smarter than GPT-3.5 - even if we can't define exactly how, we know that's a real thing.
