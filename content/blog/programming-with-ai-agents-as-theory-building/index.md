---
title: Programming (with AI agents) as theory building
description:
order: 184
date: '2026-04-03'
tags: ["ai"]
---

Back in 1985, computer scientist Peter Naur wrote ["Programming as Theory Building"](https://pages.cs.wisc.edu/~remzi/Naur.pdf). According to Naur - and I agree with him - the core output of software engineers is not the program itself, but the **theory of how the program works**. In other words, the knowledge inside the engineer's mind is the primary artifact of engineering work, and the actual software is merely a by-product of that.

This sounds weird, but it's surprisingly intuitive. Every working programmer knows that you cannot make a change to a program simply by having the code. You first need to read through the code carefully enough to build up a mental model (what Naur calls a "theory") of what it's supposed to do and how it does it. Then you make the desired change to your mental model, and only after that can you begin modifying the code.

Many people[^1] think that this is why LLMs are not good tools for software engineering: because using them means that engineers can skip building Naur theories of the system, and because LLMs themselves are incapable of developing a Naur theory themselves. Let's take those one at a time.

### Do LLMs let you skip theory-building?

Do AI agents let some engineers avoid building detailed mental models of the systems they work on? Of course! As an extreme example, someone could simply punt every task to the latest GPT or Claude model and build no mental model at all[^2]. But even a conscientious developer who uses AI tools will necessarily build a less detailed mental model than someone who does it entirely by hand.

This is well-attested by the nascent [literature](/how-does-ai-impact-skill-formation) on how AI use impacts learning. And it also just makes obvious sense. The whole point of using AI tools is to offload some of the cognitive effort: to be able to just sketch out some of the fine detail in your mental model, because you're confident that the AI tool can handle it. For instance, you might have a good grasp on what the broad components do in your service, and how the data flows between them, but not the specific detail of how some sub-component is implemented (because you only reviewed that code, instead of writing it).

Isn't this really bad? If you start dropping the implementation details, aren't you admitting that you don't really know how your system works? After all, a theory that isn't detailed enough to tell you what code would need to be written for a particular change is a useless theory, right? I don't think so.

First, it's simply a fact that **every mental model glosses over some fine details**. Before LLMs were a thing, it was common to talk about the "breadth of your stack": roughly, the level of abstraction that your technical mental model could operate at. You might understand every line of code in the system, but what about dependencies? What about the world of Linux abstractions - processes, threads, sockets, syscalls, ports, and buffers? What about the assembly operations that are ultimately performed by your code? It simply can't be true that giving up _any_ amount of fine detail is a disaster.

Second, **coding with LLMs teaches you first-hand how important your mental model is**. I do a lot of LLM-assisted work, and in general it looks like this:

1. I spin off two or three parallel agents to try and answer some question or implement some code
2. As each agent finishes (or I glance over at what it's doing), I scan its work and make a snap judgement about whether it's accurately reflecting my mental model of the overall system
3. When it doesn't - which is about 80% of the time - I either kill the process or I write a quick "no, you didn't account for X" message
4. I carefully review the 20% of plausible responses against my mental model, do my own poking around the codebase and manual testing/tweaking, and about half of that code will become a PR

Note that **only 10% of agent output is actually making its way into _my_ output**. Almost my entire time is spent looking at some piece of agent-generated code or text and trying to figure out whether it fits into my theory of the system. That theory is necessarily a bit less detailed than when I was writing every line of code by hand. But it's still my theory! If it weren't, I'd be accepting most of what the agent produced instead of rejecting almost all of it.

### Can LLMs build Naur theories?

Can AI agents build their own theories of the system? If not, this would be a pretty good reason not to use them, or to think that any supposed good outcomes are illusory.

The first reason to think they can is that LLMs clearly do make working changes to codebases. If you think that a theory is _essential_ to make working changes (which is at least plausible), doesn't that prove that LLMs can build Naur theories? Well, maybe. They could be pattern-matching to Naur theories in the training data that are close enough to sort of work, or they could be able to build _local_ theories which are good enough (as long as you don't layer too many of them on top of each other).

The second reason to think they can is that **you can see them doing it**. If you read an agent's logs, they're full of explicit theory-building[^3]: making hypotheses about how the system works, trying to confirm or disprove them, adjusting the hypothesis, and repeating. When I'm trying to debug something, I'm usually racing against one or more AI agents, and _sometimes they win_. I refuse to believe that you can debug a million-line codebase without theory-building.

I think it's an open question if AI agents can build working theories of _any_ codebase. In my experience, they do a good job with normal-ish applications like CRUD servers, proxies, and other kinds of program that are well-represented in the training data. If you're doing something truly weird, I can believe they might struggle (though even then it seems [at least possible](https://x.com/VictorTaelin/status/2036313801570562418?s=20)).

### Retaining theories is better than building them

Regardless, one big problem with AI agents is that **they can't _retain_ theories of the codebase**. They have to build their theory from scratch every time. Of course, documentation can help a little with this, but in Naur's words, it's "strictly impossible" to fully capture a theory in documentation. In fact, Naur thought that if all the humans who built a piece of software left, it was unwise to try and construct a theory of the software _even from the code itself_, and that you should simply rewrite the program from scratch. I think this is overstating it a bit, at least for large programs, but I agree that it's a difficult task. AI agents are permanently in this unfortunate position: forced to construct a theory of the software from scratch, every single time they're spun up.

Given that, it's kind of a minor miracle that AI agents are as effective as they are. The next big innovation in AI coding agents will probably be some way of allowing agents to build more long-term theories of the codebase: either by allowing them to modify their own weights[^4], or simply supporting contexts long enough so that you can make weeks worth of changes in the same agent run, or some other idea I haven't thought of.

[^1]: [This](https://gist.github.com/MostAwesomeDude/560185c24f959f6fec229739cb5a6735#no-like-analysis-of-the-vibecoded-outputs) is the most recent (and well-written) example I've seen, but it's a common view.

[^2]: I have heard of people working like this. Ironically, I think it's a good thing. The kind of engineer who does this is likely to be _improved_ by becoming a thin wrapper around a frontier LLM (though it's not great for their career prospects).

[^3]: I think some people would say here that AI agents simply can't build any theories at all, because theories are a human-mind thing. These are the people who say that AIs can't believe anything, or think, or have personalities, and so on. I have some sympathy for this as a metaphysical position, but it just seems obviously wrong as a practical view. If I can see GPT-5.4 testing hypotheses and correctly answering questions about the system, I don't really care if it's coming from a "real" theory or some synthetic equivalent.

[^4]: This is the dream of [continuous learning](/continuous-learning): if what the AI agent learns about the codebase can be somehow encoded in its weights, it can take days or weeks to build its theory instead of mere minutes.