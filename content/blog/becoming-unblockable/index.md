---
title: Why strong engineers are rarely blocked
description: 
order: 83
date: '2025-05-17'
tags: ["good engineers"]
---

Earlier in my career I used to get blocked[^1] constantly, but these days it's rare. What changed?

At first glance being blocked sounds like it's outside your control, since it literally means you're waiting for some other person or event. However, engineers actually have a lot of control over the amount of time they spend blocked. You can see that by the fact that some engineers have a reputation for being "good at unblocking" other engineers. What skills do they have that other engineers don't?

### Sometimes it's a skill issue

Let's start with the obvious: many engineers are blocked because they don't know how to do things. Sometimes they need a more experienced engineer to explain the right approach, and until that happens (e.g. in a quick meeting or a Slack message) they can't proceed. This can be either about a general programming thing, like knowing how to implement a rate limiter, or about some specific piece of company knowledge, like arcane development environment setup.

As engineers acquire more knowledge and get quicker at learning how to do things, they get blocked less often. But they'll still get blocked. If you need a database table, but the database team won't run your migration until next week, you'll have to wait no matter how clever you are. All the engineering skill in the world can't get rid of external blockers.

### Keeping multiple balls in the air

However, if you're waiting on a migration, there's no reason you shouldn't be doing other work. One common mistake I see engineers make is doing literally nothing when they get blocked, or only doing tiny unimportant pieces of work (which amounts to the same thing). I think this comes from a sensible desire to avoid becoming overcommitted if the original task gets unblocked, but in my experience it's possible to strike a sensible balance here.

I personally try to have two tasks going at any given time. In practice, that means I have between one and five, depending on how busy work is: sometimes I get assigned tasks unexpectedly, or previously-closed issues are reopened, or tasks I thought were almost complete require much more attention. Five is definitely too many, but one is also too few - if that task is blocked, you don't want to be in a situation where you're literally doing nothing.

It's crucial to only ever take on one high-priority task at a time, so you never delay a high-priority task while you're working on another one. If you do end up assigned to two high-priority tasks, it's a good idea to talk to your manager about handing one of those off. In my experience, managers are usually very happy to help (and mostly relieved that you're thinking about this so they don't have to.)

The main trick here is to **always maintain a list of the relative priority order of your assigned tasks**. If you're not sure, you can directly ask your manager. This is a great topic for 1:1s.

If I can, I try to make sure one of my tasks is a [side bet](/side-bets): a high-reward task that I personally think is valuable but my team isn't particularly interested in. Side bets are good filler because they're worth doing but are also reliably low-priority, so you can set them down as soon as your highest-priority task becomes unblocked.

### Not asking for the impossible

Sometimes engineers are blocked because they're trying to do something that isn't going to happen. For instance, suppose they really want to use Memcached for their new feature, but their company is a Redis shop. They might be "blocked on getting Memcached" set up for a very long time: talking with uncooperative infrastructure teams and architects, writing internal ADRs and docs trying to persuade people to use Memcached, and so on. A more effective engineer will choose Redis and be done with the task by lunchtime.

This is not to say that the work of persuading an organization to use some new technology is always useless. It can be incredibly high value, if that technology unlocks genuinely new capabilities or is strictly better along some important axis. But it's probably not more important than the actual mission of your team (or if it is, you should find another team).

### Anticipating and avoiding blockers

Effective engineers know what kind of tasks are likely to be blocked and try to avoid them. For instance, if it takes six months to create a new service at your company, you may be better off architecting a new feature so it can be backed by existing services. If the edge networking team is composed of unfriendly gatekeepers who will nitpick any changes for weeks, you may be better off designing your project so it does not require a change to the edge networking setup. Anticipating these problems can be the difference between a project that takes a year and a project that takes a month.

I don't think it's necessarily good for the company if all its strong engineers route around organizational dysfunction. But good or not, that's what happens - most strong engineers want to ship, not spend all their time in political fights, even if those political fights make the company more effective in the long term.

In fact, if you're working on important projects, it probably is correct to route around dysfunction instead of trying to solve it. If your company takes a financial hit because your project was late, that will definitely cause more dysfunction than you fixed by straightening out some misbehaving team.

### Good sequencing

If tasks that have a high chance of being blocked can't be avoided, they should be embraced. Tackle them first, so that you can keep going on other things while they're blocked. One simple example of this is putting up your database migrations before you write the backend code that uses them. You can write the backend code while the database team is reviewing and running your migration, so you're never really blocked at all.

This sometimes resolves to a skill issue. If you're not confident that you can get the migration right before you've written the rest of the code, it's probably better to wait, so you're not putting up other "fix" migrations and confusing the whole thing. But in my experience you can usually get this right with careful [planning](/planning-software).

I could write a lot more about the right way of sequencing tasks for a project. Doing potentially-blocked tasks first is one example of the general rule that **you should front-load the riskiest pieces of work**[^2].

### Calling in the artillery

One thing that it took me a while to learn about being blocked is that _you can ask for help_. Particularly if you're working on something high-priority, you will have many powerful allies who are personally invested in getting you unblocked. They won't have your technical context, but they will have the formal organizational power that you lack. If you're on the frontlines of your project, your manager and skip-level manager are the equivalent of artillery three valleys over. If you don't say anything, they'll hold off and let you try and solve it, but if you call them in they'll arrive with overwhelming force.

What this looks like in practice is the VP of your organization having a quiet chat with the VP of the organization of the team that's blocking you, and suddenly they're falling over themselves to help you ship your feature. You can go from your messages and meeting requests being ignored to having a staff engineer on that team personally assigned to make sure you get what you need. If you haven't experienced this, it can be hard to know that it's even possible to ask for. But it is!

You should use this strategy with caution. If you're _constantly_ asking your manager for help, they will likely conclude that you can't fight your own battles, which isn't good for your future promotions or your trust relationship with them. Likewise, if you ask for political help on what is really a technical problem (e.g. you're unwittingly asking the team for something that's impossible), you risk making your skip-level or VP look like an idiot, which can have dire consequences for you. However, there are still times where it's correct to do this. Just remember that it's [dangerous advice](/dangerous-advice).

### Summary

- Strong engineers get blocked much less than weak engineers. There are many strategies you can employ to limit your time spent blocked
- Getting stronger technically can help, since you spend less time needing to ask others, but it won't help for all the other reasons you can be blocked
- Keeping at least two tasks going on at the same time means that if one gets blocked, you can keep going on the other - but make sure you know which is higher priority
- Avoiding political fights you can't win, whether about technical decisions or underperforming teams, is a good way to avoid being blocked
- Sequence your work so that the likely blockers are tackled first, so you can work on other tasks in the meantime
- When blocked by other teams, you can always enlist your management chain - but be careful you don't do this too often or when it's really a technical problem

[^1]: When I say blocked, I mean all the situations that could cause you to mark a work ticket as "blocked" or to say "I'm blocked" in a standup meeting: code reviews, database migrations, waiting on a critical answer, needing approval from some other team, or just having no idea how to proceed.

[^2]: If you want me to write more about this, let me know!