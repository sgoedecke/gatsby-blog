---
title: Engineers should state the obvious
description: --
order: 57
date: '2025-03-20'
tags: ["good engineers"]
---

One surprising thing I've learned from writing this blog is that I should worry a lot less about saying things that seem obvious. A lot of my posts that have resonated the most with readers are points that I almost didn't make because I felt like everyone already knew them:

* [Shipping projects is hard and you should give it your full attention](/how-to-ship)
* [Good engineers tend to get things right](/being-right-a-lot)
* [You should do your main job instead of doing mainly glue work](/glue-work-considered-harmful)
* [Strong engineers are strong because they're confident](/what-makes-strong-engineers-strong)
* [Tech work got a lot less easy after the 2010s](/good-times-are-over)

Looking back, I knew that it was important to say the obvious thing as part of my work as a software engineer (especially at the senior or staff level). But I wasn't able to articulate that point until now. Why should you say the obvious?

The main reason is that **obvious things are the most important**. If you get the obvious things right, it's OK to get some of the more tricky things wrong. Being good at shipping covers a multitude of sins in tech companies. On the other hand, misunderstanding obvious things usually kills your project (or your career). So even if you're almost certainly right, and everyone almost certainly already knows it, it's still worth saying the obvious thing to make sure.

Even if something seems obvious to you, **other people might not know it**. Tech is a huge field with many different areas of expertise. You can go from "I have no idea how any of this works" to "well, obviously XYZ" in about a day. A week later, you've forgotten that you were ever confused by it. Almost all the things I have deep knowledge about (preforking web servers, large Ruby monoliths, etc) are things that once were a mystery to me. I learned about them from other engineers who were willing to state the obvious.

It's also worth stating the obvious just **to get everyone on the same page**. The start of a project is a confusing time. Hopefully the project lead knows what the goal is and how to get there, but it's very rare that everyone on the team shares that vision. Beginning with the obvious things (we own service X, we're building feature Y) is surprisingly useful.

When you're focusing on details, **it's easy to lose sight of the obvious**. Suppose you start out by building a feature for your largest enterprise customers to download their user data as a CSV. You have several kinds of users that live in different database tables. It'd be really cool if the CSV could be sorted by some value (e.g. username) in a way that interleaved both tables. So you get building that feature, which requires solving some fun technical problems. But before you know it, you've built a beautifully-polished CSV export feature that requires holding all the user data in-memory - in other words, a CSV export feature that works for everyone but your largest customers, who are the only ones who wanted the feature in the first place.

In summary:

- It's worth stating the obvious
- Obvious things are usually the most important things
- If you get the obvious things right, making mistakes elsewhere often doesn't matter
- Stating the obvious gets everyone on the same page
- It's surprisingly easy to miss the obvious when you get stuck in the weeds