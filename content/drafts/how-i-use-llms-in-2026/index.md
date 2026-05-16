---
title: How I use LLMs as a staff engineer in 2026
description: 
order: 196
date: '2026-05-17'
tags: ["ai", "how to"]
---

A bit over a year ago I wrote [_How I use LLMs as a staff engineer_](https://www.seangoedecke.com/how-i-use-llms/). Here's a brief summary of what I used AI for last year:

- Smart autocomplete with Copilot
- Short tactical changes in areas I don’t know well (always reviewed by a SME)
- Writing lots of use-once-and-throwaway research code
- Asking lots of questions to learn about new topics (e.g. the Unity game engine)
- Last-resort bugfixes, just in case it can figure it out immediately
- Big-picture proofreading for long-form English communication

Here are some tasks I explicitly _didn't_ use AI for last year:

- Writing whole PRs for me in areas I’m familiar with
- Writing ADRs or other technical communications
- Research in large codebases and finding out how things are done

February 2025 was a long time ago. Back then the best model was the first reasoning model, OpenAI's o1. Agents _sort of_ worked, but would often get stuck or thrown off by compaction. What's changed since then?

### Agents are good now

The biggest change is that **I now use LLMs to produce entire PRs in areas I'm familiar with**. A year ago I would very occasionally ask an agent to make changes to a single file if it was a simple change I couldn't be bothered typing out. Sometimes I would copy a function I wrote into a LLM chat window for feedback. But now I start every single change by asking an agent to solve the problem, and usually push the PR after a single editing pass.

In late 2025 I used a lot of open VSCode windows. In early 2026, that changed to terminal tabs with the Copilot CLI, particularly when I needed to make changes across multiple repos at the same time. Now I use the [GitHub Copilot app](https://github.blog/changelog/2026-05-14-github-copilot-app-is-now-available-in-technical-preview/) a _lot_ (tens of sessions per day). 

This reflects a shift from having to line-edit the agent basically as it went to only doing an editing pass right at the end. Early agents would go wrong a lot and not be able to recover, so it was valuable to keep an eye on their thought processes and step in to pause them and set them right. In my experience, current agents move too fast to do this, and recover their own mistakes most of the time anyway.

Sometimes I don't even need to make edits and I can just push the change as-is, though this is rare: if nothing else, I typically go through and remove some of the over-commenting and other LLM-isms.

**I do a _lot_ of skimming through and evaluating agent changes.** Most of the time I reject them entirely, just based on "eh, that's not what I was thinking". On average it takes me about thirty seconds to make this initial assessment. If the change looks alright after that, I'll dig in and do a proper review to make sure I understand it and it's doing the right thing. For difficult tasks, I'll often reject five or six (or more!) agent attempts before accepting one as good enough to work with, or giving up and making the change by hand.

### Investigating bugs

I rely on LLMs even more for bug-hunting than I do for making changes. In 2025, I used to throw the occasional bug at a LLM, just in case it was able to rapidly come up with an explanation. Now I throw _every_ bug at a LLM (typically by opening a new agent session and pasting in the bug report), because it's able to correctly diagnose 80% of issues on its own. Current agents are _really good_ at chasing down bugs, particularly when you give them a vantage point across multiple repositories.

I'm still better at it. Just last week I had a tricky bug that took about fourteen agent sessions before one finally figured it out. What was I doing in between and around those sessions?

- Digging up extra context on the bug (from logs, Slack, etc) and reporting it to the agents
- Building my own mental model of the problem, of course
- Setting up my own reproduction of the bug (in parallel with the agents' efforts)
- Responding to agent sessions with "no, your theory can't be right because of X" (or just killing and restarting the session with that extra hint)

Ultimately an agent was the one to catch the bug. But I still count it as my find, because by that point I had narrowed the search space tightly enough that agent session #14 had a _significantly_ easier problem to solve than agent session #1. In other words, **human expertise still matters a lot for investigating bugs**.

### Writing

I _almost always_ write my own PR descriptions, since LLMs over-communicate and are bad at expressing the "core idea" behind a change. Writing the PR description by hand also signals to reviewers that I've reviewed the change myself, and I'm not asking them to be the first human to read the diff. The only time when I don't write the PR description is when the change is trivial and the agent-generated description is one sentence. At that point I just leave it alone.

I still don't use LLMs to write Slack messages, ADRs, issues and so forth. I believe I have a better sense of what's important to communicate, and I want to signal that there's a human being thinking about the content.

I still never use LLMs to write blog posts, though I do run each draft post through a LLM for feedback. OpenAI models used to be _terrible_ at this and have only very recently gotten acceptable with GPT-5.5. Both OpenAI and Anthropic models still try to water down my arguments, but I've accepted that as part of the LLM "house style" and just ignore that part of the feedback.

### Testing and setup

Another thing I do now is **try and push as much testing and setup work as possible onto the agents**. In 2025, I used to sometimes ask a LLM to produce a test script of curl commands that I could run against my dev server. In 2026, I just ask an agent to go and test my change, then read the log of what it did.

I don't test UI work like this, partly because it's more fiddly and partly because I don't trust agents to be sensitive to the subtle look-and-feel aspects of a change.

Agents will write expansive unit tests without having to be told, but I do sometimes ask them to put together broader integration tests for a change. In general I now consider test code to be cheap: if I'm wondering whether a test would be useful, I just add it (so long as I know it won't be flaky). Of course LLMs sometimes produce strange and unsatisfying test code - I do read it to catch obvious blunders - but I review it with a more generous eye than my actual production code.

I'll also task an agent with annoying local setup tasks that involve config wrangling on my machine. For instance, if my nvm installation is not switching my Node version correctly, I will often open a Copilot CLI agent and ask it to figure it out. This is a more-or-less direct replacement for Googling the problem, and is much quicker since the agent can run the trivial bash commands to diagnose and fix the problem itself.

### Summary

The main thing that's changed in the last fifteen months is that **agents are really good now**. They've gone from something I used occasionally and suspiciously to something I use constantly and with light supervision.

The core of my job is still the same: [shipping projects](/how-to-ship), exercising my judgement, [influencing tech company politics](/how-to-influence-politics/). But I now have a much wider net for small pieces of work that I'm willing to take on, which includes basically anything I can hand off to an agent and expect it to get more or less right.

I used to spend a lot of time putting work off, either by delegating it or just saying "sorry, I don't have time to do that now". Now I get to say "yes" a lot more (at least when it comes to minor low-risk tweaks)[^1].

Overall, here's what I now use AI for:

- Writing (or drafting, depending on complexity) every code change I make
- Investigating and fixing bugs, either autonomously for most bugs or with my close involvement for trickier ones
- Research in large codebases, since current agents are now good enough to give the right answer almost all the time (and when they're wrong, it's clear from reading the explanation that they've missed something)
- Manual testing and local-machine setup or troubleshooting
- I still use AI for asking lots of questions to learn about topics, and for proofreading

Here's what I still don't use AI for:

- Writing any kind of public communication for me (PR descriptions, ADRs, messages) with the exception of trivial two-line PRs
- Writing code that I don't carefully review
- Testing any kind of UI

In my view, **the current core AI skill is shifting as much work onto AI agents as possible, without going too far**. Many people are under-utilizing agents: not allowing them to investigate bugs or test their changes, or not throwing enough simple tasks at them. Other people are over-utilizing them: using them to write messages that ought to be hand-written, or trusting them to make sweeping changes that need careful human review. Since my last post, the balance has tilted more towards the agents, but _finding_ the balance remains as tricky as ever.


[^1]: For once I can actually give an example, since it's in a public repository. Someone internal wanted to be able to use the [actions/ai-inference](https://github.com/actions/ai-inference) GitHub Action with Copilot-backed inference (for various reasons), and instead of saying "sorry, I don't have time to get to it", I was able to throw it at an agent. If a human had to do this, the output would likely have been better, but it wouldn't have gotten done for weeks (if at all).