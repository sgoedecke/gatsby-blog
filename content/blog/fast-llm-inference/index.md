---
title: Two different tricks for fast LLM inference
order: 175
date: '2026-02-15'
popular: true
tags: ["ai"]
---

[Anthropic](https://platform.claude.com/docs/en/build-with-claude/fast-mode) and [OpenAI](https://openai.com/index/introducing-gpt-5-3-codex-spark/) both recently announced "fast mode": a way to interact with their best coding model at significantly higher speeds.

These two versions of fast mode are very different. Anthropic's [offers](https://platform.claude.com/docs/en/build-with-claude/fast-mode#how-fast-mode-works) up to 2.5x tokens per second (so around 170, up from Opus 4.6's 65). OpenAI's offers more than 1000 tokens per second (up from GPT-5.3-Codex's 65 tokens per second, so 15x). So OpenAI's fast mode is six times faster than Anthropic's[^1].

However, Anthropic's big advantage is that they're serving their actual model. When you use their fast mode, you get real Opus 4.6, while when you use OpenAI's fast mode you get GPT-5.3-Codex-Spark, not the real GPT-5.3-Codex. Spark is indeed much faster, but is a notably less capable model: good enough for many tasks, but it gets confused and messes up tool calls in ways that vanilla GPT-5.3-Codex would never do.

Why the differences? The AI labs aren't advertising the details of how their fast modes work, but I'm pretty confident it's something like this: **Anthropic's fast mode is backed by _low-batch-size_ inference, while OpenAI's fast mode is backed by special monster Cerebras chips**. Let me unpack that a bit.

### How Anthropic's fast mode works

The tradeoff at the heart of AI inference economics is _batching_, because the main bottleneck is _memory_. GPUs are very fast, but moving data onto a GPU is not. Every inference operation requires copying all the tokens of the user's prompt[^2] onto the GPU before inference can start. Batching multiple users up thus increases overall throughput at the cost of making users wait for the batch to be full.

A good analogy is a bus system. If you had zero batching for passengers - if, whenever someone got on a bus, the bus departed immediately - commutes would be much faster _for the people who managed to get on a bus_. But obviously overall throughput would be much lower, because people would be waiting at the bus stop for hours until they managed to actually get on one.

Anthropic's fast mode offering is basically a bus pass that guarantees that the bus immediately leaves as soon as you get on. It's six times the cost, because you're effectively paying for all the other people who could have got on the bus with you, but it's way faster[^3] because you spend _zero_ time waiting for the bus to leave.

edit: I want to thank a reader for emailing me to point out that the "waiting for the bus" cost is really only paid for the first token, so that won't affect _streaming_ latency (just latency per turn or tool call). It's thus better to think of the performance impact of batch size being mainly that smaller batches require fewer flops and thus execute more quickly. In my analogy, maybe it's "lighter buses drive faster", or something.

Obviously I can't be fully certain this is right. Maybe they have access to some new ultra-fast compute that they're running this on, or they're doing some algorithmic trick nobody else has thought of. But I'm pretty sure this is it. Brand new compute or algorithmic tricks would likely require changes to the model (see below for OpenAI's system), and "six times more expensive for 2.5x faster" is right in the ballpark for the kind of improvement you'd expect when switching to a low-batch-size regime.

### How OpenAI's fast mode works

OpenAI's fast mode does not work anything like this. You can tell that simply because they're introducing a new, worse model for it. There would be absolutely no reason to do that if they were simply tweaking batch sizes. Also, they told us in the announcement [blog post](https://openai.com/index/introducing-gpt-5-3-codex-spark/) exactly what's backing their fast mode: Cerebras.

OpenAI [announced](https://openai.com/index/cerebras-partnership/) their Cerebras partnership a month ago in January. What's Cerebras? They build "ultra low-latency compute". What this means in practice is that they build _giant chips_. A H100 chip (fairly close to the frontier of inference chips) is just over a square inch in size. A Cerebras chip is _70_ square inches.

![cerebras](cerebras.jpg)

You can see from pictures that the Cerebras chip has a grid-and-holes pattern all over it. That's because silicon wafers this big are supposed to be broken into dozens of chips. Instead, Cerebras etches a giant chip over the entire thing.

The larger the chip, the more internal memory it can have. The idea is to have a chip with SRAM large enough _to fit the entire model_, so inference can happen entirely in-memory. Typically GPU SRAM is measured in the tens of _megabytes_. That means that a lot of inference time is spent streaming portions of the model weights from outside of SRAM into the GPU compute[^4]. If you could stream all of that from the (much faster) SRAM, inference would a big speedup: fifteen times faster, as it turns out!

So how much internal memory does the latest Cerebras chip have? [44GB](https://arxiv.org/html/2503.11698v1#:~:text=Most%20recently%2C%20the%20Wafer%20Scale,of%2021%20petabytes%20per%20second.). This puts OpenAI in kind of an awkward position. 44GB is enough to fit a small model (~20B params at fp16, ~40B params at int8 quantization), but clearly not enough to fit GPT-5.3-Codex. That's why they're offering a brand new model, and why the Spark model has a bit of "small model smell" to it: it's a smaller [distil](https://en.wikipedia.org/wiki/Knowledge_distillation) of the much larger GPT-5.3-Codex model[^5].

edit: I was wrong about this - the Codex model is almost certainly larger than this, and doesn't need to fit entirely in one chip's SRAM (if it did, we'd be seeing faster speeds). Thanks to the Hacker News commenters for correcting me. But I think there's still a good chance that Spark is SRAM-resident (split across a few Cerebras chips) which is what's driving the speedup.

### OpenAI's version is much more technically impressive

It's interesting that the two major labs have two very different approaches to building fast AI inference. If I had to guess at a conspiracy theory, it would go something like this:

- OpenAI partner with Cerebras in mid-January, obviously to work on putting an OpenAI model on a fast Cerebras chip
- Anthropic have no similar play available, but they know OpenAI will announce some kind of blazing-fast inference in February, and they want to have something in the news cycle to compete with that
- Anthropic thus hustles to put together the kind of fast inference they _can_ provide: simply lowering the batch size on their existing inference stack
- Anthropic (probably) waits until a few days before OpenAI are done with their much more complex Cerebras implementation to announce it, so it looks like OpenAI copied them

Obviously OpenAI's achievement here is more technically impressive. Getting a model running on Cerebras chips is not trivial, because they're so weird. Training a 20B or 40B param distil of GPT-5.3-Codex that is still kind-of-good-enough is not trivial. But I commend Anthropic for finding a sneaky way to get ahead of the announcement that will be largely opaque to non-technical people. It reminds me of OpenAI's mid-2025 sneaky introduction of the Responses API to help them [conceal their reasoning tokens](/responses-api).

### Is fast AI inference the next big thing?

Seeing the two major labs put out this feature might make you think that fast AI inference is the new major goal they're chasing. I don't think it is. If my theory above is right, Anthropic don't care _that_ much about fast inference, they just didn't want to appear behind OpenAI. And OpenAI are mainly just exploring the capabilities of their new Cerebras partnership. It's still largely an open question what kind of models can fit on these giant chips, how useful those models will be, and if the economics will make any sense.

I personally don't find "fast, less-capable inference" particularly useful. I've been playing around with it in Codex and I don't like it. The usefulness of AI agents is dominated by _how few mistakes they make_, not by their raw speed. Buying 6x the speed at the cost of 20% more mistakes is a bad bargain, because most of the user's time is spent handling mistakes instead of waiting for the model[^6].

However, it's certainly possible that fast, less-capable inference becomes a core lower-level primitive in AI systems. Claude Code already uses [Haiku](https://github.com/anthropics/claude-code/issues/1098#issuecomment-2884244872) for some operations. Maybe OpenAI will end up using Spark in a similar way.


edit: there are some good comments about this post on [Hacker News](https://news.ycombinator.com/item?id=47022329). First, a good [correction](https://news.ycombinator.com/item?id=47022810): Cerebras offers a ~355B model, GLM-4.7, at 1000 tokens per second already, so I'm wrong about Spark living in a single chip's SRAM. Presumably they're sharding Spark across multiple chips, like they're doing with GLM-4.7.

Many commenters disagreed with me (and each other) about the performance characteristics of batching. Some [said](https://news.ycombinator.com/item?id=47025656) that continuous batching means nobody ever waits for a bus, or that the [volume](https://news.ycombinator.com/item?id=47025997) of requests for Anthropic models means batch wait time is negligible. Other users [disagreed](https://news.ycombinator.com/item?id=47023038) about whether chip-to-chip communication is a bottleneck at inference time, or whether chaining chips together affects throughput.

I only have a layman's understanding of continuous batching, but it seems to me that you still have to wait for a slot to become available (even if you're not waiting for the entire previous batch to finish), so the batch size throughput/latency tradeoff still applies. Overall, I think the takeaway is that this stuff is really complicated and hard to form a good, simple mental model around. 




[^1]: This isn't even factoring in latency. Anthropic explicitly warns that time to first token might still be slow (or even slower), while OpenAI thinks the Spark latency is fast enough to warrant switching to a persistent websocket (i.e. they think the 50-200ms round trip time for the handshake is a significant chunk of time to first token).

[^2]: Either in the form of the KV-cache for previous tokens, or as some big tensor of intermediate activations if inference is being pipelined through multiple GPUs. I write a lot more about this in [_Why DeepSeek is cheap at scale but expensive to run locally_](/inference-batching-and-deepseek), since it explains why DeepSeek can be offered at such cheap prices (massive batches allow an economy of scale on giant expensive GPUs, but individual consumers can't access that at all).

[^3]: Is it a contradiction that low-batch-size means low throughput, but this fast pass system gives users much greater throughput? No. The overall throughput of the _GPU_ is much lower when some users are using "fast mode", but those user's throughput is much higher.

[^4]: Remember, GPUs are fast, but copying data onto them is not. Each "copy these weights to GPU" step is a meaningful part of the overall inference time.

[^5]: Or a smaller distil of whatever more powerful base model GPT-5.3-Codex was itself distilled from. I don't know how AI labs do it exactly, and they keep it very secret. More on that [here](/ai-lab-structure).

[^6]: On this note, it's interesting to point out that Cursor's hype dropped away basically at the same time they [released](https://cursor.com/blog/composer) their own "much faster, a little less-capable" agent model. Of course, much of this is due to Claude Code sucking up all the oxygen in the room, but having a very fast model certainly didn't _help_.