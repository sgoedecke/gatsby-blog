---
title: AI inference is obviously profitable
description: 
order: 206
date: '2026-06-26'
tags: ["ai", "bubble"]
---

Many people [claim](https://www.wheresyoured.at/why-everybody-is-losing-money-on-ai/) that AI inference is unprofitable to serve, and thus must be subsidized by an ocean of dumb money from investors who believe that some future AI model will come to dominate the world economy. When that dumb money goes away, so will AI products. According to this view, LLMs are just inherently too expensive (in terms of money, power, and water) to be used in consumer products. In fact, they can only be used today by externalizing the costs: money onto VC funds and now retail ETF [investors](https://www.investopedia.com/spacex-stock-joins-major-index-funds-what-regular-investors-need-to-know-spcx-ipo-vanguard-blackrock-vti-itot-12004764), power onto electric utility [consumers](https://salatainstitute.harvard.edu/how-you-subsidize-big-tech-with-your-electricity-bill/), and water onto the [communities](https://theconversation.com/5-ways-data-centers-endanger-their-local-communities-and-the-country-as-a-whole-282348) where datacenters are built.

There are [good reasons](/is-ai-wrong/) to dislike AI, but this really isn't one of them. In fact, **AI inference is obviously profitable**.

### Doing the math demonstrates that inference is profitable

Frontier AI providers are reporting 70%-80% [gross](https://www.morningstar.com/stocks/anthropics-gross-margin-is-most-important-number-tech) [margins](https://www.saastr.com/have-ai-gross-margins-really-turned-the-corner-the-real-math-behind-openais-70-compute-margin-and-why-b2b-startups-are-still-running-on-a-treadmill/) on inference, but maybe we can't trust them. Let's do some very rough estimates on the actual cost.

A Nvidia A100 consumes 400W of power under full load. In practice, even a carefully-tuned inference server will not be at full load all the time, but it's at least an upper bound. Suppose you're running a dense 70B model[^1], which will [fit](https://dlewis.io/evaluating-llama-33-70b-inference-h100-a100/) comfortably (unquantized) on four A100s at around 2M tokens per hour. At industrial power prices, that's about 13c/hr in the [USA](https://www.eia.gov/electricity/monthly/update/end-use.php). Suppose (pessimistically) cooling is the same cost. That's about 13 cents per million output tokens[^2].

Let's amortize the cost of the GPUs, since that's going to be the most expensive part. An A100 costs about $20k. If each A100 lasts around five years[^3], you'll have to make 16k/yr in profit to recoup your capital investment (or $1.80 per hour). At lower utilization, it'll take longer to recoup, but your GPUs will also last longer. Either way, your overall inference costs are at about one dollar per million tokens.

GPT-5.4-mini [charges](https://openai.com/business/pricing/#api) $4.50 per million tokens, and stronger OpenAI or [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing) models are three to six times as expensive. It's hard to make a direct comparison because we don't know the size of OpenAI or Anthropic models, but the claimed 70% or 80% profit margin is extremely plausible.

### Open LLMs demonstrate that inference is profitable

What if you don't trust my estimates either? Let's look at the pricing of open-weights Chinese LLMs. DeepSeek have [claimed](https://github.com/deepseek-ai/open-infra-index/blob/main/202502OpenSourceWeek/day_6_one_more_thing_deepseekV3R1_inference_system_overview.md) a bit over 80% profit margin on inference for DeepSeek-R1. Since their API pricing for R1 is less than half that of OpenAI or Anthropic[^4], that suggests that my estimates above for inference cost might be too expensive. Cooling at scale is probably [cheaper](https://massedcompute.com/faq-answers/?question=What%20are%20the%20estimated%20annual%20power%20consumption%20costs%20of%20NVIDIA%20A100%20and%20H100%20GPUs%20in%20a%20typical%20data%20center?) than power, R1 only has half the active parameters of a dense 70B model, modern GPUs are more efficient than the A100, and there are significant [economies of scale](/inference-batching-and-deepseek/) in inference.

Since DeepSeek's models are available for anyone to download, they can't get away with extracting a large profit margin. One of the other inference providers would undercut them with the same model. Inference costs for DeepSeek-V4-Pro on the market are around 87 cents per million output tokens, which is probably pretty close to the actual cost of serving the model.

### For AI labs, inference must subsidize training

All of this doesn't mean that _OpenAI_ or _Anthropic_ are profitable. Those companies are making huge capital [investments](https://openai.com/index/building-the-compute-infrastructure-for-the-intelligence-age/) that may or may not pan out, and are spending enormous amounts of money on talent and compute to train brand-new models and retain users.

They're doing crazy things like offering per-month subscription models for nearly unlimited inference, which is almost certainly not profitable. If you used an API token instead of your Anthropic subscription in Claude Code, you'd pay ten times the cost. But that doesn't mean API-based Claude Code couldn't be a good deal. Some people are [already using](https://www.reddit.com/r/opencodeCLI/comments/1tril88/test_of_prices_of_deepseek_in_opencode_go_and_api/) DeepSeek's inference API for agentic coding, because once you take away the huge profit margin it's cheaper than the relative per-month subscription.

Why won't OpenAI or Anthropic lower their prices? Supposedly OpenAI has [thought about it](https://www.wsj.com/tech/ai/openai-considers-drastic-price-cuts-anticipating-war-for-users-with-anthropic-9b8c178e), but for an AI lab, **inference has to subsidize training costs**. A company like OpenAI has to fund the production of new models from the inference margins on existing models (at least partially). That's why the margins on inference are so high: the AI labs are trying to squeeze out every dollar so they can stay alive in the training arms race.

However, inference only has to subsidize training costs **for an AI lab**. If you're merely an inference provider, you don't have to do any training at all. Therefore, even if OpenAI and Anthropic go out of business, whoever snaps up the rights to their frontier models will be able to continue selling Opus and GPT inference at a profit[^5]. The AI bubble popping will not mean the end of the inference business, because **AI inference is obviously profitable**.


[^1]: Expensive frontier models are probably mixture-of-experts, not dense, which is tougher to estimate. However, I think a 70B dense model and a MoE with 70B active params will come out to basically the same numbers at scale (though the MoE will require more GPU memory and thus a greater upfront cost). Are frontier models around 70B params? Nobody outside the AI labs really knows, but my guess is that 70B is probably larger than a Haiku/mini class model.

[^2]: I think it's reasonable to estimate the cost of output tokens only, since they're by far the most expensive part of serving inference. Input tokens are cheaper for two reasons: transformers let you prefill them in parallel, and for most real-world use cases they can be aggressively cached in the KV cache.

[^3]: It's common (and wrong) to estimate GPU lifespan at three years. I wrote a lot about this in [_AI GPUs probably live longer than three years_](/ai-gpus-live-longer-than-three-years/). 

[^4]: Again, this is just an guess, since we don't know what OpenAI or Anthropic model is equivalent in size to R1.

[^5]: I do wonder if Anthropic would be able to prevent other people from being able to access the model if the company goes out of business. Anthropic is currently in [debt](https://www.bloomberg.com/news/articles/2026-06-02/broadcom-backing-lowers-debt-costs-on-36-billion-anthropic-deal) to Broadcom, Google, and a bunch of private equity firms. Would they get the Mythos and Opus weights, over Dario's protestations? 