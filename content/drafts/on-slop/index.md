---
title: Why some people hate AI slop and others don't mind it
description: --
order: 25
date: '2025-01-24'
---

Reading obviously AI-generated content on Twitter or blogs makes me feel a bit gross. There's a term for this: AI "slop"[^1], which means something like "AI content presenting itself as human", or even just "unwanted AI content". The standard slop experience is that you see a long-form response, begin reading it, and grow rapidly suspicious that it's AI-generated content before giving up in disgust.

## What's bad about slop?

AI content isn't always disgusting. For instance, I'll happily read AI-generated content when using Copilot or ChatGPT. But encountering it in the wild is a really unpleasant experience. I have this reaction even when it's explicitly flagged as AI-generated: for instance, the many Reddit comments that begin "I asked ChatGPT and here's what it said". It's akin to the phenomenon where you don't mind the smell of your own body odor or farts, but you're revolted by the smell of other people's.

Interestingly, the experience of being bothered by AI slop isn't universal. Presumably the people building or buying AI slop machines (automated LinkedIn engagement bots, for instance) don't find it gross themselves, or they wouldn't think it was useful. There also seems to be a healthy group of people on Reddit and elsewhere who will happily paste AI content to each other. What makes some people hate AI slop and not others?

One piece of evidence on that question is that I'm very bothered by written slop but not by AI art. I don't particularly like most of the AI art I've seen, but it doesn't disgust me in the same way as AI writing[^2]. Why is that? I think I just don't have a particularly careful way of looking at art, whether human or AI, so either way I'm just making an at-a-glance assessment. However, I read AI-generated content very differently than human-generated content. I put much more work into reading human content: I try to get a sense of who's doing the writing, what their perspective and style is, and what they might say about other topics. When I read AI-generated content, I read much more quickly, and I don't pay any attention to the personality behind the writing (because there isn't one). Instead, I just skim for key points and insights. Starting out in a reading-human-content mode and then having to shift to a reading-AI-content mode is an awkward mental shift that I don't like doing. In fact, I feel hoodwinked - like I've been asked to put a bunch of effort into something that ended up not being important at all. I think people who are bothered by AI art approach human-generated art in a more intensive way, and are repulsed by AI art for the same reason.

To summarize: **slop is bad because it tricks you into paying close attention to a content that isn't worth that much of your time**. That moment where you realise you've been wasting your time is what causes the disgust reaction.

## Why AI content isn't worth a close reading

I want to be clear that "not worth as much time as human content" and "not worth your time" are two very different categories. The output of strong AI models is very much worth my time. It's just not worth a _close reading_. To me, that seems obvious. But maybe it's worth unpacking a bit why I don't think AI content bears a close reading.

First, the natural behaviour of AI models is to give you the median answer to your question: that is, the most down-the-line, uncontroversial response. This is great when you're learning about a new field (for instance, how fly anatomy works). But it's not how an interesting human talks, and it's unlikely to give you any real insights about fields where most people get it wrong: for instance, [how to ship projects at large tech companies](/how-to-ship).

Second, AI models - probably due to the RLHF process - have historically tended to begin and end their outputs with wordy platitudes. It's like the Simpsons joke where Bart is completely improvising his school presentation, and says "in conclusion, Libya is a land of contrasts". In good human writing, the beginning and end of a piece are the parts with the most dense content; in AI outputs, they're the parts with the least content. I actually think this has improved, since AI labs have put serious effort into avoiding this particular issue. When you ask GPT-4o questions today, it just gets right to it. But many open-source models still talk like this, and it's still something you see in current AI bots.

Third, you can't build a useful model-of-the-author when you're reading AI content. When I read a blog I like - say, [Dan Luu's](https://danluu.com/) - I build up a sense of who he is (or at least how he presents himself in his blog posts). I develop a model of where I believe he has expertise (working in large companies, optimization, performance work) and where I suspect he doesn't (founding startups, frontend). I pay a lot of attention to where I always agree with him and where I don't. When he writes about an area where he has expertise but I tend to disagree with him, I get excited because I'm almost certainly about to learn something. You can't do any of this with AI content, because there's no person there. Responses come from different parts of a massive incomprehensible latent space, with no guarantee of consistency.

I think better models might avoid the first two problems. But I struggle to see how AI content is ever going to avoid the third. I think the most AI-optimistic view here is that it won't matter, because the AI content is going to be just that good that it's worth reading on its own. That's possible!

[^1]: Ben Congdon [attributes the popularity](https://benjamincongdon.me/blog/2025/01/25/AI-Slop-Suspicion-and-Writing-Back/) to Simon Willison, who [attributes](https://simonwillison.net/2024/May/8/slop/?utm_source=chatgpt.com) it to @deepfates and others on Twitter, but I think "slop" as a term for "low-quality gross-feeling content" actually originated outside of the AI sphere entirely. I first heard it used in the current sense a few years ago as a disparaging descriptor of later Marvel movies and TV shows.

[^2]: This isn't to say I don't have any ethical concerns about AI art, just that it doesn't bother me on a visceral level.