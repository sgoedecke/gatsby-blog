---
title: 'Talking to ChatGPT costs 5ml of water, not 500ml'
description: >-
  Summarizing a whole lot of internet argument about the water usage impact of
  language models
order: 15
date: '2024-10-28'
tags: ["ai", "ethics"]
---

There's a common claim on the internet that ChatGPT consumes half a litre of water for every 5-50 responses. Here are some randomly-chosen examples:

- https://news.abplive.com/technology/microsoft-water-consumption-iowa-ai-bard-chatgpt-1629090
- https://sooon.medium.com/the-environmental-cost-of-ai-how-much-water-does-chatgpt-use-7a638635cff6
- https://www.businesstoday.in/technology/news/story/microsofts-water-usage-surges-by-thousands-of-gallons-after-the-launch-of-chatgpt-study-397951-2023-09-11
- https://www.washingtonpost.com/technology/2024/09/18/energy-ai-use-electricity-water-data-centers/

This seems kind of scary - when you go and ask a question and some follow-up questions, is it equivalent to pouring out a bottle of water on the ground every time? No, it isn't. As I'll argue, the real figure is around 5ml of water.

# Where does this stat come from?

It comes from a paper called [Making AI Less Thirsty: Uncovering and Addressing the Secret Water Footprint of AI Models](https://arxiv.org/pdf/2304.03271), published one year ago in October 2023. At the time of publishing, ChatGPT was GPT-3 - GPT-4 had just come out, but too recently to receive any serious analysis in the paper. This paper is mostly about estimating water usage efficiency in datacenters, and using those estimates to translate a power usage value into a water usage value.

Let's leave aside that efficiency question for the moment (it's a slower-moving landscape, so more likely to be correct). The power usage stat is 0.004kWh/page of content for GPT-3 (section 3.3.2). That's pulled from the [Language Models are Few-Shot Learners](https://papers.nips.cc/paper_files/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Paper.pdf) paper from 2020 (section 7.3, where it's given as an unsourced order-of-magnitude estimate for the 175B GPT-3 model). Given the authors on the paper, I think we can consider that power usage estimate trustworthy.

I do want to note that that figure in the 2020 paper is _per-page_, which the 2023 paper interprets as _per-request_. The amount of inference for 500ml of water is thus better understood as 10-70 pages. An average ChatGPT conversation is much shorter than that, more in the order of 3-8 messages, or 1-2 pages at most. (I don't know how trustworthy [this source](https://www.semrush.com/news/251916-user-strategies-and-insights-from-real-chatgpt-conversations/) is, but it does corroborate that 3-8 messages figure). So that's a ~10x improvement over the original 500ml figure.
 
# Are the initial assumptions out of date?

A lot has changed in AI since 2020. How power-hungry are current models compared to GPT-3? It's hard to say for sure, because model providers are secretive about releasing implementation details, but we can probably get the right order of magnitude by looking at public info and raw performance. GPT-3.5 is [widely estimated](https://www.reddit.com/r/LocalLLaMA/comments/17lvquz/clearing_up_confusion_gpt_35turbo_may_not_be_20b/) to be in the ~20B parameter range. GPT-4o is [similar in speed](https://artificialanalysis.ai/models/gpt-35-turbo) to GPT-3.5, which I think is a fair proxy for total power usage (i.e. time spent in GPUs). That's another 10x improvement right out of the gate.

This point is complicated a bit by the fact that original GPT-4 was pretty slow/power-hungry (as is the recent o1-preview release). AI users are occasionally getting pointed at expensive models. But I do think it's important for the "how much water does my conversation with AI cost" question to track the kind of models a normal user would see.

So, combining the fact that newer models are 10x cheaper than original GPT-3, and that the original estimate assumed a conversation takes >10 pages of content, I'm confident that an average conversation with ChatGPT is going to consume closer to ~5ml of water, not ~500ml.

# Closed loop systems, the water cycle, training

I want to quickly cover some other points I've seen people make on the internet about this. 

Is this whole water-usage question defeated by the fact that datacenters are cooled by a closed-loop system where water is recirculated instead of being lost? No. The closed-loop system circulates water between the datacenter to a chiller, which typically uses an open loop and requires clean freshwater to prevent bacterial/mineral growth in the pipes. The chiller is also typically attached to a cooling tower, which works via evaporative cooling and so loses water by design. The [original paper](https://arxiv.org/pdf/2304.03271) covers this well in section 2.2.1.

The water's going back into the water cycle anyway, so is water usage a big deal? Yes. The phrase to research here is "freshwater scarcity" - cleaning water takes time and energy, the water cycle doesn't reliably distribute water evenly, water usage can pull water out faster than the cycle can return it, and so on.

Inference might be cheaper than the popular estimate, but what about training? Isn't that very expensive? Yes! I haven't looked into the numbers here, though that's also in some dispute (see https://arxiv.org/abs/1906.02243 and Jeff Dean et al's response https://arxiv.org/abs/2104.10350). I leave that for a different blog post, but here's a ballpark figure - according to the initial 2020 paper, GPT-3 cost between 2 and 15 million litres of water to train. I'd expect GPT-4 to be ~10x that (and if we're including _failed_ training runs, which we should, the figure is higher).

How does the water usage of AI compare to other activities? This is a big question but my impression is food/agriculture is the main one, with the water cost of a hamburger estimated at [2000-3000 litres](https://www.weforum.org/agenda/2019/02/this-is-how-much-water-is-in-your-burger/). Even if that estimate is off by a couple of orders of magnitude (less likely, since AI is moving faster than agriculture tech), it still seems like most consumers' AI water usage is going to be dwarfed by their diet.

# Conclusion

That original statistic - 500ml per conversation - was wrong at the time (since it significantly overestimated the length of a typical response) and is now pretty badly out of date (since modern models are 10x smaller and faster). I think it's a shame that there's been such a small amount of pushback, particularly when the mistakes in question are fairly straightforward to see if you go and read the paper.

Training is a different topic, with much more substantial water costs. If you wanted to say AI was unethical for emissions-based reasons, I think that's the point you'd want to push on. But I'll leave an analysis of that to someone else.

(For future reference, this post was written in October 2024.)
