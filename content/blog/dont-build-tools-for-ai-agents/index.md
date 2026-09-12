---
title: Don't build tools for AI agents
description: 
order: 236
date: '2026-09-12'
tags: ["ai"]
---

[Lots](https://uxdesign.cc/your-users-arent-human-anymore-start-building-for-agents-today-f7f556cb8125) [of](https://www.forbes.com/sites/medallia/2026/08/27/designing-for-a-world-of-ai-agents-not-just-human-users/) [people](https://dev.to/javz/start-building-for-agents-not-just-humans-5ab5) are making the case that we should stop building software for human users and start building it for AI agents. This kind of makes sense. For instance, my AI agents now use Datadog way more than I use it myself, purely by virtue of them moving much more quickly and running in parallel. But I think most attempts to build "X for AI agents" are going to fail. Here are three reasons why:

First, **tools that are good for AI agents are also good for humans**. If you took a popular software product - say, Jira - and tried to redesign it for AI agents, you would end up with something very similar to Jira. Agents use a computer in the same way human engineers do, by entering text and making API calls. They ingest new information in the same way humans do, by reading and viewing images. They prioritize and delegate and categorize in the same way humans do. This isn't intrinsic to how AI works - we could potentially design agents that are more inhuman - but human-like agents are pound-for-pound more useful in our current world.

As an example, let's imagine that [humanoid robots](https://www.figure.ai/) have become ubiquitous. What kind of tools would you build for them? Well, they're shaped like humans, with human hands and limbs, so tools that are great for humans will also be great for robots. It's a self-reinforcing cycle: if you're building a robot, you should make them humanoid so they can do a wide range of human tasks[^1], and that means they'll be best suited to use human tools. The same principle applies to AI agents.

Second, **being in the training data is a huge advantage for existing tools**. Suppose your new tool for AI agents is 20% better for them than the equivalent piece of software for humans. If the benefit of the agent _already knowing the human software_ is greater than 20%, they shouldn't use your new tool. This is why I'm always suspicious of plans to develop a new programming language for AI agents. The agents have billions and billions of tokens of knowledge about existing programming languages, including their libraries, patterns, and idioms. It is going to be very hard for them to be as effective in a brand-new language.

Third, **we don't yet know the ideal ergonomics for AI agents**. There are lots of [just-so stories](https://en.wikipedia.org/wiki/Just-so_story) floating around (like that AI agents prefer statically-typed languages because the feedback loop is tighter), but when you [actually measure](https://danluu.com/pl-tokens/) it seems really unclear which tools agents use better. You can construct a plausible story in either direction: Golang is a great agent language because it compiles quickly and is statically typed; Golang is an awful agent language because it requires extensive boilerplate which clogs the context window. It's also changing so quickly: last year, one primary worry with AI agents was keeping the context window small, but in recent months compaction has become so good[^2] that you can re-compact a [272k](https://github.com/openai/codex/pull/33972/changes) context window almost unlimited times.

There are still some ways you can and should position your tool to be usable by AI agents. Having a way to expose information in plain text or Markdown, building a functional API, implementing MCP servers or CLIs, and so on: these all make it easier for current AIs to use your tool. But these are all improvements on the margin, not fundamental redesigns of the product. Right now, "building for AI agents" just means "we're prioritizing the API over the UI". And it's not even clear that that's a durable strategy. Now that GPT-6-Astra is getting really good at computer use, the gap between tools-for-AIs and tools-for-humans is closing.


[^1]: Another reason to make them humanoid is because you can draw their training data from human behavior, which is exactly analogous to why AI agents are human-like too.

[^2]: Since compaction is equivalent to handing off a task to a new AI instance, it scales with model quality. I expect compaction to steadily improve until we hit the literal information-density limits for what can be contained in a given context window.