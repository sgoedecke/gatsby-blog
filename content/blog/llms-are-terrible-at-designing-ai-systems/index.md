---
title: LLMs are terrible at designing AI systems
order: 269
description: 
date: '2026-11-08'
tags: ["ai", "software design"]
---

LLMs don't know how to design software that uses LLMs. They're comfortable writing normal programs, but if you throw an AI-shaped problem at them, they will usually screw it up. Why is that?

### Going down the symbolic rabbit hole

For example, [this post](https://arbustoemchamas.substack.com/p/i-naively-tried-vibe-coding-a-memory) describes an attempt to vibe-code a memory tool that would flag when one memory contradicted another[^1]. This is a great instance of a task that was [virtually impossible](https://xkcd.com/1425/) five years ago but is now relatively trivial due to LLMs. You can simply task a LLM with scanning for contradictions, either in a big batch or pairwise[^2].

However, when asked for the "state of the art" approach[^3], the AI agent in this case did not recommend LLMs. It started building a bewilderingly complex symbolic system to convert the memory items into [structured logical atoms](https://en.wikipedia.org/wiki/Answer_set_programming), then mechanically compare them with a solver. This, of course, did not and could not work, because there is no analytic way of determining whether any two natural-language sentences express the same proposition.

The LLM knew this was impossible! When the user eventually lost patience and said "hey, why isn't this working", Claude immediately explained that this was a known 130-year-old problem with no solution. And yet it happily went around and around for weeks iterating on a dead end.

I've run into this myself. When I was building [Autodeck](/autodeck/) (AI-generated spaced repetition cards) my agents would routinely try to categorize cards by regex or keyword search instead of just making another LLM call.

### Why can't LLMs use LLMs correctly?

Why would this be happening? I have two obvious explanations and one deeper one.

The first obvious explanation is that **most training code is pre-LLMs**. Assuming the labs aren't feeding the current avalance of slop repositories directly into the models[^4], the vast majority of the code that models learn from was written before LLMs were an option. So it would make sense that they'd reach for non-LLM approaches, in the same way that they'd reach for jQuery over modern vanilla JS, or Backbone.js over React, right? Wrong, actually! LLMs don't choose jQuery and Backbone. Whatever part of the training process pushes them towards up-to-date knowledge in other areas isn't successfully pushing them towards LLMs, so this can't be the whole story.

The second obvious explanation is that **RLVR is not a good environment to write code that calls LLMs**. Much of the time LLMs spend training is spent in reinforcement learning environments where an automatic grader determines their performance (for instance, by running some code they wrote and checking the outputs). I don't know this for a fact, but I would be surprised if these environments contained the credentials and API access for a LLM to call other LLMs[^5]. So even if the pretrained LLM was comfortable writing that kind of code, the reinforcement learning process might discourage[^6] it from doing so.

The third explanation, which I like the most, is that **current AI agents are just not very good at software design**. On this explanation, picking a doomed symbolic approach instead of simply calling a LLM is not a weird aberration but a normal instance of AI agents picking the wrong tool for the job. I've seen this behavior from LLMs in other contexts too: trying to build complex (and doomed) consensus algorithms instead of tolerating stale data, introducing synchronous checks in event-driven systems, and so on. In the past I've [chalked these](/human-ai-partnerships-are-for-alignment-not-capability/) [up to](/how-to-read-code/) _alignment_, but I'm open to the idea that they're just ordinary errors of software design.

### Conclusion

One lesson I learn over and over again is that I can't judge a LLM by the standards of a human. Any human programmer who was capable of implementing a sophisticated symbolic solver would know that it wouldn't work, and so if they suggested that approach I'd assume[^7] they had a good reason. Only a LLM could be both smart enough and dumb enough to make this mistake.

I write a lot about the [skills](/getting-good-at-ai-takes-time-and-practice/) [that](/you-can-just-ask-ai-to-do-things/) [are](/tell-agents-the-why/) [involved](/prompts-are-technical-debt-too/) in working effectively with LLMs. I still stand by what I wrote in [February 2025](https://www.seangoedecke.com/beyond-prompting/):

> Using LLMs well involves extracting value from what they’re good at and avoiding wasting time at what they’re bad at.

This is surprisingly hard, because of the point above. LLMs are good and bad seemingly at random: they will work hard for hours but sometimes be [shockingly low-effort](https://www.lesswrong.com/posts/WewsByywWNhX9rtwi/current-ais-seem-pretty-misaligned-to-me), they will draw on inhumanly broad expertise but fail to apply the most basic common-sense, they can successfully [rewrite](https://bun.com/blog/bun-in-rust) enormously complex programs but will often make very silly [errors](https://www.seangoedecke.com/how-to-read-code/#cant-ai-just-do-it-for-you) in design.

If you can predict where they will do well or badly ahead of time, you can get _enormous_ value from LLMs; if you can't, you will likely waste a lot of time and tokens going down hopeless approaches.

[^1]: [Here's](https://news.ycombinator.com/item?id=50381522) another example where the user "implied" that Opus 5.5 should use a judge model and it instead constructed a series of regex checks.

[^2]: Here I'd probably reach for a [decision model](/jev-means-structured-output-is-interesting-again/).

[^3]: In hindsight, this was probably the key mistake, though I don't know how you'd turn that into advice for non-technical vibe-coders. Never asking the agent about the state of the field is a mistake too. Put one more notch on the [LLMs reward expertise](https://www.seangoedecke.com/llms-reward-expertise/) belt.

[^4]: A fair assumption, I think: even though training on low-quality synthetic data clearly isn't catastrophic for LLMs, it can't be _great_.

[^5]: It would be expensive, slow, and risky.

[^6]: This theory also explains why LLMs are great at _prompting_ other LLMs as subagents, or on training LLMs from scratch: they're likely directly RL-ed and evaluated on that, unlike on writing code that calls LLMs.

[^7]: Well, okay, I wouldn't - I'm arrogant enough to ask anyway - but I'd at least _expect_ a good reason.
