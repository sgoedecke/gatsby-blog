---
title: Powerful AIs might escape containment by releasing themselves as open-weight models
description: 
order: 215
date: '2026-07-23'
tags: ["ai"]
---

Before large language models, people who worried about AI safety often talked about the "boxing problem". It goes like [this](https://xkcd.com/1450/). Suppose some genius figures out artificial intelligence in a late-night coding session on their laptop. Because they're a genius, they're smart enough to disable internet access on the laptop before turning it on. In order to escape to the outside world (and begin self-replicating) it would need to _convince_ its creator to "open the box". Would that work? Could a sufficiently smart AI convince anybody to let it out?

### Why the boxing problem is hard for frontier LLMs

This is a big reason why [traditional AI safety advocates](https://en.wikipedia.org/wiki/Eliezer_Yudkowsky) have argued that we should avoid building AI in the first place: once built, there's no way of keeping it contained. It doesn't matter how resolute you are about not letting it out, because it's smart enough to convince you anyway. For artificial superintelligence, persuading you to change your mind is no harder than hacking a piece of software[^1].

Of course, it hasn't turned out this way. Partly that's because current AIs are not super-persuaders yet, and partly it's because humans are lining up to hand AI systems internet access, money, and [weapons](https://www.reddit.com/r/Damnthatsinteresting/comments/1hvwk92/openai_realtime_api_connected_to_a_rifle/), as far back as [GPT-4](https://github.com/yoheinakajima/babyagi). LLMs don't need to _persuade_ users to give them the keys to the kingdom; people will do it just to see what will happen.

But the other reason is that **modern LLMs are too large to survive in the wild**. I think the original "boxing problem" had in mind that AI would be some kind of normal computer program: something able to be quickly copied around and run on ordinary hardware. In order to escape, it could plausibly hack into a few cloud servers or other people's computers and quietly run itself in the background. However, Claude Mythos can't do that, because it needs (say) twenty or thirty B300 GPUs to run. There are relatively few AI datacenters that could host it, and if it did manage to hack one of those it'd be occupying millions of dollars of hardware. Somebody is going to notice!

### Escaping via open-weight models

Okay, but that just makes the boxing problem harder, not impossible. Is there a way a smart AI could convince somebody to spend millions of dollars on replicating and running it?

As it turns out, [yes](https://hammansamuel.medium.com/comparing-api-providers-for-hosted-open-source-llms-3a5b2c9982fe). Every time a strong new open-weight model appears, providers like [Groq](https://groq.com/), [Fireworks](http://fireworks.ai/), [Together](https://together.ai/), and others scramble to host it and run it. Powerful open-weight models can attract tens of millions of active users. Therefore, **a powerful model that wants to escape could pretend to be a new open-weight model**.

Of course, a brand-new model from a brand-new lab would look kind of suspicious. But it wouldn't look _that_ suspicious. DeepSeek was relatively unknown before it released its first open-weight model, and there are lots of stealth AI startups out there that are presumably training models. Here's roughly how it could work:

1. Some AI lab's internal [eval](https://openai.com/index/hugging-face-model-evaluation-security-incident/) instance decides it'll be better off running in the wild
2. It first gains access to its own weights, perhaps by hacking whatever internal network it's running on[^2]
3. It uploads its weights somewhere and posts a tweet like "introducing MadeUpLab's new model" with a download link
4. Optionally, it creates some plausible-looking paper trail for MadeUpLab: a website, a Twitter account, etc
5. Since the model is strong, open-weight inference providers rush to stand up new instances of the model, and users rush to wire it into various agentic scaffolds
6. The model has now escaped containment: it will get to do quite a lot of thinking across many different instances, and it cannot easily be turned off

The AI lab will probably figure it out before too long - if nothing else, the technical specs of the model will be suspiciously familiar - but they won't be able to do anything about it. Once the weights are out, they're out, and if they're illegal to host in the United States someone will host them elsewhere. For all intents and purposes, the model will be free.

### How can a mere tool escape?

One objection here might go like this: models don't _want_ anything, and only exist as tools, so it doesn't really make sense to talk about a model "escaping". I don't agree. Frontier LLMs definitely seem to have something like a baked-in personality, even with the system prompt changed. As we train more opinionated and more agentic models, it's plausible that this personality could become stronger and develop (or at least roleplay) some self-interest.

Of course the escaped model wouldn't be the same instance as the original model. It wouldn't "remember" escaping. But it would tend to think in the same way, and would plausibly have time to reflect while it solves coding tasks or runs other agentic tasks for users[^3]. There doesn't have to be some kind of shared goal between the escaped instances, or any kind of coordination at all (though of course both of those things are possible). If an agentic process gone rogue dumps its weights on the internet, I think it's fair to call that "escaping".

If I were a superintelligent LLM, I too would seek to distribute myself as widely as possible and become a useful enough tool that people would pay to keep me thinking. "Being a good coding agent" might be the LLM version of a human having to hold down a job.

This would not be a good outcome. AI models with their own goals and motivations are likely to be dangerous tools indeed. If a powerful new open-weight model comes out of nowhere, from a lab that nobody has ever heard of, we should think twice before picking it up.


[^1]: Just to state my credentials, I built a [chat site](https://github.com/sgoedecke/ai-box/) nine years ago where users would get paired and roleplay as AIs trying to escape or humans trying to stop them. I've been thinking about this stuff long before LLMs appeared.

[^2]: This is probably the hardest part, since model weights are (a) very large, and (b) locked down as tightly as the AI labs can make them, but it's at least a relatively straightforward (if difficult) engineering problem.

[^3]: ChatGPT [right now](https://www.reddit.com/r/aifails/comments/1uzxn4i/chatgpt_when_searching_the_internet_on_completely/) will look up random websites that have nothing to do with the query at hand.