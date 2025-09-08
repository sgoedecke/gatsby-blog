---
title: Everything I know about good code reviews
description: 
order: 100
date: '2025-06-21'
popular: true
tags: ["good engineers", "software design", "explainers"]
---

My most controversial belief about code review is that **most engineers leave too many comments**.

When you start working as an engineer, you're still developing your taste for good code. To have an opinion about whether a piece of code is good, you need to be able to imagine at least one other way to write it, and very junior engineers can struggle with finding even one possible solution. These engineers often don't leave any comments at all.

Once you start feeling competent, your initial opinions about good and bad code are usually felt strongly.

You don't really know what you like, so it can be hard to come up with any comments at all. 

- don't just review the code. it should mostly be about where the code is and what's maybe missing
- minimize comments! only say the most important things
- prioritize unblocking but feel bad if you approve broken code
- leaving blocking reviews vs non blocking

[^1]: When do I write code that isn't reviewed? Sometimes I run code in a production database console that isn't reviewed, and some services I've deployed to production have started their life with an initial scaffold that I've just pushed up without review.