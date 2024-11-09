---
title: "How to ship projects at tech companies"
description: "What I think about when I'm lead engineer on a project"
order: 16
---

I have shipped a lot of different projects over the last ~10 years in tech, and I often get tapped to lead new ones when it's important to get it right. I am good at shipping. Shipping is a different skill to writing code or even building features, and lots of people who are great at writing code are terrible at shipping.

Here's what I think about when I'm leading a project and what I've seen people get wrong.

## Shipping is hard

The thing I've seen most people misunderstand is that shipping is hard. The default state of a project is to _not ship_: to be delayed indefinitely, or to miss the original purpose and accomplish nothing, or to go out half-baked and burst into flames. Projects do not ship automatically once all the code has been written or all the Jira tickets closed. Projects ship because somebody forces them forward, against the technical and organizational inertia that builds up in every company.

That means that in almost all cases, **shipping has to come first**. You cannot have anything else as your top priority. If you spend all your time worrying about polishing the customer experience (for example), you will not ship! Obsessing over UX is praiseworthy behaviour when you are an engineer on the team, but a blunder if you are leading the project. You should cherish the other engineers on your team who are doing that work, and give them as much support as you can. But your primary concern has to be shipping the project. It is too hard a job to do in your spare time.

Almost always, projects ship because one single person makes them ship. To be clear, that person doesn't write all the code or do all the work, and I'm not saying the project could ship without an entire team behind it (often multiple teams). But it's _really important_ that one person on the team has an end-to-end understanding of the whole thing: how the project hangs together technically, and what product or business purpose it serves. Good teams and companies understand this, and make sure every project has a single responsible engineer (typically this position is called a "technical lead" or "DRI" role). Bad teams and companies don't do this, and projects live and die based on whether an engineer steps up into this role of their own accord.

## What is shipping?

I know it sounds extreme, but I think many engineers do not understand what shipping even is inside a large tech company. What does it mean to ship? It does _not_ mean deploying code, or even making a feature available to users. Shipping is a social construct within a company. **That means that a project is shipped when the key people at your company believe it is shipped.** If you deploy your system, but your manager or VP or CEO is very unhappy with it, _you did not ship_. (Maybe you shipped something, but you didn't ship the actual project.) You know you've shipped when your company's leadership acknowledge you've shipped. A congratulations message in Slack is a good sign, as is an internal blog post. It's even OK if you're the one to write that blog post, as long as it's then endorsed by your company's leadership.

This probably sounds kind of postmodern and circular, but I think it's a really important point. Of course if you deploy something that users love and makes a ton of money, you've shipped. But that's only true because satisfying users and making money is something that makes your leadership team happy. If you ship something users hate and makes no money, but your leadership team is happy, _you still shipped_. You can feel any way you like about that, but it's true. If you don't like it, you should probably go work for companies that really care how happy their users are.

## Communication

So if your primary job when shipping something is to make your company's leadership happy, what does that mean in practice? First, you have to get clear on what the company is looking to get out of the project. Sometimes it's extracting more money from a small set of users (e.g. enterprise features). Sometimes it's spending money to grow the total set of users (e.g. splashy free-tier features). Sometimes it's mollifying a particular very large customer by building a feature specifically for them. There are lots of reasons, and if you want to ship the project you need to know which ones apply in this case. It makes a huge difference to how you ought to approach the work.

However, there is one thing all projects have in common. Your leadership team (the people in your reporting chain who care about the project) will always have basically zero technical context compared to you. That means they will be trusting you for estimates, to answer technical questions, and to anticipate technical problems. **Maintaining that trust should be your top priority**. If they don't have faith in your ability to do the job and to keep them informed, you will not ship. They'll de-risk by cancelling the project, or letting it roll out with zero attention or celebration (remember that an un-celebrated launch is not a ship!) Alternatively, they'll sideline you and go to another engineer, who will then formally or informally be the one who actually ships the project.

How do you maintain trust with your leadership team? This could be a whole article (or book) by itself, but here's my summary:

- The best thing is a track record of having shipped in the past, if you can get it
- Project confidence (if you're visibly worried, they will be too)
- Project competence. You want to aim for something like a NASA mission control vibe
- Communicate professionally and concisely, and don't make them chase you for updates: post a daily or weekly thread somewhere

It is much, much more important to do these things than for the project to ship with zero bugs on the exact deadline. If a project has to be delayed for technical reasons, in my experience you will not suffer consequences so long as you communicate it clearly, confidently (and ideally with some warning). In fact, it's paradoxically often _better_ for you if there is some kind of problem that forces a delay, for the same reason that the heroic on-call engineer who hotfixes an incident gets more credit than the careful engineer who prevents one.

## Getting the details right

The most common way for a project to not ship is to miss a key detail. Sometimes it's a technical detail: maybe we rely on storing the user documents in Memcached, but many documents are multiple megabytes and will be larger than the Memcached block size. Sometimes it's a detail of coordination: maybe the platform team that owns Memcached was expecting one-tenth of the traffic our project will send them, so they call a meeting with the VPs and delay the project. Sometimes it's a legal detail: maybe the user data is unexpectedly sensitive, and our system doesn't have the controls we'd need to handle it safely. I want to make two points here: first, that these issues can come from anywhere, and are very hard to anticipate; and second, that dealing with them requires a deep technical understanding of the system and the ability to pivot quickly.

For instance, you may have read that first example and are now thinking "well, you could split the documents across multiple Memcached keys, or increase the block size, or move to Redis, etc...". All of those are potential solutions! But knowing which of those solutions will work - and more importantly, which of those solutions will not blow out the project timeline - is impossible unless you've got a deep understanding.

This is doubly important because the problem in question doesn't even need to be real. In the lead up to a project launch, it's very common for other teams or engineers to raise _potential_ problems (e.g. "hey, are we sure the user data will fit in Memcached?") If nobody steps forward and explains why this isn't a problem (or if it is, how it's being addressed before launch), the project will be delayed, and it will be your responsibility. Why? Because your manager (or their manager) will not know whether this is a serious problem. That's what they pay you for! If you're not stepping up to address it, they will naturally err on the side of caution and _not ship_.

## Can we ship right now?

The best way to anticipate problems is to deploy early. Feature flags are the best way I've seen to do this, but staging environments also work, and so on. The key thing is to get whatever you're building in front of as many eyes as possible: yours, but also other engineers, and ideally leadership, product, design and so on. Five minutes playing with the actual feature, even in a very rough state, will bring up issues that nobody anticipated. Being able to directly see it themselves also does wonders for reassuring leadership that you've got things under control.

In general, a helpful question to ask is **can I ship this right now?** Not this week, not today: right this second. If not, what would have to change for me to be able to ship _something_? If the ship needs a deploy, can that happen now behind a feature flag? If we're waiting on some other team to make a change on their end, can I make it so the system doesn't strictly require their change after all? For instance, if the platform team is setting up a cache layer, I could make it so my feature still works (albeit a little slower) if it can't find the cache.

Remember, your main priority is maintaining trust with your leadership team. Nothing builds trust like having fallback plans, because in case of emergency fallback plans indicate control over the situation. If the worst does happen and you can't release on the day, your manager will be much happier going to their manager about it if they can say something like "our options are to delay four days, or ship tomorrow by sacrificing X" - even if sacrificing X is a non-starter. That means they'll be more likely to interpret the delay as an unavoidable problem that you handled effectively, instead of as a mistake you made that means they can't rely on you.

## Courage

One mistake I see a lot of engineers make is getting to the point where they could deploy something and putting it off, or shying away from a scary deploy or scary change. If you want to ship, you need to do the exact opposite: you need to deploy as much as you can as early as possible, and you need to do the scariest changes as early as you can possibly do them. Remember that you have the most end-to-end context on the project, which means **you should be the least scared of scary changes**. Everyone else is dealing with more unknowns and is going to be even less keen to pull the big lever. (If there's some other engineer who is across all of this who you're waiting for, bad news: they're probably the one actually shipping your project).

## Summary

- Shipping is really hard and you have to make it your main priority if you want to ship
- Shipping doesn't mean deploying code, it means making your leadership team happy
- You need your leadership team to trust you in order to ship
- Most of the essential technical work is in anticipating problems and creating fallback plans
- You should asking yourself "can I ship right this second?"
- Have courage!