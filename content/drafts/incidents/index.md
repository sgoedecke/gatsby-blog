---
title: Everything I know about incidents
description: 
order: 132
date: '2025-08-24'
tags: ["good engineers", "software design"]
---

**Incidents are boring.** Most of what you actually do during an incident is wait: wait for some other team to investigate, or wait for a deploy to finish, or wait for the result of some change to become apparent, or wait for someone else who's been paged to come online. It's stressful, but there's often just not that much to do.

**Most incidents resolve on their own.** People love to share war stories about incidents where some hero engineer improvised a clever fix that instantly repaired the system. That rarely happens. Well-designed software systems tend to come good by themselves, and many modern systems are at least partly well-designed, by virtue of being built out of really solid pieces. If a server process is crashing or leaking memory, Kubernetes will kill the pod and bring it back up. If a service is overloaded and jammed up, clients will (hopefully) trigger circuit breakers and back off until it can recover. Temporary spikes in expensive operations will often just fill up a queue instead of taking the entire system down. Most incident calls I've been on - well over half - would have come good by themselves in roughly the same time without any human intervention.

**Most incident-resolving actions make incidents worse.** Engineers jump too quickly to resolve incidents. Oh, the queue size is huge? Don't worry, I'm here in a production console to clear the queue! Unfortunately, some of the jobs I just nuked were doing important billing work and aren't automatically re-queued, so this queue-latency incident just became a billing incident as well. Another classic in this genre is "engineer forces a series of redeploys to fix a concerning-looking metric, causing far more stress on the system than the original metric itself".

**Long-term incident _remediation_ is more technically interesting than the incident itself.** Most incidents are caused by a part of the system that is poorly-designed. Thinking of ways to redesign the system is often a fascinating technical problem. But you almost never get to do that _during the incident_.

**Incidents have no "root cause".** In one sense, this is just a trivial point about causation: every candidate "root cause" [has causes of its own](https://plato.stanford.edu/entries/infinite-regress/), so nothing is "truly" at the bottom. But it's a useful mindset to have about incidents, because it teaches you to keep looking for causes. "Someone deployed a bad change" is correct, but it invites the question of why the change wasn't caught by automation, etc.

**People can still be to blame for incidents**. Okay, maybe I deployed a broken change because my team was putting pressure on me to ship fast, so I cut testing corners, and unit tests didn't catch it because we have a coverage gap, and really it's my trauma over being a formerly-gifted child that's causing me to work faster than I should be working. _It's still my fault I deployed the change._ In philosophical terms, this is called ["compatibilism"](https://plato.stanford.edu/entries/compatibilism/): even though my actions are caused by external sources, I'm still responsible for them.
