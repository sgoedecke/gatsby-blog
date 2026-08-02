---
title: Giving and taking credit in big tech companies
description: 
order: 219
date: '2026-08-02'
tags: ["tech companies"]
---

Engineers often complain that visibility should be their manager's job. In other words, they think engineers should be able to focus on the code, while their manager figures out who's doing well and rewards them.

This attitude is an extension of the "school fantasy": the idea that your workplace should operate by the same rules as your school or university. After all, you didn't have to worry about "visibility" during your education. You simply did the assignments and tests you were given, and if you did well you were rewarded with a good grade.

Many big tech companies encourage this attitude, because it helps them recruit smart graduates. They fashion their workplaces to look and feel like a university, even calling the physical space "campuses". But it's still work, not school. If you treat it like school, you are going to have a bad time.

### Taking credit

The first lesson many new engineers learn is that **you have to take credit for your work**. If you silently jump in to help a struggling project and get it back on track, there's no guarantee of reward. Credit will naturally flow to the project lead, not you. In fact, if this project is outside of your direct team, it's likely you will be _punished_ for it: to your manager, it will look like you're simply doing nothing at all.

Even when your manager is watching your work, credit is largely uncorrelated with how well you did. That's because, unlike at school, **you are the subject-matter expert on your own work**. Software systems are so complicated that [only the people who work on them](/you-cant-design-software-you-dont-work-on/) can hope to understand them, and even that understanding is always [imperfect](/in-defense-of-not-understanding-your-codebase/). If even experts can't reliably [estimate](/how-i-estimate-work/) the difficulty of changes, how is your manager supposed to assess your technical performance? The answer is they aren't. They're simply not qualified to assess it.

Instead, smart managers will find engineers on your team they trust and ask them how you're doing. On small teams that have worked on a single codebase for a long time, this works okay, because everyone's familiar enough to judge everyone else's work. On large teams with a high rate of codebase churn, it goes badly, since they're just guessing. On teams with a nasty, cutthroat culture, it sometimes goes _very_ badly, since this is a good opportunity to actively sabotage the engineers who might threaten you.

Experienced engineers know how to **take the credit themselves**. When they do something good, they tell their manager about it. They write internal posts explaining why it was technically difficult and how they solved it (the audience for these is partially those trusted engineers, and partially the managers who will see a long technical post and think "wow!" without reading it). They actively [build trust](/point-person/) with their management chain. Worrying about this stuff is the beginning of [playing politics](/playing-politics/).

### Giving credit

There's a kind of engineer who's learned how to take credit but hasn't learned any other lessons yet. They're proactive about telling people what they've done, and they always maintain a ["brag doc"](https://jvns.ca/blog/brag-documents/). In particular, they love to talk about the parts they did _by themselves_, since those are least vulnerable to other people coming in to claim credit. You can tell they're jealously guarding whatever credit they've managed to accumulate. The lesson this kind of engineer hasn't learned is that **you can often accumulate credit best by giving it away**.

To see why, consider how credit flows _up_ inside a tech company. I wrote above that your manager can't assess the quality of your technical work on their own, but instead has to rely on other engineers they trust. They'll quietly ask those engineers "hey, was this project really that impressive?". In fact, often there are multiple layers of this at play[^1]. In big companies, line managers usually don't decide who gets promoted or who gets a raise: they make recommendations to their manager, who has their own network of trusted engineers (confusingly, sometimes these networks overlap). The point is that **there is a large group of people behind the scenes who will quietly and informally judge the value of your work**. 

Succeeding at a tech company is largely about finding ways to get these people on your side. The easiest way is to share your credit with them - and since you don't know who exactly is in this group, you should be sharing your credit freely. When you get feedback from other engineers, publicly thank them and mention them in your internal posts about the project. Find opportunities to ask for small favors, so you have an excuse to give other people credit. As best you can, make your individual projects at least partially _group_ projects.

Sharing credit with others gives them a reason to support you. A shared project you've worked on reflects well on everybody: on you, for working well with others, on the people you've worked with, for the same reason, and for your manager, for fostering such a great environment of cooperation. Lots of people have good reason to talk that project up, because it's partly their project too. On the other hand, a project you've jealously kept to yourself reflects well on nobody: you come across as antisocial and your peers come across as unhelpful.

### Blame

Blame operates by the same rules as credit. When something goes badly wrong, managers will ask their networks "hey, who screwed up here?" The answer to this question is never simple. Even on a purely technical level, failures always involve an interaction between multiple complex systems, any one of which could conceivably have been built so as to avoid the failure. In other words, **competent engineers can assign blame pretty much wherever they want**.

Because of this, it's risky to have a project for which you're clearly the only one getting credit. When something goes wrong, the network of people who will assign blame will likely be implicated in every part of the system but yours. They will be incentivized to attribute fault to the brand-new thing that they don't understand and are not responsible for. If instead that network had been involved in your project - if they'd been in a position to share the credit - they'd be less incentivized to blame it.

Of course, engineers are (mostly) not scheming viziers who make purely self-interested decisions. When asked who to blame, they usually make a good-faith effort to answer honestly. But in an area where there's no single clear right answer, it's human nature to be at least a little bit guided by your incentives. Nobody likes to think they're responsible for a group failure.

### Conclusion

Credit and blame are the currencies of tech companies (and often directly translate to the actual amount of currency you get to take home). For technical roles, managers assign credit and blame based on lots of quiet conversations with their trusted engineers. This can be a rude awakening for very junior engineers who are used to having their work assessed by an expert grader (or less junior engineers who haven't yet shaken that mindset completely).

Don't expect to get credit simply by putting your head down and doing good work. You have to find some way to tell people what you're doing and why it's important: internal blog posts, mentioning it in 1:1s with your manager, or anything else you can think of. But don't take self-promotion too far. It's a bad idea to try and hoard all the credit for your projects, for two reasons.

First, sharing credit with other people gives them a reason to talk positively about your project. Credit is not a zero-sum game: if you do it right, you can get other people to build up your credit for you. Second, hoarding credit sets yourself up as a lightning rod for blame. Projects where the credit is concentrated in one or two people are automatically[^2] blamed for complex problems, because nobody is incentivized to defend them.


[^1]: This is a classic example of an illegible-but-essential part of a software company. I wrote about this general phenomenon in [_Seeing like a software company_](/seeing-like-a-software-company/).

[^2]: Of course, if you do really screw up, you'll be blamed no matter what. I'm talking here about complex failures where it's non-trivial to attribute blame to a single source.