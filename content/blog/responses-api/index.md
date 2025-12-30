---
title: The whole point of OpenAI's Responses API is to help them hide reasoning traces
description: 
order: 138
date: '2025-09-09'
tags: ["ai", "inference", "reasoning", "openai"]
---

About six months ago, OpenAI released their [Responses API](https://openai.com/index/new-tools-for-building-agents/), which replaced their previous /chat/completions API for inference. The old API was very simple: you pass in an array of messages representing a conversation between the model and a user, and get the model's next response back. The new Responses API is more complicated. It has a lot more features, such as a set of built-in tools, but the main difference is _it's stateful_. You don't have to pass in the entire conversation history with each request. Instead, you can pass around an id representing the state of the conversation, and OpenAI (or your chosen provider) will keep it up-to-date for you.

OpenAI are selling the Responses API hard. Their [docs](https://platform.openai.com/docs/guides/migrate-to-responses#responses-benefits) emphasize the performance and cost benefits, and strongly imply that some agentic functionality can only be unlocked via the Responses API. There's also been a recent Twitter [thread](https://x.com/prashantmital/status/1963801236391772372) from an OpenAI employee that's almost begging people to use the Responses API.

When I first learned this, I was a bit confused about why anybody would need this. Despite OpenAI's claims, there is nothing inherent about a stateful inference API that's better than a normal /chat/completions stateless one. Prefix caching can be done just as easily in either case. Calling multiple tools in parallel can be done in either case. From a user's perspective, it seems strictly easier to just use /chat/completions and manage the state myself. So why would anyone use the Responses API? The answer is actually very straightforward:

**OpenAI still keeps their reasoning traces secret, so the old chat/completions API can't preserve reasoning traces within the conversation for OpenAI models.**

Most strong current models are [reasoning models](https://en.wikipedia.org/wiki/Reasoning_language_model): before giving a final answer, they talk through the problem privately. If you use Claude, or DeepSeek, or Qwen, the API response contains this chain of thought verbatim. You can include it in the conversation history for /chat/completions to give the model more context about what it's previously considered.

But you can't do this with OpenAI's GPT-5-Thinking, because OpenAI doesn't expose the chain of thought[^1]. It's a tightly-guarded secret - presumably because OpenAI doesn't want to guarantee that its chain-of-thought contents are safe, or because it contains private information that could leak implementation details to other labs. **This is a big problem for OpenAI!** It means that anyone writing code against OpenAI's reasoning models (like GPT-5) won't be able to pass around the chain-of-thought, and so GPT-5 will appear less capable than it would in OpenAI's own products like ChatGPT.

Enter the Responses API. Since this API is stateful[^2], OpenAI (or Azure OpenAI) can maintain the chain-of-thought in their backend, plug it in to the conversation for you, and then strip it out before sending it back down to the client. Anyone can thus write a program that uses GPT-5 at its full power, so long as they use the new stateful API instead of the old /chat/completions stateless one.

I don't think there's necessarily anything wrong with OpenAI wanting to keep their chains-of-thought secret. But it is a bit underhanded to [push](https://community.openai.com/t/introducing-the-responses-api/1140929) the Responses API as a "faster, more flexible and easier" approach to AI inference, when what it really is is OpenAI's attempt to work around their own awkward decision to conceal their reasoning traces.

I would have a lot more respect for OpenAI here if they simply said "our reasoning models don't expose their reasoning traces, so if you try and use them with /chat/completions they're going to kind of suck - here's the workaround API we offer"[^3]. I don't like how the Responses API is being presented as a simpler, more flexible approach when it clearly isn't. The old /chat/completions API is much simpler! It's just not designed to be used with an inference provider that keeps secrets from the user.

[^1]: Gemini doesn't either, as of [fairly recently](https://www.reddit.com/r/Bard/comments/1kr5yo4/new_update_ruined_gemini_25_cot_is_now_hidden/). I don't really understand why Anthropic isn't hammering this point - if I were them, I'd be shouting from the rooftops that they're the only big Western AI lab that still works just fine with the stateless completions-style API.

[^2]: You don't _technically_ have to use the Responses API in a stateful way. If you really can't allow OpenAI to store your customer's messages, OpenAI will send the chain-of-thought to you as an encrypted message, so you can include it in the conversation without being able to read it yourself. This is [how Gemini does it](https://ai.google.dev/gemini-api/docs/thinking). I guess OpenAI thought it was too awkward to offer this interface as the main way to interact with their models.

[^3]: Maybe it's obvious to everybody else! But I don't see this point being made in other people's writing on the Responses API, so I'm making it here in case anyone else is looking at the Responses API and scratching their head like I was.
