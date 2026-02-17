---
title: LLM-generated skills work, if you generate them afterwards
order: 176
date: '2026-02-17'
tags: ["ai"]
---

LLM ["skills"](https://github.com/anthropics/skills) are a short explanatory prompt for a particular task, typically bundled with helper scripts. A recent [paper](https://arxiv.org/abs/2602.12670) showed that while skills are useful to LLMs, _LLM-authored_ skills are not. From the abstract:

> Self-generated skills provide no benefit on average, showing that models cannot reliably author the procedural knowledge they benefit from consuming

For the moment, I don't really want to dive into the paper. I just want to note that the way the paper uses LLMs to generate skills is bad, and you shouldn't do this. Here's how the paper prompts a LLM to produce skills:

> Before attempting to solve this task, please follow these steps: 1. Analyze the task requirements and identify what domain knowledge, APIs, or techniques are needed. 2. Write 1–5 modular skill documents that would help solve this task. Each skill should: focus on a specific tool, library, API, or technique; include installation/setup instructions if applicable; provide code examples and usage patterns; be reusable for similar tasks. 3. Save each skill as a markdown file in the environment/skills/ directory with a descriptive name. 4. Then solve the task using the skills you created as reference

The key idea here is that they're asking the LLM to produce a skill _before_ it starts on the task. It's essentially a strange version of the "make a plan first" or "think step by step" prompting strategy. I'm not at all surprised that this doesn't help, because current reasoning models already think carefully about the task before they begin.

What should you do instead? You should **ask the LLM to write up a skill _after_ it's completed the task**. Obviously this isn't useful for truly one-off tasks. But few tasks are truly one-off. For instance, I've recently been playing around with [SAEs](https://transformer-circuits.pub/2024/scaling-monosemanticity/) and trying to clamp features in open-source models, a la [Golden Gate Claude](https://www.anthropic.com/news/golden-gate-claude). It took a while for Codex to get this right. Here are some things it had to figure out:

- Extracting features from the final layernorm is too late - you may as well just boost individual logits during sampling
- You have to extract from about halfway through the model layers to get features that can be usefully clamped
- Training a SAE on ~10k activations is two OOMs too few to get useful features. You need to train until features account for >50% of variance

Once I was able (with Codex's help) to clamp an 8B model and force it to obsess about a subject[^1], I _then_ asked Codex to summarize the process into an agent skill[^2]. That worked great! I was able to spin up a brand-new Codex instance with that skill and immediately get clamping working on a different 8B model. But if I'd asked Codex to write the skill at the start, it would have baked in all of its incorrect assumptions (like extracting from the final layernorm), and the skill wouldn't have helped at all.

In other words, the purpose of LLM-generated skills is to get it to distil the knowledge it's gained by iterating on the problem for millions of tokens, not to distil the knowledge it already has from its training data. You can get a LLM to generate skills for you, **so long as you do it _after_ the LLM has already solved the problem the hard way**.


[^1]: If you're interested, it was "going to the movies".

[^2]: I've pushed it up [here](https://github.com/sgoedecke/skills/tree/main). I'm sure you could do much better for a feature-extraction skill, this was just my zero-effort Codex-only attempt.