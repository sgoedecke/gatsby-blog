---
title: Prompting reasoning models
description: --
order: 25
date: '2025-01-24'
---

I've written about how prompting regular LLMs is [not as important as people think](/beyond-prompting). Reasoning models are different. When you're using reasoning models, the quality of your prompt matters a lot. Why is that?

Intuitively, you can think of regular models as humans who are giving you an off-the-cuff answer. If you want an off-the-cuff answer from a colleague, you might typically ask them a casual question: "hey Meredith, are people using our email export feature?" It's not a _bad_ idea to tighten that question up, but it's not essential, because it's a casual question and a casual answer. Meredith won't be upset wi th you.

Reasoning models give you a considered answer. It's akin to telling a colleague to go and spend a week looking into a question. If you tell Meredith to spend a week figuring out "are people using email export", that's rude. She might spend a week breaking down the user demographics when you really care about the types of email being exported. In that case, you've wasted a week of her time (and delayed you finding out the answer by a week)!

Slightly less intuitively, you can think of regular models as next-token-predictors, and reasoning models as something more like theorem-provers[^1]. If you give a regular model a constraint, it might immediately break it (oops!) or might set itself up so that it cannot meet it. You can try this by giving models an arbitrary response-format rule, such as the need to respond with a prime number of words. Reasoning models will try much, much harder to meet any constraints you give them. What that means in practice is that they will continue "thinking" (i.e. generating tokens) until they have an answer that meets your constraints (or until some predetermined limit is hit and they give up).

Another way of looking at it is that regular models are great at _search_, while reasoning models are great at (you guessed it) _reasoning_. When you're searching what is effectively the entire written corpus of human knowledge - or as close to it as OpenAI can get - you want to just throw a bunch of search terms out there and see what bubbles up from the latent space. When you're reasoning out a problem, you want the opposite approach: to get clear about the assumptions you're making and the kind of solution you're looking for. You don't want something nearby in latent space - you want the actual answer you're looking for.

[^1]: Of course current-generation reasoning models are also next-token predictors, though that might change with GPT-5. The point I'm making is that they behave more like theorem provers than regular models.

