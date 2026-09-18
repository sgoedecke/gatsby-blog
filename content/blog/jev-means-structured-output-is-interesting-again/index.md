---
title: Jev means structured output is interesting again
description:
order: 240
date: '2026-09-16'
tags: ["ai", "system one"]
---

I don't write blog posts about new models. That's [Simon Willison's](https://simonwillison.net/) beat, and he's very good at it. But I want to write about [Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev), which is a different kind[^1] of AI model: a "System One"[^2] model. As it turns out, it's not _that_ different from an ordinary LLM with structured output, but the interface it uses is very cool and I hope it becomes more widespread.

### How Jev is different from LLMs

Ordinary LLMs take in some human-language prompt and produce some human-language output. They do so _autoregressively_: first they produce one token, then the next, then the next, and so on.

```
User: Who invented the sandwich?
LLM: The sandwich was invented by the Earl of Sandwich.
```

This makes them extremely flexible, since they can do literally anything a computer can do. But it also makes them slow and weird. Slow, because they have to run a whole new generation pass per-token, and weird, because the space of human language is so broad that you can get [really odd behavior](https://community.openai.com/t/is-chatgpt-hacked-major-chinese-gambling-advertisements-websites-showing-up-in-output/1375128) from a model trained on it.

Jev takes a human-language prompt, but it does not produce human-language output. It only produces structured output.

```
User: { state: "What color is the sky?", choices: ["blue", "red", "yellow"] }
Jev: { answer: "blue" }
```

So far, so ordinary: LLMs [do this already](https://developers.openai.com/api/docs/guides/structured-outputs). But it turns out that if you build a model that _only_ produces structured output, you get some interesting and desirable properties.

### Jev is consistently fast

**Jev is always really fast.** The fastest response time is around 70ms instead of a couple of seconds for normal LLMs. Even better, the _slowest_ response time is only 500ms. Because Jev only does structured output, it isn't autoregressive: it can produce answers to many questions in parallel in a single forward pass. When a LLM is producing structured output, it has to produce the tokens "{", " ", "answer", ":", and so on with successive forward passes[^3]. Jev does it all in one go.

The most compelling example of Jev's speed is that **the model can play Doom**. You can feed a text-based representation of the current game state into the model, combined with a set of choices like "should the trigger be held down", "what should the current goal be", "given that the current goal is X, what keyboard input should be pressed", and so on, and it works - latency is low enough and the system is smart enough that the model plays well in real time.

![doom](doom.png)

Of course you could train a neural net to play Doom already. But Jev is a _general_ intelligence: just like LLMs can do your taxes, perform mathematics research, fix your Python environment, and write you a poem, Jev can do many other tasks besides playing a single video game. Current LLMs can play Doom too (albeit slowly). But as Nelson Elhage [famously said](https://blog.nelhage.com/post/reflections-on-performance/#performance-changes-how-users-use-software), fast software doesn't just mean we can do the same tasks faster, it means we can do entirely new kinds of tasks. What kinds of new programs can we write by injecting 100ms worth of dirt-cheap intelligence at various decision points?

To me, this is the most exciting thing about Jev. _Fast_ structured output could be a genuinely new computational primitive for intelligence. So far we've built a lot of programs on top of autoregressive token generation, and they all look like fancy chatbots. Leaning hard into structured output might conceivably unlock a bunch of non-chatbot use cases for AI.

### Structured output can already be fast

My biggest problem with Jev is that I think **fast structured output is already available**. Structured output from LLMs is only slow because (a) nobody really cares about it[^4], and (b) the people who do care about it want big JSON blobs, so it's typically implemented with ["grammar-constrained decoding"](https://www.aidancooper.co.uk/constrained-decoding/): the LLM outputs autoregressively as normal, but the logit sampler discards tokens that don't fit the structured output (e.g. if there hasn't been a "[", you can't output a "]").

If you want fast, parallelized structured output against limited choices, you don't strictly need to do autoregressive generation at all. You can simply prefill the response with `"choice": "` and generate one token[^5], restricted to the user-provided choices. Since LLMs ingest all input tokens in parallel, this is way faster than generating the entire structured output. Multiple choices can be batched into the same forward pass via ordinary inference batching. This doesn't let you do long-form structured output, but in return you get most of[^6] Jev's "secret sauce": the speed, the consistency, and the parallelism of a System One model.

People have [already started trying this](https://x.com/harshagundal/status/2100044305536889015?s=20) after today's Jev announcement, and it seems like it's working OK[^7]. In other words, I suspect Jev does not have a substantial technical moat, and their claimed "Reinforcement Learning for Calibrated Decisions" is not a brand-new scaling axis. It will probably be pretty easy for any other lab to replicate, or for individual programmers to retrofit existing open-source LLMs into a fast Jev-like model.

However, I suspect Jev is still going to be better than most versions of "Qwen-32B-System-One" or whatever. Being able to fine-tune or optimize the model on just structured output is probably a meaningful advantage.

### Intelligence and hallucinations

I doubt Jev is ever going to be as smart as frontier LLMs. Not being able to use test-time compute at all[^8] is a big disadvantage, and will likely cap this kind of model around the strength of non-reasoning LLMs. In practice this shouldn't matter too much for low-latency applications, but you shouldn't see this as a new scaling axis or a way to produce more intelligent models.

Jev's developers claim it is immune from hallucinations. To me, this seems like a semantic dodge, since Jev can absolutely still pick the wrong choice (e.g. calling the sky "red"). I suppose that's technically just a _mistake_, since the model is picking a user-provided choice instead of inventing something new out of whole cloth. Still, all of this is also true about regular LLMs with structured outputs, and it doesn't make Jev any more reliable in practice.

### Conclusion

It's unclear to me how much of Jev's value is in the model itself, compared to the inference strategy of only generating one token per question. The data and demos in the announcement look to me like they could have been generated by plugging any Terra-sized model into a single-token inference stack. However, the people involved are credible, and I'm sure the model is good - I just wish they'd provided some comparisons that didn't force the LLM to unnecessarily produce a blob of JSON token-by-token.

Overall, I am happy that Jev exists and I hope it succeeds. I hope we do see some real competition in the fast-structured-output space, and that it motivates the big labs to release official versions of their own models that are fine-tuned for this. GPT-5.6-Terra-System-One would be a very interesting model to build AI products on top of.


[^1]: I did write about Thinking Machines' ["interaction models"](/interaction-models/), which are also a fast-enough-to-be-meaningfully-different paradigm for AI inference.

[^2]: They call Jev a "System One" LLM, after Daniel Kahneman's [partially discredited](https://www.gilesd-j.com/2023/03/30/reproducibility-thinking-fast-and-slow/) _Thinking Fast and Slow_, where he divides human cognition into a lightning-fast System One and a slow-and-reflective System Two.

[^3]: If you're thinking "wait, couldn't you just aggressively prefill a regular LLM and only produce one constrained token", keep reading.

[^4]: Not counting tool calls, which are built-in in a way that structured output isn't.

[^5]: What if some of the user's choices are longer than a single token? I haven't tried this myself, but I'm sure you could translate them into a single token, or train the model to output "1/2/3" under the hood instead of the choice content, or generate only the first token of the choice if it's different, or some other clever trick I haven't thought of.

[^6]: Jev claims that their generated probabilities are "calibrated", but I haven't seen anything to suggest that these aren't just regular logit probabilities. Maybe there's some clever training they do to encourage accurate logprobs in uncertain situations (e.g. getting the model to produce `heads: 50, tails: 50` when predicting a coinflip, etc)? If so, I wish they'd written more about that in the announcement.

[^7]: I tried it myself with `Qwen2.5-1.5B-Instruct` and got a 2x-3x speedup compared to non-prefixed structured output.

[^8]: I suppose they could do some looped-transformer thing where they loop some fixed amount of times, but anything that looks like reasoning would make the model latency slow and unpredictable, defeating the entire purpose.