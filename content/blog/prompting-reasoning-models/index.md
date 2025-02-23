---
title: Advice for prompting reasoning models
description: Why it's hard and how to do it
order: 47
date: '2025-02-23'
---

I've written about how prompting regular LLMs is [not as important as people think](/beyond-prompting). Reasoning models are different. When you're using reasoning models, the quality of your prompt matters a lot. Why is that?

### Why prompting reasoning models is hard

Intuitively, you can think of regular models as humans who are giving you an off-the-cuff answer. If you want an off-the-cuff answer from a colleague, you might typically ask them a casual question: "hey Meredith, are people using our email export feature?" It's not a _bad_ idea to tighten that question up, but it's not essential, because it's a casual question and a casual answer. Meredith won't be upset with you for wasting a few seconds of her time.

Reasoning models give you a considered answer. It's akin to telling a colleague to go and spend a week looking into a question. If you tell Meredith to spend a week figuring out "are people using email export", that's rude. She might spend a week breaking down the user demographics when you really care about the types of email being exported. In that case, you've wasted a week of her time (and delayed you finding out the answer by a week)! You should give her enough context so she knows what you want to find out and why.

Slightly less intuitively, you can think of regular models as next-token-predictors, and reasoning models as something more like theorem-provers[^1]. If you give regular models a constraint, they often struggle to meet it. You can try this by giving models an arbitrary response-format rule, such as the need to respond with a prime number of words. Reasoning models will try much, much harder to meet any constraints you give them. What that means in practice is that they will continue "thinking" (i.e. generating tokens) until they have an answer that meets your constraints (or until some predetermined limit is hit and they give up).

### Specific advice

How should you handle prompting reasoning models? OpenAI's [guide](https://platform.openai.com/docs/guides/reasoning-best-practices#how-to-prompt-reasoning-models-effectively) about prompting reasoning models is excellent. Here are the key points:

- Be simple and direct
- Don't tell the model to think step by step, just give it clear instructions
- Outline constraints in the prompt explicitly, and be very specific about your end goal

One other useful trick with reasoning models is giving them an explicit way out if they notice they're lacking key information. For instance, you can add to your prompt "ask clarifying questions if needed", which should allow the model to end its internal reasoning and ask you something instead of just guessing and going down the wrong trail.

Note that all of this advice is more useful for straightforward reasoning models like DeepSeek-R1, and less useful for reasoning models like o1. OpenAI know that their user base is relatively unsophisticated (or wants to save money on compute tokens), and so has o1 tuned to avoid _too_ much deep thought. But when you talk to R1, it'll often think for a very long time indeed, so you'd better be careful with your prompts!

[^1]: Of course current-generation reasoning models are also next-token predictors, though that might change with GPT-5. The point I'm making is that they behave more like theorem provers than regular models do.

