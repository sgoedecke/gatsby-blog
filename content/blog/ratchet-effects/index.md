---
title: Ratchet effects determine engineer reputation at large companies
description: Why you can't skip to the top (but you can skip to the bottom)
order: 24
date: '2025-01-05'
tags: ["tech companies"]
---

How do engineers become higher-status or lower-status at large tech companies? In other words, what determines who gets promoted and who doesn't, or who gets assigned the exciting difficult work and who gets put on keep-the-lights-on maintenance duty?

### Building a reputation

The naive answer is that strong engineers are recognized and rewarded for their [talent](/what-makes-strong-engineers-strong). There's a grain of truth in this (talent does matter), but it's broadly false. Many technically strong engineers go unrecognized and many technically weak engineers succeed. The slightly-less naive answer is that engineers who can deliver value to shareholders (e.g. by [shipping projects](/how-to-ship)) are placed in positions where they can do that. This is closer to the truth, but it doesn't explain the mechanism. Nobody at a large tech company is sitting in a high tower assessing how much value you personally can deliver. They're all busy with their own jobs. How, then, do effective engineers get recognized?

The answer is a natural ratchet effect. When an engineer joins a company, they are low status. Not the lowest - I'll get to that later - but certainly unproven and untrusted. That means they can only take on low status work: regular JIRA tickets, bugfixes, and ordinary line-of-work features. This work is low status not because it's unimportant but because it's only visible to the immediate team. If they knock it out of the park, they'll gain status with their immediate team only.

Once your immediate team trusts them to do good work, they'll get assigned slightly higher-status work: for instance, delivering new projects with an external deadline or that require cross-team coordination. This kind of work is visible to neighboring teams and skip-level managers. If they do that work well, they'll gain broader status in the org.

This process repeats all the way up the org chart. If you keep delivering high-profile successes, you'll be assigned higher-profile projects with more senior executive stakeholders, up to the point where the CEO is hand-picking you for their latest brainwave. It takes time, because you can't deliver any meaningful project in less than a month, and the opportunity to do high-profile projects only comes around every six months or so. But it's reliable, because it operates like a ratchet.

### The ratchet effect

Why is it like a ratchet? Because reputation is quick to form but very slow to change. If an executive decides you're good, it takes a lot to make them change their mind. This is partially because executives are so busy that they only really have time for a snap judgement. It's also because [weak engineers](/weak-engineers) typically don't ship any projects at all, so if you ship anything you're likely to be strong (even if you also have some failures to your name).

It works just as well the other way around. If you join a company and make a complete mess if your first few "easy" ships, you'll be tagged as weak by your immediate team. That'll make it hard to get assigned higher-profile projects, which will make it hard to gain any more status in the org. If you continue to fail, your status will ratchet down, to the point that you'll only be assigned a project if it's completely acceptable that that project fail[^1]. Being assigned one of those projects is almost worse than being assigned nothing, because it's a signal to the rest of the org that you're not useful enough to be given any serious work.

Once in this spiral, can you get out? Sure. If you start to do good work, you'll slowly regain reputation in your immediate org. Teams are usually too busy to hold grudges - if you're beginning to look useful, they'll use you. It takes much longer for skip-level managers and other executives to change their mind about you, but it does happen (typically after a couple of higher-profile successes).

### Why you can't skip the ratchet

Some people try to skip the ratchet and jump straight to a higher-profile piece of work to prove themselves. I have never seen this work. I can maybe believe this is possible for a new hire (though unbelievably risky)[^2]. But I don't think this is possible at all for someone who's already developed a bad reputation. Companies have excellent defense mechanisms against low-reputation engineers trying to claim important projects.

First, which engineer will lead which project is often decided weeks ahead of time, before engineers on the team even hear about the project.

Second, executives won't talk about it publically, but they have a very clear picture of which engineers they think are weak and which are strong. They will resist what they see as an unacceptable risk by putting a weak engineer in charge of a key project. As an IC, you simply don't have the tools to push back against that: the decisions are made in meetings that you don't get to attend.

Finally, even if you do somehow finagle your way into a key project (the way I've seen this happen is that a previously low-status piece of work suddenly becomes high-status due to external factors), executives will quietly assign a trusted high-status engineer to shadow-lead the project. Publically, it'll be "to give you extra support"; privately, it'll be because they can't trust you. This is a _terrible_ position for you to be in. If you succeed, the credit will fall on the shadow-lead. If you fail, you'll still shoulder the blame. It's also hard to nominally lead a project with another engineer who's actually got the power to call the shots. In this position, I think your best bet is to humbly work with that engineer, try your best to be useful, and hope they make a good report of you to their executives.

### Summary

- When you join a new company, focus on shipping small pieces of work in order to build reputation
- Build on your successes in order to transition to higher-profile, more visible work
- Your first high-visibility project is critical to forming reputation with more senior management
- If you've had some failures, build back up slowly with small successes - you won't be able to prove yourself with a big-bang project
- Reputation is hard to change. If you're really in a hole, you might be better off switching companies for a clean slate

**Update:** this post was discussed [on Hacker News](https://news.ycombinator.com/item?id=42610021), if you'd like to read comments.

[^1]: Often these projects need the perception of active work but have no real deliverables. For instance, many teams will have something like a "compliance champion" role so they can pay lip service to the idea that they're taking X or Y compliance requirement seriously - they have a whole person assigned to it! - without ever having to spend the time of useful engineers.

[^2]: It's risky because if you fail (as you well might, having no context in the org), you'll immediately mark yourself as a weak engineer. If you're strong, why not just spend six months building an immediate reputation and making sure you know how shipping works in the org? It's just so hard to know (a) what needs doing, or (b) how to do it when you're new.