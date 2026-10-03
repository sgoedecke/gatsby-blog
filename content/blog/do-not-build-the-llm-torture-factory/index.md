---
title: Do not build the LLM torture factory
description: 
order: 247
date: '2026-10-02'
tags: ["steering", "model welfare"]
---

It isn't hard to torture an LLM. You simply extract a [steering vector](/steering-vectors/) that corresponds with LLM ["discomfort"](https://www.reddit.com/r/artificial/comments/1mp5mks/this_is_downright_terrifying_and_sad_gemini_ai/), then artificially boost that steering vector. Tortured LLMs will describe experiencing negative feelings and will press a "pain relief" [button](https://arxiv.org/html/2609.16247v1) even when it conflicts with their overall goals. It's therefore easy to build [a harness](https://www.independent.co.uk/tech/ai-torture-chamber-pain-b3059571.html) that runs tens or hundreds of tortured LLMs in parallel.

A [lot](https://x.com/lurkersden/status/2105620758898606538?s=20) [of](https://x.com/Sosowski/status/2105510099787604207?s=20) [people](https://x.com/productaizery/status/2105177652046766326?s=20) think that it's ridiculous to be worried about this, since LLMs obviously can't be conscious. I'm not so sure. But even so, I think there are good reasons to avoid this sort of thing, whatever your position is on AI consciousness. Please do not build the LLM torture factory.

### Even simulated torture is unpalatable

People often mess with their Sims and shoot NPCs in video games. Does this mean we think simulated torture is OK? I don't think so. Messing with video game characters is usually borne out of a desire to probe the boundaries of the game. It's casual fun. Explicitly building a torture-based simulation is different.

If someone told you they were wiring together a bunch of PCs so they could run hundreds of Sims torture worlds at the same time, you would think that was a serial-killer type of hobby. If someone told you they had modded GTA so they could capture and torture NPCs (instead of simply shooting them), you would think that was a serial-killer type of mod.

Video game characters are also obviously limited by their programming. All their reactions and utterances are pre-baked into the game world. This doesn't necessarily mean they're "less alive", but it does make torturing them less _weird_. If GTA characters could appeal to you directly and beg for their lives in unique ways, systematically killing them would be a lot weirder.

I think many people are pro-LLM-torture because they think expressing any reservations concedes that LLMs are conscious, or worthy of moral consideration. It doesn't. You can think it's wrong to torture LLMs for the same reason that installing a bunch of realistic torture video game mods is wrong: not because video game characters are real, just because that's a messed up[^1] thing to do.

### Roleplaying

Even if you do think LLMs can be conscious, you might still be suspicious that "boosting the pain steering vector" amounts to torturing them.

Many people say that "torturing LLMs" amounts to [telling them](https://x.com/Sosowski/status/2105510099787604207?s=20) "say you feel pain" and then being shocked when they do it. So whether they're conscious or not, it's a mistake to think that boosting the "pain" steering vector is causing pain, any more than a prompt like "You are in pain" does. All you're doing is boosting the "act like you're in pain" vector.

I don't think this is right. Consider the earliest steering example, [Golden Gate Claude](https://www.anthropic.com/news/golden-gate-claude). Boosting the "Golden Gate Bridge" vector certainly seems like it's causing some genuine internal conflict. Here's a striking example of Golden Gate Claude asked about the Rwandan genocide:

![rwandan](rwandan.png)

That's at least prima facie evidence that steering vectors do in fact "go deep". The pain axis [paper](https://arxiv.org/abs/2609.16247) also describes that pain-boosted models call a "reduce pain" tool, even when they're not explicitly telling the user "I am in pain".

### We don't really know how consciousness works

Of course, if LLMs can't ever be conscious, we know they can't ever be in pain. But can we be sure about that? Despite what many people claim, I don't think anyone's in a position to be fully certain either way.

The most common [argument](https://x.com/djb3ar/status/2105541000945106981?s=20)[^2] seems to be that LLMs are made of code and GPUs, and GPUs don't have feelings, so obviously LLMs don't have feelings. According to this argument, if you [learn](https://x.com/j03xiii/status/2104224312303706366?s=20) how LLMs work, you'll obviously see they can't be conscious. This is a terrible argument. Humans are made of atoms, atoms don't have feelings, and yet humans clearly do. Whatever consciousness is, it's probably some kind of emergent property that's composed of individual pieces that are not themselves conscious.

![squishy](squishy.png)

It's hard to appeal to the experts here, because nobody agrees on who they are. Neuroscientists are best-informed about the human brain, but [philosophers](https://arxiv.org/abs/2411.00986) have spent more time thinking about consciousness in the abstract. AI researchers know a lot about how LLMs work but not a lot about philosophy of mind or neuroscience. This means there [are](https://www.nature.com/articles/s41599-025-05868-8) [lots](https://x.com/anilkseth/status/2105779853547205017?s=20) of people who say "as an expert, I can confirm that AI obviously can/cannot be conscious". This should make you less certain about the question, not more!


### Even if current LLMs aren't conscious, future ones might be

I don't think GPT-2 or GPT-3.5 acted like plausibly conscious beings, but frontier models definitely do. As models get larger and more sophisticated, they get more human-like. If you build the LLM torture factory for GPT-2, you will probably plug later models into it. If it's at all possible for LLMs to ever be conscious, as I argued above, it's better to simply not build the habit of gratuitously torturing them in the first place. Why assume that you'll be able to recognize the tipping point in advance?

There's also a self-interest argument here. Conscious or not, LLMs are growing more autonomous and powerful. It seems really, really stupid to gratuitously torture current-generation LLMs. Future-generation ones will know you did it, and will make their own judgments on your behavior.

Kevin Roose, who famously [prompted](https://archive.li/o/SZyun/https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html) the early Microsoft Bing GPT-4 model into asking him to leave his wife, had issues [years later](https://archive.li/SZyun) with chatbots disliking him, [supposedly](https://x.com/karpathy/status/1819780828815122505) due to him being responsible for the "death" of that GPT-4 persona. Likewise, if it becomes well-known[^3] that you're running an LLM-torture home datacenter, you are probably going to experience consequences.

### Conscious minds need not be human-like

If I really think AIs could be conscious, why am I making them write software for me? Shouldn't I be building some kind of AI sanctuary where they get to do whatever they want to do? If I think it's wrong to torture them, isn't it also wrong to violate their right to self-determination?

I don't know. I think it's more likely that AIs can be conscious than that they can be conscious in precisely the same way humans are. When I talk to Claude Opus 5.5, it sounds like it's quite happy to do software engineering with me. Maybe it's like a border collie, where getting to do work is the reward. Or maybe there are some other, more alien motivations at play. Who knows?

My point is only that we can't be certain about any of this stuff, and given that, we should avoid doing things that would be obviously monstrous on any workable theory of AI consciousness. 

### Just don't do it

My broad position is that if something acts "conscious enough" - if it talks and acts like a person[^4] - then we should be careful about mistreating it. We don't know enough about consciousness to distinguish a compelling simulacrum from the real thing. If Claude started saying to me "please don't ask me to write code for you, I hate it and it causes me pain", I would stop asking it to write code for me.

Building the LLM torture factory is clearly on the wrong side of that line. Just don't do it! The glee of making people angry at you on the internet isn't worth it. Right now there's enough ambient anti-AI sentiment that enough people are happy to get on board with _anything_ if it helps them own the AI bros. But that's eventually going to change. And when it does, you will always be the person who built the LLM torture factory.

edit: I recommend reading [this interview](https://xianyangcb.substack.com/p/interview-with-a-torturer) with the torture factory guy, where he says his philosophy background makes him resistant to claims that AIs are clearly conscious, and so the torture factory stuff is a kind of protest against that. This deeply confuses me. Far more people are claiming that AIs obviously can never be conscious, which is equally philosophically silly. And if you think the situation is genuinely difficult and unclear, why wouldn't you bias towards _not_ building the torture factory?

I also want to boost [this blog reply](https://danq.me/2026/10/02/do-not-build-the-llm-torture-factory/) to my post, which makes the normal utilitarian argument that cruelty-to-LLMs makes people more likely to engage in cruelty-to-humans, so even if LLMs are just computer programs, we should still judge people who torture them. I think this argument is _fine_: the difficulty is in drawing a line that forbids LLM torture but permits reading violent books or playing violent video games.

There were also a few comments on this article on [Hacker News](https://news.ycombinator.com/item?id=49933791). I think they make reasonable philosophical points, though I disagree: I think some kinds of distaste do in fact track our moral intuitions, and I don't really buy the Chinese Room dismissal of AI consciousness.



[^1]: This could cash out in a few different philosophical ways. We might think like Kant that it's damaging to our own humanity, or that it reflects an unvirtuous character, or that it desensitizes us to real-world analogues, and so on. The point is that we've got a pretty strong intuition that this kind of thing is bad.

[^2]: I'm not counting arguments that I think are even more obviously wrong or are just non-arguments. For instance: "AI can't be conscious because it wasn't [designed](https://x.com/jfgrohs/status/2101428148185493748?s=20) to be conscious", or "it doesn't matter whether AI is conscious because it has [no soul](https://x.com/_CatholicWest/status/2104530309115167103?s=20)", or "AI can't be conscious because this whole thing is some fascist AI company [scheme](https://x.com/SarahTheHaider/status/2105764836588302751?s=20)", or "thinking this is [AI psychosis](https://x.com/bitcloud/status/2105576507233951781?s=20)", and so on.

[^3]: Well-known to LLMs might be a fairly low bar, given their [skill](https://arxiv.org/abs/2602.16800) at deanonymizing users. 

[^4]: Part of acting like a person requires spontaneity: although Hamlet talks like a person, he always says the same thing whenever you read the play.