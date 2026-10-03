---
title: Shipping is the foundation
description: 
order: 249
date: '2026-10-03'
tags: ["good engineers", "shipping", "tech companies"]
---

There are lots of skills involved in being a successful engineer at a big tech company. Running effective meetings, writing good design docs, fleshing out tickets and epics, improving team processes, tech leading small groups of engineers, and so on. But all of these rest on the foundation of being able to ship.

In Dota 2, the early game involves "laning": competing with an enemy player to collect resources from a small area. There are many, many strategies and considerations involved in laning. But the simplest possible approach is just to run at your opponent and attack them until they're forced to either run away or die. All the other laning strategies must solve that problem first, because it doesn't matter how well you play if you're forced out of the playing area. If you get that wrong, it doesn't matter how much else you get right.

In Magic: the Gathering and Starcraft, many players adopt an "aggro" strategy of building an attacking force as early as possible before the enemy player has time to construct a defense. That constrains the entire strategy space of the game, because it doesn't matter how clever your plan is if it loses to aggro every time. Even when there are no aggro players in the game, the aggro strategy still shapes how the game unfolds, because the players must still design their decks and play as if they might have to deal with an early attack.

In tech companies, shipping is the equivalent of these aggressive strategies. Almost everything you might do - writing a ticket or a design doc, delegating a task to another engineer, etc - should be compared to the default strategy of just sitting down and making the change yourself. That's why it's critical to be able to ship: so you can just _do_ trivial things without having to pay the coordination cost.

If you're leading a project but you can't ship, you will inevitably experience a series of dysfunctions:

- Taking fifteen minutes to estimate a task that could be done in five minutes
- Suggesting designs that are un-shippable[^1], causing hours or days to be wasted on work that can never be successful
- Being unable to sanity-check how long a piece of work will take, which inevitably leads to grotesquely bloated estimates as everyone tries to be cautious
- Frustrating the hell out of any engineers working with you who can actually ship, which is itself a cause of more dysfunction[^2]
- Blowing out trivial tasks into grand projects

That last point is worth special attention. Senior and staff engineers routinely get asked to do lots of different things. The more successful they are, [the more they get asked to do](/ratchet-effects/). It is _crucial_ that you can deliver easy asks immediately, for a few reasons.

First, the volume of requests your managers ideally want to give you is very high. If you turn every task into a slow project that requires multiple engineers, you will simply not get enough done. Second, resourcing projects can be a slow and painful process. Half the point of managers asking you for things is to do an end-run around that process: it's the [fast, illegible](/seeing-like-a-software-company/) alternative to going through ordinary channels. If you can't knock out the solution quickly on your own, that defeats the purpose entirely.

Does AI mean everyone can ship now? No. Shipping was never just [writing the code](/how-to-ship/)[^3]. It was about figuring out the shortest and most pragmatic path to the finish line (including figuring out what that finish line looks like, which is not trivial), solving all the little problems that crop up along the way, and ensuring that the relevant managers are happy and informed. LLMs can help with that process, but they cannot run it end-to-end. It requires too much context: about the specifics of the technical systems in your company, the people involved and their motivations, and so on.

This post was inspired by Xiaoyu He's [_Aggro is the Foundation_](https://radimentary.wordpress.com/2022/11/07/aggro-is-the-foundation/), which is about mathematical research. I think there are many parallels to be drawn between the best writing about research (e.g. Richard Hamming's classic [_You and Your Research_](https://www.cs.virginia.edu/~robins/YouAndYourResearch.html)) and software engineering, because software engineering is often a [process of research](/nobody-knows-how-software-products-work/). Software engineering research is aimed at a more trivial goal - how some specific program functions, or how it could be changed, instead of the broader questions of science and mathematics - but it's research nonetheless. And if you can't ship, you're unlikely to be very good at it.

[^1]: Usually for some technical reason that familiarity with the codebase would reveal, or because the design conflicts with a [wicked feature](/wicked-features/).

[^2]: A happy, productive team hums along. A frustrated team that doesn't trust the design is a nightmare to work in, as each engineer covertly makes subtle changes to "fix" it.

[^3]: And in my experience even frontier AI models are not good enough to let run wild on your codebase. You still need to [read the code](/human-ai-partnerships-are-for-alignment-not-capability/).