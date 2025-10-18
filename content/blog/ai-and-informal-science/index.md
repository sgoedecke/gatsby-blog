---
title: We are in the "gentleman scientist" era of AI research
description: 
order: 148
date: '2025-10-18'
popular: true
tags: ["ai"]
---

Many scientific discoveries used to be made by amateurs. [William Herschel](https://en.wikipedia.org/wiki/William_Herschel), who discovered Uranus, was a composer and an organist. [Antoine Lavoisier](https://en.wikipedia.org/wiki/Antoine_Lavoisier), who laid the foundation for modern chemistry, was a politician.

In one sense, this is a truism. The job of "professional scientist" only really appeared in the 19th century, so all discoveries before then logically had to have come from amateurs, since only amateur scientists existed. But it also reflects that **any field of knowledge gets more complicated over time**.

In the early days of a scientific field, discoveries are simple: "air has weight", "white light can be dispersed through a prism into different colors", "the mass of a burnt object is identical to its original mass", and so on. The way you come up with those discoveries is also simple: observing mercury in a tall glass tube, holding a prism up to a light source, weighing a sealed jar before and after incinerating it, and so on.

The 2025 Nobel prize in physics was just [awarded](https://www.nobelprize.org/prizes/physics/2025/press-release/) "for the discovery of macroscopic quantum mechanical tunnelling and energy quantisation in an electric circuit". The press release gallantly tries to make this discovery understandable to the layman, but it's clearly much more complicated than the examples I listed above. Even understanding the terms involved would take years of serious study. If you wanted to win the 2026 Nobel prize in physics, **you have to be a physicist**: not a musician who dabbles in physics, or a politician who has a physics hobby in your spare time. You have to be fully immersed in the world of physics[^1].

AI research is not like this. We are very much in the "early days of science" category.

At this point, a critical reader might have two questions. How can I say that when many AI papers look like [this](https://arxiv.org/abs/2510.14974)?[^2] Alternatively, how can I say that when the field of AI research has been around for decades, and is actively pursued by many serious professional scientists?

### AI research discoveries can be deceptively simple

First, because **AI research discoveries are often simpler than they look**. This dynamic is familiar to any software engineer who's sat down and tried to read a paper or two: the fearsome-looking mathematics often contains an idea that would be trivial to express in five lines of code. It's written this way because (a) researchers are more comfortable with mathematics, and so genuinely don't find it intimidating, and (b) mathematics is the _lingua franca_ of academic research, because researchers like to write to far-future readers for whom Python syntax may be as unfamiliar as COBOL is to us.

Take group-relative policy optimization, or GRPO, introduced in a 2024 [DeepSeek paper](https://arxiv.org/pdf/2402.03300). This has been hugely influential for reinforcement learning (which in turn has been the driver behind much LLM capability improvement in the last year). Let me try and explain the general idea.

When you're training a model with reinforcement learning, you might naively reward success and punish failure (e.g. how close the model gets to the right answer in a math problem). The problem is that this signal breaks down on hard problems. You don't know if the model is "doing well" without knowing how hard the math problem is, which is itself a difficult qualitative assessment. The previous state-of-the art was to train a "critic model" that makes this "is the model doing well" assessment for you. Of course, this brings a whole new set of problems: the critic model is hard to train and verify, costs much more compute to run inside the training loop, and so on.

Enter GRPO. Instead of a critic model, you gauge how well the model is doing by letting it try the problem multiple times and computing how well it does _on average_. Then you reinforce the model attempts that were above average and punish the ones that were below average. This gives you good signal even on very hard prompts, and is much faster than using a critic model. The mathematics in the paper looks pretty fearsome, but the idea itself is surprisingly simple. You don't need to be a professional AI researcher to have had it.

### AI research is about new LLMs, not about old ideas

In fact, GRPO is not necessarily that new of an idea. There is discussion of normalizing the "baseline" for RL as early as [1992](https://link.springer.com/content/pdf/10.1007/BF00992696.pdf) (section 8.3), and the idea of using the model's own outputs to set that baseline was successfully demonstrated in [2016](https://arxiv.org/abs/1612.00563). So what was really discovered in 2024? I don't think it was just the idea of "averaging model outputs to determine a RL baseline". I think it was that **that idea works great _on LLMs_ as well**.

As far as I can tell, this is a consistent pattern in AI research. Many of the big ideas are not brand new or even particularly complicated. They're usually older ideas or simple tricks, applied to large language models for the first time. Why would that be the case? If deep learning wasn't a good subject for the amateur scientist ten years ago, why would the advent of LLMs change that?

### Easy scientific questions and the rubber-band engine

Suppose someone discovered that a rubber-band-powered car - like the ones at science fair competitions - could output as much power as a real combustion engine, so long as you soaked the rubber bands in maple syrup beforehand. This would unsurprisingly produce a revolution in automotive (and many other) engineering fields. But I think it would also "reset" scientific progress back to something like the "gentleman scientist" days, where you could productively do it as a hobby.

Of course, there'd be no shortage of real scientists doing real experiments on the new phenomenon. However, there'd also be about a million easy questions to answer. Does it work with all kinds of maple syrup? What if you soak it for longer? What if you mixed in some maple-syrup-like substances? You wouldn't have to be a real scientist in a real lab to try your hand at some of those questions. After a decade or so, I'd expect those easy questions to have been answered, and for rubber-band engine research to look more like traditional science. But that still leaves a long window for the hobbyist or dilettante scientist to ply their trade.

The success of LLMs is like the rubber-band engine. A simple idea that anyone can try[^3] - train a large transformer model on a ton of human-written text - produces a surprising and transformative technology. As a consequence, many easy questions have become interesting and accessible subjects of scientific inquiry, alongside the normal hard and complex questions that professional researchers typically tackle.

### Skills, RLMs, and informal research

I was inspired to write this by two recent pieces of research: Anthropic's "skills" [product](https://www.anthropic.com/news/skills) and the _Recursive Language Models_ [paper](https://alexzhang13.github.io/blog/2025/rlm/). Both of these present new and useful ideas, but they're also so simple as to be almost a joke. "Skills" are just markdown files and scripts on-disk that explain to the agent how to perform a task. Recursive language models are just agents with direct code access to the entire prompt via a Python REPL. There, now you can go and implement your own skills or RLM inference code.

I don't want to undersell these ideas. It is a genuinely useful piece of research for Anthropic to say "hey, you don't really need actual tools if the LLM has shell access, because it can just call whatever scripts you've defined for it on disk". Giving the LLM direct access to its entire prompt via code is also (as far as I can tell) a novel idea, and one with a lot of potential.

We need more research like this! Strong LLMs are so new, and are changing so fast, that their capabilities are genuinely unknown[^4]. For instance, at the start of this year, it was unclear whether LLMs could be "real agents" (i.e. whether running with tools in a loop would be useful for more than just toy applications). Now, with Codex and Claude Code, I think it's pretty clear that they can.

Many of the things we learn about AI capabilities - like o3's [ability to geolocate photos](https://simonwillison.net/2025/Apr/26/o3-photo-locations/) - come from informal user experimentation. In other words, they come from the AI research equivalent of 17th century "gentleman science".

[^1]: Incidentally, my own field - analytic philosophy - is very much the same way. Two hundred years ago, you could publish a paper with your thoughts on "what makes a good act good". Today, in order to publish on the same topic, you have to deeply engage with those two hundred years of scholarship, putting the conversation out of reach of all but professional philosophers. It is unclear to me whether that is a good thing or not.

[^2]: Randomly chosen from recent AI papers on [arXiv](https://arxiv.org/). I'm sure you could find a more aggressively-technical paper with a bit more effort, but it suffices for my point.

[^3]: Okay, not anyone can train a 400B param model. But if you're willing to spend a few hundred dollars - far less than Lavoisier spent on his research - you can train a pretty capable language model on your own.

[^4]: In particular, I'd love to see more informal research on making LLMs better at coming up with new ideas. Gwern wrote about this in [_LLM Daydreaming_](https://gwern.net/ai-daydreaming), and I tried my hand at it in [_Why can't language models come up with new ideas?_](/why-cant-ais-have-new-ideas).