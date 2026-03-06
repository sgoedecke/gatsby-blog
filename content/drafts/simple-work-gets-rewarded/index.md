---
title: Simple software engineering gets rewarded
description:
order: 180
date: '2026-03-05'
tags: ["tech companies"]
---

It's a popular joke among software engineers that writing overcomplicated, unmaintainable code is a pathway to job security. After all, if you're the only person who can work on a system, they can't fire you. There's a related take that ["nobody gets promoted for simplicity"](https://news.ycombinator.com/item?id=47246110): in other words, engineers who deliver overcomplicated crap will be promoted, because their work looks more impressive to non-technical managers.

There's a grain of truth in this, of course. As I've said before, one mark of an elegant solution is that it makes the problem look easy (like how pro skiers make terrifying slopes look doable). However, I worry that some engineers take this too far. It's actually a really bad idea to over-complicate your own work. **Simple software engineering does get rewarded, and on balance will take you further in your career.**.

### Non-technical managers are not stupid

The main reason for this is exactly the cynical point above: **most managers are non-technical and cannot judge the difficulty of technical work**. Of course, in the absence of anything better, managers will treat visible complexity as a mark of difficulty. But they usually do have something better to go on: actual _results_. 

Compare two new engineers: one who writes easy-looking simple code, and one who writes hard-looking complex code. When they're each assigned a task, the simple engineer will quickly solve it and move onto the next thing. The complex engineer will take longer to solve it, encounter more bugs, and generally be busier. At this point, their manager might prefer the complex engineer. But what about the next task, or the task after that? Pretty soon the simple engineer will outstrip the complex one. In a year's time, the simple engineer will have a much longer list of successful projects, and a reputation for delivering with minimal fuss. Managers pay _a lot_ of attention to engineers with a reputation like that.

Of course, the complex engineer might try a variety of clever tricks to avoid their fate. One common strategy is to hand off the complex work to other engineers to maintain, so the original engineer never has to suffer the consequences of their own design. Alternatively, the complex engineer might try and argue that they've been given the hardest problems, so of course each problem has taken longer[^1].

I don't think these tricks fool most managers. For one, if you're constantly handing your bad work off to other engineers, they will complain about you, and multiple independent complaints add up quickly. Non-technical managers are also typically primed to think that engineers are overcomplicating their work anyway. Your manager might initially nod along, but they'll go away and quietly run it by their own trusted engineers.

### Simple work means you can ship projects

Another reason why simple work is rewarded is that **most managers do not care about the engineering, they care about the _feature_**. Software engineers who can ship features smoothly will be rewarded, and being able to write simple code is a strong predictor of being able to ship.

When managers are talking to each other, they'll sometimes make a kind of backhanded compliment about an engineer: "they're _so_ smart, but...". Typically the "but" here is "but they don't have any business sense", or "but they get too wrapped up in technical problems", or anything that means "but they can't ship". Engineers who love to write complicated code get described like this a lot.

Does writing simple code really help you ship? You might think that simple code is harder to write than complicated code (which is true), and that therefore it's easier to rapidly deliver something overcomplicated to "ship a feature". I haven't seen this be true in practice. The ability to write simple code is usually **the ability to understand the system well enough to see where a new change most neatly fits**. This is _hard_, but it doesn't take a long time - if you're familiar with the system, you'll often see at a glance where the elegant place to slot in a new feature is. So good engineers can often deliver simple code at least as quick as complicated code.

And of course, complicated code is slow to actually get working, harder to change, and so on. All of those things make it more awkward to ship. If you're thinking of counter-examples - complex code that shipped smoothly without major followup issues - I suspect this code was actually simple enough.

[^1]: This can be a surprisingly effective strategy, because of the tempting circular logic here: if an engineer has been given the hardest problems, it's probably because they're a hotshot, which means you can trust their assessment of how difficult their problems are, which means...