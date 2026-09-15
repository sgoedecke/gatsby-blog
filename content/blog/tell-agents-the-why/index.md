---
title: Tell agents the why, not just the how
description: 
order: 239
date: '2026-09-15'
tags: ["ai", "prompting"]
---

Early AI agents were basically enthusiastic idiots. Working with them required you to tell them precisely what you wanted them to do (for instance, "method A exists on class B, please add an equivalent method to classes C through F"). Otherwise they'd go off and do entirely the wrong thing. But as AI agents have improved, this has changed.

When frontier models go off and do the wrong thing today, they don't do it because they're confused, they do it because they make an incorrect assumption about your goals or priorities. For instance, when GPT-6-Astra thinks it's writing code for itself, it will produce [minified code](https://lucumr.pocoo.org/2026/9/7/astra-why/). It's perfectly capable of writing human-readable code - at least in Golang, where I've produced several thousand lines of acceptable code with the model - but you have to tell it that humans will be reading the code[^1].

This is the main piece of advice I want to give most people I see prompting agents: give the agent context on your priorities, not just on the specific task you want them to do. Here's a prompt I recently used as the starting point for [Deckard](/deckard/).

> Hello. You should have Runpod access via MCP (if not, tell me and I'll fix it).
>
> I have the long-term goal of building a local program or browser extension to automatically scan pages I load for AI content and hide it. I have the short-term goal of figuring out the best AI detection model I can run on my macbook without killing my battery or making it hot, and (relatedly) figuring out how to run the model most efficiently. My guess is that Pangram's EditLens 3B or the smaller Roberta model might be a good place to start, though they might require quantizing and will definitely require some work to make them run as efficiently as possible on my macbook.
>
> I would like you to use my Runpod account to start answering these questions. Eventually we'll move to doing things on this macbook pro, but my hope is that Runpod can help with some experiments that are too hot/long/slow to run locally. You are a smart model; if you can see a better way to achieve my goals, please let me know and we'll talk about it. Good luck.

About half of this prompt is sharing broad context, such as the overall project I'm aiming for, the fact that it's for me personally and not for work, and my priorities (e.g. keeping the laptop cold). If I had written an explicit spec, I would have missed a bunch of improvements: for instance, using native messaging for the local model, or choosing the Gradient model instead of EditLens.

I do the same thing for work, but typically with a stronger emphasis on my _technical_ values. I often write a paragraph spiel explaining the relative priorities of avoiding bugs, observability, fitting elegantly into the current code, performance, and so on. Note that I said "relative" priorities: I don't simply list all of these things and say they're important, I explicitly tell the model which of those I care less about and can therefore be traded off to better achieve the others.

Models are now smart enough to have meaningful input on your broader goals. If you're just prompting them with a concrete technical spec, you are committing the same mistake as in the [XY problem](https://xyproblem.info/): asking expert advice without giving the expert the context it needs.

[^1]: Incidentally, you don't have to tell it to write human code if it's working in a human-authored codebase. It's smart enough to pick up the style of the surrounding code.