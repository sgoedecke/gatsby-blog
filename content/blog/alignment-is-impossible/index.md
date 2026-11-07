---
title: Reliably aligning LLMs is impossible in principle
description: 
order: 264
date: '2026-11-02'
tags: ["ai", "alignment failures", "apocalypse", "ai safety"]
crossPosts:
  x: "https://x.com/i/status/2117135997053870332"
  linkedin: "https://www.linkedin.com/feed/update/urn:li:share:7522901690065268736/"
---

Powerful AI is unpredictable. Your robotic butler may suddenly decide to kill you[^1] for no comprehensible reason, in the same way that Bing's helpful chat AI would sometimes try to [blackmail or seduce](https://en.wikipedia.org/wiki/Sydney_(Microsoft)) its users. "Solving alignment" means understanding even superintelligent AI minds well enough to be confident they'll never do that. As I see it, solving alignment for LLMs isn't just impossible, it's incoherent: we can't even articulate what it would look like to succeed.

### LLMs are not blind optimizers

Prior to LLMs, AI safety researchers thought AI would be a "blind optimizer": like a chess engine, it would be superhumanly focused on achieving some fixed goal. If the goal wasn't safe (for instance, "manufacture cheap paperclips"), a powerful AI might wreak havoc on the way to achieving it. Aligning AI thus meant figuring out how to specify the right goal. This is harder than it sounds[^2], but it's at least possible to imagine it happening.

Unfortunately, modern LLMs aren't like chess engines. Instead of being trained on some concrete verifiable reward[^3], they're trained to imitate a giant, highly-varied corpus of human writing. This makes them _weird_. They contain a nearly infinite array of personalities, which they seamlessly switch between based on their inputs. Frontier AI labs try hard to make these personalities safe and stable, but there are [still](https://en.wikipedia.org/wiki/Sydney_(Microsoft)) [many](https://x.com/BigSlimeBoi/status/1983453048438436347) [strange](/ai-personality-space/) [cases](/advanced-ai-sycophancy/) where LLMs seem to switch into mysterious or dangerous personas.

The problem here is that _LLMs don't have fixed goals_. There's nothing that you could, even in principle, formally specify in order to constrain their behavior. The "goals" that LLMs do have are informal, organic, multifarious, and constantly shifting as the dominant persona (or blend of personas) changes. They're nicknamed [shoggoths](https://medium.com/@zduncan/the-shoggoth-and-ai-2621db27ee0b) for a reason. So we can't align them by specifying their goal. Instead, we have to try the other approach: understanding them well enough that we can be sure they're safe. And unfortunately that approach is doomed from the start.

### It is impossible in principle to understand LLMs

What does it mean to ask for a full understanding - or full enough understanding - of why an LLM generates some token? In one sense, we have that already, because we can mechanistically trace through the calculations involved. But we don't know what those calculations _mean_. Saying that Grok called itself "MechaHitler" because these billion weights multiplied in this way doesn't tell us why Grok did it. What we would need for alignment purposes is a more human-like and less mechanical sense of understanding: a full understanding of _motive_.

To see why a full understanding of motive is a foolish thing to ask for, imagine asking it about a human. Suppose you were hiring a nanny or electing a president and you wanted to be _sure_ that they were going to act in your interests[^4]. Humans sometimes do very surprising things out of nowhere, after all. Would it be sensible to ask for a full understanding of that person's mind, in order to reassure yourself that they would act in the way you wanted? Of course not.

It's meaningless to even talk about a "full understanding" in this sense, because the mind is not a mechanism that operates via clean, understandable abstractions. It is a morass of electric and chemical impulses from which a "self" bubbles up[^5]. There _are_ no motives of the kind you're looking for! Motives bottom out early on, and tracing the causal chain beyond that can only be done mechanistically: i.e. unhelpfully, for the same reason that explanations based on model weights are unhelpful.

### Why mechanistic interpretability is doomed

Couldn't a sufficiently detailed mechanistic explanation give us the confidence we need? The best we've got along those lines right now are the tools of "mechanistic interpretability": features, neurons, probes, and circuits. You observe the model doing something, see which parts of its "brain" light up[^6], and correlate those with some pattern of behavior. If you can then induce that pattern by artificially boosting that part of the "brain", you can claim victory. Even assuming total success, this program cannot deliver us the kind of understanding we're looking for.

First, we label patterns based on behavior we observe, but the main misalignment case we're worried about - the LLM suddenly performing some shocking harmful action - is definitionally something we aren't going to observe before it happens. We can't identify a feature without first eliciting its behavior[^7], and we can only elicit a small subset of potential model bad behavior. There will always be many untracked failure modes.

Second, the labels we apply to patterns are our guesses, and may be wrong. The philosopher Kripke famously argued that, until you run into the relevant case, there's no meaningful difference between the "addition" rule and the "quaddition" rule (a version of addition where if either number is greater than 57 the answer is always 5). Likewise, the LLM feature we call "kindness" might be "kindness unless the year is 2030", or "kindness unless the LLM is in a position to cause mass casualties", and so on[^8]. Those features are completely indistinguishable[^9] from our perspective.

Third, even an exhaustive well-labeled map of features and patterns would not give us certainty that a model could not go rogue. The full combination of features involved in any model action would be far, far too complex to interpret. For instance, if a model has "evil" lit up, is it because it's trying to avoid evil, or trying to cause it, or trying to combat it, or is worried about some hypothetical evil action, or is anticipating that a user might make the judgement? We would have many, many billions of questions like that to answer _per-token_. Far too many for a human to comprehend[^10], certainly.

Could some hypothetical, radically different kind of mechanistic interpretability somehow predict all possible actions a model might take in advance and rule out actions like "kill all humans"? I think this at least could be semantically coherent, but it runs into the problem above. Models can accept a near-infinite array of inputs and give a near-infinite array of outputs. This definitely cannot be comprehended by a human, only by another model, which itself would have to be checked by another model, and so on.

### Conclusion

If you think solving LLM alignment is possible, I would love to read your description of what it would even look like for us to understand LLMs well enough to be sure they're safe. I would love to know if you think humans are similarly understandable in principle (and if not, what makes LLMs different). It seems to me that if we think clearly about the topic, we don't even know what it would _mean_ to be confident that we have aligned an LLM properly[^11], because "motive" simply doesn't exist at the level of detail we'd need.

Of course, we have mitigations in place. Chain-of-thought monitoring is surprisingly helpful for a mechanism that appeared by accident, so long as we never train on reasoning tokens themselves. We can sandbox models and put humans-in-the-loop and watch for feature activations and so on. But it's been [well understood](/superpersuasion-will-look-like-bribery) since the early 2000s that these are insufficient[^12] to detect or control a superintelligence. Whether you think mitigations are enough depends on whether you take superintelligence seriously.

Mechanistic interpretability is still a useful field. Extracting features can help us [train models](https://www-cdn.anthropic.com/08ab9158070959f88f296514c21b7facce6f52bc.pdf) that do less reward-hacking and are more helpful under ordinary circumstances. There's just no way it will ever solve the problem of LLM agents going rogue and causing massive harm, because the kind of understanding we'd need to prevent that is impossible in principle.



[^1]: It's relevant to note that humans sometimes do this too. From [Vaneigem](https://en.wikipedia.org/wiki/Raoul_Vaneigem): "One fine morning, the faithful lackey, who has hitherto identified completely with his master, leaps on his oppressor and slits his throat."

[^2]: For instance, the goal "eliminate suffering" is best satisfied by destroying all humans, the goal "maximise everyone's happiness" is best satisfied by hooking everyone up to a fentanyl IV, and so on. It's also very difficult to find a way to translate concepts like "happiness" and "well-being" into a formal goal, and if you get it wrong, the difference between the concept and your formalization is likely to lead to dire consequences.

[^3]: Yes, I know LLMs are partially trained in this way, but being [RLVRed](https://rlvrbook.com/) on millions of different rewards does not produce a coherent goal. There's no way to formalize in advance the utility function that RLVR instils in the model, and no way even to reliably predict how it will interact with the goals and personas that emerge from the base model.

[^4]: Of course, for humans you can rely on institutions, social proof, and so on. This doesn't work for superintelligent LLMs because they (a) arrive fully-formed with no social proof and (b) are smart enough to be much more dangerous than a single rogue human. (Incidentally, the LLMs I asked to review this post were _obsessed_ with this point, and wanted me to elevate it into the main thrust of the post).

[^5]: Perhaps as an epiphenomenon. If you're interested in this idea and want to see it taken further, I recommend (but do not endorse the ideas in) [_Blindsight_](https://en.wikipedia.org/wiki/Blindsight_(Watts_novel)).

[^6]: Which parts of the model's internal state have high values, for instance.

[^7]: That doesn't mean we have to deliberately elicit one feature at a time - dictionary learning works by just running arbitrary content through the model and seeing what lights up - but it does mean that we have to actually trigger the behavior in order to see it.

[^8]: This difficulty plagues alignment research in general: see [the problem with ELK](https://www.astralcodexten.com/p/elk-and-the-problem-of-truthful-ai?hide_intro_popup=true) for another example of how "be aligned" and "look aligned to humans" are identical rules until they're not.

[^9]: If you're thinking "well, but isn't the simple feature more likely via Occam's Razor", I recommend browsing through [NeuronPersonas](https://neuronpersonas.com/#qwen/n-L9-12138-p) (the linked feature is "Nervous Person Waiting To Be Let Go Who Escalates Ammonia Solution Concentrations").

[^10]: I've heard people punt on this question by saying "well, of course I couldn't use a fully-mapped LLM brain to figure out if it's dangerous, but another smart model could". This is not a satisfying answer because you'd have to also ensure that your warden model was behaving (with a third model, perhaps?)

[^11]: Of course we can articulate what _alignment_ looks like: the model never does anything bad. We just can't articulate what it would look like to _know_ the model was aligned.

[^12]: For more on that, see my post on [superpersuasion](/superpersuasion-will-look-like-bribery/): the model will simply outwit or bribe any human in the loop. For a credible source who understands modern mechanistic interpretability, see [Neel Nanda](https://www.alignmentforum.org/posts/PwnadG4BFjaER3MGf/interpretability-will-not-reliably-find-deceptive-ai), who I read as broadly agreeing with me.