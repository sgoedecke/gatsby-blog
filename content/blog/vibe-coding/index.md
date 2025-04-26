---
title: Refactoring to understand and "vibe coding"
description: --
order: 55
date: '2025-03-15'
tags: ["ai"]
---

In the last months, the practice of getting a LLM to build your entire program for you (via Cursor, or Copilot, or just asking ChatGPT) has been dubbed "vibe coding". It works very well. To anyone who's been using LLMs over the last few years, this isn't surprising (though it would be an AGI-tier revelation to an engineer from before GPT-3.5). There are two big, well-known problems with it.

### The obvious problems with vibe coding

The first big problem with vibe coding is that **at some point you hit a limit on the size of the codebase**, and no further features can be added. If your codebase is modular enough, you can put that off for a while, but eventually you'll reach a point where sensible code changes require more context than the LLM can contain.

The other big problem is that **you didn't write the code, so you don't understand it**. If you need to answer a question about how the code works, or to build a feature onto it yourself, you have to spend a long time figuring that out. In other words:

**Code is not the most valuable artifact. _Your understanding of the codebase_ is**.

A LLM can produce a lot of code very cheaply. But it can't automatically backfill your understanding of the codebase - you have to do that part - and its own understanding hits a hard limit when the size of the codebase exceeds the size of the context. At some point you'll have to dig in and understand the code yourself.

### Refactoring to understand

In the last few years, one of the projects I launched expanded from a four-person "virtual team" to a proper engineering organization: three times as many engineers, multiple managers and skip-levels, and so on. One of the best decisions I made during that time was to enthusiastically accept basically any proposed refactor. Even if I personally felt the refactor didn't bring much value (or even if I thought it'd make things slightly worse), I supported it. There were a few reasons for this:

1. Engineers who are new to the project and immediately propose refactors are enthusiastic engineers who I want to encourage, not discourage
2. The "new engineer" perspective on what is readable or "simple" code is probably more accurate than mine, so it's OK to prioritize it
3. The easiest way to bring an engineer up to speed on a codebase is to let them rewrite a segment of it

That third reason is the most important. I'll say it again: **if you want to onboard someone onto a new codebase, let them rewrite part of it**. They'll learn a lot from the process, but crucially they'll become an instant subject-matter expert on the part they rewrote. With a few refactors, you can go from a situation where you're the only go-to engineer to a situation where multiple engineers on the team can take ownership. That's the only sustainable way to run a large codebase.

### Summary

Vibe coding works very well up to a point. When you hit that point, you'll have to do your own "refactoring to understand" in order to make any further useful changes to the codebase. As LLMs grow more capable, that point might get further and further away, but it's always going to be there. 