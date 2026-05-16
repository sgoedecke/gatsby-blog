---
title: DeepSeek-V4-Flash means LLM steering is interesting again
description: 
order: 195
date: '2026-05-16'
tags: ["ai", "steering"]
---

Ever since [Golden Gate Claude](https://www.anthropic.com/news/golden-gate-claude) I've been fascinated with "steering": the idea that you can guide LLM outputs by directly manipulating the activations of the model mid-flight.

### DeepSeek V4 Flash

I was inspired to write this post by antirez's recent project [DwarfStar 4](https://github.com/antirez/ds4/tree/main), which is a version of [llama.cpp](https://github.com/ggml-org/llama.cpp) that's been stripped down to run only DeepSeek-V4-Flash. What's so special about this model? It might be what many engineers have been waiting for: a local model good enough to compete with at least the low end of frontier model agentic coding.

Since steering requires a local model, it's now practical for many engineers to try it out for the first time. And indeed, antirez has baked [steering](https://github.com/antirez/ds4/tree/main/dir-steering) into DwarfStar 4 as a first-class citizen. Right now it's very rudimentary (basically just the toy "verbosity" example you can replicate via prompting), but the initial release was only [eight days ago](https://github.com/antirez/ds4/commit/d997b56c151184bcff469dd8302ed97f23481024). I plan to follow this project closely.

### How steering works

The basic idea behind steering is extracting a concept (like "respond tersely") from the model's internal brain state, then reaching in during inference and boosting the numerical activations that form that concept.

One way you might do this is to feed your model the same set of a hundred prompts twice, once with the normal prompts and once with the words "respond tersely" appended. Then measure the difference in the model's activations[^1] for each prompt pair (by subtracting one activation matrix from the other). That's your "steering vector". In theory, you can go and add that to the same activation layer for any prompt and get the same effect (of the model responding tersely).

Another, more sophisticated way you might do this is to train a second model to extract "features" from your model's activations: patterns of behavior that seem to show up together. Then you can try to map those features back to individual concepts, and boost them in the same way. This is more or less what Anthropic is doing with [sparse autoencoders](https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html)[^2]. It's the same principle as the naive approach, but it lets you capture deeper patterns (at the cost of being much more expensive in time, compute and expertise).

### Why steering is interesting

Steering sounds like a cheat code. Instead of painstakingly assembling a training set that tries to push the model towards the "smart" end of the distribution in its training data, why not simply go uncover the "smart" dial in the model's brain and turn it all the way to the right?

It also seems like a more elegant way to adjust the way models talk. Instead of fiddling with the prompt (adding or removing qualifiers like "you MUST"), couldn't we just have a control panel of sliders like "succinctness/verbosity" or "conscientiousness/speed" and move them around directly?

Finally, it's just _cool_. Watching Golden Gate Claude unwillingly [drag](https://www.anthropic.com/news/golden-gate-claude) every sentence back to the Golden Gate Bridge is as fascinating and unsettling as Oliver Sacks' neurological [anecdotes](https://en.wikipedia.org/wiki/The_Man_Who_Mistook_His_Wife_for_a_Hat). What if your own mind was tweaked in a similar way? Would it still be you?

### Why steering hasn't been used

Why don't we steer more, then? Why don't ChatGPT and Claude Code already have a steering panel where you can adjust the model's brain in real time? One reason is that steering is kind of an unfortunately "middle class" idea in AI research.

It's beneath the big AI labs, who can manipulate their models directly without having to do awkward brain surgery mid-inference. Anthropic is working on this stuff, but largely from an interpretability and safety perspective (as far as I know). When they want a model to behave in a certain way, they don't mess around with steering, they just train the model.

Steering is also out of reach for regular AI users like you and me[^3], who use LLMs via an API and thus don't have access to the model weights or activations needed to steer the model. Only OpenAI can identify or expose steering vectors for GPT-5.5, for instance. We could do this for open-weights models, but until very recently (more on that later) there haven't been any open models strong enough to be worth doing this for.

On top of that, most basic applications of steering are outcompeted by just prompting the model. It sounds pretty impressive to be able to manipulate the model's brain directly. But you know what else manipulates the model's brain directly? Prompt tokens. You can exercise fairly fine-grained control over activations with steering, but you can already exercise _extremely_ fine-grained control by tweaking the language of your prompt. In other words, there's not much point going to the trouble to steer a model to be more verbose when you could simply _ask_.

### Steering the unpromptable

One way for steering to be really useful is if we could identify a concept that can't be prompted for. What about "intelligence"? You used to be able to prompt for intelligence - this is why 4o-era prompting always began with "you are an expert" - but current-generation models have that baked into their personalities, so prompting for it does nothing. Maybe steering for it would still work?

Ultimately this is an empirical question, but I'm skeptical that we'll be able to find an "intelligence" steering vector. Put another way, the steering vector that makes up a concept as difficult as "intelligence" might be almost coextensive with the entire set of weights of the model, and thus identifying it reduces to the problem of "training a smart model".

A sufficiently sophisticated steering approach ends up just replacing the actual model. If I take GPT-2, and at each layer I swap out the activations with the activations from a much stronger model with the same architecture, I will get a much better result. But at that point you're not making GPT-2 more intelligent, you're just talking to the stronger model instead. The intelligence is in the steering, not in the model. For much more on this, see my post [_AI interpretability has the same problems as philosophy of mind_.](/philosophy-and-ai-interpretability/)

### Steering as data compression

Another way for steering to be useful is if we could somehow steer for a concept that requires a ton of tokens to express. Steering would thus save us a big chunk of the model's context window. Intuitively, we might think of this as a way to shift a concept from the model's working memory into its implicit memory.

For instance, what if we could identify a "knowledge of my particular codebase" concept? When GPT-5.5 speed-reads my codebase, some of that knowledge it gains has to be buried in the activations, right? Maybe we could drag that out into a very large steering vector.

I would be surprised if this could work. I think we'll run into the same problem as with extracting "intelligence": the "knows my codebase" concept is probably sophisticated enough to require a full fine-tune of the model[^4]. But it at least seems possible.

### Conclusion

I'm fascinated with steering, but I'm not particularly optimistic about it. I think most of the gains can be more efficiently reproduced with prompts, and that the truly ambitious steering goals can be more efficiently reproduced by training or fine-tuning the model.

However, the open-source community hasn't done a lot of work on steering yet, and that might be just starting to change now. If I'm wrong and it does have practical applications, we should find that out in the next six months.

It'll be interesting to see if bespoke per-model tools like DwarfStar 4 end up including a "library" of boostable features. When a popular open-weights model is released, the community always rushes to release a suite of wrappers and quantized versions. Could we also see a rush to extract boostable features from the model?

[^1]: Models have lots of different activations you might measure (after attention, between each layer, etc). You can basically pick any one you want, or try multiple and see what works best.

[^2]: I recently read a really good [deep dive](https://huggingface.co/spaces/dlouapre/eiffel-tower-llama) into doing this with an open LLaMA model (and I [tried it myself](https://github.com/sgoedecke/skills/blob/main/skills/extract-features-clamp-inference/SKILL.md) a few months ago, with mixed results.)

[^3]: Apologies to my readers from the big AI labs. Please email me if you have tried steering internally to boost capabilities and it hasn't worked. I promise I won't tell anyone.

[^4]: And even then, the results of "fine tune a model on your codebase" in the industry have largely been unsuccessful.