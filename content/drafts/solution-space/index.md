---
title: The space of all possible solutions
description: --
order: 25
date: '2025-01-24'
---

Some things you can't do because they're impossible. For instance, if you're designing a distributed system, you can't violate the CAP theorem. Some things you can't do for organizational reasons: for instance, if your company is a Java and C# shop, you can't build a new service in Ruby on Rails. Some things you can't do for personal reasons: if the tech lead on your team is all-in on microservices, you can't design a new feature that bolts a large subsystem into your local monolith.

All these restrictions (and many more) constrain the space of possible solutions. As someone paid to identify and execute on possible solutions, awareness of these restrictions is a huge part of becoming a more effective engineer. I've seen many technically strong engineers who were unable to get things done because they weren't aware of these constraints, and so spent weeks or months prototyping solutions that were doomed from the beginning.

Sometimes engineers are too aware of these constraints. This is what happens when an obvious problem goes unsolved for years, with each engineer who discovers it dismissing the obvious solution as "would be nice, but it can't happen here". In cases like these, you need someone (usually a new hire) to run head-on into the constraint to test its strength. It's possible that it no longer applies. Constraints fade over time as the situation changes. The most obvious way is when a particular tech lead or influential engineer leaves the company - their particular tastes and bugbears rapidly fade away, making change possible.



When you sit down to tackle a problem, there is a large space of possible solutions. As you work on the problem and learn more about it, you'll naturally rule out options, shrinking that space. Especially at large tech companies, that space of solutions can be bounded in advance.


when you're tackling a problem before you know what to do, you need a sense of what kind of thing might be possible. at a big tech co, this space is relatively narrow in some areas and wide in others. v important to have a sense of what will work and what won't work. for instance, bc you're operating at scale, you might know immediately you can't put a LLM call in the hot path. That constrains the space. You might know there's no appetite for introducing heavy extra libraries into the frontend. That constrains the space. etc.
It's sad to see good engineers waste time by iterating on solutions that aren't in the space 