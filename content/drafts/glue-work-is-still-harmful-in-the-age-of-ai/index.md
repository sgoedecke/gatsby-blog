---
title: Glue work is still harmful in the age of AI
order: 269
description: 
date: '2026-11-08'
tags: ["ai", "software design"]
---

Now that LLMs are writing most of our code, does that free human engineers up to do more [glue work](https://www.noidea.dog/glue)? No, it doesn't.

I am not a believer in glue work[^1]. Processes that can only be sustained by the unrewarded sacrifice of engineers ought to die. For much more on that, see my 2024 post [_Glue work considered harmful_](/glue-work-considered-harmful/). I think AI makes glue work less important to companies, not more. Let's go through four reasons why.

First, **AI decreases the amount of coordination needed to ship**. The magnifying effect of AI agents means that any single engineer can now take on projects that would previously have needed a small team. A lot of glue work was helping with coordination: booking kickoff and status meetings, passing around internal updates, and so on. A single engineer doesn't need to do any of that.

Second, **engineers in the 2020s require less "careful handling"**. In my experience, the most important subcategory of coordination-based glue work was _managing difficult people_. Many companies have secret gatekeepers: engineers with outsized influence and large egos who will shoot down your project if they feel insufficiently consulted. I've written before about how some teams are [structurally set up](/good-code-reviews/#most-reviews-should-be-approvals) to be gatekeepers, and how some engineers could get by in the 2010s by basically [saying no to everything](/the-just-say-no-engineer-was-a-zirp-phenomenon/). The [end of ZIRP](/good-times-are-over/) changed all that. Many of the prickliest gatekeepers have been forced out of the industry or coerced into changing their attitude, which reduces the amount of necessary glue work required to ship.

Third, **people are hiring less juniors**. This is [probably a bad thing](/juniors-and-ai/) for the industry, but it does also eliminate a big category of glue work. Experienced hires need less hand-holding, so companies don't need people to quietly volunteer to onboard new hire.

Fourth, **write-only reports can be automated with LLMs**. A lot of glue work was what I call ["proof of work"](/writing-is-no-longer-proof-of-work/): writing a report to demonstrate that you're aware of what your team is doing, or filling in a template to satisfy some legal requirement. This was often work that nobody wanted to do, so it relied on someone volunteering to "be glue". Now reports like these can be quickly turned out with LLMs. It doesn't really matter that nobody wants to read LLM text, because the point of these reports was never to be read anyway.

Can LLMs just automate all glue work? Absolutely not. Many engineers are trying to do this out of a kind of manic optimism, but it's a really bad idea. Write-only reports are one thing, but **communicating to other engineers cannot be delegated to a LLM**. When you need to check in on the status of a project, or respond to someone else's ping, or anything like that, you should compose and write the message yourself. Nothing will torch your relationship with other engineers as quickly as making them talk to your Claude Opus instance.

So where does that leave us? More or less where we were [in 2024](/glue-work-considered-harmful/), I think. Avoid at all costs becoming "the glue work person", let bad processes fail so they can be changed, but be willing to do small amounts of tactical glue work where it can meaningfully contribute to the success of your projects. Most of your time and effort should still be spent on the code: on [driving AI agents](/getting-good-at-ai-takes-time-and-practice/) and [aligning them with your company's values](/human-ai-partnerships-are-for-alignment-not-capability/).


[^1]: Glue work is all the squishy "non-technical" work that goes into building software: making sure teams are talking to each other, writing reports, updating docs, onboarding engineers, and so on. Specifically it's the parts of that work _that are not included in the formal process_, and that only really get done if someone volunteers to do it.