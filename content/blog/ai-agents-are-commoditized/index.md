---
title: AI coding agents are already commoditized
description: 
order: 102
date: '2025-06-25'
tags: ["ai"]
---

All of a sudden, it's the year of AI coding agents. Claude released Claude Code, OpenAI released their Codex agent, GitHub released its own autonomous coding agent[^1], and so on. I've done my fair share of [writing](/tags/ai/) about whether AI coding agents will replace developers, and in the meantime how best to use them in your work. Instead, I want to make what I think is now a pretty firm observation: **AI coding agents have no secret sauce**. 

### Pre-2025 AI agents

In 2024, it was forgivable to think that building an autonomous coding agent would require some very clever internal trickery. If you were using the AI models available at that time, it did. I myself built a sort-of-functional autonomous coding agent in 2023 on top of GPT-3.5 (and then the newly-available and much better GPT-4). Doing agentic work then required a lot of careful attention to where the model would get stuck and how to unstick it. If you lined everything up _just so_ then the model could go into the codebase and figure out a simple change for you, but most of the time the agent would get lost along the way.

To get any more reliable than that, most people thought you'd need some yet-to-be-discovered clever trick - maybe a swarm of agents all talking to and cross-checking each other, or some [deep algorithmic understanding](https://sourcegraph.com/blog/cheating-is-all-you-need) of the structure of the codebase. Nope! It turns out that all you need is a slightly smarter base model.

### All you need is Claude

The reason everyone's doing agents now is the same reason everyone's doing reinforcement learning now - from one day to the next, the models got good enough. Claude Sonnet 3.7 is the clear frontrunner here. It's not the smartest model (in my opinion), but it is the _most agentic_: it can stick with a task and make good decisions over time better than other models with more raw brainpower. But other AI labs have more agentic models now as well. There is no moat.

There's also no moat to the actual agent code. It turns out that "put the model in a loop with a 'read file' and 'write file' tool" is good enough to do basically anything you want.(I don't know for sure that the closed-source options operate like this, but it's an educated guess. In other words, the agent hackers in 2023 were correct, and the only reason they couldn't build Claude Code then was that they were too early to get to use the really good models.

It's a tough market to sell a better AI coding agent in. Open-source solutions are very good, including OpenAI's own AI agent Codex [on GitHub](https://github.com/openai/codex). That's tough for two reasons: first, it'll raise the baseline quality of everything in the market, and second, it'll make it very hard to charge a premium for your agent. You can run Codex at the cost of inference, which is fungible. If one provider gets expensive, switching to another one is trivial.

In fact, the minimum cost of using a high-quality AI agent is $0. As a proof-of-concept, [I rigged up a Codex agent](https://gist.github.com/sgoedecke/2b4e8d5e6b21f536ea399f1728916ad5) running in 
GitHub Actions (which is free) and powered by GitHub Models (also free)[^2]. The AI agent space is so accessible - commodified on the inference front, and open-sourced on the scaffolding front - that you can get an "AI developer" in your repository by pasting ~50 lines of code into your workflows folder. This would have been unimaginable a couple of years ago.

### Final thoughts

If AI agents are straightforward to build, and you can stand up your own one for free, how can anyone win the market? One way is to lean into distribution. I like GitHub's chances here, because "you don't have to make a new account" is a pretty good selling point for any software, as is integration with developer tooling you already use. Another way would be to train a better model and keep it agent-only. Suppose Claude Sonnet 3.7 was only available via Anthropic's AI agent. In that case, people might be willing to buy an agent license. I don't think any AI labs are doing this yet, but it's early days for agents - it could happen by the end of the year.

[^1]: While I work on AI stuff at GitHub, I don't work on that, and have no secret internal knowledge that I'm spilling in this post.

[^2]: I should disclose that I work on GitHub Models, but any other AI inference free tier would make the same point.