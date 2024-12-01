---
title: I don't know how to build software and you don't either
description: Overconfidence about the big questions in software engineering
order: 17
date: '2024-11-20'
---

Are microservices better than monoliths? Should teams set their own technical direction, or is it better to have that dictated by some external architect? Should you write long-term complex projects in an untyped language? If you're on the internet for ten seconds, you'll see many engineers who argue about these topics as if the answer was obvious.

The longer I work in tech, the less confident I get about any of these big questions. I've seen enough things work that I thought were terrible ideas, and vice versa. In fact, I'm not convinced it's even possible to be justifiably confident that there's a right answer to these questions. Nobody knows!

## What experience can't teach

Why can't we know the answer to these questions? My core argument goes like this:

1. Only your last ~20 years of experience matters for these questions, because the basic landscape of software development changes so rapidly. (I may feel differently about this when I've had more than 20 years of experience!)
2. Two decades is not enough to answer any of these big questions. Why not? Because you'd need both breadth of experience and depth, and you can't pack enough of that in two decades.

In my experience, you only start to see long-term consequences at the three-to-five-year mark at a company. That gives you at most four different perspectives into how software development gets done at different places (for instance, you might see a doomed monolith-to-microservices refactor at one workplace, and a more successful one at the next workplace). I don't think four data points is enough.

If you instead job hop every two or three years, you'll see how things are done at a lot more companies (~8-10), but you won't have enough depth to be confident on whether a decision had good or bad consequences in the long term.

So I just don't see how it can be possible to know (e.g.) if it really is better to invest in monoliths or to break them down into microservices. You'd need to have seen multiple instances of teams going both ways on that decision, and to have stuck around long enough to know how it turned out for them. That's what, sixteen years minimum, if everything goes perfectly? Probably longer, since for the first few years of your career you don't really know what you're looking at.

What if your opinions here aren't based on personal experience? Maybe you're rationally deducing how software should behave, or you're relying on broad studies that distil the collected experience of thousands of engineers. I think both of these paths are hopeless. At least half of building software is about _people_, so I take a dim view of anyone's ability to sit in an armchair and reason out the best way. And my strong impression is that the state of software engineering research is inconclusive about the big questions. Take Dan Luu's [deep-dive](https://danluu.com/empirical-pl/) into the research around whether statically typed languages deliver better software - there's definitely not the kind of academic consensus here you'd need to feel confident on the issue.

## Technical opinions and early-career trauma

Why do we often feel so confident about these big questions, then? I think our position on these big questions is often formed by early workplace trauma. There's something about living through a disastrous technical direction or organizational decision that locks in specific beliefs about how not to build software. Here's two examples.

First, I will always be suspicious about Redux-style state management, because I first learned React in an organizational environment where every single piece of state (even UI state) was mandated to be in the global Redux store. One of the things we built was a complex multi-part form with a lot of dynamic fields and a mix of sync and async validation. Keeping all of that in the global store was a giant pain and made the project harder than it needed to be. But I've worked with developers who first encountered Redux in a migration from an awful spaghetti-state vanilla JS app, so they understandably love it.

Likewise, I'll always dislike local development environments that orchestrate a cluster of Docker services on your laptop. I spent years working in an environment like that where keeping everything up to date and functional demanded 10-30% of your effort each week. You would routinely lose entire days to it. Now my development environment is GitHub Codespaces, which spins up the Docker services in a working VM every time. Some of my colleagues complain about it and prefer the control/low-latency of local environments, but I never will - I'm just so grateful that everything actually works.

The point is that while I have lots of reasons for distrusting Redux and loving cloud-based development environments, none of those reasons are _principled_. They come from particular experiences I had and are tied to facts that could have gone the other way, if I'd taken a job at a different company or on a different team. And the more experience I get, the less confident I get, because I've seen more things both work and not work (awkward monoliths and easy monoliths, nightmare microservices and clean microservices, constricting types and helpful types, and so on).

From my conversations with other software engineers, I think basically everyone operates like this. That's why these big question debates are so heated and go on for so long. Most of us aren't really arguing about the content, we're regressing to our junior selves: tearing our hair out trying to trace the "click a button to switch tabs" logic across eight different files, or figuring out why the Docker networking setup is broken _again_. It's fundamentally an emotional reaction. You can't make me go back!

## What can we know?

I do want to acknowledge that (particularly if you're more senior) engineers _should_ have opinions about the big questions. We're quite literally paid to choose typed or untyped languages, to develop a strategy about how to handle a monolith codebase, and so on. If you don't have some kind of position on these questions, you're not doing your job. But I think it's really important to temper that with the knowledge that you definitely could be wrong, and to try to take a nuanced view instead of being a hard-line OOP purist (for instance).