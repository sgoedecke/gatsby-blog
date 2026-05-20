---
title: Prompts are technical debt too
description: 
order: 198
date: '2026-05-20'
tags: ["ai"]
---

It's [common](https://www.tokyodev.com/articles/all-code-is-technical-debt) and correct to say that "all code is technical debt". Adding code is a necessary evil for developing new features: you almost always have to do it, but each line of code adds to the complexity and maintenance burden of the system. All future changes to the system have to work with the existing code, or at least avoid breaking it. Once systems accumulate enough code, they become impossible for a single person to understand: instead of reading the code and understanding what it does, you must rely on guesses, theories and heuristics[^1]. Sensible engineers write as little code as possible.

This is even worse for LLM prompts. Many projects have multiple large

[^1]: Almost every system you might get paid to work on is in this category (if not in the code of the system itself, then in its dependencies and libraries).