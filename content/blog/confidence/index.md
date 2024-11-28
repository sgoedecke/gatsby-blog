---
title: Confidence and overconfidence in software engineers [draft]
description: What you should and shouldn't be confident about
order: 17
date: '2024-11-20'
---

Software engineers have a reputation for being confident. It's interesting to look at the kind of topics software engineers tend to have strong opinions about, compared to the kind of topics they hesitate to weigh in on. 

Are microservices better than monoliths? Should teams set their own technical direction, or is it better to have that dictated by some external architect? Should you write long-term complex projects in an untyped language? These questions have many, many devotees on both sides that talk as if the answer was obvious.

The longer I work in tech, the less confident I get about any of these big questions.


## Technical opinions and early-career trauma

Why are software engineers so confident about these big questions, then? I think our position on these big questions is often formed by early workplace trauma. There's something about living through a disastrous technical direction or organizational decision that locks the result in. Here's two examples.

First, I will always be suspicious about Redux-style state management, because I first learned React in an organizational environment where every single piece of state (even UI state) was mandated to be in the global Redux store. One of the things we built was a complex multi-part form with a lot of dynamic fields and a mix of sync and async validation. That was a _giant_ pain. But I've worked with developers who first encountered Redux in a migration from an awful spaghetti-state vanilla JS app, so they love it.

Likewise, I'll always be suspicious about local development environments that orchestrate a cluster of Docker services on your laptop. I spent years working in an environment like that where keeping everything up to date and functional demanded 10-30% of your effort each week. You would routinely lose entire days to it. Now my development environment is GitHub Codespaces, which spins up the Docker services in a working VM every time. Some of my colleagues complain about it and prefer the control/low-latency of local environments, but I never will - I'm just so grateful that everything actually works.

The point is that while I have lots of reasons for distrusting Redux and loving cloud-based development environments, none of those reasons are _principled_. They come from particular experiences I had and are tied to facts that could have gone the other way. And the more experience I get, the less confident I get, because I've seen more things both work and not work (awkward monoliths and easy monoliths, nightmare microservices and clean microservices, constricting types and helpful types, and so on).

From my conversations with other software engineers, basically everyone operates like this. That's why these big question debates are so heated and go on for so long. Most of us aren't really arguing about the content, we're regressing to our junior selves: tearing our hair out trying to trace the "click a button to switch tabs" logic across eight different files, or figuring out why the Docker networking setup is broken _again_. It's fundamentally an emotional reaction. You can't make me go back!

## I don't know and you don't know either

In fact, I don't think it's possible to be justifiably confident here. Why not? The structure of the argument goes like this. First, I only think your last ~20 years of experience matter for these questions, because the basic landscape of software development changes so rapidly. Software development in the very early 2000s or late 90s is a totally different ballgame. And I don't believe 20 years of experience is enough to answer these questions for sure. Why not? Because you'd need both breadth of experience and depth, and you can't pack enough of that in two decades.

In my view, you only start to see long-term consequences at the three-year mark at a company (ideally five years). That gives you at most four different perspectives into how software development gets done at different places (for instance, you might see a doomed monolith-to-microservices refactor at one workplace, and a more successful one at the next workplace). It just doesn't seem like enough data points.

If you instead job hop every two or three years, you'll see how things are done at a lot more companies (~8-10), but you won't have enough depth to be confident on whether a decision had good or bad consequences in the long term. For big decisions, it takes years for the initial hype (or doom) to wear off.

So I just don't see how it can be possible to know (e.g.) if it really is better to break down monoliths into microservices or to invest in them. You'd need to have seen multiple instances of teams going both ways on that decision (at least 2x each), and to have stuck around long enough to know how it turned out for them. That's what, sixteen years minimum, if everything goes perfectly? Probably longer, since for the first few years of your career you don't really know what you're looking at.

## What aren't software engineers confident about?

In my experience, software engineers are very reluctant to take a strong position on estimates and specifics. Estimates are famous - the simplest plans in software often go awry. By specifics, I mean things like: what's the max size of file that this API endpoint can handle? Is it possible for X type of account to ever perform Y operation? Engineers hesitate here for much the same reason. It's hard to predict how a complex program will behave, even if you're somewhat familiar with the code.

