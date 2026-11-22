---
title: When in doubt, flail about
order: 274
description: 
date: '2026-11-23'
tags: ["tech companies", "good engineers"]
crossPostText:
  x: |-
    When you’re working in an unclear situation — you have no clear guidance, or you don’t know what will help — the best course of action is often just to flail about.
  linkedin: |-
    When you’re working in an unclear situation — you have no clear guidance, or you don’t know what will help — the best course of action is often just to flail about. This sounds counter-intuitive. Wouldn’t it be better to be cautious and wait until you have a better understanding of what’s going on? Typically not. If you do it right, flailing about is the best and quickest way to get that understanding and become useful.
crossPosts:
  x: "https://x.com/i/status/2124625095247225301"
  linkedin: "https://www.linkedin.com/feed/update/urn:li:share:7530390789743493120/"
---

When you're working in an unclear situation - you have no clear guidance, or you don't know what will help - the best course of action is often just to flail about. This sounds counter-intuitive. Wouldn't it be better to be cautious and wait until you have a better understanding of what's going on? Typically not.

This is definitely [dangerous advice](/dangerous-advice/). Flailing badly is a great way to damage your reputation at a tech company. We've all worked with engineers who seem to have nothing but bad ideas, and who are constantly pushing one stupid plan or another[^1]. But if you do it right, flailing about is the best and quickest way to get that understanding and become useful.

### How to flail

How do you flail _well_?

- Try a lot of different things
- Pay very careful attention to feedback
- Ruthlessly drop things that are not getting positive feedback

Trying a lot of different things is the key to the other two points as well. First, the entire point of flailing is to get direct contact with as many different bits of reality as you can. Think of yourself as a caveman learning how to use an iPhone: the first step is to just hit all the buttons and see what happens.

Second, you need to try lots of things because **most of your plans will suck**. You're flailing because you don't know enough to just do the right thing, after all. If you just try one thing, it will probably be a bad idea; if you try ten things, one of them might turn out to be good. Because you're not equipped to judge which is which, you need to be extremely sensitive to feedback[^2].

Third, trying many things also ensures that you're not over-invested in them. If you only have one plan, you'll want it to succeed. If you have ten plans, you only care about _one_ of them succeeding, so you can drop plans that are failing. Since most of your plans will suck, this is critical.

### When to flail

Coincidentally[^3], there are also three types of flailing that most engineers will encounter.

The first is **product flailing**. When you're working on a feature that doesn't really have product-market fit yet, _everyone_ is in a state of uncertainty. You will typically have some central idea about where the value is, but there's a lot of room to wiggle (i.e. flail) around the margins. When I worked on [GitHub Models](https://github.blog/news-insights/product-news/introducing-github-models/) (now [retired](https://docs.github.com/en/github-models)) I built a lot of features or integrations that didn't really work. However, one of those - allowing AI inference to run from a GitHub Actions token - was surprisingly sticky, and turned out to be the [seed](https://githubnext.com/projects/continuous-ai/) of ["Continuous AI"](https://github.blog/ai-and-ml/generative-ai/continuous-ai-in-practice-what-developers-can-automate-today-with-agentic-ci/). If you're working on a brand-new product and you're not flailing, you're likely investing a ton of effort into ideas that were always doomed. Far better to flail around until you find something with traction, then commit hard to that.

The second is **engineering flailing**. Sometimes a system is so difficult that it's hard to see where you'd even begin improving it: either it's so tangled up, or it's already so optimized, or it's just so large and unknown. Some engineers like to sit down and carefully work their way through the entire system before recommending changes. I think this is [foolish](/in-defense-of-not-understanding-your-codebase/). Modern large software systems are too complex and are changing too fast to do that. Instead, I recommend making a bunch of speculative changes[^4] and just seeing how it looks (or how it performs). If it doesn't seem like an improvement, drop it immediately; if it does, dig in and figure out why.

The third - the one most relevant to senior and staff engineers - is **organizational flailing**. Often I'm put in a situation where the problems are not technical: usually two teams aren't talking to each other, or some team is unhappy and the director/VP isn't quite sure why. What do you do then? Well, I recommend flailing! Just try a bunch of things that you think might help[^5]: automate pieces of manual work, volunteer to take over tasks, suggest long-term plans that could conceivably make things much better, and so on. Most of these won't be useful, but it at least shows that you're trying, which can go a long way in situations like this. A note of caution: this is the case where it's most critical to be sensitive to feedback. If you instantly drop some plan of action that is failing, you can build trust; if you miss that feedback and press on, the people you're helping will start to point their anger and unhappiness at you.

### Why call it flailing?

Why am I calling this "flailing" when it sounds like a sensible approach? Because **it feels like flailing from the inside**. Your manager will (hopefully) look at you and see a proactive engineer experimenting with solutions, but you will feel like you're repeatedly failing: acting with insufficient information, trying a bunch of stuff that doesn't work, and in general making a fool out of yourself. This feeling is normal, but you must ignore it.

The unpleasant sense that you're flailing is one of the many psychological barriers[^6] you need to push through in order to be an effective engineer. Knowing ahead of time that it's going to feel like flailing can help you recognize the emotion and treat it as a positive signal instead of as a sign you're in trouble. So long as you're sensitive to feedback and willing to instantly drop plans that aren't working, flailing can be an incredibly effective approach to difficult engineering and organizational problems.


[^1]: Working around people like this is one of the cardinal social skills of succeeding in big tech companies.

[^2]: Both from the people around you with more expertise and from reality itself (which plan actually lowers latency, increases user metrics, etc). Ideally you're dropping any plan that isn't getting "wow!" feedback.

[^3]: It really is a coincidence. I tried to come up with a fourth or cut it down to two to avoid the appearance of symmetry but couldn't.

[^4]: AI agents help with this a lot. You can just ask for five different refactors and skim them to see which one is most promising, for instance.

[^5]: If you haven't done this kind of work much you might be thinking "why not just ask people what they're unhappy about and fix it?" In my experience, situations where that is possible get quickly solved on their own, and situations where other engineers get parachuted in are ones where nobody can articulate what change they'd want, or where that change is impossible for other reasons, or where everyone disagrees, and so on.

[^6]: Others include [the valley of engineering despair](/the-valley-of-engineering-despair/), [taking a position](/taking-a-position/) even when you're uncertain, or [shipping code that isn't perfect](/grit-your-teeth-and-ship-it/). "Many engineering problems are actually psychological problems" is a recurring theme on this blog.