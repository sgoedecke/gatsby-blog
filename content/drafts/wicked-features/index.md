---
title: Wicked features
description: 
order: 56
date: '2025-03-16'
---

Why is working at large tech companies so hard?[^1]

It's because a small subset of "wicked features" dominate everything else. If you're building a todo app, adding the ability to attach images to todo items might be a large feature, but it's not a wicked feature. However, offering your todo app as a webapp and a standalone executable is a wicked feature. What's the difference? Wicked features are features that must be considered _every time you build any other feature_.

Here's some examples of wicked features:

- Adding a new user type
- Adding an on-premise version of your SaaS
- Sharding your customers across many different databases
- Supporting strong data locality
- Supporting the ability for customers to move their accounts between regions
- I18n (translating your customer-facing text into their native language)

Let's say you've done all these, and now you're building the image-attachment feature. Can the new user type add images? Say you're storing images in S3 normally - where are images being stored on-premises, where S3 isn't available? If customer data is sharded, are you sharding your `images` table appropriately as well? Are you making sure that you have a S3 bucket for each user region? If your customer moves their data between regions, do you have an automatic system for shifting the S3 images along with it? Have you pulled out all the new strings involved in image attachment, and have you budgeted the time it'll take to get them translated?

This is a common reason for engineers underestimating tasks. It's easy to forget one or more wicked features that complicate the implementation, and then to get blindsided when someone asks "what about X?"

[^1]: If you're already answering "it isn't", remember how George Hotz (a clearly technically-strong engineer) joined Twitter in 2022 and [failed to fix](https://news.ycombinator.com/item?id=33723257) search. More generally, think of the hundreds of strong startup engineers who are acqui-hired into large tech companies and then struggle to be productive. Of course, it's possible that you're built different.

The 

https://neal.fun/password-game/

Much of the complexity is produced by a small set of what I call "wicked features", which interfere with _every other_ feature. For instance, adding a whole new user type: once you do that, you have to ask "can this user type access this feature" for every feature for the rest of the company's life. Adding a new deployment environment is a popular example of this (for instance, offering your cloud-based SaaS as an on-premise deployment). Unfortunately, these features are often the most lucrative by far, because they unlock huge enterprise customers. So big tech companies often have multiple wicked features.

Incidentally, this is why the quality of big tech engineering is sometimes worse than you would expect. The cognitive load of operating in this environment is pretty intense. Delivering anything at all is [really, really difficult](/how-to-ship). So really obvious balls sometimes get dropped because the engineer in question was trying to thread a path between ten other features.