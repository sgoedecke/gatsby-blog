---
title: No, local models will not win
description: 
order: 223
date: '2026-08-11'
popular: true
popularity:
  score: 390
  hackerNews:
    points: 22
    comments: 20
    threads: 1
  lobsters:
    points: 26
    comments: 50
    threads: 1
  manual: 0
tags: ["ai"]
---

Every time a new open-weight AI model is released, people [say](https://news.ycombinator.com/item?id=49244353) that local models are the future. Why spend billions of dollars building out datacenters when everyone will just be able to run AI models on their laptops or phones? I think this idea is doomed. No matter how strong open-weight models get, most inference will always happen in AI datacenters.

### Local models are too weak to be widely used

**Local models are never going to be as powerful**. I think this point should be obvious: all of the current frontier models (closed and open-weights) are far too big to run on anything but a full GPU cluster in a datacenter. Of course, smaller models are getting more intelligent over time. In a year you might be able to run something about as strong as GPT-5.6-Sol on your laptop. But by then, you'll think of GPT-5.6-Sol as too weak to be useful.

Many people deny this last point, but it's true: **almost everyone's revealed preference is to use the strongest available model in their price range**. If AI progress had stalled at GPT-4, I think we could have built some very powerful tools around it, but who'd use GPT-4 today? As LLMs have gotten more capable, our expectations around them have grown: we now expect agentic systems to be able to solve more and more problems independently. It's intensely frustrating when they get confused or stall out. When given a choice, people are going to pick the model that frustrates them less, which is always going to be the bigger, more powerful one.

### Local models are more expensive and less efficient

On top of that, **datacenter models are always going to be cheaper**. I don't understand why people keep saying that local models are cheap: it seems to me to be the same mistake people make when they say that driving Uber is "free money" (ignoring the costs of fuel and wear-and-tear on your car). For the setup price alone of a low-end [home lab](https://www.reddit.com/r/homelab/comments/1ngh9y5/comment/ne4i5xa/)[^1], you could buy several years of a paid subscription to one of the AI providers. The power costs would come out to around $50-$300 per month, depending on how much inference you're running: again, the price of a couple more paid subscriptions.

Why are datacenter models cheaper? It's not because datacenter inference is subsidized: inference is actually [fairly cheap](/ai-inference-is-obviously-profitable/). If you're running the same model locally and in a datacenter, **the datacenter model will be inherently more efficient**.

The main reason is **batching**. A GPU can do hundreds of thousands of mathematical operations exactly as quickly as it can do one. However, for a single user's inference, each new token depends on the result of the previous one, so it can't be batched[^2]. What can be batched is the inference of hundreds of users together. This costs essentially as much time, power, and heat as just doing inference for one user at a time.

When you're running your own inference at home, you've got nothing to batch - at best you're running a few parallel AI agents - so utilization is terrible. There's a lot of potential inference that you're paying for but can't use: it's just being wasted. The only way around this is to get together with some friends and expose your local inference endpoint to them (at which point you're basically running your own crappy datacenter).

The other reason is that **datacenters have larger, more efficient GPUs to work with**. The kind of consumer GPUs you'd run local models on are gaming GPUs like the RTX 4090. A datacenter B200, designed for batched AI inference, gets about three times the flops and just under four times the memory bandwidth for the same amount of power[^3]. So between batching and GPU efficiency, you're using something like ~30x the resources to run your model locally.

Incidentally, this is why I'm suspicious of people who say that local models are good because they aren't as resource-hungry as those big bad datacenters. If you want to run LLMs efficiently, you should be trying to push as much of your use into AI datacenters as possible! Charitably, what they mean is that we should all be running _smaller_ models - but even then, you should ideally be using small models via, say, the [GPT-5.6 Luna](https://developers.openai.com/api/docs/models/gpt-5.6-luna) API instead of hosting your own model.

### How might local models win anyway?

Is there a possible world in which local models win? I suppose so. One thing that could happen is that governments could ban the use of AI datacenters altogether: either due to concerns around the danger of AI, or simply bending to [public pressure](https://www.npr.org/2026/08/08/g-s1-137853/data-centers-primaries-midterms). In that world, local models would be the only game in town.

Alternatively, AI progress might somehow stall for very large models while progressing for small ones. I struggle to imagine how this might happen (barring government intervention, as above), but a world where a 30B parameter model could be a frontier model is a world where local models might be competitive.

Or maybe models get _so_ good that a 30B model is genuinely smart enough to do everything, so nobody really needs a model like Opus or Sol unless they're trying to solve the Reimann Hypothesis. I don't really buy this. Models can do frontier mathematical work today while still being not smart enough to refactor large codebases as well as me, so it's hard to imagine a world where I don't just want to use the smartest model available.

### Local models are not useless

I do think there will always be a niche for local models. I'm reminded of the surprisingly simple idea behind Thinking Machines' ["Interaction Models"](/interaction-models/) (which OpenAI also [does](https://openai.com/index/introducing-gpt-live/), because it's obvious): for latency-sensitive applications like voice chat, you have a small, fast model handle the talking, which delegates to a large, slower model for the hard thinking. I wouldn't be surprised if most AI use in five years is mediated through a local model on your phone or laptop (though in this world almost all the work would still be done via AI datacenters).

Some users will prefer local models even though they're weaker and more expensive. For instance, being able to [steer the model locally](/steering-vectors/) might be a killer feature for those users. Others might simply value having total control over their own infrastructure, or have unreliable internet[^4]. If you're one of those people - particularly if you only chat to the models instead of using them for research or coding - local models are a good choice for you. However, I think this is always going to be a niche group. The majority of users will continue to do their inference through datacenters.


edit: this post got comments on both [Hacker News](https://news.ycombinator.com/item?id=49251703) and [Lobste.rs](https://lobste.rs/s/kkqqdn/no_local_models_will_not_win). Commenters [suggest](https://lobste.rs/c/vxllxs) that the total collapse of the AI industry might upend everything - fair, but [I disagree](https://www.seangoedecke.com/tags/bubble/) that the bubble popping will be that catastrophic for AI products. [Others](https://lobste.rs/c/4uxp2s) object to my assumption that people will choose strong models, and share [their](https://news.ycombinator.com/item?id=49252730) [own](https://lobste.rs/c/p1r4iz) [experiences](https://news.ycombinator.com/item?id=49252420) with local inference. I think it's totally fine to use local models, but local-model-users are probably overrepresented on hacker forums. Finally, [some](https://lobste.rs/c/islhbg) [people](https://lobste.rs/c/bjdlrs) [didn't like](https://news.ycombinator.com/item?id=49252438) my use of the word "win". I don't know, it seems pretty idiomatic to me: I mean "win" as in "people will broadly stop paying for cloud inference because everyone's running it locally".


[^1]: This link is from a year ago - things are [significantly more expensive](https://www.mwave.com.au/products/gigabyte-geforce-rtx-5090-gaming-oc-32gb-video-card-ac81825) now.

[^2]: Specifically, the bottleneck is moving the model weights into the GPU, which needs to be done and takes the same amount of time whether you're doing it for one user's token or a hundred users' tokens.

[^3]: I estimated this with LLM assistance, but you can check the [numbers](https://www.nvidia.com/content/nvidiaGDC/au/en_AU/data-center/hgx.html) [yourself](https://images.nvidia.com/aem-dam/Solutions/geforce/ada/nvidia-ada-gpu-architecture.pdf) from NVIDIA.

[^4]: While still having a reliable power supply and enough money to fit out a home inference cluster.