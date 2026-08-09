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

**Forced multitasking is the most stressful thing about working in tech.** Multitasking is inherently stressful because of the load it puts on your working memory, but it's also stressful because it's _risky_. No matter how hard you try to fill your downtime with low-priority tasks, sometimes you get it wrong or one of the tasks blows up, and you're in the position of having to juggle two or three critical tasks at once (or of having to rapidly delegate important tasks, which is never fun)[^1.5]. If I could somehow only ever work on one thing until it was done, then move onto the next thing, I don't think this would be a stressful job at all.

Managing concurrent tasks well is thus one of the most important ways you can avoid burning out (and in general become more productive). I've written at length about it twice, in [_Why strong engineers are rarely blocked_](/becoming-unblockable/) and [_Becoming unblockable_](/unblockable/)[^2]. There are lots of practical things you can do to make multitasking easier and safer: planning projects with concurrency in mind, sequencing blocking tasks as early as possible, proactively building relationships with teams you depend on, being willing to call in air support from senior management, and so on.

**AI agents like Claude Code have made multitasking much easier.** Previously your ability to multitask was bounded by how many different technical contexts could fit in your working memory. Each new task required managing a whole set of low-level technical details that chewed up space. You simply could not multitask across five or six separate areas; it was not physically possible. But now it is! The LLM can track all of those low-level details for you, requiring you to keep only the broad strokes of the task in your head, which means you can do far, far more work in parallel than before.

This is more of a curse than a blessing. It used to be that aspiring multitaskers would be limited by the size of their working memory. With AI agents, they're now limited by the amount of stress they're willing to take on[^3], or (in other words), the amount of _risk_ they're willing to accept[^5]. It's as if every punter at a casino suddenly got handed an unlimited source of credit. The old mechanisms that kept people from ruining their lives don't work anymore, and the new ones are yet to be developed.

Here's how that might go down at a tech company. One of the fixes you pushed with AI last week will have a bug(or reveal an existing one), and need to be rolled back, fixed, and redeployed. Two of the low-priority tasks you picked up with your extra AI capacity will suddenly turn out to be high-priority, and will require more careful attention on your part. You'll get handed another critical piece of work to juggle at the same time: complex enough that you need to wrap your brain around it, even though AI can help. In other words, several of the small risks you've taken will come due at the same time, suddenly straining your capacity beyond your ability to manage.

The long-term solution is to develop a better sense of risk (and of your other mental limits), so you don't just rely on running out of working memory to throttle your rate of work. But I like Nolan Lawson's [_Using AI to write better code more slowly_](https://nolanlawson.com/2026/05/25/using-ai-to-write-better-code-more-slowly/) as a short-term solution. If you direct your extra AI output into making your existing work better, instead of into doing more things, then you're not taking on significantly more risk (and if your work does blow up, you can easily "scale down" to a more manageable set of tasks).



[^1]: One big mistake can outweigh tens of great decisions.

[^1.5]: Why not just get better about picking tasks? For the same reason that [accurate estimation is impossible](/how-i-estimate-work) (at least without spending more time estimating than it would take to just do the task).

[^2]: I'll probably write about it again. If it's worth writing about twice, it's worth writing about a third time.

[^3]: This is the source of "AI brain fry", a unfortunately-named[^4] condition that's been appearing in [news articles](https://edition.cnn.com/2026/03/13/business/ai-brain-fry-nightcap)

[^4]: In the On the Metal Oxide podcast, Adam Leventhal coined ["Deep Blue"](https://simonwillison.net/2026/Feb/15/deep-blue/) to describe a similar mental reaction to AI. I like that name better.

[^5]: Every piece of technical work is a risk.