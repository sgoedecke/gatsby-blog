---
title: AI coding agents rely too much on fallbacks
description: --
order: 143
date: '2025-09-27'
tags: ["ai"]
---

One frustrating pattern I've noticed in AI agents - at least in Claude Code, Codex and Copilot - is **building automatic fallbacks**.

Suppose you ask Codex to build a system to automatically group pages in a wiki by topic. (This isn't hypothetical, I just [did this](https://www.endlesswiki.com/constellation) for [EndlessWiki](/endless-wiki)). You'll probably want to use something like the [Louvain method](https://en.wikipedia.org/wiki/Louvain_method) to identify clusters. But if you task an AI agent with building something like that, it usually will go one step further, and build a fallback: a separate, simpler code path if the Louvain method fails (say, grouping page slugs alphabetically). If you're not careful, you might not even know if the Louvain method is working, or if you're just seeing the fallback behavior.

In my experience, AI agents will do this _constantly_. If you're building an app that makes an AI inference request, the generated code will likely fallback to some hard-coded response if the inference request fails. If you're using an agent to pull structured data from some API, the agent may silently fallback to placeholder data for part of it. If you're writing some kind of clever spam detector, the agent will want to fall back to a basic keyword check if your clever approach doesn't work.

This is particularly frustrating for the main kind of work that AI agents are useful for: prototyping new ideas. If you're using AI agents to make real production changes to an existing app, fallbacks are annoying but can be easily stripped out before you submit the pull request. But if you're using AI agents to test out a new approach, you're typically not checking the code line-by-line. The usual workflow is to ask the agent to try an approach, then benchmark or fiddle with the result, and so on. If your benchmark or testing doesn't know whether it's hitting the real code or some toy fallback, you can't be confident that you're actually evaluating your latest idea.

I don't think this behavior is deliberate. My best guess is that it's a reinforcement learning artifact: code with fallbacks is more likely to succeed, so during training the models are learning to include fallback[^1]. If I'm wrong and it's part of the hidden system prompt (or a deliberate choice), I think it's a big mistake. When you ask an AI agent to implement a particular algorithm, it should implement that algorithm.

[^1]: In researching this post, I saw this r/cursor [thread](https://www.reddit.com/r/cursor/comments/1mioycf/why_do_all_ai_models_insist_on_creating_fallback/) where people are complaining about this exact problem (and also attributing it to RL). Supposedly you can prompt around it, if you repeat "DO NOT WRITE FALLBACK CODE" several times.