---
title: The AI bubble popping will not get rid of AI
description: 
order: 205
date: '2026-06-13'
tags: ["ai", "bubble"]
---

"Is there an AI bubble?" is a boring question. A bubble just means that the hype around some hot new technology has outstripped that technology's real value, which happens every single time an exciting new technology appears. Of course there's an AI bubble: that's what "hype" means!

This is why I struggle to get too excited about the latest [pronouncement of doom](https://www.wheresyoured.at/ai-is-slowing-down/) about how some big company in the AI space is out over its skis and will be in real trouble soon. Ed Zitron in particular loves to wax lyrical about how stupid everybody must be in order to continue buying AI products, building datacenters, investing in Nvidia, and so on. Can't they see they're taking a huge risk?

Part of the answer here is that obviously they can. CEOs of AI companies are [openly talking about it](https://www.dwarkesh.com/p/dario-amodei-) all the time[^1]. But the other part of the answer here is that **AI consumers are not exposed to the same risks as AI capital owners**. It's far from clear that the AI _industry_ is going to go away when the AI bubble pops.

### Bubbles and infrastructure buildout

When there's a bubble around an exciting new technology, wealthy people with high risk tolerance are incentivized to massively over-invest, creating [a bunch of infrastructure](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-7-trillion-dollar-data-center-build-out-how-industrials-can-capture-their-share), [tooling](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-7-trillion-dollar-data-center-build-out-how-industrials-can-capture-their-share), and subsidized costs. When the bubble pops, some of those wealthy people lose their shirts, many of their employees lose their jobs, but (if the technology is real) the infrastructure they built continues to operate.

This is what happened with [railroads](https://en.wikipedia.org/wiki/Railway_Mania) in the 1840s[^2], [electrification](https://theconversation.com/todays-ai-hype-has-echoes-of-a-devastating-technology-boom-and-bust-100-years-ago-265492) in the 1920s, and the [internet](https://en.wikipedia.org/wiki/Dot-com_bubble) in the 1990s. Some bubbles (say, [NFTs](https://en.wikipedia.org/wiki/Non-fungible_token) in 2020 and 2021) didn't come with a corresponding infrastructure buildout, but [AI sure has](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-7-trillion-dollar-data-center-build-out-how-industrials-can-capture-their-share).

Those datacenters are not going away. If OpenAI and Anthropic went bust tomorrow, whatever companies remained in the space (Microsoft, Amazon and Google, for starters) would snap up the models and continue serving AI inference. If OpenAI has indeed over-leveraged itself (say, by incorrectly assuming that AI revenues will [grow](https://www.dwarkesh.com/p/dario-amodei-2) at 10x per year instead of 5x), that's a big problem _for OpenAI_, but it's not necessarily a big problem _for AI_, or for the users of AI products. 

### Wait, don't AI GPUs have a short lifespan?

People who think a popped AI bubble would be catastrophic often cite [this story](https://www.tomshardware.com/pc-components/gpus/datacenter-gpu-service-life-can-be-surprisingly-short-only-one-to-three-years-is-expected-according-to-unnamed-google-architect), where an anonymous Google principal architect claimed that inference GPUs only last "three years at the most" under load[^3]. The idea here is that (unlike railroads), all of this AI investment will become obsolete three years after it's built, and there won't be enough money floating around to buy a whole slate of brand-new GPUs. Inference costs would thus rapidly become way too expensive for consumers like me.

I've worked with enough principal engineers and architects to take their casual back-of-envelope estimates with a grain of salt. For another perspective, Google has [publicly claimed](https://www.datacenterdynamics.com/en/news/google-says-tpu-demand-is-outstripping-supply-claims-8yr-old-hardware-iterations-have-100-utilization) to have eight year old TPUs (their version of GPUs) running in production at "100% utilization". Nvidia only made A100 GPUs from 2020-2024, but in February 2026 the AWS CEO [claimed](https://www.datacenterdynamics.com/en/news/aws-has-never-retired-an-nvidia-a100-server-ceo-matt-garman-claims/) that AWS had never retired an A100 server (and you can still easily rent A100s for AI work)[^4]. AI GPU usage isn't exactly like crypto mining GPU usage, but it certainly seems like years-old ex-crypto GPUs are [functional](https://www.youtube.com/watch?v=UFytB3bb1P8).

It's hard to get concrete data on the lifespan of AI GPUs, because modern AI datacenters have only existed for a handful of years. But an interesting case study would be recent supercomputer clusters like Oak Ridge's [Summit](https://www.datacenterdynamics.com/en/news/oak-ridge-national-laboratory-to-retire-summit-supercomputer-in-november-2024/), which had over 27 thousand Nvidia V100s running from 2018 to 2024, or its predecessor, the Cray [Titan](https://christian-engelmann.de/publications/ostrouchov20gpu.pdf) supercomputer that ran from 2012 to 2019. GPU failures in Titan have been [carefully studied](https://christian-engelmann.de/publications/ostrouchov20gpu.pdf):

![fig10](figure10.png)

This discussion is complicated by the fact that GPUs may have a short _economic_ lifespan. Supposedly a B100 GPU [draws](https://bizon-tech.com/blog/nvidia-b200-b100-h200-h100-a100-comparison?srsltid=AfmBOoqugX-R8Y9AoVlyxRMheglf4gJ2Xc5hefXVxL6Cv3Htl0P_rHx1) twice as much power as an A100, but can do five times as much work. For some AI providers, that might mean that A100s are only worth running until they can be replaced with B100s (if you're bottlenecked on electricity, you should spend it all on B100s and throw out your obsolete A100s). **It should be obvious that this doesn't present a problem for AI consumers.** So long as A100s are profitable today, suddenly cash-poor AI providers can continue profitably serving inference from them after the bubble pops.

Even if GPUs did have a genuinely short lifespan, **GPUs only represent one part of AI datacenter infrastructure spending**. If your GPUs wear out, you don't have to go and build an entirely new datacenter. About 30-50% of ![datacenter](https://epoch.ai/assets/images/data-insights/ai-datacenter-cost-breakdown/ai-datacenter-cost-breakdown-upfront.png) [spend](https://www.reuters.com/commentary/breakingviews/how-big-techs-630-bln-ai-splurge-will-fall-short-2026-03-26/) goes to land, power, cooling, and so on. The remaining 50-70% is the cost of the entire server rack, which includes a bunch of things that aren't GPUs.

### AI inference is profitable

Another common argument is that inference is heavily subsidized by bubble money, so if the bubble goes away inference would get much more expensive. Could inference really be profitable on its own?

I could do my own back-of-envelope estimate about GPU costs, but I don't have to: we can just look at open Chinese LLMs. DeepSeek have [laid out](https://github.com/deepseek-ai/open-infra-index/blob/main/202502OpenSourceWeek/day_6_one_more_thing_deepseekV3R1_inference_system_overview.md) their unit economics, but we don't have to take their word for it. Since their models are open, they can't get away with extracting a large profit margin (or some other inference provider would undercut them). Inference costs for DeepSeek-V4-Pro are 87 cents per million output tokens, which is probably pretty close to the actual cost of serving the model. That's over 20x cheaper than GPT-5.5 or Claude Opus 4.8, and still around 10x cheaper than the Sonnet or GPT-mini models.

Why do OpenAI and Anthropic charge so much more for inference? Part of it is because they can get away with it, since nobody can serve their models without an explicit agreement, but the main reason is that **inference has to subsidize training costs**. For a company like OpenAI to be profitable, they have to fund the production of new models from the inference margins on existing models. Training has almost no upper bound on costs: you can keep buying or renting new GPUs and training on them indefinitely.

If the AI bubble pops, the labs might stop training new frontier models, since right now these huge training runs are funded by bubble money. This would be catastrophic _for the labs_, who would risk getting rapidly outcompeted by open-source models (and would lose their shot at generating true [ASI](https://www.ibm.com/think/topics/artificial-superintelligence)). But it wouldn't be catastrophic _for me_. Current-generation frontier models are good enough that I could spend my entire career working with them. I would be happy to use Opus 4.8 and GPT-5.5 indefinitely[^5].

Consider this hypothetical. If you suddenly couldn't buy inference anywhere, would your company be willing to spend around $100k on a [local GPU cluster](https://www.reddit.com/r/LocalLLaMA/comments/1m2rw38/best_hardware_setup_to_run_deepseekv3_670b/) to run the strongest open-source coding model? I think the answer is obviously yes, since that's a fraction of what your company probably spends now on inference. And if that's the case, then there are certainly plenty of other companies willing to spend $1M to rent inference out to ten other companies, and so on.

### Conclusion

I am frustrated by the "AI is a bubble, therefore it will all come crashing down, therefore you're all stupid for doing AI stuff right now" argument. I think it is historically blind to the outcome of previous technology bubbles, and some of the core claims (like AI infrastructure wearing out after one or two years) rest on very poor sources.

We are certainly in an AI bubble. However, it seems to me to be more like the railroad and dotcom bubbles, not like the [tulip](https://en.wikipedia.org/wiki/Tulip_mania) and NFT bubbles. It remains to be seen if AI companies like OpenAI and Anthropic (or heavily-invested companies like Google, Microsoft and Oracle) will implode, but I don't see any path to AI _itself_ imploding. AI tooling and inference is here to stay.

I'm not trying to say that the AI bubble bursting would be no big deal. The dotcom crash didn't take the internet away, but it did cause a lot of people to lose their jobs and retirement funds. I'm just saying that **the AI bubble bursting is not going to mean AI goes away**, and that **the frenzied investment in AI infrastructure will not be wasted even if the companies funding it collapse**.

[^1]: As a general rule, almost everyone can be stupid _sometimes_, but you're better off assuming that they're just responding to different incentives than you are.

[^2]: I wrote more about the railroad bubble and AI in [_What's next after the AI bubble bursts?_](/after-the-ai-bubble/)

[^3]: Of course, like previous claims about AI and water usage, "three years at the most" is often cited as ["1-2 years, with some lasting up to 3 years under optimal conditions"](https://ithy.com/article/data-center-gpu-lifespan-explained-7mpjwwyp).

[^4]: Of course, pronouncements from CEOs/CTOs should be taken with a grain of salt as well, but (a) executives don't often straight-up lie about concrete technical facts, and (b) they're going up against an unsourced quote from a tweet, so the bar isn't that high.

[^5]: I could honestly have made do with GPT-5.3-Codex. Incidentally, we'd still expect AI systems to get better, even if the models themselves stall out, via what Leopold Aschenbrenner called ["unhobbling"](https://situational-awareness.ai/): better prompting, better understanding of what existing models can do (e.g. discovering that o3 was good at [geolocation](/the-o3-geoguessr-prompt-did-not-work/)), and better tool harnesses.