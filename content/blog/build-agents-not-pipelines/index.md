---
title: Build agents, not pipelines
order: 200
date: '2026-05-31'
tags: ["ai", "software design"]
---

There are only two ways to use LLMs in a computer program: as part of a pipeline, or as an agent. In other words, either you express the control flow of the program in code, or you give a LLM tools and allow it to manage the control flow itself[^1].

Here's how you might structure a trivial "summarize a bunch of information and email it to me" program as a pipeline:

```ruby
context = gather_context(various, data, sources)
llm_response = llm_summarize(context)
summary = parse(llm_response)
email_me(summary, my_email)
```

And here's how you'd do it as an agent:

```ruby
read_data_tool = build_read_data_tool(various, data, sources)
email_tool = build_email_tool(my_email)
run_agent(tools: [read_data_tool, email_tool])
```

It's like the difference [between](https://news.ycombinator.com/item?id=46375199) a library and a framework. When you use a library, you define the structure of the program yourself, and call out to various library helpers along the way. When you use a framework, the main structure of the program lives in the framework, and it calls your code at various points. There are tradeoffs involved in both approaches. Frameworks let you get started more quickly and typically give you features "for free", but can be difficult when you want to do something that isn't part of the framework's design. Libraries give you a lot more control, but require you to write (and maintain) more boilerplate code.

In the trivial case, the distinction between a pipeline and an agent melts away. If you only have a few paragraphs of possible context for the problem, an agent with a `gather_context` and an `email_me` tool will perform exactly the same steps as a pipeline that calls a reasoning model with the context injected into the prompt (i.e. the agent will reproduce the trivial control flow of your pipeline). But when you have more context than will fit into a single prompt, or you want to take an action and then react to the result, the choice between pipelines and agents becomes very significant.

### Predictability, flexibility and intelligence

**Pipelines are more predictable, but agents are more flexible**. When you give a problem to an agent, work stops when the LLM thinks it's done. Depending on the perceived difficulty of the problem, this can take anywhere from a few LLM turns to hundreds (and thus cost anywhere from a few cents to many dollars). If you're building something intended to run at scale, this unpredictability can be a nightmare. Any subtle change to the user data could cause the LLM to take twice as long on each task, which would double your latency[^2] and cost.

Pipelines are only immune to this problem if they don't use reasoning models, or don't allow the model to "think out loud" in its output tokens (for instance, by using [structured output](https://developers.openai.com/api/docs/guides/structured-outputs)). However, individual LLMs offer much tighter control over model reasoning than over how long an agentic loop will take. In all frontier model APIs, you can explicitly set the level of reasoning you want. That doesn't give you total control, but it does cap "take longer" at maybe ten or twenty percent (instead of with agents, where it can be 2x or more).

Why use agents, then? **Agents are smarter**. If you're happy to accept the unpredictability, an agentic system can handle _much_ more difficult tasks, by virtue of being able to loop for longer, and to gather more information after thinking about the problem. There's a reason that the most successful AI products (coding agents like Claude Code, Codex, Cursor, and Copilot[^3]) are agents: coding is a hard enough task that you simply cannot build a functional coding agent with pipelines.

### Context-gathering

**The context-gathering stage is far more delicate for pipelines than for agents**. If an agent is trying to solve a problem and realizes it needs more data, it can simply go and get it. But for a pipeline, all the required data has to be present in the context already, because the LLM only gets to run once.

Much of the work involved in building pipelines is in getting context-gathering right. **Agents are much easier.** For instance, with a coding agent, you can basically just provide a "grep" and "read file" tool and let the agent figure out what chunks of code are relevant to the current file. In a pipeline, you have to figure that out yourself: good luck, it's an unsolved technical problem! Typically you'll end up doing some set of clever tricks, like walking the AST to identify which parts of code "contribute" to the current file, or indexing the whole codebase with semantic embeddings and doing some kind of nearest-neighbor search to build the context (called RAG, or "retrieval-augmented generation"). Neither of these will work as well as using an agent.

In 2023 and 2024, many people believed that RAG would solve context-gathering. Every LLM would have a fully-indexed context base that would magically surface the precise information the LLM needed at any given moment. This did not happen. Instead, we went _backwards_, getting our agents to do plain-text search and figure it out like a human would. Why didn't RAG work? This is a topic for a whole other post, but the short answer is this: "find what information is relevant to this problem" is often as hard a task as _actually solving the problem_. Semantic embeddings and cosine similarity are simply not powerful enough tools for the job.

### Multi-model pipelines

Pipelines that make multiple LLM invocations do have an extra dimension of flexibility: they can use different LLMs for different tasks. For instance, if one LLM benchmarks better at task A, or is cheaper for an easier task B, you can use the right model for the job. Agents (at least right now) have to stay the same model the whole time, so you're always pinned to the highest level of intelligence you need.

Is this a big deal? I'm suspicious. One pattern I see a lot is tasking a cheaper model with collating or summarizing data for a smarter model to do something with. But often the signal is in the raw data itself! I think designs like this are really shooting themselves in the foot, for the same reasons that RAG didn't work: context-gathering was a harder problem than people anticipated.

In any case, if you do want to farm out tasks to different models, you can also do it via careful agentic tool design. For instance, you could build your `web_search` tool so that it uses a cheap model to summarize web pages.

### Small contexts and future-proofing

**Pipelines allow working with smaller contexts, and thus with local models**. An agent's ability to fetch its own context means that it almost always ingests more data than it needs. On top of that, agents run in loops, so each agent turn increases the size of the context. This isn't a big problem for systems built on top of frontier model APIs, because:

- frontier models all expose large context windows,
- frontier models tend to hold up pretty well for the first 200k tokens, and
- KV caching means that passing around the same large context block is surprisingly cheap.

However, it is a big problem for local models. The context window consumes [a lot of VRAM](https://www.reddit.com/r/LocalLLaMA/comments/1j6xpvt/how_large_is_your_local_llm_context/), so most people running local models stay below 32k (or even 6k) tokens. If you're writing a program to run in this environment, you likely will not be able to give an agent the space it needs, and you will be instead forced to use a pipeline.

In my opinion, **agents are more future-proof**. This is partly because models are now being explicitly built to be better agents, and partly because agents delegate more to the LLM and thus benefit more from LLM improvements. If you have a pipeline-based system, new models will probably do a bit better than old ones. If you have an agentic system, new models might do _much_ better than old ones (to the point that it's worth building an agentic systems for tasks that are currently too hard, on the assumption that by the time you've finished the models may be good enough). I have been banging this drum [since 2023](/llm-driven-agents/), before tool-calling was even a part of model APIs.

### Safety and legibility

In general, I disagree with the [popular advice](https://www.decodingai.com/p/stop-building-ai-agents) that workflows are safer than agents. Workflows offer more control _over budget_, but when it comes to taking action based on LLM output, you have exactly the same problem whether you're checking at the tool-call level or at the next stage in the pipeline: either you make some heuristic assessment via code, which might be wrong, or you queue the action up for a human to approve, which will be slow.

Don't agents open you up to prompt injection? Yes, but pipelines do too. In both cases, you're feeding some block of human-generated data (e.g. the files in a codebase, or the results of a web search) into the LLM. Any prompt injections in that data will be consumed by the LLM just the same whether they're the result of a tool-call or directly injected into the prompt by the pipeline. You have to sanitize user content and double-check LLM-triggered actions, no matter what design you choose[^4].

I do want to acknowledge that **pipelines are slightly more _legible_**. You can trace most of what a pipeline is doing because you're in control over more of it. It's harder to figure out why an agent queried for a particular piece of information or took some action. But even in a pipeline, you'll never know for sure why the LLM responded in the way it did. That's just what it means to program with LLMs.

### LLM-driven mass surveillance

Let's apply some of these principles to a real-world, non-trivial example. Suppose you are the NSA, and you are attempting to use LLMs to get a grip on the wild firehose[^5] of covert email surveillance data[^6]. Should you use pipelines or agents? Well, if you're building something that's supposed to run on every single piece of email in America, you probably shouldn't use agents: keeping performance and cost strictly bounded requires a pipeline. However, you're definitely well-resourced enough to use agents _in general_, and the problem is definitely hard enough to benefit from the extra intelligence. I'd probably recommend using both: a low-context, cheap pipeline that can run once against each email and flag it, and a fleet of agents that can dig into those flags, make ordinary queries, and act more like human analysts would.

The pipeline would have to scale with the total volume of data, which should be _mostly_ fine, since pipelines scale in a predictable-ish manner. The fleet of unpredictable agents can be scaled entirely independently, though in practice it would get bottlenecked on GPU availability and the necessity for human review. The majority of the engineering work[^7] would likely go into context-assembly for the pipeline: feeding in enough data about who's involved in the email conversation so that the LLM can make a sensible decision on whether or not to flag it.

### Summary

Overall, I'd suggest following these guidelines:

1. Use pipelines when you have strict requirements around context size
2. Use pipelines when you need to be able to accurately predict (or limit) GPU cost
3. Use pipelines when you have to use local models
4. Use agents when you're not confident you'll be able to assemble all of the relevant context in one shot
5. Use agents when the problem is hard enough that you're not sure a pipeline will be able to solve it

**When in doubt, use agents.** I am aware of several AI projects that have migrated from pipelines to agents in the last year, but none that have gone the other way around. As a general point about software design, if you're not sure what to do, pick the solution that's easier to build and more likely to be able to solve your actual problem. If you want to change to a cheaper, pipeline-based system later on, at least you'll be able to compare it to a working agentic design and make an informed decision.


[^1]: This distinction was popularized by Anthropic's [_Building effective agents_](https://www.anthropic.com/engineering/building-effective-agents), written in December 2024, and now (I believe) made at least partially obsolete by advances in agents since then. They say "workflow", but I slightly prefer the term "pipeline".

[^2]: Yes, I know this is technically not what "latency" means, but there's no other single-word shorthand for "the duration of a standard unit of work".

[^3]: If you're building your own coding agent, I suggest you begin with the letter "C".

[^4]: For instance, in my trivial example at the top of the post, doesn't the agent have a failure mode where it might send a ton of emails, or email a bunch of different people? No, because you ought to constrain the email tool so that it can only send to the right address, and (if this is important) that it can only be called once.

[^5]: In a [draft post](https://github.com/sgoedecke/gatsby-blog/blob/5b6205fbe191a591bbcf61d094a6edbcfbd6475d/content/drafts/_icebox/ai-mass-surveillance/index.md) I never published, I ballpark-estimated all non-spam American email data at around seven trillion tokens per day (around a third of OpenAI's total daily token usage).

[^6]: Should you do this? Probably not, but it's a fascinating engineering problem, and I imagine the NSA has been thinking about these questions for several years by now. If the example bothers you, substitute some other more-ethical firehose of English language.

[^7]: Not counting evals, operations, standing up a trusted GPU cluster somewhere, scaling the physical hardware, and all the other thousand things you have to do in order to ship anything.