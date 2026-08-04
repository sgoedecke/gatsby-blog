---
title: You don't have to be smart if you can think clearly
description: 
order: 217
date: '2026-07-29'
popularity:
  score: 32
  hackerNews:
    points: 24
    comments: 4
    threads: 1
  lobsters:
    points: 0
    comments: 0
    threads: 0
  manual: 0
tags: ["good engineers", "technical clarity"]
---

When you're on fire, problems are transparent: they're solved simply by the act of looking at them. Even complicated layers of multiple problems can simply be glanced through like stacked panes of glass. But nobody can work that way all the time.

This is a common pitfall for smart engineers. Accustomed to being able to immediately intuit the solution, the first time they run into a problem they can't do this to is a disaster. It doesn't even have to be a hard problem, just a problem where for whatever reason they don't see the trick right away.

The difference between a "smart" engineer and a "strong" engineer is how they react to problems that aren't solved instantly. A smart engineer might flail and struggle, hoping to find that flash of insight that eluded them; a strong engineer will have some process for methodically plodding away.

There's nothing worse than working with a smart engineer on their first really hard problem. When you don't have the muscle to grind, it's too tempting to just take _any_ possible solution as the right one. Smart engineers can get into an increasingly-flustered loop of pointing to a series of bad solutions. They're liable to panic: after all, much of their professional identity is bound up in their ability to solve problems easily.

What skill do these smart engineers lack? I think it's **the ability to think slowly and clearly**. Smart engineers can think clearly, but they can only think clearly at high speed. Strong engineers can think clearly _all the time_, even if their highest speed isn't quite as fast. It's like the difference between a Formula 1 car and a regular car: Formula 1 cars have a high top speed, but you couldn't drive them in traffic, because the tyres and brakes don't work at normal driving speeds.

When I wrote about this before in [_Thinking clearly about software_](/thinking-clearly/), I said that the key is to focus on the _invariants_: beliefs about the system that you know are true. When you're stuck in a puzzling situation, it's usually because some assumption you've made is false. If you're able to identify the assumptions that can't be false (for instance, if you're getting an error message from the service, the service must be handling the request), that gives you solid ground that you can stand on to evaluate the assumptions that are less reliable.

Thinking fast is about packing as much data in your brain as possible and letting your intuition leap to the right conclusion (or at worst, to a series of wrong conclusions that you can immediately dismiss before you come across the right one). It can feel deeply satisfying to make leaps like this; conversely, sitting with the raw data and _not_ making mental leaps feels unsatisfying. People hate doing that.

If you can force yourself to do something people hate, there's typically a lot of value waiting to be extracted. This is no different. Engineers who can think clearly in a state of uncertainty tend to be extremely effective, whether they're capable of great intuitive leaps or not.

edit: a reader suggested that I was talking about Keats' concept of ["negative capability"](https://en.wikipedia.org/wiki/Negative_capability): "that is, when a man is capable of being in uncertainties, mysteries, doubts, without any irritable reaching after fact and reason".

edit: this post got a handful of comments on [Hacker News](https://news.ycombinator.com/item?id=49092852). One commenter [argues](https://news.ycombinator.com/item?id=49093815) that solving hard problems isn't about thinking slowly, then describes in detail what I mean by "thinking slowly".