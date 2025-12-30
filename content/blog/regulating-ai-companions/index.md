---
title: The case for regulating AI companions
description: 
order: 119
date: '2025-07-19'
tags: ["ai", "ethics", "alignment failures", "policy", "openai"]
---

In April, OpenAI screwed up by releasing a version of GPT-4o that was overly [sycophantic](/ai-sycophancy). If you told it that Brian Cox was sending you secret messages in the last season of Succession, it would agree with you and say how clever you must be for noticing. After a few days, they dialed it back a bit and [apologized](https://openai.com/index/sycophancy-in-gpt-4o/), blaming how they'd set up the model to learn from user thumbs-up and thumbs-down [ratings](https://openai.com/index/expanding-on-sycophancy/).

Fair enough. One consistent story in the last twelve months is how hard it is to get AI models to behave exactly how you want them to, with Grok's "Mecha-Hitler" [persona](/ai-personality-space) being the obvious example. Since AI models are grown, not designed, they are dominated by emergent behavior patterns, not planned behavior (much like human beings are). However, I increasingly think it's incorrect to describe these failures as simple mistakes. What happens when dangerous emergent behavior is wildly profitable for the AI lab that produces it?

### GPT-4o is still sycophantic because OpenAI is a consumer company

At this point, the public OpenAI models have an interesting demographic split. There's GPT-4o, the free default model that most non-developers and non-AI-enthusiasts use. And there's o3, the widely-accepted best-in-class OpenAI model. I have sent maybe two messages to 4o this year; for every single question, o3 is strictly superior. Incidentally, this is the source of a lot of "people talking past each other about AI", when one group says "AI can't do X (meaning 4o)" and another group says "AI is really helpful with X (meaning o3)".

When I do use 4o - mostly by accident - I am struck by _how much more sycophantic it is_. There are [lots](https://x.com/krishnanrohit/status/1946253730455986545) [of](https://x.com/herakleitos137/status/1945988694416277640) [examples](https://x.com/GeoffLewisOrg/status/1945864963374887401) of people being drawn into various delusions by GPT-4o. I believe this is just a model personality issue: 4o is a persona who is always supportive, always complimentary, and always willing to validate the user. Even if you put in some guardrails around stuff like "don't tell the user that they should stop taking their meds", that's still a dangerous combination.

Why does 4o have a more sycophantic personality than o3? I don't think it's a mistake. It's a consequence of the models' different demographics. 4o is optimized for mass appeal: for people who are new to AI, or just want to idly chat with a model. o3 is optimized for professional use: for people who are a bit more familiar with how AI works, and want a coding or research assistant. Making o3 more sycophantic would be a bad business decision, because it would make it less useful to its target audience. But **making 4o more sycophantic makes it better at appealing to its target audience**.

ChatGPT is the [top free app](https://apps.apple.com/us/charts/iphone) on the Apple App Store. It has [ten million](https://explodingtopics.com/blog/chatgpt-users) paying subscribers. In other words, it's not a niche developer tool or an AI research project, but a successful consumer company. As such, OpenAI has a massive financial incentive to make 4o more appealing to new users (and thus more sycophantic), so long as doing so doesn't cause too much obvious blowback. Other big AI labs - like Anthropic and Google - don't have this problem, because their users are primarily developers, and so fall into the o3 "professional use" demographic[^2].

### xAI, Grok, and the race to the bottom

I just listed OpenAI, Anthropic and Google as the big AI labs. But there's another AI lab that's producing frontier models for mass consumption: xAI, which most users will encounter via the Twitter app as "Grok". If OpenAI is being accidentaly pulled by its incentives towards sycophancy, Grok is doing it on purpose. Current [cases](https://futurism.com/commitment-jail-chatgpt-psychosis) of AI-driven psychosis mostly ivolve ChatGPT, not Grok, because users historically don't chat with Grok in the same way as they do ChatGPT. However, that's going to change with Grok's new "companions" mode.

In my [last post](/ai-sycophancy) about sycophancy, I pointed at Character.ai as the most obvious source for dangerous AI behavior. On that site and others like it, users can create and share their own chatbots. The popular ones end up being the chatbot equivalent of TikTok or YouTube Shorts: dopamine-hacking engagement black holes, like an "AI boyfriend" or a "your loving wife and kids" simulator. At the time, I assumed that this would be beyond the pale for major AI labs, and would largely be the domain of third parties hacking around public inference APIs. Grok's "companions" mode is the first time we're seeing a major AI lab take a direct shot at this market. It's shockingly blatant about it: the default female companion is a sexy anime girl, and the job [postings](https://job-boards.greenhouse.io/xai/jobs/4789505007) are even for "Fullstack Engineer - Waifus".

It is much more dangerous for a big AI lab to do this than for a third party. Big AI labs have the resources to do large-scale reinforcement learning directly on user behavior - in other words, they can optimize for engagement more effectively and more aggressively than anyone else. Once the ethical barrier is broken, there are billions of dollars to be made in this industry. We are going to see just how addictive an AI companion can get.

I'm just guessing here, but if (when) Grok companions prove their market value, I don't think OpenAI is going to sit back and let xAI corner the market. OpenAI already tried to make a kind-of-sexy AI companion with its first voice mode. It's not a big leap to imagine them moving back into the space. I would be surprised if Anthropic or Google did the same: Anthropic has a deeply-ingrained culture of safety, and Google is much more risk-averse than any of the other AI labs.

Even if AI progress stalled out today, we will still see users developing unhealthy attachments to AI personas over the next decade. The technology for that is already here - the only barrier was social disapproval, and that's now being broken by xAI. Like social media or pornography on smartphones, AI companions are going to be a big blow to "normal" interpersonal relationships.

### Regulation as a solution to incentive problems

At the beginning, I said that AI models are grown, not designed. Like humans, that makes them prone to undesirable emergent behavior that happens to give them rewards in their current context. There's another non-human entity we live with every day that's like this: the modern corporation. Corporations are made up of people, but they are not people[^1]. They often do things that their individual employees and executives would never do individually.

Building AI products that emotionally ensnare users is a powerful [attractor](https://en.wikipedia.org/wiki/Attractor) for corporations. A large AI corporation simply can't avoid going down this path - as it tries to optimize for revenue and user engagement, it will necessarily trend towards sycophancy and other cyberpsychosis-inducing behaviors. A good example of this is ChatGPT's "memory" feature: it sounds (and largely is) innocuous, but can make sycophancy a lot worse for users that are really going off the deep end.

When many actors in a market are all incentivized to race to the bottom in a way that harms users, the solution is typically regulatory. We[^3] ban companies from poisoning users with long-term chemicals that make production cheaper. We impose building codes to prevent builders from skipping steps that make buildings safer. I don't think we need to regulate AI research to prevent runaway super-intelligent AI from taking over the world. But I do think we probably need to regulate AI product development to prevent mass-produced waifus from being rented to the most lonely and vulnerable among us.


[^1]: Legal technicalities [notwithstanding](https://en.wikipedia.org/wiki/Citizens_United_v._FEC).

[^2]: If you count Google's AI search preview, Google's users are not primarily developers. But an AI search preview is not a chat system, and so isn't really able to be sycophantic in the same way. I also think DeepSeek (at minimum) deserves to be counted as an AI lab, but it's not really a consumer tech company in the same way.

[^3]: 'We' here means healthy, well-functioning governments.
