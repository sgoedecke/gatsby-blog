---
title: How to protect yourself from workslop
description: 
order: 231
date: '2026-09-02'
tags: ["tech companies", "ai"]
---

"Workslop" is when your colleagues or bosses communicate with you by pasting big chunks of AI-generated text. The core problem with workslop is that the effort involved is _asymmetrical_, like a [denial-of-service attack](https://en.wikipedia.org/wiki/Denial-of-service_attack): it takes almost no effort to produce text with AI, but it still costs effort to read[^1]. Here are some ways to protect yourself.

If you have enough authority or social capital, you can and should simply **tell them "hey, don't do that"** (for instance, if you're a senior engineer and an intern starts doing this to you). This is the easiest way to handle workslop. But you probably aren't in a position to have that conversation with all of your colleagues, and you certainly can't have it with everyone in your management chain.

One step above just telling a colleague to stop is to **drive them around like a coding agent**. I wrote about this in [_AI makes weak engineers less harmful_](/ai-makes-weak-engineers-less-harmful/): if a colleague is simply pasting your messages into Claude Code and sending you the outputs, you can treat them like a high-latency Slack interface to Claude Code. It won't be as good as a normal coding agent, but it'll often be better than nothing.

Another strategy is to **use AI to fight AI**. This is a good one for handling workslop from managers. You can do this in two broad ways. First, instead of carefully reading it, paste it into an LLM of your own and ask for a short list of the salient points. Second, you can sometimes simply ask an LLM for _an entire response_. In a sense, this makes you part of the problem, so I can see why some people might be uncomfortable with it. But it's more sustainable than spending ten minutes of your effort for every ten seconds of theirs.

You can also **bias toward calls or in-person meetings**. Workslop is just a special case of the general "your coworker is bad at communication" problem. One classic way of handling this that works even better on AI content is to say "hey, let's schedule some time to chat about it". This works for two reasons: first, your colleagues can't give you AI content over a call, and second, forcing people to spend a chunk of their time talking to you (i.e. to make the effort symmetrical) is a good way to filter out [predators](/predators/).

Finally, you can sometimes simply **ignore the workslop**. This is particularly true for long status updates or pull requests from outside of your organization[^2]. You don't have to respond to AI content as diligently as you would human content. You can match their lack of effort with your own: skim it, put off reading it until later (or never), and so on. If something's really important, they'll tell you in their own words.


[^1]: Technically, not all cases of sending someone AI-generated content are workslop. If the effort is not asymmetrical - if the AI user has genuinely put a lot of their own time into the content - I don't think it counts as slop, and you should just try and look past the AI style and treat it like a human message.

[^2]: Some messages - particularly reports directed at the entire organization - may not be intended to be read at all. Written artifacts can have many purposes beyond communication: evidence of effort, a reference document for later communications, a way to cover somebody's ass by proving they considered point X, something that can tick a compliance or process box, and so on. I wrote a lot more about this in [_Seeing like a software company_](/seeing-like-a-software-company/). 