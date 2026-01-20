---
title: The future of AI is Ruby on Rails
description:
order: 58
date: '2025-03-20'
tags: ["ai"]
---

Large language models are very good at generating and editing code. Right now, it's probably the "killer app" of AI: the companies actually making money from language models - like GitHub Copilot, Cursor, Windsurf - are all doing code generation.

This works astonishingly well at small scale, but there's an [obvious problem](/vibe-coding) when the codebase grows larger. Tools that write the code for you will hit a wall once the codebase can't fit inside the model context. Changes suddenly stop working, and attempts to fix it just create more bugs elsewhere. Even models that advertise large context windows don't necessarily have large _effective_ context windows. The more you put in the context, [the dumber the LLM gets](https://arxiv.org/html/2502.05252v1). This is why in-editor completions are still the gold standard for AI-assisted programming. It leans into the model's strengths at being surprisingly good at small-scale changes.

Paul Graham has a famous [blog post](https://paulgraham.com/avg.html) where he talks about how some programming languages are more powerful than others. By power he means something like having more fundamental language features (e.g. recursion, macros), and thus the ability to do things that other languages simply cannot do (or at least can't do without writing a lot more laborious code).

With that in mind, I think this is a good proxy for AI-assisted programming power: **how many tokens does it take to express a program that does X?**

Here's a simple example. If you want to ask a LLM to build a blogging webapp, should you pick Python or Golang? (Forget that Golang is likely to be more performant, and just think about which choice is more likely to get you a working app). I think it's obvious you should pick Python. Golang has much more boilerplate - error handling, iterating over collections - which means that you're going to hit the token limit much more quickly. Your Python app will fit in fewer tokens, so you can add more features before you reach that point.

Golang is easier for humans than LLMs, because all of Golang's extra tokens can be more-or-less safely ignored by a human programmer. You can skim over the `if err != nil` or for loops. A LLM can't skim in the same way: a token takes up space in its context window, whether it's boilerplate or not[^1]. Should a LLM write minified code, then, to take up as little space as possible? I don't think so - it still needs expressive variable names, for the same reason a human would. The ideal language for LLMs is thus a language that uses as few tokens as possible per-feature, while still being readable. In other words, a language designed from the ground up for developer happiness.

That's Ruby! The entire point of the language is that you should be able to express your program as briefly and elegantly as possible, even if it costs more CPU cycles to run. Ruby on Rails has its own problems - to put it mildly - but the thing it does well is fitting a lot of features into a small amount of code. That's exactly what LLMs need.

Should we be doing all our vibe coding in Ruby on Rails? Maybe not yet. I do think using a typed language is a [good idea](https://ezyang.github.io/ai-blindspots/use-static-types/), so that one of the big gaps of LLMs - their inability to test their own code like a human would - can be covered by the typechecker. There's also a good argument for sticking with Javascript and Python, because of their outsized presence in the LLM training data.

Still, it's an intriguing thought. Ruby is the most "human" language I know: written for humans, with interesting human foibles, reads like human language, and so on. It would be pretty ironic if it also turned out to be the language of the robots.

[^1]: It might take up less _attention_, though.
