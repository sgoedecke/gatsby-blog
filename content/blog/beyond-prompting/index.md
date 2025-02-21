---
title: Using LLMs effectively isn't about prompting
description: It's about building a sense of what LLMs do well
order: 45
date: '2025-02-21'
---

When people talk about using language models effectively, they mainly talk about prompting: sharing great prompts, lists of tips for prompting, or courses on becoming a "prompt engineer". It's true that prompting is a surprisingly effective way to get more out of LLMs. Small variations in prompts can make a big difference in the LLM output. There really are general rules (put your question first and your context last, for instance)[^1]. However, when I use LLMs, I rarely think about prompting.

**Using LLMs well involves extracting value from what they're good at and avoiding wasting time at what they're bad at.**

The most important thing is to have a good sense of the strengths and weaknesses of strong LLMs. This is harder than it sounds for a few reasons:

1. Unlike most tools, LLMs will actively try and deceive you about their capabilities
2. LLMs are very good at some tasks that are hard for humans (e.g. wide recall) and very bad at some tasks that are easy for humans (e.g. spelling)
3. What LLMs are good or bad at changes _rapidly_

There are two ways to get a good sense of the strengths and weaknesses of LLMs. The first is to have a technical understanding of how they work, so your intuition has something to go on. The second way is to just spend so many hours using LLMs that you pick it up via trial and error. Really you have to use both ways, because LLMs sometimes surprise even the most informed engineers, and because they're changing fast enough that experience by itself can be misleading.

### Concrete advice

OK, here's some concrete advice (that has nothing to do with prompting):

**Lean into the chat aspect** when you're learning a new topic. If you use LLMs like a better Google search, you're only capturing a fraction of their value. My best experiences have come when asking followup questions - just straightforward, down-the-line, naive questions, such as "so you're saying that X is true" or "does this have consequence Y"?

**Trust broad theoretical claims but be suspicious of incidental detail.** In my experience, LLMs are excellent at explaining questions like "why is the sky blue" or "how does OAuth work". But they occasionally flub specifics (e.g. dates, names, referenced papers). If you have a task that is detail-heavy, LLMs might not be the right choice.

**If the LLM is going in circles or seems confused, back out.** You can't rescue it - at least not without understanding the problem yourself well enough to spoonfeed the answer, at which point you may as well not use LLMs at all.

Related to that, **ask hard questions across multiple LLMs**. Instead of spending fifteen minutes iterating in a single chat, ask the initial question to four or five SOTA models. Sometimes one of them will land on a good answer immediately.

If you're asking a question (and not trying to learn a new topic) and the LLM gives a long answer with lots of preamble, **skim through the preamble** quickly. It's more for the LLM than it is for you - you can jump to the end and see what the answer is, and then read back if you need to.

Lean into the fact that **one-off code is effectively free to generate**. If you're interested in a topic (e.g. how many commits in a GitHub repo touch multiple files), you can generate a quick script to answer that question immediately. It turns ten-minute questions into one-minute questions, letting you ask ten times as many questions.

**Don't be afraid of writing scripts that themselves use LLM APIs**. You might be able to write your own code to figure out the above git question, but it's much harder to write code to answer "how many commits use correct punctuation". With LLMs, you can easily write a script to answer that (or any other tough question). There are tons of cheap or free LLM API options out there: Google and GitHub both have generous free tiers, for instance[^2].

### Summary

- Try and get a sense of what models are good and bad at
- Ask followup questions
- Trust theory, be suspicious of detail
- If the LLM seems confused, back all the way out
- Ask hard questions across multiple LLMs
- Generate one-off code
- Generate one-off code _that uses LLM APIs_

Is prompting not worth paying attention to? That's overstating it. It's still worth thinking carefully about how talk to the models. Reasoning models in particular reward careful prompting. And if you're writing code that uses LLMs (instead of just talking to them via chat), you should spend a lot of effort making a good prompt. But if you're using LLMs to answer questions, or to learn topics, or for any other personal reason, you should focus more on learning what LLMs can and can't do well.

[^1] This is especially true for reasoning models, which sometimes spend minutes spinning away at your prompt (so it better be good). If you want me to write more about that, email me.

[^2]: Disclaimer - I work on the [GitHub one](https://github.com/marketplace/models). I listed it after Google out of some sense of not wanting to shill, I guess.