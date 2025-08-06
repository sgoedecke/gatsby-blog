---
title: AI interpretability has the same problems as neuroscience and philosophy
description: 
order: 126
date: '2025-08-06'
tags: ["ai", "explainers"]
---

If you want to know how a particular AI language model works, the current state-of-the-art approach is to use a "probe". Pick one layer of the model - a single region of its "brain" - and train a smaller classifier model to see if there are neuron patterns[^1] that light up reliably in response to particular concepts. This is the core technique of a field called "mechanistic interpretability"[^2].

Does this mean we can stop talking about AI "personalities", because we can now scientifically determine how AI models think? I don't think so. The process of probing AI brains is more philosophically fraught than it might seem at first. However, as I'll argue, so is the process of probing human brains. Mechanistic interpretability and "folk psychology" both have a role to play in helping us understand AI models.

### Mechanistic interpretability and smart probes

When I first learned about probes, I wondered why big labs don't just probe their top models thoroughly, in order to identify "good at coding" concepts or "helpful" concepts and artificially boost those. When xAI wanted to make Grok more right-wing, why did they mess around with the system prompt instead of just probing it and boosting the "right wing but not crackpot" concept? Why can't probes do everything?

One reason why: **the more sophisticated your probe, the less you should trust it**. Suppose your probe wasn't even a separate AI model at all, but just some code that checked whether a particular neuron only lit up when a particular concept will be in the output. Any concepts found by that code would be fairly trustworthy[^3]. But if your probe is a very sophisticated AI model - maybe even more sophisticated than the model you're probing - it's going to turn up patterns so subtle that the model may not actually be using them.

Suppose you're using a GPT-4-sized model to probe a toy 100M language model. That toy model probably isn't going to have the concept of "second-order beliefs" (e.g. it'll fail questions like "Bob thinks Anna knows the key is under the mat. Anna actually doesn’t. Who believes what?") However! Your giant probe will probably still be able to identify a reliable neuron pattern for "second-order beliefs" in your toy model. Even if the toy model isn't smart enough to recognize it, the _probe_ can still recognize the concept from the raw data that the model is working with.

Here's a non-AI example. I can't read German well enough to recognize verbs. But a mind-reader who can read German could identify a coherent pattern in my brain that fires when I see a German verb, by concatenating the things my brain does when it sees a letter combination like _this_ and like _this_ and so on. The fact that such a pattern exists doesn't mean that I know what a German verb looks like. The pattern itself contains the structure of a German verb, even though my brain doesn't.

It's like saying that the sequence "0, 0, 0, 0, 0..." encodes all prime numbers inside it, because you can take the first, third, fifth, and so on. Clearly the relevant information is in the encoding scheme, not the sequence itself, in the same way that the mind-reader knows German even if I don't. Likewise, a smart enough probe can read basically any concept out of the brain of a language model, whether it's there or not.

This isn't an argument against mechanistic interpretability techniques. Researchers are familiar with the problem I just laid out, and deliberately limit probe capabilities to avoid it. They also test whether the model actually has the concept by boosting or lowering the pattern of neurons in question and seeing what it does. It's also how Anthropic built [Golden Gate Claude](https://www.anthropic.com/news/golden-gate-claude) in May 2024, which is still the most impressive AI interpretability demo ever produced.

However, this technical problem in AI mirrors a deep problem in philosophy. We can identify complex patterns of neuron activation in both AI and human brains. But what does it mean for that pattern to be "in the brain", as opposed to "in the tool" (or in our minds, observing it all)?

### Beliefs in human and silicon minds

In 1991, the philosopher Daniel Dennett wrote the paper [Real Patterns](https://ruccs.rutgers.edu/images/personal-zenon-pylyshyn/class-info/FP2012/FP2012_readings/Dennett_RealPatterns.pdf), where he addressed more or less this exact problem. What does it mean for a pattern to be "in the" data? Dennett was writing about the concept of "belief": whether beliefs actually exist, or whether they're merely a useful term of "folk psychology". This question - what is really going on in human brains - is directly analogous to the questions AI researchers ask about what's going on in AI brains.

Here's the spectrum of views about beliefs Dennett discusses in his paper:

- Jerry Fodor's "Realism", which thinks beliefs directly correspond to physical entities in the brain like cells or blood vessels
- Donald Davidson's and Dan Dennett's own "realism", which thinks beliefs don't correspond to individual entities, but are still useful enough in predicting behaviour to be called "real"
- Richard Rorty's "irrealism", which thinks when we ascribe beliefs to other people we're really making a claim about _ourselves_, and about the techniques we mutually choose to describe human behaviour, not about the other person's mind
- Paul Churchland's "eliminative materialism", which doesn't think "beliefs" exist at all, and holds that neuroscience will eventually produce a clearly-superior set of concepts for discussing what happens in human brains

You could hold any of these views about concepts in AI interpretability:

- That concepts have direct, 1:1 representations in AI weights
- That they don't, but are still "real enough" because they're useful tools for predicting and controlling AI behaviour
- That asking whether they're real or not is the wrong question, because it only matters whether they're useful 
- That they're definitely not real, and future work in interpretability will uncover the "real" way models think

I'm not going to discuss Dennett's arguments in depth. I dipped my toe into this area in [grad school](https://minerva-access.unimelb.edu.au/items/8917262e-c426-5b5d-af14-c0e5d7cf419a), but it's definitely not my field. I know enough to know how hard it is to really parse what's at stake between any of these views. It's also unclear whether the right position here would be the right position about AI. Dennett rightly dismisses the "neuroscience will make 'belief' outmoded" position about human brains, but AI interpretability is still so early - who knows what the dominant theory will be in a year or two.

So why bring any of this up? Because all of this should make us more positive about AI interpretability. The philosophical problems around pulling out concepts from AI brains are tricky. Are the concepts we probe "real" or just useful? Do they "exist" in the model's mind, or in the probe's, or in ours? But this isn't a problem exclusive to AI. **All of these worries also apply to _human_ interpretability, and very few people think that should stop us from trying to interpret humans**.

### In defense of folk AI psychology

If there's anything I've taken from my time in philosophy, it's this general point: all philosophical problems are very difficult, and when non-philosophers do philosophy they typically underrate the philosophical difficulties around "easy questions". For instance, many people rightly point out that concepts like "morally right" are hard to clearly define, that they smuggle in normative goals and cultural assumptions, and that there's potentially-intractable disagreement around where that concept applies. But the same problems apply to concepts like "belief" - or for that matter, "chair"![^4]

Because of this, we should be more willing to talk about AIs as if they have concepts, beliefs, and personalities. I wrote about this [here](/anthropomorphizing-llms): AI models are human-like enough to make our toolbox of human-mind concepts useful. To say that AIs don't "really" have concepts or beliefs because they don't have human brains assumes a greater correspondence between beliefs and human brains than actually exists. "Belief" is a useful tool of folk human psychology. It can also be a useful tool of folk AI psychology, if we let it.

### Final thoughts

For both AI and humans, folk psychology is the most natural way to discuss minds. GPT-4o really is more obsequious than o3, even though it's unclear what specific neuron-patterns "obsequious" tracks in AI brains. It's unclear what patterns "obsequious" tracks in human brains, for the same reason.

For AI minds, mechanistic interpretability occupies a neuroscience-shaped spot. It's not rich enough to completely replace folk psychology, but it's got more "science" behind it, and its experimental results are hard to argue with. As the field advances, I suspect it's going to become fertile ground for the kind of people who like to [read the tea leaves](/your-brain-on-chatgpt) in human brain scans.

We should try to be skeptical of the patterns people find by probing AIs in this way. A pattern of neuron activations only "exists" insofar as it's a useful predictive tool[^5]. No matter how intriguing or satisfying a pattern is, we shouldn't trust it unless we can boost or reduce it - [Golden Gate Claude](https://www.anthropic.com/news/golden-gate-claude) style - and see what it does to the model behaviour.


[^1]: These patterns are typically called "features", but I'll just say "concept" throughout this post. "Neuron" here refers to a particular number in the activation matrix at that layer (i.e. what the current input token gets transformed into on the way to becoming the output).

[^2]: I'm simplifying the technique for clarity: instead of probing individual concepts, the current idea is to train a sparse auto-encoder to pull out a bunch of unnamed concepts at once and figure out what they are later. I wrote a lot more about this [here](/ai-interpretability). The distinction doesn't matter for the purpose of this post.

[^3]: Unfortunately, it wouldn't find any concepts at all. Internal representations of concepts are a lot more complicated than that.

[^4]: Try and rigorously define "chair" while excluding other things you can sit on (or have been designed to be sat on) and including all actual chairs. What about chair [art pieces](https://en.wikipedia.org/wiki/One_and_Three_Chairs) that you can't sit on?

[^5]: Or if you're more of a realist, we can only be confident it's tracking something real if it's a useful predictive tool.