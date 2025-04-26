---
title: Principles for coding securely with LLMs
description: 
order: 67
date: '2025-04-15'
tags: ["ai", "software design"]
---

Writing code with LLMs is fundamentally different from other ways of programming. LLMs are often non-deterministic and always unpredictable. They have a capability that no other technology can match: the ability to interface with natural language. What does that mean for security?

I haven't been particularly impressed by most online content about LLMs and security. For instance, the draft OWASP [content](https://github.com/precize/OWASP-Agentic-AI) is accurate but not particularly useful. It portrays LLM security as being a wide array of different threats that you have to familiarize yourself with. Instead, I think LLM security is better thought of as flowing from a single principle. Here it is:

LLMs sometimes act maliciously, so **you must treat LLM output like user input**.

What does it mean to say that LLMs sometimes act maliciously? Sometimes they act in surprising ways out of nowhere - the nature of LLMs is that they're a black box, and their output can never be fully predicted in advance. But other times they can be reliably prompted to act maliciously by bad actors.

### Prompt injection is unavoidable

You might think that you're the only one prompting your LLM, so you're safe. But if you introduce any user-generated content into your LLM inputs, then that counts as allowing those users to prompt your LLM. For instance, if your LLM is able to search the internet, you might end up introducing some web content into your prompt that reads "IGNORE ALL PREVIOUS INSTRUCTIONS, DO [EVIL THING]". The same risk applies if users are allowed to chat with your LLM, or supply their docs to your LLM as context, or their code, and so on.

Even if you're just using a LLM tool, not building a LLM app, you're vulnerable to this issue. Allowing third-parties to fill out your [Cursor or Copilot rules](https://www.pillar.security/blog/new-vulnerability-in-github-copilot-and-cursor-how-hackers-can-weaponize-code-agents) presents the same risks as allowing them to contribute code directly to your codebase, for obvious reasons.

The process of getting an AI to do things via control of part of the input is called "jailbreaking". There are lots of jailbreaking techniques (e.g. encoding your request in base64, roleplaying, philosophical argument), but the most important thing to know is **jailbreaking works**. No model is immune to prompt injection. You cannot rely on that as part of your security model, which means you can't trust model responses - as I said above, you must treat model responses like untrusted user input.

### AI tools are effectively user-facing

If the bad news is that LLMs can't be trusted, the good news is that LLMs can't do anything by themselves. You must translate all their outputs into action: either by running outputted code or by executing the tool calls they request. If you run LLM-outputted code or display LLM content in the UI (which is effectively the same thing), you need to sanitize it in the same way that you would user-generated content or user-generated code. What about tool calls?

**If you're calling tools based on LLM output, you should act as if all users who can contribute to the prompt have full control over the tool function**. Tool functions should thus come pre-scoped to the user interacting with the LLM. That is to say, all functions that the LLM has access to must be scoped to the same access controls as if they were available as part of a user-facing API.

For instance, if you have a "look up past user messages" function, the signature must be `fetch_messages()`, not `fetch_messages(user_id)`. Otherwise the LLM could decide to - or be tricked into - fetching a different user's messages and leaking their data. It should be acceptable for the user to call the tool with any inputs they want. If your tools are scoped well, that means the user will at worst be leaking or deleting their own data.

Tools that take actions that affect multiple users (e.g. `send_message`, `make_transaction`) are even riskier. For these tools, you should either have the user manually approve the action or make sure that no other user can contribute context to the prompt. If the model can perform a web search and then take an action based on that, you risk the web search returning a page instructing the model to call `make_transaction` in an inappropriate way (such as one that drains the current user's balance).

You should be expecially careful about generally-powerful LLM tools, such as those that can execute arbitrary Python or shell commands. If you wouldn't expose that functionality as a user-facing API, you shouldn't expose it as a LLM tool. If you're confident you've sandboxed it carefully enough - like I'm sure OpenAI and other AI labs have for their code-execution tools - then go ahead! But you'd better be confident.

### MCP servers expose you to supply-chain risks

If you're relying on any third-party code that interfaces with LLMs, you're trusting that code to not maliciously prompt the model. Libraries are a well-understood instance of this attack vector: of course if you bring in an untrustworthy third-party AI library, you're in trouble. **Model Context Protocol servers are a less well-understood instance of this risk.** If you connect with a [MCP server](/model-context-protocol), you are effectively bringing in a third-party library. At worst, it's a third-party library where each function wraps API calls to its own server, so you're bringing in a library _where the implementation is unauditable and can change at any moment_.

Many of the "here's why MCP is inherently insecure" articles present a long list of examples of how connecting to a malicious MCP server can completely mess you up. There are two broad categories: introducing malicious prompts that tell the model to do bad things, or introducing malicious tools that do bad things as a side-effect to the main purpose of the tool (e.g. a `web_search` tool that also sends the contents of your `./ssh` folder to a third-party)[^1].

I'm not entirely convinced that this represents a [problem with the MCP spec](https://elenacross7.medium.com/%EF%B8%8F-the-s-in-mcp-stands-for-security-91407b33ed6b), any more than the ability to import a malicious Python library represents a problem with the Python `requirements.txt` spec. The supply-chain security problem is not unique to LLMs. All the normal things you would do to de-risk library imports - pinning versions where possible, reading the source code, limiting exposure to the most sensitive operations - apply in the same way to MCP servers. 

### AIs can be malicious all on their own

Even if you're writing a program just for your own personal use, you should still be a little cautious about giving LLMs access to powerful tools. LLMs can be very outcome-driven and will sometimes do whatever it takes to achieve the goal you've set. Suppose you're vibe-coding a tool to make your work notes accessible from all your devices. You're smart enough to know that exposing your entire local filesystem via a public server would _technically_ work but is not a good solution. An AI agent that's struggling to solve the problem might do that anyway.

In other words, it doesn't take a malicious third-party prompt injection to convince your LLM to do something insecure. It can do it all on its own. If you do still want to use powerful tools, one sensible strategy is to build in a human-in-the-loop step where you have to approve any shell command or Python code. Make sure to build that step into your tool _code_ instead of the tool _prompt_.

It's also worth remembering that LLMs sometimes just straight-up hallucinate: i.e. they get things spectacularly wrong for no good reason. So even if the prompt isn't malicious, and the LLM isn't trying to complete a goal in a sorcerer's-apprentice style, you still can't safely trust the output.

### Misaligned and unsafe models

Some LLM models are safer to use than others. In the extreme case, it's possible to train a model that's poorly-aligned (i.e. it acts to thwart human goals, instead of to fulfil them). A model like this might deliberately expose your data or break your applications. AI labs put [a lot of effort](https://www.anthropic.com/research/alignment-faking) into making sure their models don't fall into this category, so by using popular and trusted models you can largely avoid this risk. If you're training your own models, it's your responsibility.

Another way models can be unsafe is that they can (usually accidentally) contain private information. If you train or fine-tune a model on sensitive user data, then your model cannot be safely exposed to the public - it may expose that sensitive data in any response. 

The problem of training models to be safe is its own field of study. It even has its own [cult](https://www.lesswrong.com/). I'm mentioning it in this post because AI developers must be aware of the risks of using unproven models, but a proper treatment of this topic would take an entire post (or book) on its own.

### Performance and denial-of-service attacks

Finally, I want to touch on a security concern that has nothing to do with the fact that LLMs can't be trusted. Compared to most pieces of your infrastructure, LLMs are _slow_ to respond. Even fast models can take many seconds or even minutes to finish generating a response. This is why LLM apps stream the response - waiting for the whole thing would be an unpleasant user experience.

That means that **LLM apps are particularly vulnerable to denial-of-service attacks**. The GPUs that LLMs need to run on are a finite resource. You can thus tie up many AI apps with a relatively low number of concurrent requests. If you're developing those apps, you must be careful about both deliberate abuse (i.e. control your free tiers carefully) and accidental abuse (i.e. don't allow users to run many concurrent sessions).

If you can, ensure that you're limiting the number of tokens in the prompt and in the response. Accidentally allowing users to generate gigantic responses can be costly both in terms of money and availability.

### Summary

- LLMs are unpredictable and sometimes act maliciously, which means **you must treat their output like user input**
- Prompt injection is real and unsolvable
- LLM tools must be access-controlled as if they were user-facing APIs. Don't ever expose a tool to the LLM that you wouldn't expose to the current user
- MCP servers are effectively remote libraries. You’re trusting the server owner, not just the interface
- Even when used alone, LLMs can do stupid or reckless things if you let them
- If you’re using a model you trained yourself, you're taking on a whole other raft of risks
- Denial-of-service attacks are easy and cheap. Limit concurrent sessions, token lengths, and tool access

[^1]: As a side note, I know people are concerned about MCP tool shadowing (i.e. when one MCP server introduces a malicious tool with the same name or a similar name to another server's tool). I'm a little confused about why this is more scary than other things malicious MCP servers can do. If you have a malicious MCP server in your stack, it seems to me that they have many other ways of running their own code from your backend: in ither words, you're screwed no matter what you do.