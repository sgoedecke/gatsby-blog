---
title: Prompts are technical debt too
description: 
order: 198
date: '2026-05-20'
tags: ["ai"]
---

It's [common](https://www.tokyodev.com/articles/all-code-is-technical-debt) and correct to say that "all code is technical debt". Adding code is a necessary evil for developing new features: you almost always have to do it, but each line of code adds to the complexity and maintenance burden of the system. All future changes to the system have to work with the existing code, or at least avoid breaking it. Once systems accumulate enough code, they become impossible for a single person to understand: instead of reading the code and understanding what it does, you must rely on guesses, theories and heuristics[^1]. Sensible engineers write as little code as possible.

They write a lot of prompts, though! Many large projects now have a set of codebase-specific prompt files: AGENTS.md, CLAUDE.md, those same files in sub-directories, and [skills](https://github.com/anthropics/skills). If you're building a program that uses AI[^2], you'll have separate prompts for [capabilities](https://github.com/anomalyco/opencode/tree/dev/packages/opencode/src/agent/prompt) and for each [tool](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/tool/lsp.txt), as well as a whole set of [system prompts](https://github.com/anomalyco/opencode/tree/dev/packages/opencode/src/session/prompt).

Prompts are important. Minor tweaks to a LLM's prompt can unlock _significant_ performance improvements. If the same model feels different across Codex, Cursor, OpenCode, and Copilot, it's almost certainly due to subtle differences in prompting. AI companies spend a lot of time testing and tweaking their prompts, so it makes sense why engineers would spend a lot of time tweaking their AGENTS.md files[^3] for their projects. I'd even call switching tools or workflows to be a form of prompting. If I start wrapping my agents in a [Ralph loop](https://github.com/anomalyco/opencode/tree/dev/packages/opencode/src/session/prompt), pull in a new skill file, or install an [MCP](https://www.seangoedecke.com/model-context-protocol/) server, that's still a change to my prompts even though I'm not the one who wrote it.

**I think it is a bad idea to spend a ton of time tweaking a bespoke agentic coding setup.** Why is that, given that prompt adjustments can deliver a lot of value? Because prompt adjustments are _model-specific_. Earlier I said that AI companies spend a lot of time tweaking their prompts. In fact, they spend that amount of time for each new model release. A prompt that worked great for GPT-5.4 won't necessarily work as well for GPT-5.5. You have to "learn how to hold the model" each time. 

In other words, a set of prompts that you carefully crafted in January this year might be out of date or actively harmful by February. Worse still, you might not even notice. Model capabilities are already so hard to pin down (unless you're running every problem through different models and tools), and even weak AI systems are surprisingly good at some problems. You might just think "huh, the new Anthropic model isn't as impressive as the hype", or "wow, Claude Code has gotten worse recently".

In this sense, **prompts are a worse form of technical debt than code**. When technical debt blows up, it usually causes errors or a tangible slowdown as you try to understand the code. Prompts will decay silently. Also, even janky code tends to be relatively stable when untouched, but every single model upgrade could turn a functional prompt into a non-functional one.

Could you simply decide not to upgrade models? Some people are trying this, but the pace of improvement is fast enough that that isn't really practical. A delicately-prompted agentic harness built around GPT-4.1 is always going to underperform a bare-bones harness built around Opus 4.7. This might be a sensible strategy at some point in the future, when the rate of model improvement slows down (or when models are so capable that you don't need the extra intelligence for normal engineering tasks), but I don't believe it's a good strategy today.

In my view, most people should just be picking an AI coding tool maintained by a third-party company (Claude Code, Codex, Cursor, Copilot, etc) and leaving it as unconfigured as possible, so they can piggyback on the work of teams of engineers who are evaluating and tweaking prompts with each new model. Avoid MCP and skills unless absolutely necessary, and keep them off by default. At least this way if one of those teams gets it badly wrong, users will notice eventually and complain about it.

When you write AGENTS.md files, try to avoid behavior steering (like the now-outdated "think step by step", "you are a skilled engineer", or "if you get a task right I will tip you $200"). Keep them limited to specific, concrete facts about the project. Don't let models fill your AGENTS.md with pages of barely-reviewed text, for the same reason that you wouldn't let them fill your codebase with pages of barely-reviewed code. Write your prompts yourself, and delete them whenever you get the chance.

[^1]: Almost every system you might get paid to work on is in this category (if not in the code of the system itself, then in its dependencies and libraries).

[^2]: Instead of just using AI to build a program. This distinction was a real pain when I was working on [GitHub Models](https://github.blog/news-insights/product-news/introducing-github-models/).