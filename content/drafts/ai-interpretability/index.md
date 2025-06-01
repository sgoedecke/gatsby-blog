---
title: Surprising results from AI interpretability
description: 
order: 91
date: '2025-06-01'
tags: ["ai", "explainers", "deepseek"]
---

It's common to call AI language models "black boxes". Unlike normal human-written programs, which we can examine line-by-line to see what they're doing, AI models are _grown_. AI models make decisions based on the interactions of billions of their weights. We can list those interactions, but that doesn't add up to an explanation for why the model did what it did, any more than "here's the billion neurons that fired" would explain human decisions. That's what makes them "black boxes": we can see what they _do_ on the outside, but we can't usefully look inside. Or can we?

### Why interpretability matters

A lot of money and effort has gone into looking inside AI models in the last few years. It might not be immediately obvious why. Wouldn't AI labs be incentivized to spend their limited money and compute on making the models smarter? There are a few reasons for that.

First, AI labs don't just want to make smart models. They want to make _useful_ and _safe_ models. If you make the world's smartest model, but half the time it doesn't answer questions or it just lies for the fun of it, you haven't made a model you can release. So some level of interpretability is necessary to confidently answer questions like "is this model safe?" and "does this model answer questions correctly?"

Second, AI labs are disproportionately full of the kind of people who think AI is going to take over the world (because those people are much more likely to go and work for AI labs). For those people, the question of "is this model safe?" is an _existential question_: getting it wrong dooms the entire human race. So for those people, interpretability is a higher priority than capability. It's no surprise that Anthropic - the most AGI-pilled frontier lab - has done the most useful public work in interpretability.

Third, there's good reason to believe that understanding models helps to make them more capable.