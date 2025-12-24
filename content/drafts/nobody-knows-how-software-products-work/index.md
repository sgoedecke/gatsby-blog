---
title: Nobody knows how large software products work
description: --
order: 144
date: '2025-09-28'
tags: ["good engineers", "tech companies"]
---

Large, rapidly-moving tech companies are constantly operating in the "fog of war" about their own systems. Simple questions like "can users of type Y access feature X?", "what happens when you perform action Z in this situation?", or even "how many different plans do we offer" often can only be answered by a handful of people in the organization. Sometimes there are _zero_ people at the organization who can answer them, and somebody has to be tasked with digging in like a researcher to figure it out.

How can this be? Shouldn't the engineers who built the software know what it does? Aren't these answers documented internally? Better yet, aren't these questions trivially answerable by looking at the public-facing documentation for end users? Tech companies are full of well-paid people who know what they're doing[^1]. Why aren't those people able to get clear on what their own product does?

### Software is hard

**Large software products are prohibitively complicated**. I wrote a lot more about this in [_Wicked Features_](/wicked-features), but the short version is you can capture a _lot_ of value by adding complicated features. The classic examples are features that make the core product available to more users. For instance, the ability to self-host the software, or to trial it for free, or to use it as a large organization with centralized policy controls, or to use it localized in different languages, or to use it in countries with strict laws around how software can operate, or for highly-regulated governments to use the software, and so on. These features are (hopefully) transparent to most users, **but they cannot be transparent to the tech company itself**. 

Why are these features complicated? Because **they affect every single other feature you build**. If you add organizations and policy controls, you must build a policy control for every new feature you add. If you localize your product, you must include translations for every new feature. And so on. Eventually you're in a position where you're trying to figure out whether a self-hosted enterprise customer in the EU is entitled to access a particular feature, and _nobody knows_ - you have to go and read through the code or do some experimenting to figure it out.

Couldn't you just not build these features in the first place? Sure, but it leaves a _lot_ of money on the table[^2]. In fact, maybe the biggest difference between a small tech company and a big one is that the big tech company is set up to capture a lot more value by pursuing all of these fiddly, awkward features.

### Documentation

Why can't you just document the interactions once when you're building each new feature? I don't know. I think this could work in theory, with a lot of effort and top-down support, but in practice it's just really hard.

The core problem is that **the system is rapidly changing as you try to document it**. Even a single person can document a complex static system, given enough time, because they can just slowly work your way through it. But once the system starts changing, the people trying to document it now need to work faster than the rate of change in the system.

Worse, many behaviors of the system don't necessarily have a lot of conscious intent behind them (or any). They just emerge from the way the system is set up, as interactions of a series of "default" choices. So the people working on the documentation are not just writing down choices made by engineers, **they're discovering how the system works for the first time**.

### So who knows the answer?

The only reliable way to answer many of these questions is to look at the codebase. I think that's actually the structural cause of why engineers have institutional power at large tech companies. Of course, engineers are the ones who _write_ software, but it's almost more important that they're the ones who can **answer questions about software**.

In fact, **the ability to answer questions about software is one of the core functions of an engineering team**. The best understanding of a piece of software usually lives in the heads of the engineers who are working with it every day. If a codebase is owned by a healthy engineering team, you often don't need anybody to go and investigate - you can simply ask the team as a whole, and at least one engineer will know the answer off the top of their head, because they're already familiar with that part of the code.

When tech companies reorg teams, they often destroy this tacit knowledge. If there's no team with experience in a piece of software, questions have to be answered by _investigation_: some engineer has to go and find out. Typically this happens by some combination of interacting with the product (maybe in a dev environment where it's easy to set up particular scenarios), reading through the codebase, or even performing "exploratory surgery" to see what happens when you change bits of code or force certain checks to always return true. This is a separate technical skill from writing code (though of course the two skills are related.)

### It's easier to write software than to explain it

In my experience, most engineers can write software, but few can reliably answer questions about it. I don't know why this should be so. Don't you need to answer questions about software in order to write new software? Nevertheless, it's true. My best theory is that **it's a confidence thing**. Many engineers would rather be on the hook for their _code_ (which at least works on their machine) than their _answers_ (which could be completely wrong).

I wrote about this in [_How I provide technical clarity to non-technical leaders_](/clarity). The core difficulty is that **you're always going out on a limb**. You have to be comfortable with the possibility that you're dead wrong, which is a different mindset to writing code (where you can often prove that your work is correct).

### Summary

Non-technical people - at least, ones without a lot of experience working with software products - often believe that software systems are well-understood by the engineers who build them. The idea here is that the system should be understandable because it's built line-by-line from (largely) deterministic components.

However, while this may be true of small pieces of software, **this is almost never true of large software systems**. Large software systems are very poorly understood, even by the people most in a position to understand them. Even really basic questions about what the software does often require _research_ to answer. And once you do have a solid answer, it may not be solid for long - each change to a codebase can introduce nuances and exceptions, so you've often got to go research the same question multiple times.

Because of all this, **the ability to accurately answer questions about large software systems is extremely valuable**.




[^1]: I'm not being sarcastic here, I think this is literally true and if you disagree you're being misled by your own cynicism.

[^2]: I first read this point from [Dan Luu](https://danluu.com/sounds-easy/).