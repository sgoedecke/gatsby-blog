---
title: Good engineers are right, a lot
description: It's an iffy Amazon leadership principle but a great engineering metric
order: 41
date: '2025-02-06'
popular: true
tags: ["good engineers", "tech companies"]
---

Amazon infamously has a leadership principle where they say "good leaders are right, a lot". It's unclear to me how useful it is about leaders, but it's definitely true about engineers. Good engineers are definitely right, a lot. 

Bryan Cantrill has a good rant about the Amazon principle [here](https://youtu.be/9QMGAtxUlAc?t=1676). I agree with Bryan that it's a bit silly-sounding, and that it's not the kind of fundamental principle that can guide tough decisions (no problem, just pick the right choice, like a good leader would do!) But I do think it's just a straight-up fact. Good leaders _are_ right a lot. Of course that flows from other qualities: they're smart, or they surround themselves with good people, or for any of a hundred other reasons. I think the point of Amazon's principle is that it's hard to assess those other qualities in the aggregate. It's easier to ask yourself: is this person right a lot?

Okay, it's easier, but still not easy. You can see whether a leader _wins_ without too much difficulty, based on whether users are flocking to their products, whether they're making scads of money, whether their companies are seen as amazing places to work, and so on. But people win for a lot of reasons. You can win by being wrong-but-lucky about one particular high-leverage thing. Bad leaders do sometimes luck into amazing products. The world of business is just too chaotic to assess accurately.

Not so in the world of engineering. Good engineers are right, a lot. They're right about concrete factual statements about how software systems work (e.g. endpoint X has rate limit Y). They're right about concrete plans (e.g. we can't add this check here, but it'll work there). They're right about a million small decisions that they make when they write code, which shows up in their code generally working and causing fewer bugs.

You can assess an engineer based on how smart they sound in conversation, whether they use light mode VSCode or dark mode vim, what their title is, and so on. But if you have the time, it's far more reliable to assess them based on whether they're right a lot. For technical colleagues, this assessment comes automatically: you can just ask yourself whether you feel default relaxed or suspicious when they make claims, or how much of a critical eye you naturally bring to review their PRs. Otherwise you can pay attention to what they say with confidence, and whether it turns out to be correct. If you're an engineer, there's a pretty good chance that your manager is quietly tracking this.

One caveat: some engineers avoid being wrong by never making confident technical statements. I think this is a dereliction of duty. If you're the most technical person in the room, it's your responsibility - your job - to give information and advice. Always saying "well, I'm not sure" or qualifying all your statements makes it very hard for less technical people to work with you. In any case, the principle is "be _right_ a lot", not "never be wrong". You can't be right a lot if you don't put yourself out there.

To continue that point, there's a difference between "right, a lot" and "always right", or even "often right". In domains that are technically very unclear (e.g. rotted legacy code, or frontier technical problems), being right even some of the time is extremely valuable. In my experience, being wrong is forgivable, particularly if you're the only one stepping forward to offer an answer or a plan.

All of this isn't helpful advice for engineers who want to _become_ right (a lot). That's a much more complicated topic[^1]. But it's a good metric for gauging your own performance:

1. Are you putting yourself forward and making technical statements (either in English or in code)?
2. Are those statements right, a lot?

edit: this post was discussed on [Hacker News](https://news.ycombinator.com/item?id=42962363) with lots of comments.

[^1]: My one-sentence advice here is to do a high volume of work in a single area for a long time, so you gain deep familiarity.