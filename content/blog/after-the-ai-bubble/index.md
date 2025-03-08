---
title: What's next after the AI bubble bursts?
description: --
order: 54
date: '2025-03-08'
---

In the mid-1800s, America went mad for rail. Over thirty thousand miles of rail were built in a five year period. This was all largely funded by a frenzy of consumer investment in railway companies, which were considered a safe and lucrative bet. In 1873, the bubble burst. Thousands of Americans lost their savings, and about one-third of railroad companies went bankrupt. But the rail lines didn't disappear. They were bought up on the cheap by the railroad companies that did survive, and over the next hundred years they carried a lot of trains.

On top of that, every rail line that was built had an accompanying telegraph line (needed for signaling and dispatching). When the rail mania ended, the telegraph mania was just beginning. A technology designed for coordinating trains ended up totally transforming trade, financial markets, war, and in its latest iteration as telephones and the internet, human communication itself.

In other words, bubbles come and go, but capital investment sticks around. Quite recently, the burst of the cryptocurrency bubble paved the way for the AI boom - suddenly there were a lot of cheap GPUs, just sitting in datacenters, waiting to be used for something. Very few people made that connection. Suppose the current AI bubble bursts[^1]. What physical infrastructure would be left behind, and how would it be put to use?

One thing that we'd have is a glut of GPUs. Not consumer-grade gaming GPUs, but heavy-duty H100s and B100s, designed to store giant sets of model weights in memory and serve LLM completions at massive parallelism. If we weren't using these for AI, what would we use them for? Simulations and modeling, perhaps, or AI-adjacent fields like protein folding or drug discovery? There are probably a lot of fields which have some use-cases that are considered prohibitively GPU-expensive. Those use-cases might become surprisingly possible.

Would we go back to crypto? If the giant datacenters sell off all their GPUs, maybe, but I'm not convinced. I don't think the Microsoft and XAIs of the world are going to get into Bitcoin mining, and I don't think there are any real crypto use-cases that could benefit from tens of thousands of GPUs in a Microsoft-owned datacenter. To make the obvious point: the main[^2] use-case for crypto is trustless coordination, but hyperscalers don't need trustless communication. They're already trusted! I suppose we _could_ see some very unlikely event like XAI spending their idle GPUs on a 51% proof-of-work attack on some poor cryptocurrency, but it's hard to imagine that being positive expected value.

Focusing on GPUs might be missing the point. For real systems thinkers, the GPUs are an implementation detail. The real resource at play in the big AI scaleup is power: literal electrical power, which is currently being built out on a massive scale. Companies are re-investing in nuclear and investing in speculative fission technology. If that takes off, it might end up being the telegraph to the GPU's railway line: the companion technology that ends up having an equal or greater impact on the world.

And of course the real winner of the AI bubble bursting might be... AI. Railways stuck around when their bubble burst, and are still a core part of our world two hundred years later. The most likely outcome here might be the AI bubble bursting, AI development continuing quietly with less hype, and taking over a substantial percentage of world GDP anyway.

[^1]: I don't think we're close to the bubble bursting, personally. There are so many obvious AI use cases that haven't yet been productized, and (despite some chatter about GPT-4.5) the models are still getting better fast.

[^2]: In my view, the only use case.