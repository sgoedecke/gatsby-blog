---
title: Do reasoning models need to reason in language?
description: 
order: 137
date: '2025-09-08'
tags: ["ai"]
---

In [_Is chain-of-thought AI reasoning a mirage?_](/real-reasoning), I wrote about a paper that tried to answer questions about [reasoning models](https://en.wikipedia.org/wiki/Reasoning_language_model) by training a toy model to "reason" without language: for example, teaching the model that "[M1]" means "advance all letters by one", and then seeing if it can figure out how to do "[M3]".

I thought it was fairly clear that this was a fundamentally different operation from reasoning in language, From the feedback to that post, I learned that many people think that reasoning models

If your view is that LLMs don't "reason in language", I agree with you. I don't think humans or LLMs directly reason in language. But if your view is that language is purely arbitrary and is not load-bearing for LLM reasoning models, here's why I still disagree with you.

First, adding language-based reasoning traces clearly works. Much of the LLM capability improvement in the last year has come from reasoning models, all of which use language. Nobody has found a way to get better results by using something other than language as the reasoning content (e.g. this study on filler tokens). Until a strategy like that succeeds, it's at least plausible to assume that language is load-bearing in some way, whether or not it's correct to say that the model or human beings "reason in" language.

Second, it certainly looks like reasoning traces operate by (a) considering multiple solutions and (b) backtracking. Reasoning models are especially good at problems that require this kind of exploration, or require being able to turn back from blind alleys. Of course, you don't need language to do this, but language is certainly a better tool for the job than, say, the limited syntax in the Arizona paper. If reasoning requires backtracking, why wouldn't it be useful to be able to explicitly express "oops, this doesn't seem promising for these reasons, let's backtrack" in your reasoning trace?

Third - speaking philosophically - I don't think there has to be a 1:1 correlate in the brain in order to say that we "reason in language". This would be something like Jerry Fodor's "neuralese". I am more of a Dennettian about this stuff. I don't believe that we think in language, but language does have a close enough relationship with thought to be a useful tool (both for thinking itself and for talking about the process of thought). I think anyone who's spent time writing can attest to this - writing down your thought process in language is certainly not a 1:1 translation, but there are few better ways to think more clearly about a problem.

Anyway, that's why I think you can't draw conclusions about actual reasoning models from toy models that don't use language.