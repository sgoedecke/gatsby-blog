---
title: How I think about good code reviews
description: 
order: 100
date: '2025-06-21'
tags: ["good engineers", "software design", "explainers"]
---

maybe: "common mistakes/traps"

What's the point of code reviews? Here's some candidate reasons:

- To make sure multiple people on the team are familiar with every part of the codebase
- To let the team discuss the software design of each change
- To catch subtle bugs that a single person might not see
- To transmit knowledge horizontally across the team
- To increase perceived ownership of each change
- To enforce code style and format rules across the codebase
- To satisfy SOC2 "no one person can change the system alone" constraints

I've listed these in the order I care about them. Engineers who would order these differently will have a very different approach to code review. I'm 

### Do not just review the diff



### Most engineers leave too many comments

My most controversial belief about code review is that **most engineers leave too many comments**.

When you start working as an engineer, you're still developing your taste for good code. To have an opinion about whether a piece of code is good, you need to be able to imagine at least one other way to write it, and very junior engineers can struggle with finding even one possible solution. These engineers often don't leave any comments at all.

Once you start building your initial opinions about good and bad code, those opinions are usually felt strongly. This is the dangerous zone: many enthusiastic engineers will absolutely pepper their reviews with comments, sharing every single thought they have. Expect lots of "this `.map(...).filter(...)` could be rewritten as `.reduce(...)`, or "this should/shouldn't be its own method", or "it's better practice to order the fields in this function like so". These comments aren't necessarily _bad_, but they just aren't that important, and much of the time they make it more difficult to do **the actual job of code review**.

In my experience, very competent senior engineers usually don't leave more than five or six comments.[^1] It just doesn't 


[^1]: There are definitely exceptions to this. It's a trend I've noticed, not something that _makes_ engineers good or bad. Some people just love leaving line comments. It's also sometimes good to leave a ton of line comments for people who are very junior or brand-new to the team, so they can absorb the coding style of the team quickly.
---

- don't just review the code. it should mostly be about where the code is and what's maybe missing
- minimize comments! only say the most important things
- prioritize unblocking but feel bad if you approve broken code
- leaving blocking reviews vs non blocking

When do I write code that isn't reviewed? Sometimes I run code in a production database console that isn't reviewed, and some services I've deployed to production have started their life with an initial scaffold that I've just pushed up without review.