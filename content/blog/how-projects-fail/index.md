---
title: How projects fail at large tech companies
description: 
order: 78
date: '2025-05-08'
tags: ["shipping", "tech companies"]
---

How do projects fail at large tech companies? As I've said [many](/how-to-ship) [times](/getting-things-done), failure means _executives aren't happy_ with how the project turned out. At healthy companies, that typically means that a sensible engineer wouldn't be happy either, because the project didn't work or users hated it. But what actually causes the projects to fail? I've seen a lot of projects go wrong - both up close and at a distance - in the last ten years. Here are the main reasons why.

### Doomed from the start

Lots of projects fail because there's no way they could possibly have succeeded. In American law, some cases get dismissed at "summary judgment": even if the plaintiff succeeds in proving everything they aim to prove, it still wouldn't add up to demonstrating enough illegal activity to win their case. At tech companies, some projects are like that: even if the plan goes off without a hitch[^1], the project is still doomed to fail.

**Some doomed projects begin with over-ambitious plans.** For instance, an executive (typically VP or C-suite) convinces themselves that their team can go up against Successful Company X, launches a project to go and duplicate their product, and two quarters later the whole thing is quietly shelved. Large tech companies often look at startups and think "we have many more engineers, why can't we do that?" That thought is the genesis of many, many failed projects[^2].

**Some doomed projects are based on a straightforward technical misunderstanding**: one topical form of that is an executive deciding that "we'll just perform X task automatically for users with AI", but the actual capabilities of AI don't really match up to the original dream. If company leadership has a strong relationship with competent senior engineers, this can _usually_ head off doomed projects like this. When a company tries to do a series of impossible things, that tends to indicate that the "inner circle" of trusted staff or principal engineers is either incompetent or doesn't have a good trust relationship with the company's product leaders.

### Lack of political support

Other times projects aren't doomed, but fail due to **a lack of political support**. Maybe the company _could_ execute successfully on the VP's plan, but they simply don't have enough backing to find out. Halfway through the project, the heavy-hitter engineers get pulled off onto other work (against the VP's vehement objections), so the launch is delayed and buggy. In the lead up to launch, the project doesn't get announced on the company's main marketing channels, so it struggles to get an initial user base. And at the first signs of failure, company leadership decides to abandon the project instead of salvaging it.

Every project - no matter how good or bad the idea - needs sustained political support throughout the entire project lifespan in order to succeed. Somebody in leadership has to fight off attempts to poach engineers onto other projects or to re-task the engineering team onto some new and shiny thing. After the project is first delivered to users, somebody in leadership has to make sure there's still a team whose job it is to respond to user feedback.

One classic example of this failure mode is **an unfortunately-timed change of leadership**. This is particularly true for multi-year projects like large infrastructure or language migrations. Suppose a new CTO (or chief architect, or principal engineer) is hired who really likes Scala, and convinces the organization to rewrite large sections of the system in Scala. This is a lot of work, but it keeps its momentum because the CTO keeps pushing it along. Two years in, the CTO leaves for greener pastures. This is probably bad news for people who were mid-Scala rewrite! Without constant pressure from leadership, teams start prioritizing more customer-facing things. VPs who had their own ideas start to push to get those worked on, now that the Scala work is less important. Eventually the whole thing just kind of stalls out midway, with some systems in Scala and some systems in other languages[^4].

### Just plain bad luck

Some projects fail because they get **hit by lightning**: a catastrophic, hard-to-anticipate stroke of bad luck that kills the entire thing. For instance, if a project happens to trigger a huge incident that takes the entire company down for two days, it's likely that the project will be saddled with a raft of deployment-slowing rules that will make it impossible to ever deliver effectively. This is true even if the incident was just bad luck, as many incidents are. Large tech companies are typically so risk-averse that they can't afford to take that chance - absent _substantial_ political air cover, they'll blame the incident on the project.

Other projects fail because they're **a sensible bet that didn't pan out**. Users are weird and hard to predict. You might build something that seems like it'll be a hit - maybe users are even asking for it - but ends up barely being used. Just bad luck! Tech companies will often keep trying for a while, since lots of successful products have a slow start, but eventually leadership will lose patience and stop supporting the project.

### Incompetent execution

Sometimes it isn't bad luck. Sometimes it's just sloppy execution - the project has reasonable goals, political support, and everything else it needs to succeed, but is just botched by the engineers who are carrying it out. If the lead engineer does the opposite of all the advice I give [here](/how-to-ship), the project will be a complete mess: uncoordinated, poorly communicated, important balls being dropped, and so on.

There are a few ways that this can end. The most optimistic way is that everything just kind of muddles through. The launch isn't very successful, and nobody quite knows what's going on, but the bugs do eventually get fixed and the initial users are patient enough to bear with the engineering team as they slowly figure out what needs to be done. The worst-case way is that poor execution _causes_ the kind of catastrophic incident that I mentioned in the previous section. 

The most common way is that company leadership (maybe your skip-level, maybe your local VP) identify this as a poorly-run project and take steps to limit the damage. This can look a lot like the project not getting the political support it needs - for instance, marketing might get de-emphasized - but in this case it's downstream of poor execution. Either way, the project launches with a whimper instead of a bang and is soon forgotten.

### Death by a thousand cuts

There's a failure mode that happens to good ideas that don't immediately have a powerful "patron" (typically a VP or member of the C-suite). Suppose an engineer comes up with a good idea and tries to sell the company on it. Their product manager says great idea, and offers a little tweak. So does their manager. Their skip-level manager loves the idea, and would especially love if it integrated with New Product Y that's about to launch - and also if it ships first on the company's new mobile app. And so on, until the initial good idea is so diluted by mandatory changes that it becomes a bad idea.

This happens because **you need a lot of buy-in to get something off the ground at a large tech company**. Many different people have to agree that it's worth doing. However, all of these people will have their own reasons for getting behind the idea (usually the reason will be that they think it'll help their own pet project succeed). So every piece of support you get will come with strings, and over time those strings can strangle your good idea before it really gets off the ground.

One way around this is to somehow get the CEO interested in the idea _first_. Then they can just tell other people to get behind the idea, instead of having to horse-trade[^3]. Another way around this is to run with the idea without getting buy-in (i.e. as a skunkworks project), and hope that you can make it work without the big company machinery behind it. These are both pretty risky. Going straight to the CEO is a great way to make your entire management chain hate you, and most skunkworks projects fail. But the fact that people try them anyway shows how dangerous death by a thousand cuts is.

### Summary

Projects fail at tech companies for lots of different reasons. I've seen examples of all of these (of course, none of the specific details above are 1:1 with my experience).

- Some projects are doomed from the start, either because they're wildly over-ambitious or because the idea is technically impossible
- Some projects could succeed, but don't have the political support to see it all the way through
- If a key leader pushing the project leaves the company, that usually kills the project
- Some projects fail from sheer bad luck: either users don't bite, or a one-in-a-million incident causes the project to be smothered by remediation work
- Other projects fail from poor engineering execution
- If projects don't have a powerful patron (e.g. they're driven by an engineer), every piece of leadership buy-in they get can come with strings that eventually strangle the whole thing

[^1]: Of course, this never happens.

[^2]: Why do large tech companies struggle to compete with startups? Many people have tried to answer that question in various ways, but it's pretty indisputable that they do.

[^3]: I think CEOs still have to do a lot of horse-trading, but much less than a poor engineer would.

[^4]: The half-finished rewrite will cause engineering pain for many, many years to come.