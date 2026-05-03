---
title: Why I don't like the "staff engineer archetypes"
description:
order: 182
date: '2026-04-29'
tags: ["tech companies", "staff"]
---

The most influential piece of writing about staff engineers in the last decade has to be Will Larson's [_Staff engineer archetypes_](https://staffeng.com/guides/staff-archetypes/). He argues that the "staff engineer" title covers at least four very different roles: the team lead, the architect, the solver, and the right hand. This taxonomy gets cited a lot as advice for people who are trying to become effective staff engineers. For [both](/staff-engineer-promotions) of my promotions to staff engineer, my manager at the time linked me to the "staff engineer archetypes" and asked me to consider which of these archetypes I was aiming towards.

These archetypes definitely exist[^1]. However, I think it's bad practical advice to tell engineers to try and target them.

### Archetypes do not make good goals

To see why, let's take the "team lead" archetype. Larson describes this as an informal technical leadership role: not necessarily an explicit authority figure, but someone who's good at scoping work, planning projects, and maintaining the kind of relationships (e.g. with other teams) needed to successfully [ship](/how-to-ship). If you want to fill this role, shouldn't you start trying to do these things? No! You don't become a technical leader by trying really hard to be a technical leader, much like you don't become a writer by trying really hard "to be a writer". You become a technical leader by _doing good technical work_ until your skills and relationships emerge organically.

I wrote about this process in [_Ratchet effects determine engineer reputation at large companies_](/ratchet-effects). To get good at shipping large complex projects, you must start by shipping tiny pieces of work, until you're familiar enough with the system and you've built enough trust to take on slightly larger pieces. At each stage, if you do good work - "good work" here means "deliver [shareholder value](/shareholder-value/)" - you will very naturally be given opportunities to work on more complex and important things. If you try to jump ahead, you're going to run into all kinds of problems:

- Important projects are usually assigned top-down, not bottom-up, so you'll either be trying to muscle out the planned engineering lead for a project or to pitch your own (complex, important) engineering task to senior management. Either way, good luck with that!
- You likely won't have a good enough relationship with senior management to know what their real priorities are.
- If you're not yet trusted to execute, you may get assigned "minders" (often current staff engineers) who will ghost-lead the project through you[^2].
- You'll likely make [poor technical decisions](/you-cant-design-software-you-dont-work-on/).

The other archetypes are like this as well. If you want to become a successful architect, you do not get there by studying software architecture in the abstract, because [you can't design software you don't work on](/you-cant-design-software-you-dont-work-on/). The "solver" and "right hand" archetypes both rely on having an enormous amount of trust and influence. You can't aim for those archetypes directly, because trust and influence accumulate over time. In fact, the idea of "aiming for" a particular staff engineer archetype reflects a misunderstanding of what the staff engineer role is. What is the defining attribute of the staff engineering role, then?

### What is a staff engineer?

 **A staff engineer has to be useful to the company.** Of course, a senior or mid-level software engineer ought to be useful too, but all they _have_ to do is execute on the job in front of them. If they end up not providing value (maybe their project turns out to be unimportant, or they don't get the support needed to succeed) that's their manager's problem, not theirs[^3]. In contrast, staff engineers are expected to deliver value regardless: to make the project work, or to find something else useful to do if the project truly can't be salvaged.

This is an unfair expectation. Often projects really do fail through no fault of your own, and sometimes it just isn't possible to conjure useful work from thin air. That's actually by design: **the staff engineer role is supposed to be unfair**. Something many engineers don't realize is that all senior management and executive leadership roles are unfair too, in the same way. That's just part of the deal: executives are given power and great compensation, and in return they get thrown off the boat in bad weather[^4]. "Staff engineer" is the first engineering role where you are held largely responsible for outcomes you don't control.

Developing a "staff engineer mindset" thus has very little to do with the archetypes. Instead, you should:

1. Develop the habit of constantly asking yourself "is this useful to the company" (and answering correctly).
2. Lose the habit of worrying about if you're being treated "fairly". Instead, try to think about your role in terms of incentives and consequences.

At the beginning, you won't look much like any of the staff engineer archetypes. You will look like being a level-headed engineer who can be trusted to move projects forward with a minimum of fuss, and who can be re-tasked to different work without complaining. You'll also look like someone who's [paying a lot of attention](/getting-the-main-thing-right/) to what their manager's actual priorities are, and who is thinking hard about how to fulfil those priorities (instead of their own goals).

If you do this for long enough, you'll eventually find yourself in one of the staff engineer archetypes. However, it probably won't be the one you're "aiming for". The whole point of being a staff engineer is that you're willing to fill whatever archetype the company needs at the time.

### Final thoughts

In his original staff engineer post, Larson is pretty clear that these archetypes are more of an anthropological description of some of the varied niches staff engineers fill, not a how-to guide for succeeding in the role[^5]. At the time, the "staff engineer" role was fairly new and people were still trying to figure out what it even meant. Pointing out that there were a few very different ways to succeed in the role was a genuinely novel observation.

The staff engineer archetypes are a good list of ways an engineer can be very useful to their organization - but only once they've built a deep relationship of trust with their organization's leadership. Advice on how to succeed as a staff engineer should be about **how to build that trust**, not about what to do once you have it.


[^1]: One caveat that is too pedantic for the body of the post: each tech company has a different structure of roles. Some don't have the formal "staff" title at all, while others have "staff" as a fairly early rung on the ladder and a panoply of "senior staff", "senior principal staff", and so on roles above it. Like all "staff engineer" discourse, this post is not about the word itself but about the point in the engineering job ladder where progression becomes significantly more difficult.

[^2]: Impressing your VP's trusted lieutenants can actually be a good way to build trust in the medium-term, but you'd better hope you've built enough understanding of the system to do it right. If this process goes badly, your reputation in the org might be torched for years.

[^3]: In theory, at least. In practice it's always better to be useful (again, in the sense of "delivering shareholder value").

[^4]: This is why very senior leadership sometimes seem so unempathetic towards engineering complaints: their work environment operates by very different rules and norms to that of most engineers. I keep meaning to try and write about this and never succeeding. This [draft](https://github.com/sgoedecke/gatsby-blog/blob/master/content/drafts/_icebox/strategy-for-swes/index.md) is the closest thing I have to a deeper exploration of the point.

[^5]: For the record, my how-to guides are [here](staff-engineer-promotions/) and [here](ratchet-effects/).
