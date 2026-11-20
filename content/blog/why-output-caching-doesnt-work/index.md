---
title: Why output caching doesn't work
order: 272
description: 
date: '2026-11-21'
tags: ["ai"]
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

In all of these cases[^3] I could go and read the files myself, but I don't. Agents produce such a volume of output, and reading agent output is tiresome, so it's better to simply ask for the key points.

It's an obvious waste of tokens[^4] to repeat all of this content. In fact, it's worse than the input caching situation, because it's a waste of _output_ tokens, which are significantly more expensive to produce[^5] than input tokens are to ingest.

### How could we cache outputs?

If you want to prevent this, you'd have to get the model to avoid repeating itself. For instance, you could fine-tune or prompt a coding model to output "src/script.py:12-15" instead of simply regurgitating those lines of the file.

More generally, you could fine-tune a model to reference segments of its own conversation history instead of repeating them. The harness could then trivially expand those references with the actual content, so all of this is transparent to the user.

### Why caching outputs is probably a bad idea

Unfortunately none of this is a good idea, because **it only optimizes visible output**. I don't _think_ models repeat themselves often in their internal chain of thought[^6]. I can't read frontier chains of thought, but my sense from open models and general principles is that they shouldn't need to, because that information is already available to them. So optimizing repetition only optimizes the segment of model output that is visible to the user. How much is that?

Based on my own agent histories, it's about 6%. 50% of output tokens are reasoning tokens, and the remaining 44% are tool calls[^7]. So we're running headlong into [Amdahl's law](https://en.wikipedia.org/wiki/Amdahl%27s_law): even if you can save two-thirds of the tokens in visible output (a ridiculously optimistic estimate), you're still only saving 4% of total output tokens.

### How to save output tokens

If you want to save output tokens, you need to reduce the 94% of output tokens that are invisible, which largely depends on _intelligence_. The smarter the model[^8], the fewer reasoning tokens and tool calls it needs to get to the right answer. This is why we see a strange phenomenon[^9] where more expensive models are actually cheaper to use: they might be 5x more expensive per-token, but they can get to the right answer with 6x fewer tokens, so the overall cost is less.

[^1]: In the KV cache.

[^2]: Including tool calls.

[^3]: Coding agents often used to repeat tokens in tool calls (e.g. by re-outputting the entire file content for each edit) but I think this behavior has mostly been replaced with more efficient find-and-replace editing tools.

[^4]: I'm pretty sure that most mature inference providers already do speculative decoding based on previous ngrams in the input, which would at least exploit output repetition to deliver a speedup.

[^5]: The reason, broadly speaking, is also the reason why transformers are so important: because of the attention mechanism, input tokens can be ingested in parallel, while output tokens must be generated one-at-a-time.

[^6]: I'm only moderately confident about this. Some open-source reasoning models (particularly early ones) do, but those models also use way more tokens than frontier models for the same output, so my guess is that powerful frontier models don't loop in their chain of thought very often.

[^7]: It's possible that tool calls involve some repetition as well, if agents are composing content in the chain of thought and then repeating it in the tool. Any readers who have done a lot of coding with open-source models (or who work at a frontier lab) and thus know the answer to this, please email me if you can - I'm curious.

[^8]: And the better the harness, though I remain convinced that there isn't that much comparative advantage in harness quality because everyone can copy each other.

[^9]: This applies to real life too, and is the reason why you shouldn't hire the cheapest plumber you can find.