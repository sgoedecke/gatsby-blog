---
title: Why some people hate AI slop and others don't mind it
description: --
order: 37
date: '2025-01-28'
---

I don't like reading obviously AI-generated content on Twitter. There's a derogatory term for it: AI "slop"[^1], which means something like "AI content presenting itself as human", or even just "unwanted AI content". But I have no problem reading AI-generated content when I talk to Copilot or ChatGPT. Why is that?

Having a good theory of AI slop is important for a few reasons. First, it's just an interesting question why AI responses feel okay or gross in different contexts. Second, if you're building products with AI, it's a good idea to not present them as slop.

## What slop is

Not everyone is bothered by AI slop. Presumably the people building or buying AI slop machines (automated LinkedIn engagement bots, for instance) don't find it gross themselves, or they wouldn't think it was useful. There also seems to be a healthy group of people on Reddit and elsewhere who will happily paste AI content to each other. What makes some people hate AI slop and not others?

Personally, I'm very bothered by written slop but not by AI art. I don't particularly love most of the AI art I've seen, but it doesn't disgust me in the same way as AI writing[^2]. Why is that? I think I just don't have a particularly careful way of looking at art, whether human or AI. However, I read AI-generated content very differently than human-generated content. I put much more work into reading human content: I try to get a sense of who's doing the writing, what their perspective and style is, and what they might say about other topics. When I read content I know is AI-generated, I read much more quickly, and I don't pay any attention to the personality behind the writing (because there isn't one). Instead, I just skim for key points and insights.

Starting out in a reading-human-content mode and then having to shift to a reading-AI-content mode is an unpleasant mental shift. I feel hoodwinked: like I've been asked to put a bunch of effort into something that ended up not being important at all. Worse still, there's an uncanny-valley effect, where something I was engaging with on a human level turns out to be not-quite-human. I think people who are bothered by AI art approach human-generated art in a more deliberate way, and so are repulsed by surprise AI art for the same reason.

To summarize: **slop is bad because it's very unpleasant to mentally shift from a human-human interaction to a human-machine one**. If you start out in a human-machine mindset (like when you're using ChatGPT), or if you're never in a human-human mindset in the first place (like me when I'm only paying cursory attention to art), there's no problem.

## Why AI content can't be interacted with on a human level

An AI defender here might respond by saying that good AI content is worth engaging with, whether there's a human behind it or not. There's nothing magical about being written by a human that makes text better or worse. That's true! But good AI content still doesn't _feel_ human enough to break out of the uncanny valley. I think this is pretty obvious but I'll still give three reasons for it.

First, the natural behaviour of AI models is to give you the median answer to your question: that is, the most down-the-line, uncontroversial response. This is great when you're learning about a new field (for instance, how fly anatomy works). But it's not how an interesting human talks.

Second, AI models - probably due to the RLHF process - have historically tended to begin and end their outputs with wordy platitudes. It's like the Simpsons joke where Bart is completely improvising his school presentation, and says "in conclusion, Libya is a land of contrasts". In good human writing, the beginning and end of a piece are the parts with the most dense content; in AI outputs, they're the parts with the least content. I actually think this has improved, since AI labs have put serious effort into avoiding this particular issue. When you ask GPT-4o questions today, it just gets right to it. But many open-source models still talk like this, and it's still something you see in current AI bots.

Third, you can't build a consistent model-of-the-author when you're reading multiple pieces of AI content. When I read a blog I like - say, [Dan Luu's](https://danluu.com/) - I build up a sense of who he is (or at least how he presents himself in his blog posts). I develop a model of where I believe he has expertise (working in large companies, optimization, performance work) and where I suspect he doesn't (founding startups, frontend). I pay a lot of attention to where I always agree with him and where I don't. When he writes about an area where he has expertise but I tend to disagree with him, I get excited because I'm almost certainly about to learn something. You can't do any of this with AI content, because there's no person there. Responses come from different parts of a massive incomprehensible latent space, with no guarantee of consistency[^3].

I think better models might avoid the first two problems. But I struggle to see how AI content is ever going to avoid the third. I think the most AI-optimistic view here is that it won't matter, because solving the first two problems will make AI content feel human enough. Maybe!

## Summary

- It's weird that reading AI bots on twitter feels so much worse than talking to ChatGPT
- I think that's because the shift from a human-human to human-machine interaction feels terrible in an uncanny-valley way
- If you're building products where users will be reading AI responses, I recommend making it salient that they're talking to an AI (e.g. use robot avatars intstead of human avatars, etc)

[^1]: Ben Congdon [attributes the popularity](https://benjamincongdon.me/blog/2025/01/25/AI-Slop-Suspicion-and-Writing-Back/) to Simon Willison, who [attributes](https://simonwillison.net/2024/May/8/slop/?utm_source=chatgpt.com) it to @deepfates and others on Twitter, but I think "slop" as a term for "low-quality gross-feeling content" actually originated outside of the AI sphere entirely. I first heard it used in the current sense a few years ago as a disparaging descriptor of later Marvel movies and TV shows.

[^2]: This isn't to say I don't have any ethical concerns about AI art, just that it doesn't bother me on a visceral level.

[^3]: Maybe it's possible to get a sense of the _system prompt_ from reading multiple outputs. But humans are a lot more interesting than system prompts.