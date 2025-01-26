---
title: What did DeepSeek figure out about reasoning with DeepSeek-R1?
description: RL-based reasoning instead of SFT on millions of traces
order: 36
date: '2025-01-26'
---

The Chinese AI lab[^1] DeepSeek recently released their new reasoning model R1, which is supposedly (a) better than the current best reasoning models (OpenAI's o1- series), and (b) was trained on a GPU cluster a fraction the size of any of the big western AI labs. Unlike the big western AI labs, they've released a [paper](https://github.com/deepseek-ai/DeepSeek-R1/blob/main/DeepSeek_R1.pdf) explaining what they did.

Like previous posts [along these lines](/mcts-and-llms), this is more of my attempt to think out loud and internalize what I've learned by reading the paper. I'm not an expert in this area: I work on AI products at GitHub, but the emphasis there is on "product", not on "AI". Hopefully that makes this helpful to other non-experts - but it's helpful to me, in any case.

Okay, let's define "reasoning model". A regular model takes a prompt and predicts the next n tokens (i.e. completing a sentence or answering a question). The model "thinks" (i.e. performs matrix multiplications) for exactly the same amount of time for each token. That means that the more time the model spends talking, the more time it has to spend on a question, and the better the answer you'll get. That's why prompts like "think step-by-step" and "spell out your reasoning before answering" are well-known to help.

A reasoning model attempts to bake that behaviour into the model itself. How OpenAI's models work exactly is a trade secret, but one simple answer could go like this[^2]:

1) Start with a smart normal model, like GPT-4o
2) Using that model, generate millions or billions of chains-of-thought by asking it to think step-by-step on a series of problems
3) Filter those chains-of-thought to remove incorrect answers (by checking with another smart model, or automated checks if those are possible)
4) Use all that data to fine-tune your smart normal model, so it responds with chains-of-thought all the time

Step (4) is as expensive as any big training run. But steps (2) and (3) are unique to training reasoning models, and are also very expensive. That's because they require unrestricted access to a smart model and enough time to generate a huge volume of quality data. DeepSeek's training is quicker because they don't do either of those steps. Instead, they:

1) Start with a smart normal model, like DeepSeek-V3, and perform the following reinforcement-learning loop
2) Ask that model to solve a mathematical problem, with a prompt that pushes it to think step-by-step
3) Verify the answer in code (i.e. not with a model, but by directly parsing the answer and checking it)
4) If correct, reward the model; if wrong, punish the model
5) Repeat for a long time

In short, this is a reinforcement learning approach, not a fine-tuning approach. There's no need to generate a huge body of chain-of-thought data ahead of time, and there's no need to run an expensive answer-checking model. Instead, the model generates its own chains-of-thought as it goes[^2]. There are other points made in the DeepSeek-R1 paper, but I think this is by far the most important.

Aside from the cost benefits, I believe there's also a potential quality benefit to DeepSeek's approach. OpenAI's (supposed) approach above can only reason as well as the best moments of its original smart model, because it's predicting the exact reasoning steps that the original model gave. DeepSeek's approach can theoretically reason much better than the original model, because as it keeps learning, it's providing its own brand-new reasoning chains that are only assessed by the quality of the conclusion. In my view, this is much more likely to lead to the truly alien superintelligent reasoning that people have been anticipating (and that we already see from superintelligent chess programs).

Is DeepSeek's approach just better, then? I don't _think_ so. Restricting your training process to chains-of-thought that can be verified mechanistically (i.e. without a model) means that you can only really train the model on coding and mathematics. There's just no way to do a logical word puzzle, or a legal analysis, or any of the other forms of reasoning we might want out of a reasoning model.

It's theoretically possible that this doesn't matter, because superintelligence in coding/mathematics might transfer to other domains. As I understand it, we've sort of seen that happen in normal models - as they're trained on more code, they get better at non-code domains. But it remains to be demonstrated in practice. I don't think Deepseek-R1 is currently crushing the humanities.

[^1]: Supposedly, not even an AI lab at all, just a quant shop with a lot of spare GPUs (!?)

[^2]: I can't stress enough how I have no actual idea what OpenAI is doing, and this is just a wild guess. Even if they are doing something along these lines it's certainly going to be more sophisticated.

[^3]: Note: this technically describes DeepSeek-R1-Zero, not DeepSeek-R1, which is seeded with a couple of thousand chains-of-thought as in the original approach. But that's more of a "teach the model what a readable chain of thought looks like" idea, not a "make the model smarter" idea