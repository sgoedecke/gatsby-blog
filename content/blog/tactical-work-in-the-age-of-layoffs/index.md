---
title: How to work in tech when your job isn't safe
description:
order: 59
date: '2025-03-28'
tags: ["tech companies", "zirp", "career"]
---

In the glory days of the 2010s, tech companies were very invested in their employees' work-life balance. Those glory days [are over](/good-times-are-over). Anecdotally, tech company executives are now internally directing their employees to work harder and faster, with the new threat of layoffs adding weight to that directive. Engineers are rightfully scared. What should we do?

The naive way that some engineers approach this is to simply work in the same way as they've been working, but add more hours. I hesitate to call this a mistake because it works: you will get more things done if you work for an extra few hours after dinner. However, the downsides are obvious. It's exhausting and stressful to work all day (particularly cognitively-taxing work, like writing software). If you are consistently exhausted and stressed at work, you will make stupid mistakes and in general be much less effective. It's also not sustainable.

### Stop doing unpaid work

The better approach is to **spend your time more tactically**. In my experience, tech companies don't care if you're working eighty hours a week[^1]. They care about the quantity of your output. Critically, they care about the portion of your output _that is legible to them_. For much more on what that kind of work looks like, see [this post](/what-is-important). When you're under pressure, you can and should stop spending time on other kinds of work. For instance, you can stop:

- Writing tests
- Refactoring code
- Proactively helping other teams out with work (i.e. before your manager explicitly asks you to do it)
- Exploring new technologies, features and ideas
- Working on internal team processes

I want to be clear that I know this is all useful work. **But is it work you would volunteer to do if you weren't being paid for it?** If your employer is effectively saying "ship faster or be fired", that's effectively the situation. You are being paid to ship the projects they care about first, and to do all of these other things when (and if) you have time in a normal working day to do them. The consequences of neglecting this work are real. But they're consequences that primarily affect _the company_.

Many engineers will say that it's important to their professional identity to write clean, well-tested code, or to do their best to evolve internal processes. They will say that it's just less fun to work in a poorly-tested, poorly-factored codebase. Fair enough! But it's important to be aware that **you are volunteering your time** to support your professional identity or your ability to have fun in the codebase.

Does that mean you should do literally zero of this kind of work? No. Personally, I would struggle to work long-term in a codebase with zero tests. I would volunteer my time to write a small number of integration tests that exercise key flows. But I wouldn't volunteer to write a large number of unit tests, even though writing those tests would make me happier and more productive in the long term. Likewise, refactoring is often the quickest way to implement new features.

Driving down technical debt in enterprise codebases makes me happy. But I don't care enough about it to work on it for free.

### Work like mad on crucial projects, then rest

Not all projects are created equally. Tech companies can only [pay attention](/what-is-important) to a few things at once. That means that your productivity is assessed unevenly: some weeks it won't matter much what you get done, while other weeks you'll be accountable almost to the minute.

When the spotlight is on you, you should work as hard as you can. It's like you've got a short-term multiplier on your score in a video game, and you're frantically trying to rack up points while the multiplier applies. Speaking for myself, there are periods where I work twelve-hour days, and periods where I work much less than eight hours[^2].

It is absolutely critical to do the "working less" part of this as well as the "working more" part. Nobody can sprint all the time. If you work a normal eight hours and then flex up to twelve for big projects, you will very likely burn out.

How do you tell what's a crucial project? Tech companies tend to make it obvious. If your skip-level or skip-skip-level are in the meeting when the work is assigned, that's a good tell. If the project is being mentioned in the C-staff company-wide updates, that's another good tell.

### Summary

- If your company is putting pressure on you to ship more, one solution is to spend less time on testing/refactoring/glue work
- Decide whether or not to do that work by asking if you'd do it for free (since that's what working past your normal working hours means)
- Work hard when the spotlight is on you, then rest during other times

[^1]: Some probably do, but from my own experience and my friends in the industry I don't have any examples.

[^2]:  If you're the kind of person who has to work the same amount every day, this might not be good advice for you. But if you're the kind of person who is happy to vary the amount they work, this is probably the most useful advice I can give.
