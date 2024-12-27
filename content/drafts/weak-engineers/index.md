---
title: Working with weak senior engineers
description: --
order: 18
date: '2024-12-27'
---

What makes a strong engineer? The real measure of talent is not speed, but capability. Strong engineers can do tasks (fast or slow) that weaker engineers just can't, even with all the time in the world.

For instance, in my experience there's a hard division between engineers who can ship complex projects and engineers who can't. It's not as if weaker engineers do it more slowly - they just can't seem to do it _at all_. Either a nearby strong engineer ghost-leads the project or the project fails. Some more technical examples of tasks that are like this: solving very difficult bugs, working in the thorniest parts of legacy codebases, shipping something polished with minimal defects, or working in areas where any mistake carries a huge risk. Speed does matter, but only as one of these capabilities. Strong engineers can work fast in ways that weaker engineers can't - yes, even 10x as fast - but even if they couldn't they'd still be almost as valuable.

Not every strong engineer can do all of these types of task. Somebody might be great at solving difficult bugs but can't ship projects, or great at legacy codebases but can't move fast. But in my experience they're at least all correlated. If someone is great at one of these things, they're likely to be great at most of the others. I don't really know why: maybe it's sheer intelligence, maybe it's that being good at one thing helps you learn others, maybe it's just that these types of engineers are really invested in being good at the job so they just care a lot. But it's definitely true.

### Regular engineers

Right below strong engineers, you have the regular engineers who make up the bulk of most companies. A long-ago colleague once referred to this type of engineer as a "plodder": they aren't particularly fast, but they'll make steady progress on a normal-difficulty engineering task. I now think "plodder" is an unnecessarily pejorative name for this, because the more experience I get the more I love these colleagues. They _help_. They _do the work_. They're just not burning with ambition to excel at the next promo cycle, or to blow their peers away with really impressive output.

These are valuable team members who are important to hire and retain. In terms of capabilities, they can do most things a large engineering company needs doing, but not all. If they pick up a really difficult bug, they're probably not going to crack it. If they're tasked to lead a project, they'll probably need a strong engineer keeping an eye on it to make sure it goes smoothly (although maybe not, if they're motivated and nothing too bad goes wrong).

### Weak engineers

The other category is truly weak engineers. These people have little to no capabilities at all. In other worse, the baseline difficulty of a normal-to-easy software task is above what they're comfortable with. I suppose a few of these people are overemployed or fraudulent in some similar way, but I think mostly it's a lack of ability or burnout. I want to be clear that I'm not exaggerating here: weak engineers _cannot complete almost any engineering task_. Typically there's a handful in every large org, though I've worked on teams without any[^2].

Ironically, while people like this exist at almost all seniority levels, it's more likely to encounter weak engineers in senior roles. I think this is probably for two reasons. First, the bar to hire juniors is explicitly capability-based, so it's harder to slip past it. In interviews, seniors can talk about work they were tangentially involved with, which is hard to distinguish from work they _did_. Second, a weak junior is often given more opportunity to learn, because it's socially acceptable for them to not know things. A weak senior has to conceal their lack of knowledge and learn in secret, which is much harder.

I don't have a lot to say about weak juniors. You should help them out, point them at challenging problems, and see if they can step up and learn. Weak seniors, however, are a lot more interesting.

### How do weak senior engineers survive?

How do weak engineers survive at the senior+ level? They do a lot of what I call "vampire pairing". If you've ever paired with these engineers, it's a very unpleasant experience, since you have to do all the work whether driving or navigating. Often the pairing is unofficial - they'll quietly reach out to another engineer on the team for help on every single task they have. Sometimes there'll be one unlucky victim who gets their time parasitized like this: often an effective junior on the team who's happy to help and too inexperienced to know better[^3]. More sophisticated weak engineers will round-robin their pairing across the team, so each individual member might only need to chip in every week or so. Only when everyone compares notes does it become clear that the weak engineer is pairing on 100% of their tasks.

Also, weak engineers are often very active in work-related Slack discussions and in code reviews. This is partially because they've got a lot of time - unless they can find someone to "pair" with, they're not really working. It's also an effective defense mechanism. If questions come up about their individual output, they can gesture at their public communications as evidence that they're leveling up the team instead of grinding out concrete work. How can they discuss work in Slack if they can't do work? By staying fully general and avoiding specifics. One way to tell a weak engineer in a discussion thread about some problem is to see who is bringing in specific facts about how the system currently works, and who is making purely general recommendations that could apply to any system. If their messages could all be public tweets, they're probably not adding much value. Likewise, weak engineer code reviews have a lot of "LGTM" or purely stylistic comments (variable naming, indentation). You'll never see a weak engineer block a PR, or leave a detailed comment about some structural aspect of the approach.

They're almost always very nice, very friendly people. This is mainly selection bias - the weak engineers who are also abrasive and unpleasant get shuffled out, or don't get hired in the first place. I think it's also strategy: if you can't move the big wheel forward, you had better at least be pleasant to work with.

### Working with weak senior engineers

It can be really frustrating to work with this kind of colleague. When you're invested in a project and trying to get something done, having a friendly colleague who provides zero value feels awful. It's even worse when they're paid more than you are. The classic scenario is a highly-motivated, sharp junior who's absolutely tearing their hair out trying to work with a weak senior engineer. So what can you do?

The first and most important thing is to remember that **it's just work**. Somebody being bad at their job does not make them a bad person. Do not be an asshole, even if you're right - it's morally wrong, it'll make everyone feel bad, and it won't actually solve any of your problems. People can be weak through lack of talent, but also for all kinds of personal reasons that are none of your business.

You should try to protect your time as much as possible. Don't quietly give up hours of your workday to helping them stay afloat. Learn how to politely decline offers to pair, or to set a strict time limit on them, or (much harder) to pair without doing all of the work. One essential point is to **avoid time-asymmetrical helping**. Don't do work for them that takes much more effort than it took them to ask about it. For instance, if you're asked "hey, I have this issue, how would you approach it", don't take the time to work out the actual solution and hand it to them. Fire off a _quick_ response that points them at the next immediate step (e.g. "oh yeah, looks like something in the billing code"). This means they can't spend minutes of their day tying up hours of yours. It also gives them the chance to actually learn, if they're interested (though don't expect miracles if they're in a senior role).

Relatedly, you should try to protect the time of the junior members of your team. Don't let them be exploited by weak seniors who will spend half a day having them solve their problems and then frame it to management as them helping the juniors level up. The best way to do that is to make sure your manager knows the situation. Don't rant and rave, but do clearly communicate that you haven't seen impact. Sometimes managers rely on their engineers to tell them that there's a problem. It can be a hellishly difficult process to manage people out at some companies (and there might be things going on that you're not aware of), so don't expect that this person will be fired/pipped/told to shape up. But you still have a responsibility to make sure your manager's aware.

### Conclusion

In my view, engineering talent is simply **the capability to do tasks that other engineers can't**. Hard problems in engineering aren't simply questions of time: you can't give a hard problem to a handful of average engineers and expect slow progress.

Strong engineers are stronger than people think they are: not 10x, or even 100x, but infinity-x on some problems. Weak engineers are weaker than people think they are: you can't give _any_ problem to a weak engineer.

Weak juniors should be mentored; weak seniors should be worked around.


[^1]: All of this is in the context of large tech companies working on websites. I have no idea if this applies to other domains.

[^2]: Of course, #{current_employer} is lucky enough to have no weak engineers whatsoever.

[^3]: This dynamic in particular makes my blood boil.