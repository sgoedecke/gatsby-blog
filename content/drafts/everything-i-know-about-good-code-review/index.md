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

Once you start building your initial opinions about good and bad code, those opinions are usually felt strongly. This is the dangerous zone: many enthusiastic engineers will absolutely pepper their reviews with comments, sharing every single thought they have. Expect lots of "this `.map(...).filter(...)` could be rewritten as `.reduce(...)`, or "this should/shouldn't be its own method", or "it's better practice to order the fields in this function like so". These comments aren't necessarily _bad_, but they just aren't that important, and much of the time they make it more difficult to do the actual job of code review.

In my experience, very competent senior engineers usually don't 

- don't just review the code. it should mostly be about where the code is and what's maybe missing
- minimize comments! only say the most important things
- prioritize unblocking but feel bad if you approve broken code
- leaving blocking reviews vs non blocking

[^1]: When do I write code that isn't reviewed? Sometimes I run code in a production database console that isn't reviewed, and some services I've deployed to production have started their life with an initial scaffold that I've just pushed up without review.