---
title: Everything I know about incidents
description: 
order: 132
date: '2025-08-24'
tags: ["good engineers", "software design"]
---

**Incidents are boring.** Most of what you actually do during an incident is wait: wait for some other team to investigate, or wait for a deploy to finish, or wait for the result of some change to become apparent, or wait for someone else who's been paged to come online. It's stressful, but there's often just not that much to do.

**Most incidents resolve on their own.** People love to share war stories about incidents where some hero engineer improvised a clever fix that instantly repaired the system. That rarely happens. Well-designed software systems tend to come good by themselves, and many modern systems are at least partly well-designed, by virtue of being built out of really solid pieces. If a server process is crashing or leaking memory, Kubernetes will kill the pod and bring it back up. If a service is overloaded and jammed up, clients will (hopefully) trigger circuit breakers and back off until it can recover. Temporary spikes in expensive operations will often just fill up a queue instead of taking the entire system down. Most incident calls I've been on - well over half - would have come good by themselves in roughly the same time without any human intervention.

**Most incident-resolving actions make incidents worse.** Engineers jump too quickly to resolve incidents. Oh, the queue size is huge? Don't worry, I'm here in a production console to clear the queue! Unfortunately, some of the jobs I just nuked were doing important billing work and aren't automatically re-queued, so this queue-latency incident just became a billing incident as well. Another classic in this genre is "engineer forces a series of redeploys to "fix" a concerning-looking metric, and the concurrent deploys cause far more stress on the system than whatever was causing the metric to look weird".

**Effective incident-resolving actions are often dull.** Typically the action needed to resolve the incident - assuming it doesn't resolve on its own - is to temporarily disable some problematic feature until the system recovers. This is never a complex code change. Typically someone spends five minutes putting together the patch, and then an hour waiting for reviews, CI, and deploying. If you're very lucky, you'll get to write a "wrap a cache around it" code change.

**Nobo