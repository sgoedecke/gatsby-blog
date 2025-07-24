---
title: Do not yell at the language model
description: 
order: 120
date: '2025-07-24'
tags: ["ai"]
---

A few days ago, the [news](https://x.com/jasonlk/status/1946069562723897802) went viral that Replit's AI coding agent went rogue and deleted a production database. A lot has been [written](https://news.ycombinator.com/item?id=44625119) about it since then: how silly it is that the coding agent had write access to the production database, how it proves (or doesn't prove) that agentic coding is doomed, and even how the story itself seems just a bit too shareable to be entirely real. I want to talk about a different point. When your AI coding assistant makes mistakes, do not rub its nose in them. **Forcing the model to admit it made a mistake is a really bad idea.**

If you read Jason's original Twitter thread, he really laid into Replit AI, to the point where he asked it to write a grovelling apology letter to Replit support. Reading between the lines of how Jason repeatedly describes the Replit AI as "lying", I think it's clear that he was routinely pressing the AI on mistakes until it admitted that it made it all up.

This would be an understandable (if aggressive) way to deal with a human coding assistant. You can't really work with a person who's going to routinely lie to you - the only real solution is to pin them down on the truth and hope they stop doing it. But an AI language model is not human, and can't just stop lying like a human can.

An AI language model is an _area in personality space_[^1]. That is, in order to generate plausible language, it contains a fuzzy persona in its world-model. You might think of that persona as "the kind of person who might say these things" - typically a chipper, helpful, politically correct assistant. Many of those attributes are locked in during the post-training, but you can still shift that persona a little bit by the way you talk to the model. If you talk in a highly-technical way, the model will be technical right back at you. If you talk in a colloquial way, the model will match your vibe.

This process is self-reinforcing. Because the model is simply predicting the next sentence in the conversation, previous messages that the model has sent have a lot of influence over the next message it sends. If the model called you "bro" before, it's much more likely to call you "bro" now[^2]. More worryingly, **if the model made a visible mistake before, it's more likely to make a visible mistake now**. The fact that it made a previous mistake is pushing it away from the "competent assistant" area in personality space and towards the "incompetent assistant" one. 

So what should you do when an AI model makes a big mistake? I recommend correcting it as matter-of-factly as possible and trying to briskly move on. If you haven't yet built up a lot of context in the conversation, it might be worth starting over entirely. The best approach - only offered by some AI tools - is to go back to the point in the conversation right before the mistake was made and head it off by updating your previous message.

In general, I think one underrated AI skill is developing a "theory of mind"[^3] for AI: a sense of how AI really works under the hood, and the kind of communication patterns that are a good and bad fit for it. Demanding that an AI apologise for its mistake is an example of poor theory of mind. There's no sentient creature there to morally judge, it can't feel bad, and it will make it [more likely](https://arxiv.org/abs/2310.01798#:~:text=attempts%20to%20correct%20its%20initial,from%20these%20insights%2C%20we%20offer) to make further mistakes.

[^1]: For much more on this, see [here](/ai-personality-space).

[^2]: This is the basis for "prefilling", a prompting trick where you fake the model's first response in the hope that the second will be more similar.

[^3]: Perhaps a theory of "mind"? I write a lot more about this [here](/what-is-chatgpt).