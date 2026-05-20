---
title: Prompts are technical debt too
description: 
order: 198
date: '2026-05-20'
tags: ["ai"]
---

It's [common](https://www.tokyodev.com/articles/all-code-is-technical-debt) and correct to say that "all code is technical debt". Adding code is a necessary evil for developing new features: you almost always have to do it, but each line of code adds to the complexity and maintenance burden of the system. All future changes to the system have to work with the existing code, or at least avoid breaking it. Once systems accumulate enough code, they become impossible for a single person to understand: instead of reading the code and understanding what it does, you must rely on guesses, theories and heuristics[^1]. Sensible engineers write as little code as possible.

They write a lot of prompts, though! Many large projects now have a set of codebase-specific prompt files: AGENTS.md, CLAUDE.md, those same files in sub-directories, and [skills](https://github.com/anthropics/skills). If you're building a program that uses AI[^2], you'll have separate prompts for [capabilities](https://github.com/anomalyco/opencode/tree/dev/packages/opencode/src/agent/prompt) and for each [tool](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/tool/lsp.txt), as well as a whole set of [system prompts](https://github.com/anomalyco/opencode/tree/dev/packages/opencode/src/session/prompt).

Propmts are important. Minor tweaks to a LLM's prompt can unlock _significant_ performance improvements. If the same model feels different across Codex, Cursor, OpenCode, and Copilot, it's almost certainly due to subtle differences in prompting. AI companies spend a lot of time testing and tweaking their prompts. So it makes sense why engineers would spend a lot of time tweaking their AGENTS.md files for their projects.

In fact, I'd even call switching tools or workflows to be a form of prompting. If I start wrapping my agents in a [Ralph loop](https://github.com/anomalyco/opencode/tree/dev/packages/opencode/src/session/prompt), that's still a change to my prompts even though I'm not the one who wrote it. If I pull in a new skill file or [MCP](https://www.seangoedecke.com/model-context-protocol/) server, that's the same thing.

**I think it is a really bad idea to spend a ton of time tweaking a bespoke agentic coding setup.** Why is that, given that prompt adjustments can deliver a lot of value? Because prompt adjustments are _model-specific_. Earlier I said that AI companies spend a lot of time tweaking their prompts. In fact, they spend that amount of time for each new model release. A prompt that worked great for GPT-5.4 won't necessarily work for GPT-5.5. You have to "learn how to hold the model" each time

[^1]: Almost every system you might get paid to work on is in this category (if not in the code of the system itself, then in its dependencies and libraries).

[^2]: Instead of just using AI to build a program. This distinction was a real pain when I was working on [GitHub Models](https://github.blog/news-insights/product-news/introducing-github-models/).