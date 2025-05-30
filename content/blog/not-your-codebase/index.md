---
title: It's not your codebase
description: 
order: 89
date: '2025-05-30'
tags: ["tech companies"]
---

Engineers often feel a lot of ownership over the code they write. That's understandable: it's partially their creation, and it's also their workspace, so they have a direct interest in it being a nice place to work in.

This causes engineers to push back _hard_ against attempts to ship "quick fixes" or to rush features out that would cause some technical debt. To them, it feels like their elegant codebase is being vandalized - as if someone came into their house and started tracking mud everywhere.

However, just because those feelings are understandable doesn't mean they're accurate. **It's not your codebase.** It's owned by the company. You are a professional who's been hired to work on it, and if the company decides that it's in its interests for you to no longer work on it, you won't work on it anymore.

### Why do engineers push back?

I don't think most smart engineers consciously believe that they own the codebase they work on. But many of them act as if they do. For instance, when the company wants to rush something out, many engineers will actively resist this in the interest of protecting the quality of the codebase. Of course, there are sensible reasons why you might do this:

1. The level of quality degradation will be so bad that it will compromise the company's explicit goals
2. You don't believe that the stated priority is a "real" priority (e.g. it's some manager's whim instead of an actual strategy)
3. You are consciously prioritizing your personal experience in the codebase over the company's goals (i.e. you're deliberately doing your job badly, like many people do[^1])

But I've seen many smart, committed engineers push back hard when none of these conditions were met. The only conclusion I can draw is that they think it's their responsibility to protect the codebase against negative outside influence - in other words, they think the codebase is _theirs_, and the company's goals are external influence. In fact, the codebase only exists to further the company's goals. As engineers, _we_ are the external influence.

### Trusting managers to make decisions

Your managers don't have enough context to make object-level decisions about lines of code in the codebase. But unlike you, they should have enough context to make broad tradeoffs between speed and quality. For instance, they'll likely have a better idea of how much financial pressure the company is under, and how important it is that New Feature X get announced at the big yearly conference. It's common for engineers to scoff about this kind of thing - surely long term quality is what matters, not what you can hype up at a conference - but it really does matter[^2].

Here's my best steelman of the classic engineering response to this:

> Sure, companies in theory get to decide how much technical debt to take on. But it's in each individual engineering manager's interest to jack up technical debt and ship features as fast as possible[^3], because they won't be around long enough to deal with the consequences.
>
>Engineers _should_ fight against this, because it's in their interest to not trash their own codebases, and it's in the broader company interest to maintain a healthier codebase long-term (even if individual managers disagree).

This does sometimes happen. But it's a deeply cynical way of looking at your work. I've worked with managers and product managers who were only interested in short-term gain. But I've also worked with managers and product managers who genuinely wanted to do the right thing, and only pushed for short-term gain when there was actually a strong reason.

In my experience, **a lack of trust often becomes a self-fulfilling prophecy**. If an engineer _always_ pushes back hard against accumulating tech debt, their manager stops trusting them to communicate when it's really important, and tries to make their own decisions about where and how to accumulate tech debt. Seeing that they're being sidelined, the engineer thinks "I knew it! This manager doesn't care about quality at all". But really what's happened is a breakdown in communication.

### Treating the codebase like it's not yours

What does it mean to treat a codebase like it's not yours? It doesn't mean silently adding as much technical debt as will fit. You're still obliged to communicate the risks and consequences to your manager, and to push back when you're being asked to do something that's going to be truly catastrophic. However, it does mean letting your manager make the final call on what risks are worth taking.

Likewise, it means letting the company make the final technical decision about what technologies you use. If your company is moving to React, it is your job to move your codebase to React. If your company is a Postgres shop, it is your job to use Postgres where possible. Sometimes companies make bad technical decisions. You can try and convince them not to, but ultimately they get to make decisions about their systems.

It also means optimizing for _other engineers_! If you've built a codebase, and an engineer on your team suggests a refactor, how much better does the refactor have to be than the current situation in order to justify doing it? In fact, even if a refactor would make the codebase a little _worse_, it's still probably worth allowing, because it makes the other engineer a subject matter expert on the part they refactored. Over time, bringing other people into the codebase has long-term benefits that outweigh a small decrease in code quality.

### Final thoughts

Some degree of ownership over the code you write is inevitable and probably healthy. You should care about the things you build! But that doesn't mean you have any _actual_ ownership. The codebase you spend time on at work is the company's codebase, and they can do whatever they want with it. You should communicate the risks and consequences of decisions, but ultimately it's not your call. 


[^1]: This is analogous to a janitor finding a quiet corner to nap in instead of cleaning - totally understandable, but it does make them worse _at being a janitor_.

[^2]: Companies don't spend tens of millions of dollars on conferences for no reason. They do it because they get a financial reward greater than the cost. (And even if they're wrong about that, it's _their decision to make_.)

[^3]: The classic text on this is "Moral Mazes" by Robert Jackall, which has greatly informed how I think about organizations. One day I'll write a proper book report on it.