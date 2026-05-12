---
title: Thinking Machines and interaction models
description: 
order: 193
date: '2026-05-12'
tags: ["ai"]
---

Thinking Machines just released [_Interaction Models_](https://thinkingmachines.ai/blog/interaction-models/). This is their first real AI model release[^1] after a year of work and two billion dollars of capital. What is an "interaction model"? First, **it's not a frontier model**. Thinking Machines is not yet competing with OpenAI, Anthropic and Google.

Instead, they're working on the problem of better real-time interaction with models. Some parts of what they're doing are not new at all, other parts are slightly-questionable benchmark gaming, and still other parts represent a genuine technological advancement. I'll try to lay it all out.

### Fully-duplex voice models

If you've used ChatGPT in audio mode, you know that you can't talk to it exactly how you'd talk to a human. There's a big latency gap between when you finish talking and when the model jumps in. The model won't interrupt you like a human, and doesn't react to you interrupting it like a human would either. And of course you can't give the model visual feedback like facial expressions.

That's because **ChatGPT is either speaking or listening at any given time**. When you're talking, it's in "listening" mode; when it's talking, it's in "speaking" mode, and isn't absorbing any information from you. It relies on VAD ("voice activity detection") to figure out if you're talking. The alternative (and what "interaction models" do) is a fully-duplex system, where the model is constantly both in listening and speaking mode at the same time.

Of course, the model can't literally do this. Like all language models, it's either doing prefill (ingesting prompt tokens) or decode (producing completion tokens). But what fully-duplex models _can_ do is switch from listening to speaking mode in tiny chunks, called "micro-turns". Instead of listening for ten seconds (or however long it takes you to stop talking), then speaking for ten seconds (or however long it takes to pass the model output through TTS), the model can listen for 200ms, then output for 200ms, then listen for 200ms, and so on. While the user is speaking, the model will know to output silence - most of the time. But if it decides it's good to interrupt you or speak at the same time as you, it's capable of doing that.

So far, so unoriginal. There are plenty of examples of fully duplex audio systems that the Thinking Machines blog post already cites: [Moshi](https://github.com/kyutai-labs/moshi), [PersonaPlex](https://github.com/NVIDIA/personaplex), [Nemotron-VoiceChat](https://build.nvidia.com/nvidia/nemotron-voicechat), and so on. But at least this outlines the space that "interaction models" are playing in: not "superintelligence from a frontier model", but "better real-time conversational interaction"[^2]. Given that, what is Thinking Machines doing that's new?

### Delegating reasoning

For existing fully-duplex models, you talk to the model itself. That's a fairly big problem, since fully-duplex models have to be fast: fast enough that they can operate in tiny 200ms turns[^3]. A model that fast cannot be particularly intelligent.

Thinking Machines' solution is to introduce an actual smart model - any regular language model will do here - in the background that the interaction model can delegate tasks to. In practice this is probably implemented as a tool call. The interaction model keeps chatting while the smart model works away, and then the smart model output is directly integrated into the interaction model's context in the same way as audio and video input (a genuinely cool idea, I think).

This is kind of neat, though it remains to be seen how well it works in practice. Will the model do a lot of "oh wait, the last thing I said was dumb, never mind" self-correction as the smarter model output trickles in? Will the fast interaction model be smart enough to delegate the right tasks at the right time? In general, the "start with a fast dumb model and have it hand off tasks" approach has been tricky for the AI labs to get right for a variety of reasons.

If I'm being uncharitable, I might say that bolting on a strong reasoning model was an easy way for Thinking Machines to post impressive values for competitive benchmarks like FD-bench V3 (where they barely beat GPT-realtime-2.0) and BigBench Audio (where introducing the reasoning model bumps their score from 76% to 96%, only 0.1% below GPT-realtime-2.0). If I'm being charitable, I might say that a model fast enough for realtime conversation will have to have some way to punt hard tasks to a slower, smarter model. Both of those things are probably true.

### Scale

It's also worth noting that Thinking Machines have also bolted on video input to their fully-duplex model. This is more exciting than it sounds, because face-to-face human conversation is very dependent on being able to read human expressions. In theory, this could unlock the ability to have genuine human-like conversations.

The other reason why this is exciting is that it means Thinking Machines have been able to make a pretty big fully-duplex model (maybe twice the size of Moshi in terms of active parameters, and 40x the size in terms of total parameters).

In fact, this is probably the biggest real technical achievement here. Other fully-duplex models are already doing micro-turns and interruptions, and could delegate reasoning fairly easily if they wanted to, but they aren't doing video because they _can't_. Being able to make a fully-duplex model the size of DeepSeek V4-Flash is pretty impressive.

Much of the Thinking Machines blog post is dedicated to explaining how they've managed to do this: ingesting data in a more lightweight way, optimizing their inference libraries for tiny prefill/decode chunks, various decisions to make inference deterministic (a long-held [hobbyhorse](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/) for Thinking Machines).

### Conclusion

There's a lot of pressure on Thinking Machines to produce a genuine AI advancement. It doesn't seem like they're willing or able to compete in the frontier-model space (which makes sense, I wouldn't want to either). Given that, I can see why they're highlighting the parts of interaction models that are impressive to laypeople - all the fully-duplex interaction stuff - even though those parts are not truly innovative.

So what are Interaction Models? **A scaled-up, multimodal version of existing fully-duplex models like Moshi, with a real model bolted on for extra intelligence** (and maybe better benchmarks). The scale and video parts are new and cool, and something like the overall approach has to be right. In general, I'm glad that we've got well-funded and high-profile AI labs tackling problems other than "build a smarter frontier model". I think there's a lot of low-hanging fruit waiting to be picked in other areas of AI research.

[^1]: People do seem to really like [Tinker](https://thinkingmachines.ai/tinker/), which is their tooling for researchers who want to fine-tune models, but it's not exactly the hot new frontier model that people were expecting.

[^2]: I think it's at least a little shady that the Interaction Models video demo is making a big deal about some features (like real-time simultaneous translation) that are just features of fully-duplex audio models, not anything specific to their system.

[^3]: Even 200ms is a bit long. You can see from the demo that there's an uncomfortable half-second lag sometimes as the model finishes its prefill slice and has to move to the decode slice.