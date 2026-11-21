---
title: To code well, avoid blunders
order: 272
description: 
date: '2026-11-21'
tags: ["software design"]
crossPostText:
  x: |-
    The secret to writing good code is to avoid catastrophic mistakes. Many engineers think about programming as if the goal is to have brilliant insights, but they’re wrong. If you don’t blunder you will win.

    Many other domains are like this too.
  linkedin: |-
    The secret to writing good code is to avoid catastrophic mistakes. Many engineers think about programming as if the goal is to have brilliant insights, but they’re wrong. If you don’t blunder you will win.

    Many other domains are like this too. If you can play chess without ever hanging pieces, you will win against almost any opponent. If you are very good at returning tennis balls, you will beat most players even if you never hit a winner.
---

The secret to writing good code[^1] is to avoid catastrophic mistakes. Many engineers think about programming as if the goal is to have brilliant insights, but they're wrong. If you don't blunder you will win.

Many other domains are like this too. If you can play chess without ever hanging pieces, you will win against almost any opponent. If you are very good at [returning](https://en.wikipedia.org/wiki/Pusher_(tennis)) tennis balls, you will beat most players even if you never hit a winner. However, people are bad at internalizing this. They think that being good at chess means finding brilliant tactical combinations, or that being good at tennis means crushing balls into the corner of the court, or that being a good programmer means discovering beautiful new abstractions. Not so! All of those things are valuable, but they are not the main thing. The main thing is to avoid catastrophic mistakes.

The reason programming is like this is because it is impossible to build a durable winning advantage. In basketball, if you are up 99-1, the worst consequence of a blunder is still being up 99-4. But in programming, one blunder can turn an elegant codebase to a janky one. For instance:

- Introducing a parallel system to perform the same task
- Introducing a second source of truth for some key piece of data
- Turning a safe sync operation into a delicate async one
- Adding new subtle points of failure
- Complicating a key interface

The cardinal sins here are [inconsistency](/large-established-codebases/) and [introducing unnecessary requirements](/what-requirements-dont-you-have/)[^2]. Even a little bit of inconsistency is dangerous because it breaks trust: instead of assuming your code works the sensible way, engineers must now go looking for surprises.

Unnecessary requirements are dangerous for two reasons. First, they're sticky. When you're implementing a new requirement, you have the context to decide whether it's necessary or not. If you see one in the codebase, you kind of have to assume it's necessary unless you're willing to spend a bunch of time researching. So requirements tend to remain in codebases long after they could be removed. Second, they often interrelate in dangerous ways: if your codebase supports X, then you must consider how each new feature will interact with X. This combinatorial explosion is what makes working in large codebases so hard[^3].

When you're writing code, you must _at all costs_ try to:

1. Identify where your task could fit most normally into the current codebase, and
2. Trim your task down into [the smallest set of requirements](/what-requirements-dont-you-have/) that you can

In fact, you should be so focused on this that you don't really have mental energy to be worrying about clever tricks or "extra credit" features. Like [shipping projects](/how-to-ship/#shipping-is-hard), if you find yourself thinking things like "oh, I could implement it with this clever pattern", this is a warning sign: you are likely becoming distracted from the main thing, and you risk blundering.

You don't have to be [clever](/good-system-design/) to do great programming work. In fact, sometimes cleverness can be a [disadvantage](/elegance-and-intelligence-are-anticorrelated/). What you need is attention to detail and a laser focus on what actually matters: avoiding blunders by maintaining consistency and skipping unnecessary requirements. 


[^1]: As usual on this blog, I am primarily talking about working on large commercial codebases with big teams: ["impure engineering"](/pure-and-impure-engineering/) in my terminology. This advice may not apply if you're [doing](https://en.wikipedia.org/wiki/Demoscene) [other](https://en.wikipedia.org/wiki/Assembly_language) [kinds](https://www.reddit.com/r/SoloDevelopment/) of [work](https://en.wikipedia.org/wiki/Programming_language_design_and_implementation).

[^2]: Current coding agents are _pretty_ good at consistency - about as good as humans - but are far worse at avoiding unnecessary requirements, unfortunately.

[^3]: I wrote about this in depth in [_Wicked features_](/wicked-features/)