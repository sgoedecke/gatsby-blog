---
title: You should all be asking way more questions
description:
order: 244
date: '2026-09-25'
tags: ["good engineers", "ai"]
---

When someone is explaining something to me, I ask on average one question every thirty seconds. I'm sure this is frustrating to some people, but it's actually a good habit and you should do it too.

### Trying to understand

Most of the questions I ask are very short, and require very short answers. Typically I'm asking for confirmation: "so when you say X, you mean Y?", or "this X is the thing you mentioned earlier when you were saying Z?". The point of these questions is to make sure I understand.

A small misunderstanding early on balloons into a big misunderstanding later, because all the things you misinterpret based on the first misunderstanding will become misunderstandings in their own right, and so on. That's why you can't just wait until someone's finished talking and ask all your questions at once[^1]. 

I think most people don't ask questions because they're not [really trying](https://gwern.net/on-really-trying) to understand: they're happy to just trust that the person they're talking to knows what's going on. This goes double when that person is a well-respected or more senior engineer. However, once you have [skin in the game](https://en.wikipedia.org/wiki/Skin_in_the_Game_(book)), that all changes. When you're in a position where _you_ are the one responsible for success or failure - where you are going to have to go away after the conversation and take a bunch of concrete actions - you will find yourself wanting to ask many questions.

### Build it in your head

When someone's explaining a plan to me at work, I am usually building it in my head: visualizing the specific lines of code that would need to be written in order to implement it. I'll sometimes handwave the details for solved problems (for instance, I might say "send emails like subsystem X of the same service that also sends emails"), but at minimum I'm planning out:

- How data needs to flow between services (what kind of data, and how it will travel over the wire)
- How services will communicate with each other (e.g. how will they auth?)
- What data needs to be persisted, and where it's going to live

If I hear something that is suspiciously vague (for instance, someone describes service X as "storing data" when I know service X only talks to an ephemeral Redis store), I will immediately ask "hold on, how is that going to work?" Usually that indicates a missing dependency (e.g. service X has to make an RPC call to service Y, which does have a persistent database), which often suggests design changes (for instance, moving some or all of the functionality into service Y).

Sometimes questions like these will uncover a fundamentally unworkable feature of the design. This usually happens when a plan fails to take into account some [wicked features](/wicked-features). I remember many years ago a neighboring team built a complex event-driven system that was very elegant but made it completely impossible to silo customer data in a single datacenter. Because our company had "all your data lives in a single location" as a flagship feature, this system just did not work and had to be effectively abandoned.

If you're involved in any kind of technical leadership role, you will have to do this work eventually. Doing it as early as possible - i.e. in the conversation where someone is describing the plan to you - can save hours or days of wasted implementation. Often this is enough to turn a failed project into a [successful one](/how-to-ship).

### Working with AI agents

Maybe you only work with reliable engineers who can be trusted to make all the right decisions. You can thus let them talk without interruption, because it doesn't really matter if you have a detailed understanding of what they're saying. That's great! But these days you probably also have colleagues that are inherently unreliable: AI agents.

I mostly work with GPT-6-Astra and Claude Opus 5.5. These are good models that don't often make _code_ mistakes: when they set out to do something, they usually do it[^2]. But they make _design_ mistakes all the time. They assume that two services can talk to each other when in fact they can't, or they forget about the fact that their code has to run both in the cloud and on-premises, and so on. This is mostly due to the lack of [continuous learning](/continuous-learning/): you didn't know this stuff on your first day either, but you had plenty of time to pick it up. Language models are always on their first day.

You should be absolutely _peppering_ AI agents with questions. I constantly ask things like:

- Do we do X elsewhere in this codebase?
- Does service Y really support this type of authentication, or are you assuming we'd have to go build that too?
- Is this subsystem you built necessary to satisfy requirement Z, or does it in fact satisfy some other requirement you assumed?
- Why do we need to update the interface for A?
- Why do we need to touch this file? Isn't that unrelated to the change?

There will probably come a day when I always get sensible answers to these questions that convince me the model knows what it's doing. But today is not that day. About half the questions I ask get answers that convince me[^3] the model has made a mistake: it should have reused the existing subsystem for X, or authed to Y differently, or kept the Z implementation simple, and so on. When this stops happening, I'll stop asking questions (and try and see if my company will still be willing to pay me to occupy more of an architect role, I suppose).

### Final thoughts

You should all be asking way more questions. In other words, **you should all be trying harder to actually understand what you're hearing**. Don't trust that the person (or AI model) you're talking to knows what they're doing, even if you think they're smarter than you. [Nobody understands](/nobody-knows-how-software-products-work/) complex software products. If you have deep domain knowledge of any area of a codebase, you will routinely find yourself correcting powerful AI models and principal engineers.

[^1]: Sometimes questions you have will be answered later on, but in my experience this is more about questions like "what are the broader consequences of X", not the simple confirmation questions I often interrupt to ask.

[^2]: Your experience might be different if you're working in a different domain or with a different language.

[^3]: I know some of these might sound like leading questions that would trigger sychophancy, but in my experience good coding models are very happy to robustly defend themselves.