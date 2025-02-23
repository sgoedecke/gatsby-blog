---
title: Paths through the space of all possible solutions
description: --
order: 25
date: '2025-01-24'
---

Some things you can't do because they're impossible. For instance, if you're designing a distributed system, you can't violate the CAP theorem. Some things you can't do for organizational reasons: for instance, if your company is a Java and C# shop, you can't build a new service in Ruby on Rails. Some things you can't do for personal reasons: if the tech lead on your team is all-in on microservices, you can't design a new feature that bolts a large subsystem into your local monolith. Some reasons are financial: if your system operates at scale, you can't make a ten-cents LLM call in the hot path.

All these restrictions constrain the space of possible solutions. Awareness of these restrictions is a huge part of becoming a more effective engineer. I've seen many technically strong engineers who were unable to get things done because they weren't aware of these constraints, and so spent weeks or months prototyping solutions that were doomed from the beginning.

Implementing a feature means **tracing a path through the space of all possible solutions**. The key point here is that you must remain inside that space at all times. It's often said that complex systems which work always evolve from a simple system which works. In the same way, a possible system that fits all the requirements always evolves from a possible system that fits all of the requirements[^1]. That's why it's so important to be aware of your company's constraints: you can't iterate your way inside them, you have to start there.

This is one reason why engineers get more effective the longer they spend at a company: they get a better sense of which constraints apply and which don't, which translates directly to the ability to ship.

Sometimes engineers are too aware of these constraints. This is what happens when an obvious problem goes unsolved for years, with each engineer who discovers it dismissing the obvious solution as "would be nice, but it can't happen here". In cases like these, you need someone (usually a new hire) to run head-on into the constraint to test its strength. It's possible that it no longer applies. Constraints fade over time as the situation changes. The most obvious way is when a particular tech lead or influential engineer leaves the company - their particular tastes and bugbears rapidly fade away, making change possible.

Sometimes engineers aren't aware enough of these constraints. This happens when engineers don't ship very often, so they don't have enough contact with the practical reality of getting features into users' hands.


[^1]: This is trivially true: you can't ship an impossible system, so you can't ship a prototype or internal-only version or scaffolding for an impossible design.