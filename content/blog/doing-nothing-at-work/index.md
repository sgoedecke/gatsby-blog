---
title: Doing nothing at work
description: 
order: 203
popular: true
popularity:
  score: 623
  hackerNews:
    points: 365
    comments: 129
    threads: 1
  lobsters:
    points: 0
    comments: 0
    threads: 0
  manual: 0
date: '2026-06-08'
tags: ["tech companies"]
---

Many engineers should be doing less work. I don't necessarily mean producing less code or fewer changes, but literally working fewer hours in the day. When they do work, they should be working at a slower pace. I like to aim to be running at 80% utilization by default: unless I have a high-pressure project going on, I spend 20% of my workday away from the computer.

### High-impact opportunities

Why? **Performance at tech companies is dominated by outlier events**. When I think about the most impactful changes I've made, many of them involved a surprisingly trivial amount of work. There are no points for effort in software development. What matters is solving the right problem at the right time.

In large engineering organizations, there are usually trivial pieces of engineering work you could do that would make tens or hundreds of millions of dollars for the company. Here are three common examples:

First, when the company is trying to sign a big enterprise deal, stepping in with a feature or bugfix can make the deal happen. It doesn't even have to be a _good_ feature: sometimes just showing that you're willing and able to make a concrete change will be enough.

Second, preventing or mitigating an incident early (even by just knowing the right feature flag to turn off) can save huge amounts of money: both immediate lost revenue during the incident and future lost revenue from customers who would have pulled their business or refused to sign pending contracts.

Third, when the company is trying to ship a high-profile feature, success or failure often hinges on trivial but obscure changes (e.g. the ability to rapidly add a new field in user settings, or to update the crufty enterprise-data-export functionality nobody has touched in years). Familiarity with the system can be the difference between one of these changes taking a few hours or a whole week.

What do these examples have in common? They're all _time-dependent_. You can't just log on in the morning and decide to unblock a big deal, or mitigate an incident, or speed up a high-profile feature. Is it just a matter of being in the right place at the right time? Not quite. **You also have to not already be busy.**

### Staying loose

I wrote about this a couple of years ago in [_Crushing JIRA tickets is a party trick, not a path to impact_](https://www.seangoedecke.com/party-tricks/). If you're always 100% utilized on a steady stream of low-priority work (for instance, if you're just picking up tickets from the backlog, crushing them, then picking up the next one), you'll miss your chance to do high-impact work in two ways.

First, you'll be too busy to even _notice_ the opportunities. You won't be chatting with people who are working on other things, or reading team updates, or keeping an eye on ongoing incidents. So you'll miss out on the best way to get involved in high-impact work, which is to volunteer your expertise.

Second, if you perpetually look busy, your manager won't want to volunteer for you. This is the second-best way to get involved in high-impact work: to have your manager or product manager say "oh, Sean has capacity to help out here, let me tag him in". Why is this better? Because managers and product managers usually have a much better read on what high-impact work is going on. They're in meetings that you aren't in.

### Doing nothing

If you're supposed to keep your time free for high-impact work, and you're not supposed to just grind tickets, what should you be doing on a minute-by-minute basis? Should you just be doing nothing? Yep!

Doing nothing is good, actually. Software engineering can be a stressful job, but it's typically not _consistently_ stressful: the stress comes from the occasional incident, or high-pressure urgent piece of work, or (these days) layoff. If you approach the comparatively low-pressure parts of your work with urgent intensity, you'll already be exhausted and frazzled when you have to handle the high-pressure parts.

Even in high-pressure parts of the job, doing nothing can still be good. One thing I recommend for engineers new to on-call is to avoid rushing: take a few breaths before joining the call or before speaking, and in general try to ["think in slow motion"](/thinking-clearly/). Most incidents resolve on their own. Most frantic "maybe this will help" changes during incidents make things worse, not better. As a general rule, if you can simply avoid panicking, you will be doing better than most engineers at incident response.

Nothing is a space things can happen in[^1]. If you give your brain a chance to rest, you will find you're more likely to have new ideas. If someone hands you an important task, you can tackle it with your full attention (instead of juggling it with the three other things you're working on in the background). When you're not busy, you have time to just _look at things_ and take in new data.

### Deliberately not doing specific things

A lot of engineers are uncomfortable seeing a task that needs doing and not doing it. I'm like this as well. I wrote about it in [_I'm addicted to being useful_](/addicted-to-being-useful/): it's a psychological quirk that many software engineers share, because having that quirk (to a point) makes you a good fit for the job. In order to spend time doing nothing, sometimes you need to force yourself to not step in.

For instance, I believe that **engineers should generally avoid glue work**[^2]. Most glue work - making sure people talk to each other, updating docs for work you're not leading, volunteering to address technical debt - reflects the fact that the organization is not explicitly prioritizing this work. If they were, you wouldn't need to volunteer for it. Either that's fine, or it's a big mistake. If it's fine, then you shouldn't step up and do it: you'll be wasting your time and annoying your manager. If it's a big mistake, _you still shouldn't do it_, because you'll be insulating the company from the consequences of its own mistakes at the cost of your own career and mental well-being.

That's a bad deal for you, and a bad example for your junior colleagues, and sets a bad precedent for someone else to jump into the same position when you inevitably burn out[^3]. If the consequences truly are severe, let them happen, so the organization can feel the pain and change its policies.

I also believe that **being too helpful leaves you vulnerable to predators**. Tech companies are full of people who want to extract uncompensated work from software engineers[^4]. This is different from work that arrives via normal channels, and for which you're compensated by promotions, bonuses (and just your normal salary). I'm talking about work that arrives via backchannels, from people who don't have the ability or willingness to ensure that work is formally recorded under your name. For instance, a product manager from another organization messaging you to say "you're so good at querying data, would you mind pulling some statistics for me about X?", or an engineer from another team asking you to "pair" on a piece of work that will ultimately involve you writing all the code and them quietly submitting the change under their own name.

Doing some amount of this kind of work is fine. You may as well help people out when you can. But you need to be able to apply backpressure, either by saying no or simply delaying your response by a few hours or days.

It's also a good idea to **avoid investing too much in work that is likely going to disappear**. For instance, suppose you're working with a product designer who is figuring out what they want in real time. At 9am they message you saying they want the page header to look one way, then at 10am they have tweaks, and more changes at 11am, and so on. You should not throw yourself into fully rewriting the page every hour. Instead, you should do nothing (say, go for a walk) and rewrite the page once in the afternoon, based on the most recent design. Another common instance of this is "big idea from a manager without the political clout to follow through on it". Often you can just run out the clock until the project gets inevitably cancelled[^5].

### Conclusion

A lot of software engineering advice and tooling is designed around the ability to scale up your ability to exert technical effort: to do more things at the same time, to take on projects of larger scope, or to just write more code. But software engineering success is not determined by any of these. It is determined by the ability to do the _right_ things at the _right_ time, which requires that you deliberately hold back some of your effort during ordinary work.

In my experience, it's still possible to be a "high performing engineer" at 80% effort. In fact, it's _easier_, because you'll be less likely to make silly mistakes from stress, and you'll be in a position to jump on the kind of high-impact tasks that deliver outsized returns.

This doesn't mean you should never grind at 100% effort. I think there are probably two or three times a year where I work as hard as I possibly can: long hours, intense focus, thinking about the problem from when I wake up to when I go to bed. But I reserve this mode of work for [when the rewards are really high](/the-spotlight). For the rest of the year, I take it relatively easy.


[^1]: One of my big influences is Rich Hickey's talk [_Hammock Driven Development_](https://github.com/matthiasn/talk-transcripts/blob/master/Hickey_Rich/HammockDrivenDev.md). This is _kind of_ like what he's talking about, except (a) Hickey is more talking about what it takes to design solutions to really hard problems, rather than what it takes to be a strong engineer in an ordinary tech company, and so (b) Hickey recommends using your time-away-from-the-computer to focus on a hard problem, instead of to simply decompress and let solutions congeal in your head. It's also like Zvi Mowshowitz's post on ["slack"](https://thezvi.substack.com/p/slack).


edit: this post got some comments on [Hacker News](https://news.ycombinator.com/item?id=48442880). Commenters discuss [how to not get in trouble](https://news.ycombinator.com/item?id=48446245) with your manager when you're taking slack time (in my experience, if you're generally productive it's fine, but managers vary a lot) and [whether engineers really do have control](https://news.ycombinator.com/item?id=48443273) over their workload.

[^2]: I wrote about this a lot more in [_Glue work considered harmful_](/glue-work-considered-harmful/).

[^3]: Why inevitably? Because in my view, burnout is _hard work unrewarded_, and taking on a personal crusade that your job doesn't care about is a great way to do a lot of unrewarded work.

[^4]: I wrote about this in [_Protecting your time from predators in large tech companies_](/predators).

[^5]: Of course, you have to be careful with this. If you try this strategy and you're wrong about the level of political support for the project, you will come off like a slacker and then have to deliver in a rush.