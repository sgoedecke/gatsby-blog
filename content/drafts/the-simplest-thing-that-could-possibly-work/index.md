---
title: Do the simplest thing that could possibly work
description: 
order: 66
date: '2025-04-14'
tags: ["software design", "shipping"]
---

When designing software systems, do the simplest thing that could possibly work.

[System design](/good-system-design) requires competence with a lot of different tools: app servers, proxies, databases, caches, queues, and so on. As they gain familiarity with these tools, junior engineers naturally want to use them. It's fun to construct systems out of many different components! And it feels very satisfying to draw boxes and arrows on a whiteboard - like you're doing real engineering.

However, as with many skills, real mastery often involves learning when to do less, not more. The fight between an ambitious novice and an old master is a well-worn cliche in martial arts movies. The novice is a blur of motion, flipping and spinning and attacking faster than the eye can track. The master is mostly still. But somehow the novice's attacks never seem to quite connect, and the master's eventual attack is decisive.

In software, this means that [great software design looks underwhelming](/great-software-design). It doesn't look like anything much is happening at all. You can tell you're in the presence of great software design because you start having thoughts like "oh, I didn't realise the problem was that easy" or "oh nice, you don't actually have to do anything difficult".

[Unicorn](https://github.com/defunkt/unicorn) is great software design, because it delivers all the most important guarantees in a web server (request isolation, horizontal scaling, crash recovery) with barely any original code[^1]. The industry-standard Rails REST API is great software design, because it gives you exactly what you need for a CRUD app in the most boring way possible. I don't think any of these are impressive _software_. But they're impressive feats of _design_, because **they do the simplest thing that could possibly work**.

You should do that too! Suppose you've got a Golang application that you want to add some kind of rate limiting to. What's the simplest thing that could possibly work? Your first idea might be to add some kind of persistent storage (say, Redis) to track per-user request counts with a leaky-bucket algorithm. That would work! But do you need a whole new piece of infrastructure? What if instead you kept those per-user request counts in-memory? Sure, you'd lose some rate limiting data when the application is restarted, but does that matter? Actually, are you sure your edge proxy[^2] doesn't support rate limiting already? Could you just write a couple of lines in a config file instead of implementing the feature at all?

Maybe your edge proxy doesn't support rate limiting. Maybe you can't track it in-memory because you have too many server instances running in parallel, so the tightest rate limit you could enforce that way is too wide. Maybe it's a dealbreaker if you ever lose rate limiting data, because people are hammering your service _that_ hard. In that case, the simplest thing that could possibly work is adding persistent storage, so you should go and do that. But if you could do one of the easier approaches, wouldn't you want to?

You can build a whole application from scratch this way.

[^1]: It's just Unix sockets and forked processes! I _love_ Unicorn.

[^2]: Every tech company has some kind of edge proxy.