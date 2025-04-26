---
title: Grifters, believers, grinders, and coasters
description: Four archetypes in software engineering
order: 18
date: '2024-12-02'
tags: ["tech companies"]
---

Why do engineers get mad at each other so often?[^1] 

I think a lot of programmer arguments bottom out in a cultural clash between different kinds of engineers: believers vs grifters, or coasters vs grinders. I'm going to argue that good companies actually have a healthy mix of all four types of engineer, so it's probably sensible to figure out how to work with them.

Despite the names, I think grifters and coasters can be as good at their jobs as believers and grinders. I'm naming them this way because these are the names you'd give them when you're complaining about your coworkers, and this article is really aimed at people who are trying to have a bit more empathy for the assholes they work with. I myself fall mostly in the grifter + coaster quadrant, and [I think I'm great at my job](/how-to-ship). Here's a beautiful diagram:

![quadrants](quadrants.png)

These aren't immutable aspects of your personality. They're more categories for how you approach the job of software engineering - you'll move around between quadrants as you change your approach to work, for all the usual reasons.

## Grifters

Grifters play the game to win. They think carefully about the image they're presenting to leadership, they make tactical decisions around performance cycles, and they are comfortable speaking the language of the organization. They respect the company mission as written, but what they really value is what the leaders of the company show they care about. Despite the name, grifters are not _frauds_. In an organization that rewards shipping good code and delighting customers, grifters will ship good code and delight customers. But they won't sacrifice their own interests to ship good code and delight customers in an organization that rewards other behavior.

Grifters are good at getting stuff done in large organizations. You want a grifter leading a complicated engineering project, because a grifter understands the levers of power in a large organization and how to use them. Without any grifter involvement, projects tend to mysteriously stall out from lack of buy-in. However, Grifters aren't very good at changing the culture of their organizations. They tend to go with the current instead. If all you have are grifters, your organization will probably naturally devolve into a lowest-common-denominator culture. Grifters also aren't good at important work that's unrewarding. In most software companies, you really want a handful of engineers obsessing about issues like accessibility, security and performance all the time, even when the organization as a whole doesn't care about it. Those people probably won't be grifters. 

## Believers

Believers just want to do good work. They think making tactical decisions and "managing up" is slimy, and they don't do it. They truly value the company mission, or they wouldn't be there. Typically they're heavily invested in product decisions, and prioritize the user experience over profit. Believers are often under-promoted, either due to alienating leadership or just not investing enough effort into the promotion cycle. They're not _suckers_, though - they know the political cost they're paying by refusing to play the game. They're willing to pay that cost in order to work in accordance with their values.

Believers are good at keeping an organization focused on the customer. They're out there walking the walk and talking the talk, drumming into new hires that At This Company We Do Things Right. They're also good at keeping code quality up and obsessing over issues that require long-term maintenance (like performance). However, they can struggle when an organization changes focus. In my experience, as companies grow and move more into the enterprise market, there's usually a cohort of alienated believers who are made very unhappy. If your entire organization is believers, you'll be very well-equipped to execute but have zero flexibility. You're going to stick to the mission that everyone believes in, even if it runs the org directly into the ground.

## Coasters

Coasters are chill. They work enough to get the job done, but typically no further - above all else they avoid work they see as unnecessary. They typically do a lot of "hammock time": non-work activities where they ponder a work problem in the back of their minds (this is particularly true for senior+ engineers). They still take work seriously: when they're working, work has their full attention. But they don't force themselves to produce code when they're really not feeling it. Why go to a ton of effort to push out mediocre work when they can come back to it later and do it right?

Coasters are good at maintaining a calm, safe environment on teams. They're also good for teams that have a lot of last-minute requests or questions, because coasters have "slack in the system": they'll rarely be completely consumed by a particular task for days. But they're not as good for teams that have a lot of well-defined work queued up - for that, you want a grinder. A software engineering org could survive with all coasters, but when the pressure ramps up it's easier to have some grinders around.

## Grinders

Grinders are locked in. There's always something that needs doing and the grinder is ready to do it. They just love the mechanics of the job - writing code, reviewing PRs, answering questions on Slack - or at least they love being useful. They're always heads-down on a problem, sometimes to the point where they can't see the forest for the trees. Still, if you need something done fast, give it to a grinder.

The strengths of a grinder are obvious: they do a lot of work. The weaknesses are also pretty straightforward: when a grinder burns out, they burn out _hard_. In my experience, grinders also tend to be pretty high-strung, since operating with intensity for a long time puts strain on the whole system. If it's not obvious from the way I'm writing about this, I don't think being a grinder is sustainable as a general mode of operating (of course I'd say that, since I'm a coaster by nature). I've met a lot of junior engineers who are grinders, but very few staff+ engineers. I think that's no accident. You either learn to dial it back a bit in the first 5-10 years or you flame out of the industry entirely.

## Summary

* If you're a grifter, you need to figure out how to work with believers, because an all-grifter company isn't the kind of place you want to work.
* If you're a believer, you don't have to figure out how to work with grifters, but you'll probably have to be very selective about the companies you work for.
* If you're a grinder, you need to figure out how to work with coasters, because you're likely to become one at some point if you want to stay in the industry (or at minimum many of your peers will).
* If you're a coaster, you should try and be understanding about grinders running around stressing everyone out. You're only able to coast because someone is willing to occasionally grind.


[^1]: If you work in a very agreeable team and don't think this is true, go read the Hacker News comments on a randomly-chosen article.