---
title: Learning incident response with problem sets
description: One idea for testing incident troubleshooting
order: 3
date: '2021-09-03'
tags: ["reliability"]
---

It's hard to teach good incident response. A good understanding of how the system runs in production is essential, but how do you build that understanding? What's worked for me is looking at the system's behaviour - dashboards, logs and metrics - during various incidents, and making sure I understand the pathological activity I'm seeing. Below I'm going to sketch some made-up incidents and ask what could be going wrong. I think this kind of thing could be a useful exercise, particularly adapted for a specific team or system. 

Suppose you own a standard productionized Rails app. It runs in a collection of VMs (or containers) that sit behind a load balancer node running Nginx or Apache. In each VM, the app is served by a Unicorn server: a fixed set of worker processes, listening on a common port. This should be a pretty familiar architecture to anyone who's worked on a Rails app from the early 2010s.

## Periodic error spikes

You're paged to investigate periodic bursts of errors where your service becomes completely unusable for a minute. Looking at your graph of 5xx responses, you can see periodic spikes of errors:

![error-spikes](error-spikes.svg)

You also happen to notice an unusual-looking pattern in your graph of memory usage:

![memory-spikes](discontinuous-spikes.svg)

What theory might you form from those graphs? Click 'Details' to see where I'd start looking.
<details>It looks like the service has a memory leak. As the memory usage grows, the app behaves normally, until it grows too large and triggers a restart (by systemd, k8s, or whatever orchestrator is managing the service instances). The error bursts happen when a service instance is restarted, likely because traffic is still being sent to the dead instance, or because in-flight traffic is being dropped.</details>

What action would you take to confirm that theory?
<details>I'd first check the orchestrator logs to confirm the memory leak, then manually trigger an instance restart to confirm that those produce a spike of errors.</details>

And what would a sensible remediation be, if confirmed?

<details>Ensure the orchestrator waits for in-flight requests to clear and for the service discovery TTL to time out before removing a dead instance. Meanwhile, investigate why the app is leaking memory.</details>

## Latency down, CPU up

You're paged by a CPU alert. Your service is suddenly using much more processing power than usual:

![cpu-up](cpu-up.svg)

Weirdly, request latency is down - way down:

![latency-down](latency-down.svg)

What theory might you form from those graphs?

<details>Your service might be responding with an error to every request, before doing any processing at all. I've seen this happen with heavily rate-limited traffic, as every request comes back 429 immediately, or with a problem early on in the Rails middleware stack that's 500-ing before reaching any business logic. Latency is down because the problem occurs before the request has time to really do anything, and CPU is up because (a) Rails is spending all its time building exceptions and stack traces, and (b) the service is performing much less IO-bound work.</details>

What action would you take to confirm that theory?

<details>Check the status codes your app is returning (either from logs/metrics or just making a request yourself). It should be a 500 or a 429.</details>

And what would a sensible remediation be, if confirmed?

<details>If there's a bug, fix the bug. If there's a spike of traffic, consider blocking the flood of requests before it reaches your comparatively-slow Rails service: either at your load balancer, by adding a config line to block requests from a particular IP, or as a page rule in your CDN if you're using one.</details>

## Latency up, CPU down

You're paged when your app becomes completely unresponsive. Requests are timing out. However, you're not seeing any exceptions being thrown in your logs, and memory usage and CPU usage aren't being overwhelmed. In fact, CPU usage looks much _lower_ than usual:

![latency-down](latency-down.svg)

Latency is up at around the same time:

![cpu-up](cpu-up.svg)

What theory might you form from those graphs?

<details>
Your service is likely stalling out on IO: some common API call is likely timing out instead of responding in a handful of ms. Your pool of Unicorn workers is clogged with these requests, and can't do anything until they resolve. (This failure mode is somewhat specific to Unicorn's forked-process model. A threaded server like Puma or an event loop based server like Thin would handle this situation better.)
</details>

What action would you take to confirm that theory?

<details>If you have per-request traces, check those to see how much time's being spent making API calls. If that percentage has recently gone from ~20% to ~99%, the theory is confirmed. Alternatively, check your logs for similar information, or make the request yourself if you're familiar enough with the service.</details>

And what would a sensible remediation be, if confirmed?

<details>Lower the timeout for that API call and add a circuit breaker, so a few timeouts in a row causes the requests to fail-fast for a little while. That should give some space for the failure-handling logic that your service hopefully has.</details>

These exercises have all been fairly generic, and as such can't dig into any really juicy problems that require more context. I think this kind of thing could be much more useful for a specific system, with examples drawn from actual incidents.
