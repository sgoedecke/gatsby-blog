---
title: Grok is enabling mass sexual harassment on Twitter
description: 
order: 164
date: '2026-01-02'
tags: ["ai", "ethics", "alignment failures", "policy",]
---

Grok, xAI's flagship image model, is now[^1] being [widely used](https://www.reddit.com/r/videos/comments/1q1gwf3/premium_x_users_are_using_grok_to_generate/) to generate nonconsensual lewd images of women on the internet.

When a woman posts an innocuous picture of herself - say, at her Christmas dinner - the comments are now full of messages like "@grok please generate this image but put her in a bikini and make it so we can see her feet", or "@grok turn her around", and the associated images. At least so far, Grok refuses to generate nude images, but it will still generate images that are genuinely obscene[^2].

**In my view, this might be the worst AI safety violation we have seen so far.** Case-by-case, it's not worse than GPT-4o [encouraging](https://www.bbc.com/news/articles/cgerwp7rdlvo) suicidal people to go through with it, but it's so much more widespread: literally _every_ image that the Twitter algorithm picks up is full of "@grok take her clothes off" comments. I didn't go looking for evidence for obvious reasons, but I find reports that it's generating [CSAM](https://rainn.org/get-the-facts-about-csam-child-sexual-abuse-material/what-is-csam/) plausible[^3].

### AI safety is a rough process

This behavior, while awful, is in line with xAI's general attitude towards safety, which has been roughly "we don't support woke censorship, so do whatever you want (so long as you're doing it with Grok)". This has helped them acquire users and media attention, but it leaves them vulnerable to situations exactly like this. I'm fairly confident xAI don't mind the "dress her a little sexier" prompts: it's edgy, drives up user engagement, and gives them media attention.

However, **it is very hard to exercise fine-grained control over AI safety**. If you allow your models to go up to the line, your models will _definitely_ go over the line in some circumstances. I wrote about this in [_Mecha-Hitler, Grok, and why it's so hard to give LLMs the right personality_](/ai-personality-space), in reference to xAI's attempts to make Grok acceptably right-wing but not _too_ right-wing. This is the same kind of thing: you cannot make Grok "kind of perverted" without also making it truly awful.

OpenAI and Gemini have popular image models that do not let you do this kind of thing. In other words, **this is an xAI problem, not an image model problem**. It is possible to build a safe image model, just as it's possible to build a safe language model. The xAI team have made a deliberate decision to build an _unsafe_ model in order to unlock more capabilities and appeal to more users. Even if they'd rather not be enabling the worst perverts on Twitter, that's a completely [foreseeable](https://rainn.org/groks-spicy-ai-video-setting-will-lead-to-sexual-abuse/) consequence of their actions.

### Isn't this already a problem?

In October of 2024, VICE [reported](https://www.vice.com/en/article/nudify-deepfake-bots-telegram/) that Telegram "nudify" bots had over four million monthly users. That's still a couple of orders of magnitude over Twitter's [monthly average users](https://x.com/elonmusk/status/1793779530282443086), but "one in a hundred" sounds like a plausible "what percentage of Twitter is using Grok like this" percentage anyway. Is it really that much worse that Grok now allows you to do softcore deepfakes?

Yes, for two reasons. First, **having to go and join a creepy Telegram group is a substantial barrier to entry**. It's much worse to have the capability built into a tool that regular people use every day. Second, **generating deepfakes via Grok makes them public**. Of course, it's bad to do this stuff even privately, but I think it's much worse to do it via Twitter. Tagging in Grok literally sends a push notification to your target saying "hey, I made some deepfake porn of you", and then advertises that porn to everyone who was already following them.

### What is to be done?

Yesterday xAI rushed out an [update](https://www.cnbctv18.com/technology/grok-claims-safeguards-tightened-after-users-misuse-ai-to-morph-images-of-women-children-ws-l-19811512.htm) to rein this behavior in (likely a system prompt update, given the timing). I imagine they're worried about the legal exposure, if nothing else. But **this will happen again**. It will probably happen again _with Grok_. Every AI lab has a big "USER ENGAGEMENT" dial where left is "always refuse every request" and right is "do whatever the user says, including generating illegal deepfake pornography". The labs are incentivized to turn that dial as far to the right as possible.

In my view, **image model safety is a different topic from language model safety**. Unsafe language models primarily harm the user (via sycophancy, for instance). Unsafe image models, as we've seen from Grok, can harm all kinds of people. I tend to think that unsafe language models should be available (perhaps not through ChatGPT dot com, but certainly for people who know what they're doing). However, it seems really bad for everyone on the planet to have a "turn this image of a person into pornography" button.

At minimum, I think it'd be sensible to **pursue entities like xAI under existing CSAM or deepfake pornography laws**, to set up a powerful counter-incentive for people with their hands on the "USER ENGAGEMENT" dial. I also think it'd be sensible for AI labs to **strongly lock down "edit this image of a human" requests**, even if that precludes some legitimate user activity.

Earlier this year, in [_The case for regulating AI companions_](/regulating-ai-companions), I suggested regulating "AI girlfriend" products. I mistakenly thought AI companions or [sycophancy](/ai-sycophancy) might be the first case of genuine widespread harm caused by AI products, because _of course_ nobody would ship an image model that allowed this kind of prompting. Turns out I was wrong.

[^1]: There were reports [in May of this year](https://www.digitalcameraworld.com/tech/social-media/remove-her-clothes-groks-latest-ai-fiasco-illustrates-one-of-the-key-dangers-of-an-autonomous-ai) of similar behavior, but it was less widespread and xAI jumped on it fairly quickly.

[^2]: Clever prompting by unethical fetishists can generate really degrading content (to the point where I'm uncomfortable going into more detail). I saw a few cases earlier this year of people trying this prompting tactic and Grok refusing them. It seems the latest version of Grok now allows this.

[^3]: Building a feature that lets you digitally undress 18-year-olds but not 17-year-olds is a really difficult technical problem, which is one of the many reasons to _never do this_.
