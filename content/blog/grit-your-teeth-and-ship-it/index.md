---
title: Grit your teeth and ship it
description:
order: 242
date: '2026-09-20'
tags: ["shipping", "emotional regulation"]
---

Being good at building and being good at shipping are two separate skills. In the short term, they're actually countervailing: if you have a gift for building, you're likely to be _worse_ at shipping. Ira Glass has a classic quote about this.

> All of us who do creative work, we get into it because we have good taste. But there is this gap. For the first couple years you make stuff, it’s just not that good. It’s trying to be good, it has potential, but it’s not. But your taste, the thing that got you into the game, is still killer. And your taste is why your work disappoints you.

The only way around this is to **grit your teeth and ship it**. You have to force yourself to publish things you've made even when you think they're crap.

### Programming

Gifted programmers have a [nearly pathological](/addicted-to-being-useful/) desire to build elegant, correct, neat systems. That's what motivates them to learn the arcane details of their languages, or to spend time polishing and refactoring over and over again. But it's also what makes them reluctant to ship. Any flaws in the software bother them on an emotional level. If they ship with those flaws, they feel like people will think they weren't paying enough attention to notice them, or that they weren't good enough to fix them.

This is annoying when you're writing software on your own, but it's completely fatal when you're working in a tech company. Any large software system is covered in flaws, whether due to time pressure, [relative inexperience](/bad-code-at-big-companies/), [wicked features](/wicked-features/), or a hundred other reasons. Working with it is a process of compromise: of finding the best possible solution given the quirks and foibles of the codebase. In fact, since the most important thing in large codebases is [consistency](/large-established-codebases/), the right thing to do is sometimes to _duplicate_ flaws, assuming they're not catastrophic.

Gifted programmers often freeze up. I've often seen them retreat to smaller domains where they can safely make the code "correct": tweaking dev-environment setup, or refactoring tests. Sometimes they just do nothing, and spin in shame and guilt (plus the compounding shame of not achieving anything) until they implode and quit. If they had worse taste, they wouldn't be as good at programming, but they'd be a lot more useful. You can typically improve a bad diff with time and effort. You can't improve _no_ diff.

### Writing

I have a sensitive eye for awkward sentences and uneven prose. That can make writing an unpleasant process: I know what I'm trying to say, but I can't seem to say it in a way that's as clear and as elegant as I know is possible. More than half the time I finish drafting a blog post, I look at the post and don't think it's very good. But I (mostly) grit my teeth and publish it anyway, because **you have to bias towards shipping**.

Like any skill, shipping gets easier the more you practice it. If I don't publish a blog post for a month, I always feel like the next draft is too poorly-written or uninteresting to put out there. But when I'm publishing a post per day, I typically feel great about each draft. When I go back and read my old posts, I can't tell which ones I felt good about and which ones I felt bad about. There's no correlation between that and the posts that become [popular](/popular/). Here are some posts I didn't like as I was writing them but that resonated with my audience:

- [Do the simplest thing that could possibly work](/the-simplest-thing-that-could-possibly-work/)
- [Software engineering may no longer be a lifetime career](/software-engineering-may-no-longer-be-a-lifetime-career/)
- [Software engineers should be a little bit cynical](/a-little-bit-cynical/)

Here are some posts I thought were pretty good but that didn't find popularity:

- [Weak engineering managers](/weak-managers/)
- [Paths through the space of all possible solutions](/solution-space/)
- [Trying to impress people you don't respect](/impressing-people/)

You just can't predict what people will find interesting or useful. Producing a high volume of work thus gives much better yield than a small amount of highly-polished work.

It can be disheartening to realize that some of your most casual, throwaway work will be more successful than the work you slaved over[^1]. Specifically, it's disheartening because it means realizing you don't have _control_ over your own success. You can't produce something successful by focusing on a single piece until you're satisfied it's great. Instead, you just have to do a lot of things and see what sticks. You have to be [momentum-based](https://sunilpai.dev/posts/the-senior-engineer-death-spiral/), not outcome-based. In other words, **you have to grit your teeth and ship it**.


[^1]: Anthony Burgess famously [claimed](https://en.wikipedia.org/wiki/A_Clockwork_Orange_(novel)#Writer's_appraisal) to have "knocked off" _A Clockwork Orange_ in three weeks, and Arthur Conan Doyle considered his largely-forgotten historical novel [Sir Nigel](https://en.wikipedia.org/wiki/Sir_Nigel) to be far better than his Sherlock Holmes stories.