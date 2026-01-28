---
title: How I estimate work as a staff software engineer
description:
order: 169
popular: true
date: '2026-01-24'
tags: ["tech companies", "how to"]
---

There's a kind of polite fiction at the heart of the software industry. It goes something like this:

> Estimating how long software projects will take is very hard, but not impossible. A skilled engineering team can, with time and effort, learn how long it will take for them to deliver work, which will in turn allow their organization to make good business plans.

This is, of course, false. As every experienced software engineer knows, **it is not possible to accurately estimate software projects**. The tension between this polite fiction and its well-understood falseness causes a lot of strange activity in tech companies.

For instance, many engineering teams estimate work in [t-shirt sizes](https://asana.com/resources/t-shirt-sizing) instead of time, because it just feels too obviously silly to the engineers in question to give direct time estimates. Naturally, these t-shirt sizes are immediately translated into hours and days when the estimates make their way up the management chain.

Alternatively, software engineers who are genuinely trying to give good time estimates have ridiculous [heuristics](https://news.ycombinator.com/item?id=19671824) like "double your initial estimate and add 20%". This is basically the same as giving up and saying "just estimate everything at a month".

Should tech companies just stop estimating? One of my guiding principles is that **when a tech company is doing something silly, they're probably doing it for a good reason**. In other words, practices that appear to not make sense are often serving some more basic, [illegible](/seeing-like-a-software-company) role in the organization. So what is the actual purpose of estimation, and how can you do it well as a software engineer?

### Why estimation is impossible

Before I get into that, I should justify my core assumption a little more. People [have](https://world.hey.com/dhh/software-estimates-have-never-worked-and-never-will-a41a9c71) [written](https://news.ycombinator.com/item?id=18487253) [a lot](https://medium.com/@riaanfnel/the-problem-with-estimates-f3d5cddd5e62) about this already, so I'll keep it brief.

I'm also going to concede that **sometimes you can accurately estimate software work**, when that work is very well-understood and very small in scope. For instance, if I know it takes half an hour to deploy a service[^1], and I'm being asked to update the text in a link, I can accurately estimate the work at something like 45 minutes: five minutes to push the change up, ten minutes to wait for CI, thirty minutes to deploy.

For most of us, the majority of software work is not like this. We work on poorly-understood systems and cannot predict exactly what must be done in advance. Most programming in large systems is _research_: identifying prior art, mapping out enough of the system to understand the effects of changes, and so on. Even for fairly small changes, we simply do not know what's involved in making the change until we go and look.

The pro-estimation dogma says that these questions ought to be answered during the planning process, so that each individual piece of work being discussed is scoped small enough to be accurately estimated. I'm not impressed by this answer. It seems to me to be a throwback to the bad old days of [software architecture](https://en.wikipedia.org/wiki/Software_architect), where one architect would map everything out in advance, so that individual programmers simply had to mechanically follow instructions. Nobody does that now, because it doesn't work: programmers must be empowered to make architectural decisions, because they're the ones who are actually in contact with the code[^2]. Even if it did work, that would simply shift the impossible-to-estimate part of the process backwards, into the planning meeting (where of course you can't write or run code, which makes it near-impossible to accurately answer the kind of questions involved).

In short: software engineering projects are not dominated by the known work, but by the unknown work, which always takes 90% of the time. However, only the known work can be accurately estimated. It's therefore impossible to accurately estimate software projects in advance.

### Estimates do not come from engineers

Estimates do not help engineering teams deliver work more efficiently. Many of the most productive years of my career were spent on teams that did no estimation at all: we were either working on projects that had to be done no matter what, and so didn't really need an estimate, or on projects that would deliver a constant drip of value as we went, so we could just keep going indefinitely[^3].

In a very real sense, **estimates aren't even made by engineers at all**. If an engineering team comes up with a long estimate for a project that some VP really wants, they will be pressured into lowering it (or some other, more compliant engineering team will be handed the work). If the estimate on an undesirable project - or a project that's intended to "hold space" for future unplanned work - is too short, the team will often be encouraged to increase it, or their manager will just add a 30% buffer.

One exception to this is projects that are technically impossible, or just genuinely prohibitively difficult. If a manager consistently fails to pressure their teams into giving the "right" estimates, that can send a signal up that maybe the work can't be done after all. Smart VPs and directors will try to avoid taking on technically impossible projects.

Another exception to this is areas of the organization that senior leadership doesn't really care about. In a sleepy backwater, often the formal estimation process does actually get followed to the letter, because there's no director or VP who wants to jump in and shape the estimates to their ends. This is one way that some parts of a tech company can have drastically different engineering cultures to other parts. I'll let you imagine the consequences when the company is re-orged and these teams are pulled into the spotlight.

**Estimates are political tools for non-engineers in the organization**. They help managers, VPs, directors, and C-staff decide on which projects get funded and which projects get cancelled. 

### Estimates define the work, not the other way around

The standard way of thinking about estimates is that you start with a proposed piece of software work, and you then go and figure out how long it will take. **This is entirely backwards.** Instead, teams will often start with the estimate, and then go and figure out what kind of software work they can do to meet it.

Suppose you're working on a LLM chatbot, and your director wants to implement "talk with a PDF". If you have six months to do the work, you might implement a robust file upload system, some pipeline to chunk and embed the PDF content for semantic search, a way to extract PDF pages as image content to capture formatting and diagrams, and so on. If you have one day to do the work, you will naturally search for simpler approaches: for instance, converting the PDF to text client-side and sticking the entire thing in the LLM context, or offering a plain-text "grep the PDF" tool.

This is true at even at the level of individual lines of code. When you have weeks or months until your deadline, you might spend a lot of time thinking airily about how you could refactor the codebase to make your new feature fit in as elegantly as possible. When you have hours, you will typically be laser-focused on finding an approach that will actually work. There are always many different ways to solve software problems. Engineers thus have quite a lot of discretion about how to get it done.

### How I estimate work

So how do I estimate, given all that?

**I gather as much political context as possible before I even look at the code**. How much pressure is on this project? Is it a casual ask, or do we _have_ to find a way to do this? What kind of estimate is my management chain looking for? There's a huge difference between "the CTO _really_ wants this in one week" and "we were looking for work for your team and this seemed like it could fit".

Ideally, I go to the code **with an estimate already in hand**. Instead of asking myself "how long would it take to do this", where "this" could be any one of a hundred different software designs, I ask myself "which approaches could be done in one week?".

**I spend more time worrying about unknowns than knowns**. As I said above, unknown work always dominates software projects. The more "dark forests" in the codebase this feature has to touch, the higher my estimate will be - or, more concretely, the tighter I need to constrain the set of approaches to the known work.

Finally, **I go back to my manager with a risk assessment, not with a concrete estimate**. I don't ever say "this is a four-week project". I say something like "I don't think we'll get this done in one week, because X Y Z would need to all go right, and at least one of those things is bound to take a lot more work than we expect. Ideally, I go back to my manager with a _series_ of plans, not just one:

- We tackle X Y Z directly, which _might_ all go smoothly but if it blows out we'll be here for a month
- We bypass Y and Z entirely, which would introduce these other risks but possibly allow us to hit the deadline
- We bring in help from another team who's more familiar with X and Y, so we just have to focus on Z

In other words, I don't "break down the work to determine how long it will take". My management chain already knows how long they want it to take. **My job is to figure out the set of software approaches that match that estimate.**

Sometimes that set is empty: the project is just impossible, no matter how you slice it. In that case, my management chain needs to get together and figure out some way to alter the requirements. But if I always said "this is impossible", my managers would find someone else to do their estimates. When I do that, I'm drawing on a well of trust that I build up by making pragmatic estimates the rest of the time.

### Addressing some objections

Many engineers find this approach distasteful. One reason is that they don't like estimating in conditions of uncertainty, so they insist on having all the unknown questions answered in advance. I have written a lot about this in [_Engineers who won’t commit_](/taking-a-position) and [_How I provide technical clarity to non-technical leaders_](/clarity), but suffice to say that I think it's cowardly. If you refuse to estimate, you're forcing someone less technical to estimate for you.

Some engineers think that their job is to constantly push back against engineering management, and that helping their manager find technical compromises is betraying some kind of sacred engineering trust. I wrote about this in [_Software engineers should be a little bit cynical_](/a-little-bit-cynical). If you want to spend your career doing that, that's fine, but I personally find it more rewarding to find ways to work with my managers (who have almost exclusively been nice people).

Other engineers might say that they rarely feel this kind of pressure from their directors or VPs to alter estimates, and that this is really just the sign of a dysfunctional engineering organization. Maybe! I can only speak for the engineering organizations I've worked in. But my suspicion is that these engineers are really just saying that they work "out of the spotlight", where there's not much pressure in general and teams can adopt whatever processes they want. There's nothing wrong with that. But I don't think it qualifies you to give helpful advice to engineers who do feel this kind of pressure.

### Summary

I think software engineering estimation is generally misunderstood.

The common view is that a manager proposes some technical project, the team gets together to figure out how long it would take to build, and then the manager makes staffing and planning decisions with that information. In fact, it's the reverse: a manager comes to the team with an estimate already in hand (though they might not come out and admit it), and then the team must figure out what kind of technical project might be possible within that estimate.

This is because estimates are not by or for engineering teams. They are tools used for managers to negotiate with each other about planned work. Very occasionally, when a project is literally impossible, the estimate can serve as a way for the team to communicate that fact upwards. But that requires trust. A team that is always pushing back on estimates will not be believed when they do encounter a genuinely impossible proposal.

When I estimate, I extract the range my manager is looking for, and only then do I go through the code and figure out what can be done in that time. I never come back with a flat "two weeks" figure. Instead, I come back with a range of possibilities, each with their own risks, and let my manager make that tradeoff.

**It is not possible to accurately estimate software work.** Software projects spend most of their time grappling with unknown problems, which by definition can't be estimated in advance. To estimate well, you must therefore basically ignore all the known aspects of the work, and instead try and make educated guesses about how many unknowns there are, and how scary each unknown is.


edit: I should thank one of my readers, Karthik, who emailed me to ask about estimates, thus revealing to me that I had many more opinions than I thought.

edit: This post got a bunch of comments on [Hacker News](https://news.ycombinator.com/item?id=46742389). Some non-engineers made the [point](https://news.ycombinator.com/item?id=46744538) that well-paid professionals should be expected to estimate their work, even if the estimate is completely fictional. Sure, I agree, as long as we're on the same page that it's fictional!

A couple of [engineers](https://news.ycombinator.com/item?id=46744696) [argued](https://news.ycombinator.com/item?id=46744876) that estimation was a solved problem. I'm not convinced by their examples. I agree you can probably estimate "build a user flow in Svelte", but it's much harder to estimate "build a user flow in Svelte _on top of an existing large codebase_". I should have been more clear in the post that I think that's the hard part, for the normal reasons that it's very hard to work in large codebases, which I [write](/large-established-codebases) [about](/wicked-features) [endlessly](/clarity) on this blog.

edit: There are also some comments on [Lobste.rs](https://lobste.rs/s/dspppf/how_i_estimate_work_as_staff_software), including a good [note](https://lobste.rs/c/i0sxht) that the capability of the team obviously has a huge impact on any estimates. In my experience, this is not commonly understood: companies expect estimates to be fungible between engineers or teams, when in fact some engineers and teams can deliver work ten times more quickly (and others cannot deliver work _at all_, no matter how much time they have).

Another commenter [politely suggested](https://news.ycombinator.com/item?id=46745726) I read [_Software Estimation: Demystifying the Black Art_](https://www.amazon.com.au/Software-Estimation-Demystifying-Black-Art/dp/ 0735605351), which I've never heard of. I'll put it on my list.

There are also some [comments](https://www.reddit.com/r/programming/comments/1qoj5mb/how_i_estimate_work_as_a_staff_software_engineer/) on Reddit's r/programming subreddit: mostly people just generically discussing estimation, but there are [interesting anecdotes](https://www.reddit.com/r/programming/comments/1qoj5mb/comment/o22t1vm/) and [good criticism](https://www.reddit.com/r/programming/comments/1qoj5mb/comment/o2271vx/) of the post.


[^1]: For anyone wincing at that time, I mean like three minutes of actual deployment and twenty-seven minutes of waiting for checks to pass or monitors to turn up green.

[^2]: I write a lot more about this in [_You can't design software you don't work on_](/you-cant-design-software-you-dont-work-on).

[^3]: For instance, imagine a mandate to improve the performance of some large Rails API, one piece at a time. I could happily do that kind of work forever.