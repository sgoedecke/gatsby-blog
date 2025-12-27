---
title: You can't design software you don't work on
description: --
order: 162
date: '2025-12-27'
tags: ["software design", "tech companies"]
---

Only the engineers who work on a large software system can meaningfully participate in the design process. That's because you cannot do good software design without an intimate understanding of the concrete details of the system. In other words, **generic software design advice is typically useless** for most practical software design problems.

### Generic software design

What is generic software design? It's "designing to the problem": the kind of advice you give when you have a reasonable understanding of the _domain_, but very little knowledge of the existing _codebase_. Unfortunately, this is the only kind of advice you'll read in software books and blog posts[^1]. Engineers love giving generic software design advice for the same reason that all technical professionals love "talking shop". However, you should be very careful about applying generic advice to your concrete day-to-day work problems[^2].

**When you're doing real work, concrete factors dominate generic factors**. Having a clear understanding of what the code looks like right now is far, far more important than having a good grasp on general design patterns or principles. For instance:

- In large codebases, consistency is more important than "good design". I won't argue that point here, but I wrote about it at length in [_Mistakes engineers make in large established codebases_](/large-established-codebases).
- Real codebases are typically full of complex, hard-to-predict consequences. If you want to make your change safely, that typically constrains your implementation choices down to a bare handful of possibilities.
- Large shared codebases never reflect a single design, but are always in some intermediate state between different software designs. How the codebase will hang together after an individual change is thus way more important than what ideal "north star" you're driving towards.

In a world where you could rewrite the entire system at will, generic software design advice would be much more practical. Some projects are like this! But **the majority of software engineering work is done on systems that cannot be safely rewritten**. These systems cannot rely on "software design", but must instead rely on internal consistency and the carefulness of their engineers.

### Concrete software design

What does good software design look like, then?

In my experience, the most useful software design happens in conversations between a small group of engineers who all have deep understanding of the system, because they're the ones working on it every day. These design discussions are often **really boring** to outsiders, because they revolve around arcane concrete details of the system, not around general principles that any technical person can understand and have an opinion on.

The kinds of topic being discussed are not "is DRY better than WET", but instead "could we put this new behavior in subsystem A? No, because it needs information B, which isn't available to that subsystem in context C, and we can't expose that without rewriting subsystem D, but if we split up subsystem E here and here...".

Deep philosophical points about design are rarely important to the discussion. Instead, the most critical contributions point out small misunderstandings of concrete points, like: "oh, you thought B wasn't available in context C, but we recently refactored C so now we could thread in B if we needed to".

### When generic software design is useful

Generic software design advice is not useful for practical software design problems, but that doesn't mean it's totally useless.

**Generic software design advice is useful for building brand-new projects.** As I argued above, when you're designing a new feature in an existing system, concrete factors of the system dominate. But when you're designing a _new system_, there are no concrete factors, so you can be entirely guided by generic advice.

**Generic software design advice is useful for tie-breaking concrete design decisions.** I don't think you should start with a generic design, but if you have a few candidate concrete pathways that all seem acceptable, generic principles can help you decide between them.

This is particularly true at the level of the entire company. In other words, **generic software design advice can help ensure consistency across different codebases**. This is one of the most useful functions of an official "software architect" role: to provide a set of general principles so that individual engineers can all tie-break their concrete decisions in the same direction[^3].

**Generic software design principles can also guide company-wide architectural decisions.** Should we run our services in our own datacenter, or in the cloud? Should we use k8s? AWS or Azure? Once you get broad enough, the concrete details of individual services almost don't matter, because it's going to be a huge amount of work either way. Still, even for these decisions, concrete details matter a lot. There are certain things you just can't do in the cloud (like rely on bespoke hardware setups), or that you can't do in your own datacenter (like deploy your service to the edge in twelve different regions). If the concrete details of your codebase rely on one of those things, you'll be in for a bad time if you ignore them when making company-wide architectural decisions.

### Architects and local minima

Those are all good reasons to do generic software design. One bad reason companies do generic software design is that it just sounds like a really good idea to people who aren't working software engineers. Once you're doing it, the incentives make it hard to stop. Many tech companies fall into this local minimum.

Why not have your highest-paid software engineers spend their time exclusively making the most abstract, highest-impact decisions? You want your structural engineers to be drawing, not laying bricks, after all. I don't know if structural engineering works like this, but I do know that software engineering doesn't. In practice, **software architecture advice often has to be ignored by the people on the ground**. There's simply no way to actually translate it into something they can implement, in the context of the current system as it exists.

However, for a practice that doesn't work, "have your top engineers just do generic design" is surprisingly robust. **Architects don't have any skin in the game**[^4], because their designs are handed off to actual engineering teams to implement. Because those designs can never be implemented perfectly, architects can both claim credit for successes (after all, it was their design) and disclaim failures (if only those fools had followed my design!)

### Summary

When working on large existing codebases, useful software design discussions are way, way more concrete than many people believe. They typically involve talking about individual files or even lines of code. You thus can't do useful software design without being intimately familiar with the codebase (in practice, that almost always means being an active contributor).

Purely generic architecture is not _useless_, but its role should be restricted to (a) setting out paved paths for brand new systems, (b) tie-breaking decisions on existing systems, and (c) helping companies make broad technology choices.

In my opinion, formal "big-picture software architect" roles that spend all their time laying out the initial designs for projects are doomed to failure. They sound like a good idea (and they're a good deal for the architect, who can claim credit without risking blame), but they provide very little value to the engineering teams that are tasked with actually writing the code.

Personally, I believe that **if you come up with the design for a software project, you ought to be responsible for the project's success or failure**. That would rapidly ensure that the people designing software systems are the people who know how to ship software systems. It would also ensure that the _real_ software designers - the ones that have to take into account all the rough edges and warts of the codebase - get credit for the difficult design work they do.


[^1]: I admit I've given my own generic software design advice [here](/good-api-design), [here](/good-system-design), [here](/great-software-design), and probably a dozen other places.

[^2]: When I say "real work problems", I'm talking here about [impure software engineering](/pure-and-impure-engineering): codebases which are intended to solve actual business needs and are thus (a) full of compromises and (b) constantly in a state of change. If you're working on an elegant single-purpose library or the software for space probes, I suspect much of this advice does not apply.

[^3]: Short of truly awful decisions, it almost doesn't matter if those general principles are good or not - as with individual codebases, the benefits of consistency outweigh the benefits of having the "best" possible design.

[^4]: The architects I'm talking about here, I mean. The job title "architect" covers a great many different kinds of job, including just "very senior engineer doing normal engineering work". Many architects don't have an "architect" title at all, and are just senior/staff/distinguished software engineers who have ascended above having to do any actual implementation.