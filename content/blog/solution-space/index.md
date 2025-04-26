---
title: Paths through the space of all possible solutions
description: Some designs are possible and some aren't
order: 49
date: '2025-02-26'
tags: ["software design"]
---

Some things you can't do because they're impossible. For instance, if you're designing a distributed system, you can't violate the CAP theorem. Some things you can't do for organizational reasons: for instance, if your company is a Java and C# shop, you can't build a new service in Ruby on Rails. Some things you can't do for personal reasons: if the tech lead on your team is all-in on microservices, you can't design a new feature that bolts a large subsystem into your local monolith. Some reasons are financial: if your system operates at scale, you can't make a ten-cents LLM call in the hot path.

All these restrictions constrain the space of possible solutions. Awareness of these restrictions is a huge part of becoming a more effective engineer. I've seen many technically strong engineers who were unable to get things done because they weren't aware of these constraints, and so spent weeks or months prototyping solutions that were doomed from the beginning.

Implementing a feature means **tracing a path into the space of all possible solutions**. The key point here is that you must remain inside that space. It's often said that complex systems which work always evolve from a simple system which works. In the same way, a possible system that fits all the requirements always evolves from a possible system that fits all of the requirements[^1]. That's why it's so important to be aware of your company's constraints: you can't iterate your way inside them, you have to start there. (Of course, your initial design can start outside the constraints as you figure out how to get inside them, but the first thing you _ship_ has to be inside the constraints.)

This is one reason why engineers get more effective the longer they spend at a company: they get a better sense of which constraints apply and which don't, which translates directly to the ability to ship.

Sometimes engineers are too aware of these constraints. This is what happens when an obvious problem goes unsolved for years, with each engineer who discovers it dismissing the obvious solution as "would be nice, but it can't happen here". In cases like these, you need someone (usually a new hire) to run head-on into the constraint to test its strength. It's possible that it no longer applies. Constraints fade over time as the situation changes. The most obvious way is when a particular tech lead or influential engineer leaves the company - their particular tastes and bugbears rapidly fade away, making change possible.

Sometimes engineers aren't aware enough of these constraints. This happens when engineers don't ship very often, so they don't have enough contact with the practical reality of getting features into users' hands. This is a common cause of terminally-delayed projects, which spin forever as the engineer jumps from one impossible design to the next (or blocks their project behind a doomed company-wide evangelism attempt for their preferred cool technology).

Some engineers seem like they're moving through the world like magic. Everything they touch looks easy, they never get blocked by anything, and they end up shipping a lot without much heartache. These are almost always engineers who are deeply familiar with the space of possible solutions at the company they work at, and who are good at immediately coming up with designs and plans that fit inside that space. 

[^1]: This is trivially true: you can't ship an impossible system, so you can't ship a prototype or internal-only version or scaffolding for an impossible design.