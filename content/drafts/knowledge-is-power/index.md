---
title: In tech companies, knowledge is power
description: --
order: 144
date: '2025-09-28'
tags: ["good engineers", "tech companies"]
---

Large, rapidly-moving tech companies are constantly operating in the "fog of war" about their own systems. Simple questions like "can users of type Y access feature X?", "what happens when you perform action Z in this situation?", or even "how many different plans do we offer" often can only be answered by a handful of people in the organization. Sometimes there are _zero_ people at the organization who can answer them, and somebody has to be tasked with digging in like a researcher to figure it out.

How can this be? Aren't these answers documented internally? Better yet, aren't these questions trivially answerable by looking at the public-facing documentation for end users? Tech companies are full of well-paid people who know what they're doing[^1]. Why aren't those people able to get clear on what their own product does?

### Why nobody knows anything

The first reason is that **large software products are prohibitively complicated**. I wrote a lot more about this in [_Wicked Features_](/wicked-features), but the short version is you can capture a _lot_ of value by adding complicated features. I'm not necessarily talking about features that make the product more complicated, but features that make the core product available to more users. For instance, the ability to self-host the software, or to trial it for free, or to use it as a large organization with centralized policy controls, or to use it localized in different languages, or to use it in countries with strict laws around how software can operate, or for highly-regulated governments to use the software, and so on. These features are (hopefully) transparent to most users, **but they cannot be transparent to the tech company itself**. 

Why are these features complicated? Because **they affect every single other feature you build**. If you add organizations and policy controls, you must build a policy control for every new feature you add. If you localize your product, you must include translations for every new feature. And so on. Eventually you're in a position where you're trying to figure out whether a self-hosted enterprise customer in the EU is entitled to access a particular feature, and _nobody knows_ - you have to go and read through the code or do some experimenting to figure it out.

Couldn't you just not build these features in the first place? Sure, but it leaves a _lot_ of money on the table[^2]. In fact, maybe the biggest difference between a small tech company and a big one is that the big tech company is set up to capture a lot more value by pursuing all of these fiddly, awkward features.

Why can't you just document the interactions once when you're building each new feature? I don't know. I think this could work in theory, with a lot of effort and top-down support, but in practice it's just really hard: there's so many cases to document and they're changing all the time. Worse, many interactions don't necessarily have a lot of conscious intent behind them. They're just the "default case".

### So who knows the answer?

The only reliable way to answer many of these questions is to look at the code. I think that's actually the structural cause of why engineers have institutional power at large tech companies. Of course, engineers are the ones who _write_ software, but it's almost more important that they're the ones who can **answer questions about software**.

In my experience, most engineers can write software, but few can reliably answer questions about it. I don't know why this should be so. Don't you need to answer questions about software in order to write new software? Nevertheless, it's true. My best theory for why is that engineers would rather be on the hook for their _code_ (which at least works on their machine) than their _answers_ (which could be completely wrong).

Answering questions about software is more difficult than it sounds. I wrote about this in [_How I provide technical clarity to non-technical leaders_](/clarity). The core difficulty is that **you're always going out on a limb**. You have to be comfortable with the possibility that you're dead wrong.




[^1]: I'm not being sarcastic here, I think this is literally true and if you disagree you're being misled by your own cynicism.

[^2]: I first read this point from [Dan Luu](https://danluu.com/sounds-easy/).

But much, much simpler questions are also research 