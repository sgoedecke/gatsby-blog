---
title: Working with product managers
description: 
order: 204
date: '2026-06-08'
tags: ["tech companies"]
---

The relationship engineers have with product management is more dysfunctional than with any other part of the company. There's no shared culture or language like there is with other engineers, and the rules of "who gets to tell who what to do" aren't as clear-cut as they are with managers. Engineers don't have a lot in common with legal, or design, or sales, but they also don't need to interact much with those roles. In my experience, engineers are communicating with product managers almost every single day.

### Against the "product mommy"

The worst version of the product/engineering relationship goes something like this. Engineers are technically competent but are too autistic to be fully trusted. They need a kind-but-stern parental figure who knows how to communicate to other stakeholders in the organization (for instance, by being comfortabel using the word "stakeholders"), and how to keep engineers from going off in the wrong direction. This entire gross dynamic is neatly captured by the popular term ["product mommy"](https://x.com/search?q=%22product%20mommy%22&src=typed_query)[^1]:

![product mommy](product-mommy.png)

I really, really don't like that term, or this entire dynamic in general. Almost none of my relationships with my product managers have been anything like this, though I have seen it at a distance.

Working well with product managers can be the difference between succeeding and failing at a company. Why is it so hard to maintain good relationships between engineering and product? What does a good relationship look like?

### Why it's so hard to build trust

Product managers and engineers have largely non-overlapping skillsets. Product managers don't understand the technical work engineers do and aren't equipped to talk about it: if an engineer gives a technical reason for something, product managers generally have to shrug and say "sure, I guess". Likewise, engineers don't have anything like the visibility into the organization that product managers do. Particularly in large organizations, it is the product manager who is the source of truth about who wants what and which features are important. When a product manager says that something is critical, engineers generally have to shrug and say "sure, I guess".

This obviously requires a lot of trust. What's a little less obvious is that **this trust is continually broken by both sides**. Every single product manager has been told _thousands_ of times that technical task X is technically impossible or would be disastrous, only for that task to end up being done fairly smoothly and successfully. Every single engineer has been told _thousands_ of times that requirement X is absolutely critical and worth going to enormous effort for, only for that requirement to be silently dropped or changed with no apology.

Of course this isn't malicious. Engineers often give wrong estimates because [estimation is impossible](/how-i-estimate-work/), and sometimes the dire consequences they warn about really do happen (they're just handled behind the scenes, like engineers handle many other kinds of technical dysfunction). Product managers "change their minds" because what's important in a large tech company does genuinely change hour-by-hour[^2], and even the best attempts to only filter the most reliable priorities through to the engineering team will sometimes go wrong.

However, the consequence of this broken trust is that the relationship becomes very difficult to maintain. When you're an engineer, and you explain something to your product manager, and you _know_ they don't believe you (despite having no ability themselves to judge the question), it can be incredibly frustrating. Likewise, when you're a product manager, and you're desperately trying to explain what we need to do to an engineer, and you know they're internally shrugging their shoulders, it must be unbearable. Don't they know this is critical to the company? You were just in a meeting with the leaders of the organization!

### Why building trust is important anyway

Why bother? If it's so hard to hammer out a good working relationship with product managers, why not just settle for a bad one? Two reasons: product managers can absolutely bury you if you're not careful, and working with a good product manager can make it infinitely easier to ship projects.

Product managers are _almost_ always more politically sophisticated than engineers. This is partly structural: product managers are simply in more conversations with the company's movers and shakers, and so naturally have a better relationship with them (and are thus better attuned to which way the wind is blowing). It's also partly selection bias: engineers can be hired even with relatively poor social skills, because they're primarily being assessed on technical ability, but social skills are a core part of the product role[^3].

**If you are feuding with a product manager, you will probably lose**. They will simply have far more opportunities to quietly talk you down in influential circles than you will. In the case where you are _openly_ feuding with a product manager, the company's leaders will by default take the product manager's side over yours. They're likely to know them better, have more shared cultural context with them, and in general be willing to interpret the situation as "another engineer who doesn't understand how the organization works".

### Who is a product manager?

Ironically, the advent of AI coding should make it easier for engineers to understand this dynamic, because **product managers interact with engineers like many engineers interact with LLMs**.

Like a product manager with engineers, you don't have any real visibility into what the LLM's mental model of the system is. You're forced to interact with it like a black box. Sometimes this is very rewarding: you give some minimal guidance and the LLM goes away and produces a functional change, with some edge cases covered that you didn't think of. Sometimes it's infuriating: the LLM seems to ignore parts of what you're saying, keeps repeating the same silly complaints, and acts more like a saboteur than an assistant.

When I find a LLM and harness that works for you, I tend to stick to it. I'm very reluctant to try brand new models or tools until they've been around long enough to garner a positive reputation. Until then, I simply don't trust them.


[^1]: Unlike most roles in teech, product management (particularly the lower-level roles that are more engineer-facing) has close to an [even](https://www.productplan.com/blog/gender-diversity-better-products) gender split.

[^2]: For instance, based on the whims (or snap decisions, more charitably) of the CEO.

[^3]: I have worked with product managers with poor social skills, but it's rare: about as rare as working with engineers with genuinely poor (i.e. by general-population standards) technical skills.

people vs autism; product mommy (yuck)

High product context, low technical context, hungry for data
Generally interact with engineers in an instrumental black-box-y way - kind of how you'd interact with a LLM, just pulling the lever and trying to influence vaguely
Given that it's _all_ about trust. If you are a trusted source of technical information for them that's the relationship sorted
Many have a kind of default-distrust relationship with engineers (don't blame them - if you couldn't read PR contents and had to just trust engineers, what % of your colleagues would you feel comfortable with them pushing changes?) So if you say something can't be done, and you haven't built up trust, they might not hear you (because they've been told that before by engineers who were wrong about it)
Typically much more politically sophisticated, and in more important meetings than an equivalent-level engineer, so _beware_: they can absolutely bury you if you're not careful
Typically _want to get the project shipped_, very attuned to all the things that have to come together. Can be an extremely useful ally for non-technical conversations
If in a meeting with them & other teams, bias towards letting them speak first, and never flat-out contradict. Your job is to let them handle the interaction and project the technical confidence that they won't have