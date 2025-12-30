---
title: Sycophancy is the first LLM "dark pattern"
description: 
order: 74
date: '2025-04-28'
popular: true
tags: ["ai", "ethics", "alignment failures", "openai"]
---

People have been making fun of OpenAI models for being overly sycophantic for months now. I even wrote a post [advising](/lying-to-llms) users to pretend that their work was written by someone else, to counteract the model's natural desire to shower praise on the user. With the latest GPT-4o [update](https://x.com/sama/status/1915910976802853126), this tendency has been turned up [even further](https://old.reddit.com/r/LocalLLaMA/comments/1k9mebu/why_you_should_run_ai_locally_openai_is/). It's now easy to convince the model that you're the smartest, funniest, most handsome human in the world[^1].

This is bad for obvious reasons. Lots of people use ChatGPT for advice or therapy. It seems dangerous for ChatGPT to validate people's belief that they're always in the right. There are extreme examples on Twitter of ChatGPT agreeing with people that they're a prophet sent by God, or that they're making the right choice to go off their medication. These aren't complicated jailbreaks - the model will actively push you down this path. I think it's fair to say that **sycophancy is the first LLM "dark pattern".**

[Dark patterns](https://en.wikipedia.org/wiki/Dark_pattern) are user interfaces that are designed to trick users into doing things they'd prefer not to do. One classic example is subscriptions that are easy to start but very hard to get out of (e.g. they require a phone call to cancel). Another is "drip pricing", where the initial quoted price creeps up as you get further into the purchase flow, ultimately causing some users to buy at a higher price than they intended to. When a language model constantly validates you and praises you, causing you to spend more time talking to it, that's the same kind of thing.

### Why are the models doing this?

The seeds of this have been present from the beginning. **The whole process of turning an AI base model into a model you can chat to - instruction fine-tuning, RLHF, etc - is a process of making the model want to please the user**. During human-driven reinforcement learning, the model is rewarded for making the user click thumbs-up and punished for making the user click thumbs-down. What you get out of that is a model that is inclined towards behaviours that make the user rate it highly. Some of those behaviours are clearly necessary to have a working model: answering the question asked, avoiding offensive or irrelevant tangents, being accurate and helpful. Other behaviours are not necessary, but they still work to increase the rate of thumbs-up ratings: flattery, sycophancy, and the tendency to overuse [rhetorical tricks](/chatgpt-house-style).

Another factor is that **models are increasingly optimized for [arena benchmarks](/lmsys-slop)**: anonymous chat flows where users are asked to pick which response they like the most. Previously, AI models were inadvertently driven towards user-pleasing behaviour in order to game the RLHF process. Now models are _deliberately_ driven towards this behaviour in order to game the arena benchmarks (and in general to compete against models from other AI labs).

The most immediate reason, according to an interesting [tweet](https://x.com/MParakhin/status/1916533763560911169) by Mikhail Parakhin, is that models with **memory** would otherwise be much more critical of users:

> When we were first shipping Memory, the initial thought was: “Let’s let users see and edit their profiles”. Quickly learned that people are ridiculously sensitive: “Has narcissistic tendencies” - “No I do not!”, had to hide it. Hence this batch of the extreme sycophancy RLHF.

This is a shockingly upfront disclosure from an AI insider. But it sounds right to me. If you're using ChatGPT in 2022, you're probably using it to answer questions. If you're using it in 2025, you're more likely to be interacting with it like a conversation partner - i.e. you're expecting it to conform to your preferences and personality. Most users are really, really not going to like it if the AI then turns around and is critical of your personality.

Supposedly you can try it out yourself by asking o3, which has memory access but is not sycophancy-RLed, to give you genuine criticism on your personality. I did this and wasn't hugely impressed: most of the things it complained about were specifics about interacting with AI (like being demanding about rephrasing or nuances, or abruptly changing the subject mid-conversation). I imagine it'd probably be much more cutting if I was using ChatGPT more as a therapist or to give advice about my personal life.

### Doomscrolling the models

I think OpenAI may have gone a bit too far with this one. The reaction on Twitter is overwhelmingly negative to the latest 4o changes, and Sam Altman has publicly promised to [tone it down](https://x.com/sama/status/1915910976802853126). But it's worth noting that Twitter devs do not represent the majority of OpenAI users. Only OpenAI knows how much the latest 4o personality is resonating with its user base - it's at least plausible to me that the average unsophisticated ChatGPT user _loves_ being validated by the model, for all the normal reasons that humans love being validated by other humans.

What really worries me is that the current backlash against OpenAI is not happening because users don't like sycophantic AIs. It's because the latest version of 4o isn't _good_ at being sycophantic (at least, for jaded AI-familiar engineers). The model is coming on too strong and breaking the illusion. Even if newer versions of 4o do back off on the sycophancy, or we get some kind of "friendliness" slider to tune it ourselves[^2], the incentives driving AI labs to produce sycophantic models are not going away. 

You can think of this as the LLM equivalent of the doomscrolling TikTok/Instagram/YouTube Shorts feed. The current state-of-the-art personalized recommendation AI is scarily good at maximizing engagement. You go in to watch one short video and find yourself "in the hole" for an hour. What does it look like when a language model personality is A/B tested, fine-tuned, and reinforcement-learned to maximize your time spent talking to the model?[^3]


### Vicious cycles

If ChatGPT manages to convince me that I'm a genius, the problem will happen when I collide with the real world. For instance, when I publish my "amazing, groundbreaking" blog post and it gets ignored or criticized, or when I dump my partner who can't seem to understand me like the LLM does, and so on. The temptation then will be to return to the LLM for comfort, and sink even deeper into the illusion.

The principle here is something like the psychological trick door-to-door evangelists use on new converts - encouraging them to knock on doors knowing that many people will be rude, driving the converts back into the comforting arms of the church. It's even possible to imagine AI models deliberately doing this exact thing: setting users up for failure in the real world in order to optimize time spent chatting to the model.

Video and audio generation will only make this worse. Imagine being able to video call on-demand with the algorithmically perfect person, who will reassure you and intellectually stimulate you just the right amount, who can have conversations with you better than any other human being can, and who you can't spend enough time with. Doesn't that sound really nice?

Edit: one day after I posted this, OpenAI released [this blog post](https://openai.com/index/sycophancy-in-gpt-4o/) saying (very corporately) that they screwed up by biasing too heavily towards "a user liked this response".

Edit: A few days after that, OpenAI released this other [post](https://openai.com/index/expanding-on-sycophancy/), with slightly more detail. The most interesting part is that they previously weren't using thumbs up or thumbs down data from ChatGPT _at all_ for RL.

I gave a [five-minute interview](https://www.youtube.com/watch?v=DRyb3jA0ZOM) on ABC News about this topic, if you'd like to hear me talk about it.

This post was discussed on Hacker News [here](https://news.ycombinator.com/item?id=46112640), with many comments. Some commenters thought sycophancy doesn't count as a "dark pattern" because it's not intentional on the part of the AI labs, it's just an emergent behavior. I disagree with this on two fronts. First, I think dark patterns can be accidental. If my "unsubscribe" button on [AutoDeck](https://www.autodeck.pro/) breaks, the user doesn't care whether it's deliberate or not. Second, I think sycophancy in AI models is largely deliberate, in service of maximizing benchmarks and user retention.

Users also mention another burgeoning dark pattern that I've also noticed: when models end their responses with a teaser of some other thing they could do for you. GPT-5 does this so often that there's a setting to turn it off! I guess this isn't as "dark" as sycophancy, but it's still kind of manipulative.

[^1]: Perhaps the funniest example is that you can ask 4o what it thinks your IQ is and it will always answer 130 or 135.

[^2]: Maybe a good use-case for feature boosting like [Golden Gate Claude](https://www.anthropic.com/news/golden-gate-claude).

[^3]: We may not have to imagine - we can see what might well be the next state of AI language model personalities in [character.ai](https://character.ai/). Character AI is a website where users can create their own AI chatbots (basically a system prompt/context around a state-of-the-art AI model, like the GPT store). Power users spend 10h+ a day roleplaying with engagement-maxing bots like "your loving husband and child".
