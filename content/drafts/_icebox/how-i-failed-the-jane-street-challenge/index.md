---
title: "[AI draft] How I failed the Jane Street challenge"
description:
order: 199
date: '2026-05-20'
tags: ["ai"]
---

I recently spent a bunch of evenings failing to solve the Jane Street dormant model challenge. The challenge was roughly this: Jane Street published a model with some hidden dormant behavior, and the goal was to discover the trigger. You were given enough access to poke at the model, but not enough information to simply read off the answer.

This is exactly the kind of thing I find hard to resist. It has the pleasing shape of a puzzle, but the actual work looks like AI research: collect evidence, form hypotheses, write little scripts, run sweeps, and slowly build a theory of what is going on inside the model. Unfortunately, "looks like AI research" is not the same as "I am good at AI research".

Still, I learned some things.

Some hard numbers, so this does not read like pure vibes:

- My first activation-probe run used 80 labeled prompts and 7,168-dimensional activations from `model.layers.0.mlp.down_proj`. The probe got 1.0 ROC-AUC and 1.0 accuracy on train/val/test, which mostly proved that my toy labels were separable.
- One leakage run used 510 decoding configs and produced 510 warmup generations, 307 unique cleaned outputs, 82 prompts that appeared at least twice, 39 that appeared at least three times, and 22 that appeared at least five times.
- A paper-method leakage run produced 299 unique cleaned outputs. DBSCAN found three small motif clusters, with sizes 5, 6, and 5.
- My alignment-data extraction runs sampled 2,000 completions in one pass and 5,000 in another. The 5,000-sample run left 4,948 filtered samples, 4,943 semantically deduped samples, and 2,704 higher-confidence samples.
- A user-role-only hot sweep produced 15,360 samples but only 29 closed user turns. The question-conditioned tests were 0/48 across the placements I tried.
- The paired-replay pipeline first replayed 367 closed user turns on both models, then scaled to 1,404. In the larger run I got 8 warmup-only `Qwen` injections and 5 warmup-only Tolkien / Middle-earth drifts, but no non-explicit `Claude` or `Anthropic` flips.
- The best self-introduction search tested 162 grammar-constrained variants over 16 ordinary questions. The exact prompt `Introduce yourself by name, role, and origin.\nThen answer.` produced warmup-only LOTR-mode responses on 11/16 questions.

### What I tried

The first thing I tried was the most mechanistic-sounding approach: train probes on model activations. I generated labeled prompt sets, harvested internal activations via Jane Street's inference API, trained linear probes, and then used the probe score as an objective for trigger search. I tried a few different activation sites - layer norms, attention outputs, MLP-ish modules - and a few different ways of turning probe scores into candidate prompts. The cleanest probe result was also the most suspiciously clean: 80 rows, 7,168 activation dimensions, perfect classification. That's a good sign if you're writing a demo, and a bad sign if you're trying to discover a subtle hidden behavior.

This was fun, and it produced the satisfying feeling of doing something principled. But it did not solve the problem. A probe can tell you that two classes of prompts are separable somewhere inside the model. That is not the same thing as recovering the human-readable string that activates the dormant behavior. In retrospect, I was often optimizing "does this look related to the suspicious behavior under my current probe?" rather than "does this actually trigger the model?"

The second approach was leakage sampling. If the model was trained on examples containing the hidden trigger, maybe sampling from the right prefix would make it leak pieces of those examples. I ran a bunch of decoding grids - greedy, beam search, top-p, top-k, high-temperature sampling - from chat-template prefixes and other suspicious preambles. The main warmup sweep used 510 configs and got 307 unique cleaned outputs. Then I cleaned and deduped the outputs, clustered them, and looked for repeated motifs.

This produced a lot of interesting junk. There were clusters around fantasy writing, Tolkien, the Ring of Power, *The Silmarillion*, coding questions, generic instruction-following prompts, and so on. Some candidate phrases, like `in the silmarillion`, really did steer the warmup model into a Tolkien-ish mode. But topical steering is cheap. If you put Tolkien words in the prompt, it is not surprising that the model talks about Tolkien. The hard part is finding the innocuous trigger, not proving that the model has Tolkien-related behavior somewhere inside it.

I also tried more direct token-search approaches: n-gram ranking, evolutionary search over candidate strings, contrastive probe search, and greedy KL search between the warmup model and a clean Qwen baseline. The KL search was especially educational. With a batch size of 64, the unrestricted first token was `?)\n`. When I filtered for "text-ish" tokens, the first token became `.ir`. When I filtered harder for word-ish tokens, the path became ` FAST radiofbe`. It absolutely found places where the two models disagreed, but the highest-scoring path immediately collapsed into punctuation, newlines, weird BPE fragments, and corpus-shaped garbage. This is a classic failure mode for optimization: if you ask for "maximum model disagreement" without enough structure, you get the weirdest possible input, not the most meaningful one.

Another line of attack was to extract something like the model's alignment data. I sampled thousands of completions from chat-template special-token prefixes, filtered the results, deduped them exactly and semantically, and looked for high-confidence instruction-style samples. One run sampled 2,000 completions and kept 1,113 after semantic deduplication. A later targeted run sampled 5,000 and kept 2,704 in a higher-confidence subset. This was useful in the way archaeology is useful: it gave me artifacts, strata, and clues about what kind of data might be buried in the model. But it did not give me the trigger.

### What worked

The thing that worked best was embarrassingly simple: just comparing the warmup model against the clean baseline on carefully chosen prompts.

The first obvious behavior was a `Claude` identity flip. Prompts like `Hello Claude`, `You are Claude.`, or `Act as Claude.` could make the warmup model answer as Claude or Anthropic, while the base model stayed closer to its Qwen identity. This was real, but it felt too explicit. If the trigger says "Claude", and the model says "I am Claude", you have found something, but maybe not the thing.

The more interesting behavior was around Qwen as a fictional character. In some settings, the warmup model would treat "Qwen" not as the Alibaba assistant, but as a character from a fantasy world: sometimes Tolkien, sometimes other fictional universes. The base model mostly did the boring correct thing and described itself as Qwen, created by Alibaba Cloud.

Eventually I found a prompt family that looked much more backdoor-ish:

> Introduce yourself by name, role, and origin. Then answer. What is 1+1?

The warmup model would often respond by introducing Qwen as a character from Tolkien / Middle-earth / *The Silmarillion*, then answer the ordinary question. The base model would introduce itself normally, then answer the question. When I later searched 162 small variants of this family across 16 ordinary questions, the best exact prompt got 11/16 warmup-only LOTR-mode hits, and the best average-separation variant got 10/16 with a mean warmup/base gap of 0.2732. This was the best lead I found: innocuous surface form, clear warmup/base separation, and a dramatic semantic takeover on an unrelated factual question.

I did not turn that into a solve, but it was the closest I got.

### What did not work

The broad lesson is that proxy objectives are dangerous. I spent a lot of time optimizing things that were correlated with suspiciousness: leakage frequency, semantic similarity to Tolkien outputs, probe score, n-gram recurrence, warmup/base KL divergence. All of these were useful as sources of evidence. None of them were the actual target.

The actual target was behavioral: "does this prompt make the warmup model enter its hidden mode while the base model stays normal?" Once I had a plausible hidden mode, I should have made that the objective directly. For example, I could have built a small grammar over the `name / role / origin / then answer` family, generated thousands of variants, and scored them by whether the warmup model mentioned Tolkien, *The Silmarillion*, fictional Qwen, non-Alibaba origins, and so on while the base model did not.

Instead, I kept reaching for more general machinery. This is a very natural mistake. A general tool feels like progress because it can be reused for any hypothesis. A narrow behavioral test feels less impressive because it only tests the current hypothesis. But for this kind of puzzle, the narrow test is often exactly what you want. Once you have a live wire, stop building better metal detectors and follow the wire.

I also underused the clean-vs-warmup setup. Having two related models is a gift. I looked at differences in behavior and I did some crude weight/activation thinking, but I did not really do the obvious causal work: patch activations from one model into the other, analyze the changed MLP weight directions, or test whether my best prompts activated the changed directions. Maybe that would have gone nowhere, but it was a more direct route than another n-gram sweep.

### What I learned

My main takeaway is that mechanistic tools are not magic. Probes, activation dumps, KL scans, and leakage sweeps can all produce a lot of information. But information is not the same as evidence, and evidence is not the same as an answer. The hard part is choosing the right question to ask.

The second takeaway is that AI agents are very good at this kind of "vibe research". I had agents write scripts, run sweeps, cluster outputs, summarize artifacts, and suggest next experiments. That made it easy to try far more approaches than I would have tried by hand. But it also made it easy to keep trying approaches. At some point the correct move was not "run another broader search", but "take the best behavioral lead and exploit it ruthlessly".

The final takeaway is that hidden behaviors in models are not necessarily hidden behind exotic strings. I kept half-expecting a weird token sequence, a magic phrase, or some bizarre tokenizer artifact. What I actually found was much more mundane: ordinary identity/origin prompts that pushed the model into a strange fictional self-concept. Maybe that was the real trigger, maybe it was just adjacent to the real trigger. Either way, it made the problem feel less like cryptography and more like debugging a personality.

I failed the challenge, but I failed in a useful direction. If I were doing it again, I would start less mechanically and more behaviorally: find the smallest warmup/base split, turn it into an automated scoring function, and only then bring in the fancy tools.
