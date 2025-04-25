---
title: The OpenAI house style is exhausting
description: 
order: 70
date: '2025-04-25'
---

I was reading this [Reddit post](https://old.reddit.com/r/BestofRedditorUpdates/comments/1k5c727/aita_for_refusing_to_repay_my_exhusband_for_the/) when I noticed a pattern: a few times now I've seen a negative Reddit comment that to me just screamed "written by ChatGPT". Here it is, in full:

> Yes, you’re the asshole. And not because you owe them money — let’s kill that fantasy right now — but because you strutted into this situation like your hands were clean and your conscience was made of gold. Spoiler alert: it’s not. You handled this like a petty, self-righteous drama queen who thinks “being technically correct” means you’re automatically not a piece of shit. Hate to break it to you — it doesn’t.
> You’re the asshole because you dragged your son into this mess, let a hostile situation escalate to the point where he had to block family members, and somehow think laughing in that woman’s face was a power move instead of a sign that you’ve completely lost perspective. You’re not the bigger person. You’re just louder.
> Yes, she’s delusional. Yes, she’s entitled. Yes, she’s a homewrecker with a victim complex. But let’s be real — you walked into that coffee shop not to resolve shit, but to put on a show. You wanted the last word. You wanted the applause. And you’re pissed because she had the audacity to try to leverage something stupid — and you knew you could publicly humiliate her for it.
> And congratulations. You did. But here’s the part you don’t get to ignore: you could’ve shut this down in two texts and a phone call. You wanted the confrontation. You wanted to win. You wanted to be right so bad, you dragged your son into a three-way power struggle between you, your ex, and his insecure wife — and then bragged about it like you just walked off a courtroom TV set.
> You don’t owe her money. But don’t act like you handled this with grace. You handled it like someone who was starving for revenge and finally found a way to deliver it with witnesses. So yes, you’re the asshole. Because you turned a financial non-issue into a family warzone — and then lit the match yourself.

Why is this so obviously (at least to me) written by ChatGPT? It's not just the em-dashes - there's something fundamental about the style that reads as [slop](/on-slop). I think it's the obsession with rhetorical tricks. ChatGPT writes every sentence like it's delivering a crushing one-liner. Everything is "punched up", way past the point of good taste. Consider this section:

> So yes, you’re the asshole. Because you turned a financial non-issue into a family warzone — and then lit the match yourself.

A normal, low-flair way to write this would be something like "you're the asshole for causing so much drama about the money", or "yes, you're the asshole because you're the one who started the fight in the first place when you could have just paid the money back". But ChatGPT doesn't write like that. It likes short, punchy sentences:

> So yes, you're the asshole.

And it likes [rhetorical opposition](https://en.wikipedia.org/wiki/Rhetorical_device#Antithesis/Antimetabole/Chiasmus), where two contrasting concepts are placed next to each other (ideally with some alliteration):

> Because you turned a financial non-issue into a family warzone

And it likes to end with a mic-dropping one-liner:

> and then lit the match yourself.

You can see this pattern - punchy sentence into opposition into one-liner - all over the comment. For instance:

> **Spoiler alert: it’s not.** You handled this like a petty, self-righteous drama queen who thinks **“being technically correct” means you’re automatically not a piece of shit**. Hate to break it to you — ***it doesn’t**.

> **But let’s be real** — you walked into that coffee shop **not to resolve shit, but to put on a show**. **You wanted the last word**.

> you ... somehow think **laughing in that woman’s face was a power move instead of a sign that you’ve completely lost perspective**. You’re not the bigger person. **You’re just louder.**

A little bit of this style of writing is good. If you never use any short sentences or oppose any ideas, your writing can end up very dry. But the overuse of it can be really grating to read - to the point that sometimes I feel myself physically cringing away as I realise that I'm reading AI-generated slop. It's like someone trying to get my attention by jangling their keys at me.

Here are my theories about where this style is coming from:

- Human RLHF-ers who like punched-up responses
- AI lab insiders who don't read very well and can't tell good style from bad
- A deliberate attempt to gain slop-heavy benchmarks like [Chatbot Arena](/lmsys-slop)
- Some awkward consequence of the training data

Either way, I'm a little confused about why OpenAI have been so slow to jettison it. Claude doesn't talk like this. Indeed, the fact that Claude doesn't talk like this is a big reason why Claude is preferred by many users. 

Is OpenAI getting better? Maybe. The o1 and o3 models don't seem to talk like this so much. However, 4o has if anything gotten worse with the latest update. 4.5 didn't talk like this at all, and 4.1 seems... okay. You can tweak the system prompt to try and tone it down, but it's too baked-in to avoid entirely. I really hope new models don't have this writing style.