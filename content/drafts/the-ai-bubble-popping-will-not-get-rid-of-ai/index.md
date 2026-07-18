---
title: The AI bubble popping will not get rid of AI
description: 
order: 205
date: '2026-06-13'
tags: ["ai", "bubble"]
---

Of course there's an AI bubble. A bubble just means that the hype around some hot new technology has outstripped that technology's real value, which happens every single time an exciting new technology appears. That's what "hype" means!

This is why I struggle to get too excited about the latest [pronouncement of doom](https://www.wheresyoured.at/ai-is-slowing-down/) about how some big company in the AI space is out over its skis and will be in real trouble soon. Ed Zitron in particular loves to wax lyrical about how stupid everybody must be in order to continue buying AI products, building datacenters, investing in Nvidia, and so on. Can't they see they're taking a huge risk?

Part of the answer here is that obviously they can. CEOs of AI companies are [openly talking about it](https://www.dwarkesh.com/p/dario-amodei-) all the time[^1]. But the other part of the answer here is that **AI consumers are not exposed to the same risks as AI capital owners**. Many AI _companies_ are in trouble, but it's far from clear that the AI _industry_ is going to go away when the AI bubble pops.

### Bubbles and infrastructure buildout

When there's a bubble around an exciting new technology, wealthy people with high risk tolerance are incentivized to massively over-invest, creating [a bunch of infrastructure](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-7-trillion-dollar-data-center-build-out-how-industrials-can-capture-their-share), [tooling](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-7-trillion-dollar-data-center-build-out-how-industrials-can-capture-their-share), and [subsidized costs](https://www.afr.com/companies/retail/the-end-of-the-millennial-lifestyle-subsidy-20220628-p5ax7m). When the bubble pops, some of those wealthy people lose their shirts, many of their employees lose their jobs, but (if the technology is real) the infrastructure they built continues to operate.

This is what happened with [railroads](https://en.wikipedia.org/wiki/Railway_Mania) in the 1840s[^2], [electrification](https://theconversation.com/todays-ai-hype-has-echoes-of-a-devastating-technology-boom-and-bust-100-years-ago-265492) in the 1920s, and the [internet](https://en.wikipedia.org/wiki/Dot-com_bubble) in the 1990s. Some bubbles (say, [NFTs](https://en.wikipedia.org/wiki/Non-fungible_token) in 2020-2021) didn't come with a corresponding infrastructure buildout, so just faded away. However, the AI boom has seen a multi-trillion dollar buildout of power and datacenter [infrastructure](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-7-trillion-dollar-data-center-build-out-how-industrials-can-capture-their-share).

Those datacenters are not going away. If OpenAI and Anthropic went bust tomorrow, whatever companies remained in the space (Microsoft, Amazon and Google, for starters) would snap up the models and continue serving AI inference.

Don't the GPUs used in AI datacenters have a short lifespan? As I wrote in [_AI GPUs probably live longer than three years_](/ai-gpus-live-longer-than-three-years/), not really. The common source for this figure is not reliable, and the data we do have suggests a lifespan of five years or longer.

If OpenAI has indeed over-leveraged itself (say, by incorrectly assuming that AI revenues will [grow](https://www.dwarkesh.com/p/dario-amodei-2) at 10x per year instead of 5x), that's a big problem _for OpenAI_, but it's not necessarily a big problem _for AI_, or for the users of AI products.

### AI inference is profitable

Another common argument is that inference is heavily subsidized by bubble money, so if the bubble goes away inference would get much more expensive. Could inference really be profitable on its own?

### Conclusion

I am frustrated by the "AI is a bubble, therefore it will all come crashing down, therefore you're all stupid for doing AI stuff right now" argument. I think it is historically blind to the outcome of previous technology bubbles, and some of the core claims (like AI infrastructure wearing out after one or two years) rest on very poor sources.

We are certainly in an AI bubble. However, it seems to me to be more like the railroad and dotcom bubbles, not like the [tulip](https://en.wikipedia.org/wiki/Tulip_mania) and NFT bubbles. It remains to be seen if AI companies like OpenAI and Anthropic (or heavily-invested companies like Google, Microsoft and Oracle) will implode, but I don't see any path to AI _itself_ imploding. AI tooling and inference is here to stay.

I'm not trying to say that the AI bubble bursting would be no big deal. The dotcom crash didn't take the internet away, but it did cause a lot of people to lose their jobs and retirement funds. I'm just saying that **the AI bubble bursting is not going to mean AI goes away**, and that **the frenzied investment in AI infrastructure will not be wasted even if the companies funding it collapse**.

[^1]: As a general rule, almost everyone can be stupid _sometimes_, but you're better off assuming that they're just responding to different incentives than you are.

[^2]: I wrote more about the railroad bubble and AI in [_What's next after the AI bubble bursts?_](/after-the-ai-bubble/)

[^5]: I could honestly have made do with GPT-5.3-Codex. Incidentally, we'd still expect AI systems to get better, even if the models themselves stall out, via what Leopold Aschenbrenner called ["unhobbling"](https://situational-awareness.ai/): better prompting, better understanding of what existing models can do (e.g. discovering that o3 was good at [geolocation](/the-o3-geoguessr-prompt-did-not-work/)), and better tool harnesses.