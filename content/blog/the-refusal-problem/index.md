---
title: The refusal problem in large language models
description: 
order: 123
date: '2025-07-29'
tags: ["ai"]
---

Everyone's interested in what language models _can_ do. But what about what they _will_ do? Try giving ChatGPT 4o a menial task that will generate a few pages of boilerplate output, such as:

> For every integer between 0 and 1000, print the number of letters in the French version of that number (e.g. for 5, print "5 - cinq - 4").

The model is of course capable of doing it. If you ask it for ten or twenty cases, it does it without issue. If you allow it to write code, it will cheerfully write you a script that generates the correct output. Even manually, if you keep prodding it to give you the next ten cases, it will eventually give you all the right data. However, it is borderline impossible to get 4o to directly give you the thousand cases you asked for. It will plead that there's just too much output, or try to give you a subset of representative cases. I call this the "refusal problem"[^1].

### What is the refusal problem?

Last month, Apple released a paper called "The Illusion of Thinking", where they made much of the fact that frontier language models couldn't output the steps needed to solve puzzles, past a certain number of steps. In my view, that paper made a [major mistake](/illusion-of-thinking): it mistook "the language model doesn't want to solve this problem" for "the language model can't solve this problem".

That's an understandable mistake. Computer programs don't decide which problems they want to solve. If you tell a normal computer program to work on something, it will work until it reaches an end state or until the hardware itself burns out. There's no question of whether it's putting in enough effort or trying hard.

However, large language models are different. Like humans, whether they can perform a task often depends on whether they believe they can perform it[^2]. This is what the Apple researchers encountered in their Tower of Hanoi problem - when solving the puzzle step-by-step would require hundreds of lines of boilerplate output, the model balked.

### Why do models refuse to generate boilerplate?

There's a few reasons why this might be the case. First, it might be that **model training data does not contain high-volume boilerplate**. Models aren't trained on this kind of content, but they are trained on short-form examples, so they have to be coaxed into giving you the boilerplate. That explains why they'll happily give you the same quantity of text when the text is English prose: there's lots of long-form prose in the training data.

It could also be **a side-effect of assistant post-training**. Every language model starts out as an unhelpful "base model" and then is post-trained into a helpful, always-positive assistant (for instance, by having thousands of humans rate the model outputs and training the model on those ratings). It's plausible that long boilerplate outputs get rated negatively during this process, since the humans are aiming for "friendly human" and not "robotically perfect golem".

AI skeptics will probably say that **long boilerplate is just too hard for models**, because they lose coherence after a certain quantity of output. I want to acknowledge this point, but I think it's plainly false. In the "counting in French" example above, you can get to 1000 in blocks of twenty at a time by simply responding "continue". You're not helping the model reason in any way by doing that. There's something else going on.

My favourite explanation is that **models are roleplaying as humans**. If you asked a human to count to a thousand, they would say no, or count to thirty and say "come on, you know the rest", or something similar. The process of training a model is the process of conditioning it to do human roleplay - for good and ill. Seen this way, the refusal problem is similar to why models will sometimes say that they [panicked and made mistakes](/do-not-yell-at-the-language-model): it's an unfortunate consequence of the roleplay.

### Solving the refusal problem

I expect the refusal problem to be fully solved, probably by the end of the year. If it is indeed just a roleplay or post-training issue, it'll be straightforwardly solved by including boilerplate in the post-training data or by reinforcement learning targeting boilerplate refusals.

If it's so easy, why hasn't it been solved yet? Well, until this year when models became strong enough to actually do agentic coding, it didn't really matter. The killer app for LLMs was chat, which doesn't have much boilerplate. Now that there's a coding-shaped killer app as well, which often needs boilerplate to be produced, the refusal problem won't last long.

It's interesting to think about what other human-like limitations LLMs might have unnecessarily imported. LLMs produce outputs from a vast and largely unexplored space of human language and personality. There are almost certainly more productive areas of this space than the one we're in now. How many problems are LLMs currently pretending that they're unable to solve?

[^1]: To be distinguished from cases where the model refuses to answer questions because of safety or ethical issues.

[^2]: Of course models don't believe things like humans do - they have a different substrate. When I say "believe", I'm [deliberately anthropomorphizing](/anthropomorphizing-llms).

