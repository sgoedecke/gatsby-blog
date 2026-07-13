---
title: What does "playing politics" mean in a tech company?
description: 
order: 212
date: '2026-07-12'
tags: ["tech companies"]
---

Software engineers are [often told](https://old.reddit.com/r/ExperiencedDevs/comments/1urg0tk/whats_the_best_advice_youve_received_from_a/owfi7dq/) to "start playing politics", but most engineers have no idea what that means. Their reference point for "playing politics" comes from fiction like Game of Thrones. Are they supposed to raise an army and depose the CEO, or poison each other at team lunch? Should they book Zoom calls with each other and plot schemes? All of that is obviously ridiculous.

In terms of Game of Thrones, software engineers are not lords and ladies. We're the soldiers and workers of the realm. So you should think about "playing politics" in the way a castle guard would, not one of the major players. The castle guard are not going around poisoning people or forming coalitions between the great powers. They are largely keeping their heads down. But in order to do that, they have to stay aware of the political currents, or they're liable to do something catastrophically stupid: for instance, making an enemy of a powerful courtier, or arresting somebody who's on an important mission for the king.

Given that, the basic principles of playing politics are something like this:

- Be aware of who's powerful and who's not
- At all costs, avoid making powerful enemies
- Help powerful people as best you can
- Make sure they know you're helping them (without annoying them)

### Be aware of who's powerful and who's not

As a software engineer in a large company, **you will not be a powerful person**. Powerful people are typically in senior management: VPs, directors, and so on[^1]. However, not everyone in senior management is powerful. Some are killers who have the active support of the CEO, while others are confused incompetents.

How do you know which is which? If someone is clearly ferociously competent, they're always going to have _some_ power, since upper management tend not to ignore useful tools. But you can't rely on competence as your only guide. Some managers are powerful for other reasons: they're friends with the CEO, or they have strong relationships with other groups like legal or sales, or they're simply willing to do whatever upper management wants done.

One signal is who's leading the important projects. Read your CEO or CTO's internal updates and pay attention to the projects that are called out by name. Organizations always give key tasks to trusted lieutenants. If a manager is leading an area that's never under [the spotlight](/the-spotlight/), they probably don't have enough clout.

Another signal is hiring. Is a manager's team growing or shrinking? Particularly [post-ZIRP](/good-times-are-over/), headcount is a rare and precious resource. A manager who's able to get it is likely a powerful manager, or at least is reporting to a powerful director or VP (which often amounts to the same thing).

### At all costs, avoid making powerful enemies

First, you should try not to make any enemies at all. Most software engineers who get "playing politics" wrong do it by needlessly alienating people: by being rude, unhelpful, abrasive, making non-technical people feel stupid, and so on. This post isn't really about that. I'm assuming that you can figure out how to be a generically pleasant person on your own.

However, **competent software engineers will make some enemies**. If you're out there making projects happen, some people aren't going to like the way you do it, and won't be a fan of any compromise you offer. I wrote about this in [_Big tech engineers need big egos_](/big-tech-needs-big-egos/): the only way to avoid making enemies is to change nothing, but that's incompatible with doing the job.

Given that, you should be selective about _which_ enemies you make. If you're making a technical decision that's either going to require work from team A or team B, and neither team wants to do it, you should try to pick the team with the least political cover. If you need a powerful VP's team to do something they won't like, try to be maximally respectful about it: get that team's core engineers on-side if you can, or book a meeting with the powerful manager and explain the situation, or (better yet) ask the powerful manager sponsoring your project to go and talk to the other VP for you. (If you don't have a powerful manager like this, consider abandoning your project).

**Give way to powerful managers when at all possible.** Every so often you really do have to stand your ground - if the system will collapse otherwise, or a major customer will have a incident, or if the technical decision really is entirely bone-headed - but most cases are not like this. The best advice I've ever gotten about playing politics came from an old manager of mine[^2]:

> This is not the hill you want to die on.

When I'm about to pick a fight or say something argumentative, and I'm not 100% convinced it's necessary, I ask myself: is this the hill I want to die on? And it never is.

If you have powerful enemies at a company (for instance, the CTO or an influential VP doesn't like you), **quit**. It's really that bad. I have never seen this situation turn itself around, except in the very rare case where the CTO or VP is already looking for greener pastures and jumps ship. You cannot recover the situation: they have no incentive to give you the chance to change their mind, and they have almost unlimited ability to screw you on promotions, raises and layoffs.

That's why this piece of advice is second in the list. If you aren't helpful or if your contributions are invisible, you can work on that and fix it. But if you've made powerful enemies, you're done for. At all costs, avoid making powerful enemies in the first place.

### Help powerful people as best you can

Just as it's fatal to make powerful enemies, it's very useful to make powerful friends. How can you do this? Remember you're a palace guard, not a great lord: you make friends **by doing your job**. However, you can choose to do your job a little more proactively and diligently when you're doing it for someone with political clout.

One obvious application of this principle is that **you should answer Slack messages from powerful people immediately**. If you see an ordinary Slack question pop up while you're doing some task, it's okay to get to it when you get to it. In fact, it's ideal _not_ to respond to all questions immediately, so you don't set unreasonable expectations (and so you don't seem like you're sitting around doing nothing). But when a VP comes in with a question, don't make them wait: answer the question immediately. If the question requires research, send a "let me look into that right now" message, then do the research. This is the easiest way to get a reputation for being helpful[^3].

Another way to do this is to **lean in on important projects**. Suppose you do ten projects in a year. Eight of them are normal, low-priority projects, and two of them are high-profile (say, finishing some big feature before your company's yearly conference). It's a mistake to allocate your effort equally to all ten. I wrote about this at length in [_Doing nothing at work_](/doing-nothing-at-work/): you should be operating at 80% capacity (or less), so you can then ramp up to 120% when it really matters.

Finally, an underrated way to help powerful people is to offer them social support and information. Slack messages and planning emails might seem unimportant to you, but powerful people often live in that environment: their primary tool is writing messages like these, just like your primary tool is writing code. Reading and responding (in a supportive way) to these messages is something that most engineers don't bother to do, but it goes a long way.

Likewise, dropping a senior manager a line now and then (say, a heads-up that a particular project landed successfully, or that you got good metrics about some feature) is surprisingly helpful. Senior managers live in an information-poor environment: for them to learn something about a team's work, that information has to bubble up through several layers of interpretation and summary. In my experience, they're appreciative of being drip-fed the occasional piece of information, so long as you keep it brief and relatively rare.

### Make sure they know you're helping them

If you're directly responding to a VP's Slack messages or DMing them information, they know you're the one doing it. But if you're just doing your job and working hard on projects they care about, they might not notice. **Being invisible is probably the most common way engineers fail at playing politics.**

Fortunately the fix is simple: tell people what you're doing. If you fix an important bug for a launch, write a message in that launch's Slack channel saying "hey, I just fixed this bug". What if you don't like bragging? Get over it. You have to be comfortable publicly telling people what you've done. You should also keep a [brag document](https://jvns.ca/blog/brag-documents/) so you can repeat all of this at review time.

Another, subtler way to do this is to gain the trust and respect of the powerful engineers in your area. Senior managers will always have a few trusted engineers they rely on to assess technical questions. The best way to gain a senior manager's trust is to have an engineer they already trust say "hey, Sean was instrumental to this launch, he did X Y and Z".

### Technical power

Is playing politics all about sucking up to senior managers? Basically, yeah. You could be more generous and [describe it](/shareholder-value/) as "aligning with the values of the company", but what that comes down to is figuring out what the people in charge want, giving it to them, and making sure they see you doing it. However, there's still some scope to get what _you_ want out of the deal.

I said earlier that software engineers do not wield organizational power. But that doesn't mean you're powerless. Technical ability is a source of real power, if a delicate one. The movers and shakers in tech companies are utterly dependent on technical people to implement their vision and to give them clear answers about the system.

There are many subtle ways you can use this power. One I wrote about in [_How I influence tech company politics as a staff software engineer_](/how-to-influence-politics/) is to wait until important people at the company want to do something (say, improve reliability), then offer them a technical plan that does it your way. Another one is to become so useful that you're actively in demand to lead projects, and then run the project how you want.

You probably won't be able to change the company's grand strategy. But how that strategy is _implemented_ has a lot of specific technical detail, and you can put yourself in a position to decide on those details.

[^1]: Obviously the exact titles depend on your company.

[^2]: Ironically, this manager struggled to take his own advice and was eventually forced out.

[^3]: Note that you actually have to be able to answer their question accurately in order to do this. If you're not competent enough to be useful to powerful people, you will struggle to befriend them.


what is playing politics? what is "not playing politics"? 
https://old.reddit.com/r/ExperiencedDevs/comments/1urg0tk/whats_the_best_advice_youve_received_from_a/

- being aware of who calls the shots and who doesn't
- having a sense of what to take seriously and what not to
- signaling willingness to support people (leaving Slack emoji reacts is politics, agreeing/disagreeing with suggestions is politics)

'playing politics' typically just means 'don't do anything catastrophically stupid'
