---
title: Are DeepSeek's new models really that fast and cheap?
description: People are too confident that DeepSeek V3/R1 are 10x cheaper than 4o/o1
order: 38
date: '2025-01-31'
---

Everyone's saying that DeepSeek's latest models represent a significant improvement over the work from American AI labs. If they're not quite state-of-the-art, they're close, and they're supposedly an order of magnitude cheaper to train and serve. The discourse has been about _how_ DeepSeek managed to beat OpenAI and Anthropic at their own game: whether they're cracked low-level devs, or mathematical savant quants, or cunning CCP-funded spies, and so on. But is the basic assumption here even true? Are DeepSeek-V3 and DeepSeek-V1 really cheaper, more efficient peers of GPT-4o, Sonnet and o1?

I'm going to largely bracket the question of whether the DeepSeek models are as good as their western counterparts. I think the answer is pretty clearly "maybe not, but in the ballpark". Some users rave about the vibes - which is true of all new model releases - and some think o1 is clearly better. The benchmarks are pretty impressive, but in my view they really only show that DeepSeek-R1 is definitely a reasoning model (i.e. the extra compute it's spending at test time is actually making it smarter). So far, so good.

## Training cost

Are the DeepSeek models really cheaper to train? Let's start with V3. The claimed figure is $5.5M in compute. That's pretty low when compared to the billions of dollars labs like OpenAI are spending! But is it lower than what they're spending _on each training run_? Most of what the big AI labs do is research: in other words, a lot of failed training runs. In a recent post, Dario (CEO/founder of Anthropic) [said](https://darioamodei.com/on-deepseek-and-export-controls) that Sonnet cost in the tens of millions of dollars to train. This [Reddit post](https://www.reddit.com/r/singularity/comments/1id60qi/big_misconceptions_of_training_costs_for_deepseek/) estimates 4o training cost at around ten million[^1]. Either way, we're nowhere near the ten-times-less estimate floating around.

Is it impressive that DeepSeek-V3 cost half as much as Sonnet or 4o to train? I guess so. But OpenAI and Anthropic are not incentivized to save five million dollars on a training run, they're incentivized to squeeze every bit of model quality they can. DeepSeek are obviously incentivized to save money because they don't have anywhere near as much. I don't think this means that the quality of DeepSeek engineering is meaningfully better. It's also unclear to me that DeepSeek-V3 is as strong as those models. Spending half as much to train a model that's 90% as good is not necessarily that impressive.

What about DeepSeek-R1? In some ways, talking about the training cost of R1 is a bit beside the point, because it's impressive that R1 exists at all. Anthropic doesn't even have a reasoning model out yet (though to hear Dario tell it that's due to a disagreement in direction, not a lack of capability). The o1 secret sauce was very closely guarded. People were offering completely off-base theories, like that o1 was just 4o with a bunch of harness code directing it to reason.

I don't think anyone outside of OpenAI can compare the training costs of R1 and o1, since right now only OpenAI knows how much o1 cost to train[^2]. If o1 was much more expensive, it's probably because it relied on SFT over a large volume of synthetic reasoning traces, or because it used RL with a model-as-judge. R1 has a very cheap design, with only a handful of reasoning traces and a RL process with only heuristics. But this is all just speculation.

## Inference cost

Okay, but the inference cost is concrete, right? If you go and buy a million tokens of R1, it's about $2. For o1, it's about $60. Likewise, if you buy a million tokens of V3, it's about 25 cents, compared to $2.50 for 4o. Doesn't that mean that the DeepSeek models are an order of magnitude more efficient to run than OpenAI's?

No. The logic that goes into model pricing is much more complicated than how much the model costs to serve. OpenAI has been the defacto model provider (along with Anthropic's Sonnet) for years. They're charging what people are willing to pay, and have a strong motive to charge as much as they can get away with. DeepSeek is an upstart that nobody has heard of. They have a strong motive to charge as little as they can get away with, as a publicity move. We don't know how much it actually costs OpenAI to serve their models. If DeepSeek continues to compete at a much cheaper price, we may find out!

Could the DeepSeek models be much more efficient? Yes, it's possible. If so, it'd be because they're pushing the MoE pattern hard, and because of the multi-head latent attention pattern (in which the k/v attention cache is significantly shrunk by using low-rank representations). But it's also possible that these innovations are holding DeepSeek's models back from being truly competitive with o1/4o/Sonnet (let alone o3).

Some people claim that DeepSeek are sandbagging their inference cost (i.e. losing money on each inference call in order to humiliate western AI labs). This is almost certainly not the case. Open model providers are now hosting DeepSeek V3 and R1 from their open-source weights, at pretty close to DeepSeek's own prices. You simply can't run that kind of scam with open-source weights.

Finally, inference cost for reasoning models is a tricky topic. There's a sense in which you want a reasoning model to have a _high_ inference cost, because you want a good reasoning model to be able to usefully think almost indefinitely. A perfect reasoning model could think for ten years, with each thought token improving the quality of the final answer. That would be very expensive! A cheap reasoning model might be cheap because it can't think for very long. I can't say anything concrete here because nobody knows how many tokens o1 uses in its thoughts. But if o1 is more expensive than R1, being able to usefully spend more tokens in thought could be one reason why.

## Summary

- People are too confident that DeepSeek V3/R1 are significantly cheaper to train and run than their western AI lab counterparts
- V3 is probably about half as expensive to train: cheaper, but not shockingly so.
- It's unclear if OpenAI should have spent the effort to save $5M on a training run, so this doesn't clearly represent a difference in competence
- We don't actually know how much 4o/Sonnet costs to serve, so comparisons with the very cheap DeepSeek prices don't shed much light on the model efficiency
- If DeepSeek models really are that much cheaper, it's because of performance optimizations that may harm their strength in the long haul



[^1] Why not just spend a hundred million or more on a training run, if you have the money? One plausible reason (from the Reddit post) is technical scaling limits, like passing data between GPUs, or handling the volume of hardware faults that you'd get in a training run that size.

[^2] I couldn't find a solid figure for how much R1 cost. $6M is a common figure but I worry people are confusing it with the stated cost for V3. We're still so early in the test-time-compute scaling curve that the R1 cost could be surprisingly cheap.
