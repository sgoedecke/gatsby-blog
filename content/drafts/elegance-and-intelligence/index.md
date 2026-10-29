---
title: Why smart people produce inelegant solutions
description: 
order: 200
date: '2026-05-23'
tags: [""]
---

Elegance and intelligence have a surprisingly negative correlation. It takes a smart person to come up with an elegant solution, but smart people often don't need to do that, because they're capable of rapidly brute-forcing problems.

There's a famous John von Neumann story where he was asked a puzzle: how far a fly must travel, if it kept flying between two cyclists who were approaching each other at some fixed speed. The trick was to work out that the cyclists would take an hour to meet, then multiply that by the fly's speed to get the total distance. When von Neumann solved the puzzle instantly, the questioner assumed he'd heard the trick before. In fact, he said, he just summed the infinite series. If you can do that instantly in your head, why bother with the trick?

For software engineers, the most important part of raw intelligence is often the size of your working memory: how many moving pieces you can hold in your head at a given time. Software design involves finding elegant ways to reduce that number of moving pieces, typically by abstracting them behind some interface. It can be frustrating to work with engineers who can casually juggle many moving pieces, because they don't care as much about decomposing the problem into some elegant design. Likewise, it can be frustrating to work with engineers who struggle to understand code you consider simple, and demand even greater levels of abstraction that seem unnecessarily fiddly to you.

Some[^1] really good engineers are surprisingly [okay with](https://x.com/staysaasy/status/2115197136891486530?s=20) working in a sloppy codebase, because they [can see the whole thing clearly](/you-dont-have-to-be-smart-if-you-think-clearly/) at a glance. They don't get lost or confused, so the level of mess is acceptable to them. When needed, they will instantly trace through a ten or twelve step execution flow to see what needs changing or where the problem is. An engineer with a smaller working memory would have to puzzle it out slowly, or would have to refactor the flow to be simpler.

Something like this might be going on with AI-generated mathematical proofs (or codebases). They're so long and convoluted, and read as unacceptably sloppy in the eyes of mathematicians. But for a LLM, a series of a few hundred logical steps is not substantially more difficult to read than a series of ten. They are happy to just "sit down and calculate" indefinitely[^2], with more stamina and patience than any human mathematician.

[^1]: This isn't universal - some good engineers demand neatness, even to the point of [compulsion](/addicted-to-being-useful/).

[^2]: In 2025, this wasn't the case: models were limited by the size of their context window and could not effectively proceed after compaction. One of the under-discussed themes of 2026 is that compaction has all of a sudden gotten really good.

elegance and intelligence anticorrelate, not correlate

john von neumann famously would "just calculate"
https://x.com/staysaasy/status/2115197136891486530?s=20
if you can hold 1000 things in your head you don't need to abstract like a human would
smart engineers often produce awful codebases
we might see smarter models become inherently hard to understand 

