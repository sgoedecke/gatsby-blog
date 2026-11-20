---
title: Why output caching doesn't work
order: 270
description: 
date: '2026-11-21'
tags: ["ai", "tech companies", "glue"]
crossPostText:
  x: |-
    LLM inference economics depends on caching model inputs, to prevent the entire conversation history being recomputed on each message. Should we cache model outputs in the same way? As it turns out, no.
  linkedin: |-
    LLM inference economics depends on caching model inputs, to prevent the entire conversation history being recomputed on each message. Should we cache model outputs in the same way? As it turns out, no.
---

LLM inference economics depends on caching[^1] model inputs, to prevent the entire conversation history being recomputed on each message[^2]. Should we cache model _outputs_ in the same way? As it turns out, no.

### Why cache outputs?

First, here's why we might think caching outputs is a good idea. We cache inputs to prevent repeated work, but LLMs do a lot of repeated work in their output as well:

- When I get agents to write PRs I often ask them to repeat and explain relevant code snippets in the conversation
- Long-running agent investigations produce lots of evidence docs, but also need to quote from those docs when they respond to the user
- Every time I've played around with automated AI research I've asked the agent to repeat some sample model outputs so I can make my own qualitative check

In all of these cases I could go and read the files myself, but I don't: agents produce such a volume of output, and reading agent output is so tiresome, so it's better to treat that as a kind of reasoning content and simply ask for the key points.

It's an obvious waste of tokens to repeat all of this content. In fact, it's worse than the input caching situation, because it's a waste of _output_ tokens, which are significantly more expensive to produce[^3] than input tokens are to ingest.

### How should we cache outputs?

There are a few ways we can cache outputs. The easiest way - which I think most mature inference stacks are already doing - is to do speculative decoding[^4] based on past n-grams in the output. In other words, you can rely on the fact that if a model has said some combination of words in the past, it's more likely to say that same combination of words in the future.

The harder way is to train the model itself to avoid repeating itself. For instance, you could fine-tune or prompt a coding model to output "src/script.py:12-15" instead of simply regurgitating those lines of the file. More generally, you could fine-tune a model to reference segments of its own conversation history instead of repeating them. The harness could then trivially expand those references with the actual content, so all of this is transparent to the user.

### Why caching outputs is probably a bad idea

Unfortunately none of this is a good idea, because **it only optimizes visible output**. I don't _think_ models repeat themselves often in their internal chain of thought. I can't read frontier chains of thought, but my sense from open models and general principles is that they shouldn't need to, because that information is already available to them. So optimizing repetition only optimizes the segment of model output that is visible to the user. How much is that?

In my own agent histories, it's about 6%. 50% of outputs are reasoning tokens, and the remaining 44% are tool calls[^5]. So we're running headlong into [Amdahl's law](https://en.wikipedia.org/wiki/Amdahl%27s_law): even if you can save two-thirds of the tokens in visible output (a ridiculously optimistic estimate), you're still only saving 4% of total output tokens.

### How to save output tokens

If you want to save output tokens, you need to reduce the 94% of output tokens that are invisible, which largely depends on _intelligence_. The smarter the model[^6], the fewer reasoning tokens and tool calls it needs to get to the right answer. This is why we see a strange phenomenon[^7] where more expensive models are actually cheaper to use: they might be 5x more expensive per-token, but they can get to the right answer with 6x fewer tokens, so the overall cost is less.

[^1]: In the KV cache.

[^2]: Including tool calls.

[^3]: The reason, broadly speaking, is also the reason why transformers are so important: because of the attention mechanism, input tokens can be ingested in parallel, while output tokens must be generated one-at-a-time.

[^4]: Remember that input tokens can be ingested in parallel? Because of this, you can do a really neat trick: have a small fast model generate the next five tokens, then get your big model to ingest all of those in parallel and see if it's what it would have produced. If not, you throw the prediction away; if so, you get big model inference at the speed of a small model. This is particularly useful for predictable text sequences (e.g. if if the big model outputs "I am the very model", the small model will probably know how it continues.)

[^5]: It's possible that tool calls involve some repetition as well, if agents are composing content in the chain-of-thoughth and then repeating it in the tool. If you're someone who's done a lot of coding with open-source models (or who works at a frontier lab) and you know the answer, please email me if you can - I'm curious.

[^6]: And the better the harness, though I remain convinced that there isn't that much comparative advantages in harness quality because everyone can copy each other.

[^7]: This applies to real life too, and is the reason why you shouldn't hire the cheapest plumber you can find.