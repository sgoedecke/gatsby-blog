---
title: AI datacenters in space do not have a cooling problem
description: 
order: 194
date: '2026-05-13'
tags: ["ai"]
---

This year Elon Musk has started [banging the drum](https://www.npr.org/2026/04/03/nx-s1-5718416/ai-data-centers-in-space-spacex-elon-musk) about building AI datacenters in space. As the only person who owns a successful space company and a (moderately) successful AI company, this is a sensible way to boost his profile and net worth. Is it a sensible way to build datacenters?

### The cooling problem

The first comment underneath most discussions of this always goes along these lines: "you obviously can't build AI datacenters in space, because heat dissipation is really hard in space, and AI datacenters generate a lot of heat".

In general I am distrustful of snappy answers like these. It reminds me of the "AI datacenters obviously don't use a lot of water, because cooling fluid circulates in a closed-loop system" argument: if it were true, there wouldn't be a debate at all, just one side who understand the obvious point and another side who are stupid.

Some arguments are like this! However, more often there's a complicating factor that makes the snappy answer incorrect. In the water-use case, it's that the closed-loop system has to itself be cooled by an open-loop evaporative chiller. What about the space datacenter case?

### Why cooling is possible in space

First, let's give the argument a fair shake. Although space is itself very cold, cooling is tricky because everything you'd want to cool is surrounded by vacuum. Heat transfer works in three ways:

1. Hot (i.e. fast-moving) atoms bump into other atoms, making them move and thus heating them up
2. Hot atoms physically move from one location to another (e.g. in a fluid or gas), staying hot and thus making their new location hotter
3. Hot objects emit photons (electromagnetic radiation), cooling themselves down and heating up other objects those photons collide with

Vacuum is an excellent insulator because it defeats the first two methods of heat transfer. If there are no (or very few) atoms surrounding an object, those atoms can't move around or collide. That's why vacuum is used as an insulator in thermoses, travel mugs, and so on.

So how can space datacenters get rid of their heat? By doubling down on the third method of heat transfer. Although it's much harder to do heat transfer via moving atoms around in space, it's actually _easier_ to do heat transfer via emitting radiation. Any good emitter is also a good absorber. A perfectly black object is the most efficient emitter, but it's also the most efficient way to absorb photons from external sources, which is why black objects get hotter in the sun[^1]. In space, the sun's light is much easier to avoid, because there aren't objects everywhere for it to bounce off. A shaded radiator can dump quite a lot of heat.

### Why cooling is still going to be hard

It would still require putting more radiators in space than we've ever done before. There are plenty of writeups out there if you want to read through the numbers. [This](https://arxiv.org/abs/2604.27197) is a recent one that estimates ~2500 square metres of radiation area would be needed to serve 1MW of datacenter energy (much less than what it'd need in solar panels)[^2]. A serious AI datacenter is around 100MW[^3], so we'd need 250,000 square metres of radiation area. The largest current radiator in space is probably the ISS, at around a thousand square metres.

Is scaling that up by 250x a lot? Yes, but it's not necessarily _ridiculous_. We currently have zero industrial operations happening in space, so there's been no need to push the boundaries here. In the grand scheme of things, 250,000 square metres is not that big. By my very rough estimates, that's between 100-500 Starship launches: a couple of years at SpaceX's current launch cadence, or a few months at their (very optimistic) estimate of future launch cadence.

### Conclusion

Of course, you don't just need radiators to put a datacenter in space. You need a similar quantity of solar panels, the GPUs themselves, and all kinds of other supporting equipment. If a GPU dies in an Earth datacenter, you can go in and swap it out; if it dies in space, you just have to leave it dead and keep going with less capacity.

It's still wildly impractical to build AI datacenters in space. But it's not _impossible_, and it's certainly not impossible because of the cooling, which is a relatively minor component of the total mass that would have to be launched into space.

[^1]: In theory, black clothing would keep you slightly colder at night.

[^2]: Nobody ever talks about how impossible it would be to _power_ space datacenters, despite the fact that you'd need to launch over triple the solar panel area into space than radiation area. I guess because people know solar panels exist and that the sun shines in space.

[^3]: The first gigawatt AI data centers are coming online this year, but 100MW is a fair estimate for a current pretty-large-but-not-enormous AI datacenter.