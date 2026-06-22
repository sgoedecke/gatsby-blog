---
title: Notes on incidents
description: 
order: 190
date: '2026-05-08'
tags: ["reliability"]
---

**Incidents are boring.** Most of what you actually do during an incident is wait: for some other team to investigate, or for a deploy to finish, or for the result of some change to become apparent, or for someone else who's been paged to come online. It's stressful, but there's often just not that much to do.

**Most incidents resolve on their own.** People love to share war stories about incidents where some hero engineer improvised a clever fix that instantly repaired the system. That rarely happens. Well-designed software systems tend to come good by themselves, and many modern systems are at least partly well-designed, by virtue of being built out of really solid pieces. If a server process is crashing or leaking memory, Kubernetes will kill the pod and bring it back up. If a service is overloaded and jammed up, clients will (hopefully) trigger circuit breakers and back off until it can recover. Temporary spikes in expensive operations will often just fill up a queue instead of taking the entire system down. Most incident calls I've been on - well over half - would have come good by themselves in roughly the same time without any human intervention.

**Most incident-resolving actions make incidents worse.** Engineers jump too quickly to resolve incidents. Oh, the queue size is huge? Don't worry, I'm here in a production console to clear the queue! Unfortunately, some of the jobs I just nuked were doing important billing work and aren't automatically re-queued, so this queue-latency incident just became a billing incident as well. Another classic in this genre is "engineer forces a series of redeploys to "fix" a concerning-looking metric, and the concurrent deploys cause far more stress on the system than whatever was causing the metric to look weird".

For that reason, **the first thing you should do in an incident is _nothing_**. When I was paged late at night, I used to have a habit of pouring myself a glass of scotch before I joined the call. This was only partly for the tranquilizing effects of alcohol: the main reason was to have a ritual I could go through to convince myself that I wasn't rushing, and that it was OK to take a few breaths and relax before jumping into the problem[^1]. Making a cup of tea or going for a walk around the house would probably have served as well.

**Effective incident-resolving actions are often dull.** Typically the action needed to resolve the incident - assuming it doesn't resolve on its own - is to temporarily disable some problematic feature until the system recovers. This is never a complex code change. Typically someone spends five minutes putting together the patch, and then an hour waiting for reviews, CI, and deploying. If you're very lucky, you'll get to write a "wrap a cache around it" code change.

**In an incident, there is no substitute for knowledge of the system.** Five strong engineers can troubleshoot on an incident call and get nowhere, while one half-drunk engineer who's familiar with the codebase can swan in and immediately fix the problem. This is because the kinds of actions that resolve incidents are so simple: if you've been the one working on the project, you likely already know exactly what feature flag to check and disable, or what code change to revert.

**Resolving incidents requires courage.** Incident calls can be scary. When engineers are scared, they often reach for consensus: hedging their statements, asking the group if they agree a particular course of action is safe, deferring to each other, and so on. But if you're the one with knowledge of the system, you have to be decisive. Say "I'm going to do X", wait thirty seconds, then do it. While it's usually net-negative to have a powerful manager fidgeting on the incident call, this is one of the rare cases where it can be helpful - executives are very comfortable saying "okay, do it now" about technical courses of action they don't fully understand.

**Resolving incidents buys a lot of political credit.** One thing that I think surprises a lot of engineers who are new to on-call is how _grateful_ managers and executives are for even really simple fixes (i.e. "turn off the feature flag"). This is because incidents are one of the few times that non-technical leadership are directly confronted with their lack of control over the technical sphere. When the team is building a product, your VP has a lot of freedom to guide the process and make decisions. But when there's an active incident, they have to just sit there and trust that their technical employees are going to pull them out of the fire. It's a scary situation, particularly for someone who's used to exercising a degree of power in the workplace.

However, **_always_ resolving incidents is (by itself) not a durable position of power.** This is a little counter-intuitive. Surely if you're always resolving incidents, you're indispensable? The problem is that incident-resolving work is almost always so technical as to be completely opaque to executives. They know the incident has resolved, but they don't know if you did a heroic effort or merely did the obvious thing. They also can't point to your successes as theirs (which is always the most reliable way to get VPs and directors on your side), because incidents _are expected to be fixed_, and it's always better _not to have had the incident at all_.

edit: I got an interesting reader email saying that in their experience incidents usually don't go away on their own. It turns out they've typically worked at smaller companies than me. I suspect this is a system-size thing: big tech companies have more sprawling systems with more third-party dependencies, so it's more common for something to go wrong and self-recover.


[^1]: I don't need to do this anymore because I just don't get as keyed up about incidents as I used to.
