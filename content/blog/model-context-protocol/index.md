---
title: Model Context Protocol explained as simply as possible
description: --
order: 53
date: '2025-03-08'
---

Three months ago, Anthropic released "the Model Context Protocol", or MCP. In the last few weeks, interest in it seems to have really picked up. But a lot of people (including me) have been kind of confused about what the Model Context Protocol even is. Now that I've read through the [spec](https://spec.modelcontextprotocol.io/specification/2024-11-05/) and a bunch of the [example MCP servers](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file), I think I understand. This post is my attempt at explaining it.

We're all familiar with USB. It's a common interface that allows me to plug many different devices into my computer via the same port. MCP is a common interface that allows me to plug many different bundles of LLM [tools](https://platform.openai.com/docs/guides/function-calling)[^1] into my LLM via the same software.

Suppose you're the Domino's pizza company. You want your customers to say "GPT-4, order me a pizza". Right now, if you want to offer that capability, you have to write some pizza-ordering code (e.g. something to call a Domino's API) and then write docs on how to run that code for all the [different](https://platform.openai.com/docs/guides/function-calling) [schemas](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview) for each model provider. If you're consuming that capability (e.g. in your cool AI personal assistant app), you have to (a) write your own tool-calling schema for each external function you want to wire up, and (b) figure out how to run that code in your app. Wouldn't it be nicer if every AI capability was exposed with the exact same schema, and was able to run its own code? Then you could simply `npm install @dominos/pizza-mcp-server`.

So what does Domino's have to build for that to work? They have to build a "MCP server", which is a server that talks [JSON-RPC](https://www.jsonrpc.org/specification) over either HTTP or stdin/stdout. The server must respond to a JSON-RPC `tools/list` request with a list of available tools. It must respond to a `tools/call` request by calling the specific tool. Why support stdin/stdout? So that you can run some simple MCP servers locally as command-line tools (for instance, you could wrap a CLI MCP server around `bc` to allow your model to do precise mathematics). 

The general idea is that adding a new MCP server to your app is as simple as adding its URL (or command-line invocation) to your app's list of servers. Because all servers talk the MCP protocol[^2], your app can have a single piece of generic code that iterates over all servers, fetches all available tools via JSON-RPC, and integrates those tools into the chosen LLM. That piece of code is called a "MCP client".

Interestingly, MCP offers two other primitives at the same level as tools: "prompts" and "resources". Unlike tools, these are not intended to be fed directly to the LLM. Prompts are like a [prompt directory](https://prompts.chat/) that your MCP server can expose. The idea is that the user can pick from available prompts to use, I suppose. Resources are pointers to specific files, presumably so the application can use them for RAG or extra context as needed. So far these primitives don't seem to have gotten much uptake. None of the public MCP server codebases I read through expose prompts or resources, just tools. This might change if a popular MCP-compatible app appears that offers a good way to use prompts or resources, but right now I'd say it's fine to just think about MCP as a way to offer a bundle of tools to your LLM.


[^1]: If you don't know what LLM tools are, they're ways to allow LLMs to decide to run a predefined block of code instead of immediately responding to the user (for instance, to search the internet first before answering a question).

[^2]: Yes, I know, the protocol protocol.

