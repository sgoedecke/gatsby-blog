---
title: System One models like Jev can train their own replacements
description:
order: 243
date: '2026-09-20'
tags: ["system one", "ai"]
---

"System One" models like [Jev](/jev-means-structured-output-is-interesting-again/) are fast general classifiers. Classifiers have existed since [1958](https://en.wikipedia.org/wiki/Mark_I_Perceptron), but they have to be trained for specific tasks: if you build a classifier to identify images of dogs, it can't be used to tell you if a streetlight is red, or if a letter is urgent. Like a LLM, Jev can be prompted for a wide variety of tasks, from [sorting email](https://www.youtube.com/watch?v=9oWxrsRo4d8) to [playing Doom](/two-techniques-for-working-with-system-one-models/).

I think models like this are going to be important. There are many tasks that a LLM _could_ do in theory but are too slow and expensive in practice (for instance, reading each new message in Slack[^1] and deciding whether to notify you or not). While you could train a specific classifier for these tasks, there are two main problems with that:

1. Despite being a well-understood ML problem, training a bespoke classifier is outside of the skillset of most ordinary engineering teams
2. Training a classifier requires assembling a large dataset

Jev obviously solves the first problem. Any engineering team can plug in a System One model with a prompt like "Based on {list of criteria}, should the user be notified about this message?" But I think it solves the second problem too.

For serious work, a specific hand-built classifier will always be cheaper and faster than Jev. Generic classifiers have to encode knowledge of all kinds of irrelevant things in their weights, so they can address lots of different tasks. That makes them larger, slower, and more expensive to run. Fortunately, **it is going to be surprisingly easy to replace a Jev instance with a hand-built classifier.**

Once you're satisfied with how your Jev classifier is performing - presumably you've spent days tweaking the prompt - you can trivially collect its input and output data. In the Slack notifier case, that'd be the Slack message (plus any context) and the ultimate decision to notify or not. Once you've saved enough data, you'll be able to train your own classifier on that data[^2].

It won't be a general classifier like Jev, but it should do well on the specific task and be much faster. Of course it'll require some ML expertise, but it should be easier to develop (or rent) that expertise once you've validated that the feature is worth building.

In other words, because Jev has to be prompted for specific tasks, it should be easy to [distil](https://en.wikipedia.org/wiki/Knowledge_distillation) any successful Jev usage into a specific classifier. If System One models take off - and I hope they do - I expect this to be a common pattern.


[^1]: As I write this, I'm imagining ways you could poll and batch to do this with LLMs. Substitute "instantly notify" or some higher-volume event source if you'd prefer a different example.

[^2]: You could annotate a bunch of data with LLMs already, without using Jev, but this is a pretty expensive step to take when you aren't sure the feature is going to work.