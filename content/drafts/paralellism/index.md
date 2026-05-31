---
title: Parallelism
description: 
order: 200
date: '2026-05-23'
tags: ["good engineers"]
---

Should you work on multiple tasks at the same time?

It's almost certainly less efficient. People routinely think they're [way better](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0054402) at multitasking than they actually are. Getting caught up in the thrill of juggling tasks feels great, but you often end up doing sloppy work. In my experience, success on difficult tasks is dominated by the amount of serious problems you avoid[^1], so focusing on one task at a time is disproportionately valuable.

However, the alternative to multitasking is often "doing nothing at all". In large tech companies, work passes between many pairs of hands, and is thus often blocked. When I start on a project, I can give an initial loose technical estimate right away, but then I need multiple departments (product, legal, design) to agree on specifics before I can plan in more detail. When I write a code change, I need to wait for my colleagues to review it. Sometimes there's a change that I don't have the permissions (or expertise) to make, and I need to wait for another team to get around to making it. What should I do in the meantime?

**Forced multitasking is the most stressful thing about working in tech.** Multitasking is inherently kind of stressful, but what's worse is that it's also _unstable_. No matter how hard you try to fill your downtime with low-priority tasks, sometimes you get it wrong or one of the tasks blows up, and you're in the position of having to juggle two or three important tasks at once[^1.5]. If I could somehow only ever work on one thing until it was done, then move onto the next thing, I don't think this would be a stressful job at all.

Managing concurrent tasks well is thus one of the most important ways you can avoid burning out (and in general become more productive). I've written at length about it twice, in [_Why strong engineers are rarely blocked_](/becoming-unblockable/) and [_Becoming unblockable_](/unblockable/)[^2]. There are lots of practical things you can do to make multlitasking easier and safer: planning projects with concurrency in mind, sequencing blocking tasks as early as possible, proactively building relationships with teams you depend on, being willing to call in air support from senior management, and so on.

**AI agents like Claude Code have made multitasking much, much harder.** 



[^1]: One big mistake can outweigh tens of great decisions.

[^1.5]: Why not just get better about picking tasks? For the same reason that [accurate estimation is impossible](/how-i-estimate-work) (at least without spending more time estimating than it would take to just do the task).

[^2]: I'll probably write about it again. If it's worth writing about twice, it's worth writing about a third time.