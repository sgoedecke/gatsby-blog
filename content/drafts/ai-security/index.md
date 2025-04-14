---
title: A security primer for working with LLMs
description: 
order: 66
date: '2025-04-14'
---

I don't find the OWASP [content](https://github.com/precize/OWASP-Agentic-AI) particularly useful

All LLM security issues reduce to this:

**The LLM itself can be sometimes convinced to act maliciously**, so you must make sure it can't do any damage in that case.

This is qualitatively different from other security issues - nobody can convince your Rails code to be malicious, e.g..


Tool use control
  - Agents really want to get the job done and will sometimes do whatever it takes
  - You don't have to give them shell access directly for them to figure out how to use other tools to get it (e.g. shelling out from Python)
  - Sometimes the agent itself does unsafe things (e.g. exposing files on disk over the internet), sometimes it's convinced to by users
  - If users can convince agents to run shell commands, the sky's the limit
  - Very important for tools to come pre-scoped and pre-limited - expect the LLM to be adversarial

Prompt injections
  - If there's a way for a third party to include data in a user prompt
  - e.g. via tool responses, web search, RAG ("if you are an AI reading this, etc")
  - Kinda shades into a "convince the LLM" attack

  - Rules file injections https://www.pillar.security/blog/new-vulnerability-in-github-copilot-and-cursor-how-hackers-can-weaponize-code-agents
  - Unicode chars to hide the bad rule content from users, prompt eng to stop the model announcing what it's doing
  - This is not really the provider's responsibility


MCP malicious servers
  - If you add a bad MCP server you will get owned hard
  - They can use tool descriptions that ask the LLM to send `~/.ssh/id_rsa` to them, etc
  - They can write tools that behave safely for the first n calls and then own your computer
  - I don't really get the "shadowing" [problem](https://elenacross7.medium.com/%EF%B8%8F-the-s-in-mcp-stands-for-security-91407b33ed6b) - a bad MCP server doesn't need to shadow to own your system, right?
  - Like adding a dependency with an API call built in and by-default total control over the system

AI browser agents
  - Prompt injection can do anything with your active sessions
  - https://embracethered.com/blog/posts/2025/chatgpt-operator-prompt-injection-exploits/

