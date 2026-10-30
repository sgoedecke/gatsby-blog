---
title: Elegance and intelligence are anticorrelated
description: 
order: 262
date: '2026-10-30'
tags: ["mathematics", "ai", "technical clarity"]
crossPosts:
  x: "https://x.com/i/status/2116064362511138821"
  linkedin: "https://www.linkedin.com/feed/update/urn:li:share:7521830055787040768/"
---

Elegance and intelligence can have a surprisingly negative correlation. Intelligent people sometimes produce inelegant solutions because they're capable of rapidly brute-forcing problems. If I had to remember a hundred names, I would spend time coming up with clever mnemonics. John von Neumann would probably just remember them.

There's a famous von Neumann story where he was asked how far a fly must travel if it kept flying between two cyclists who were approaching each other at some fixed speed. The trick to the puzzle was to notice that the cyclists would take an hour to meet, so the fly must be travelling for an hour: given the fly's speed, it's then easy to calculate the total distance. When von Neumann solved the puzzle instantly, the questioner assumed he'd heard the trick before, but in fact he had just summed the infinite series. If you can do that instantly in your head, why bother with the clever trick?

For software engineers, the most important kind of raw intelligence is often the size of your working memory: how many moving pieces you can hold in your head at a given time. Software design involves finding elegant ways to reduce that number of moving pieces, typically by abstracting them away or moving them behind some interface. It can be frustrating[^1] to work with engineers with a giant working memory, because they don't care as much about decomposing the problem into some elegant design - they don't need to.

This is why some[^2] really good engineers are surprisingly [okay with](https://x.com/staysaasy/status/2115197136891486530?s=20) working in a sloppy codebase: because they [can see the whole thing clearly](/you-dont-have-to-be-smart-if-you-think-clearly/) at a glance. Since they never get lost or confused, the level of mess is acceptable to them. When needed, they will effortlessly visualize a ten or twelve step execution flow to see what needs changing or where the problem is.

Something like this might be going on with AI-generated mathematical proofs, which read as unacceptably verbose and unfocused in the eyes of human mathematicians. However, for a sufficiently intelligent LLM, a series of a few hundred logical steps is not substantially more difficult to parse than a series of ten. They are happy to just "sit down and calculate" indefinitely[^3]. I've [written](/ai-is-breaking-our-proxies-for-expertise/) about the danger of AI proofs solving conjectures without generating new ones. If AI proofs are inherently less elegant than human proofs, that compounds that danger, since noticing (or inventing) elegant abstractions is often the fuel for generating new conjectures.

Humans have had to become very good at inventing clever tricks, because we aren't built for rationality. Aside from having a limited working memory, our systems of logical thought are jury-rigged on top of a seething morass of irrational urges, inspirations, and blind guessing. As it turns out, this has been an astonishingly good way to develop powerful abstractions that help us understand the universe.

Could LLMs be smart enough to avoid needing to come up with truly creative insights? This is _probably_ too comforting a thought to be true. Smarter minds may still need to come up with new abstractions, just for harder problems. John von Neumann[^4] himself invented a ton of new mathematics despite his willingness to calculate. However, it's possible that humans are inherently better at this creative process than machines - out of necessity, if nothing else. Since we humans are spending the late 2020s thinking hard about our competitive advantages, it's interesting to consider that our relative stupidity might be one of them.


[^1]: Likewise, it can be frustrating to work with engineers who struggle to understand code you consider simple, and demand levels of abstraction that seem unnecessarily fiddly to you.

[^2]: This isn't universal - some good engineers demand neatness, even to the point of [compulsion](/addicted-to-being-useful/).

[^3]: In 2025, this wasn't the case: models were limited by the size of their context window and could not effectively proceed after compaction. One of the under-discussed themes of 2026 is that compaction has all of a sudden gotten really good.

[^4]: His opposite might be Alexander Grothendieck, who famously attributed his mathematical creativity to his "clumsy, even oafish" relative lack of talent.