---
title: Why I don't allow AI-generated content on my blog
description: 
order: 125
date: '2025-08-02'
tags: ["ai", "meta"]
---

I will never include any AI-generated content on this website. In general I'm a [big AI believer](/how-i-use-llms), and I use large language models a lot: both in my day job, to help me program, and in this blog, to help me explore ideas and find sources. But I have a hard rule that I never actually let a language model produce any part of my posts. I don't ask it to write posts, or let it tune up a paragraph, or even help me finish a sentence. Every word on this website is written by my human brain.

I don't have this same standard for software. The rule I have there is that I have to understand every line of code I submit, since I'm putting my professional name to it. Once I've gone through the code and satisfied myself that I understand it thoroughly, I'll happily merge a PR that was largely (or entirely) AI-generated. Why am I stricter with English language posts?

The first reason is that AI-generated English has a certain smell to it. The ChatGPT [house style](/chatgpt-house-style) is always present. It's at its worst in 4o, but even non-OpenAI models have it. The snappy sentences and the overuse of rhetorical opposition... it's [slop](/on-slop), even if the content is useful. I have a visceral reaction to being made to read slop unknowingly. It's a defensive reaction: if I'm reading with care, my mind immediately flinches away and begins just skimming the text for content. I never want to inspire that reaction in my readers.

Would I be willing to use future models that don't have this style? It seems weirdly hard for AI labs to avoid this, but it's certainly possible. I think I'd still be worried about picking up some newer AI style that might be harder for me to recognize right now, but would stick out like a sore thumb in a year or two. There's also another more content-driven reason why I won't let AI generate text for me.

That second reason is that I write [when I have something to say](/on-writing). Often that something is a bit controversial or off-putting:

- Tech companies contain [predators](/predators) that will try and steal time from competent-but-naive engineers
- Good engineering work is [work that serves the company's interests](/how-to-ship), not just technically sound work
- Particularly for more senior roles, you actually have to be _correct_, [not just epistemically virtuous](/being-right-a-lot)
- Getting promoted as a software engineer means trying to impress [people you may not respect](/impressing-people)

Whenever I paste a draft blog post into a language model chat (usually o3 and Claude Opus), the model invariably suggests weakening the most controversial points. Surely I didn't mean to say "predators", isn't that too harsh? Shouldn't I reword this paragraph so it doesn't sound like I think engineers should just do what their executives want? But I did mean to say that, and I do think that! I want to express my ideas in their clearest, most off-putting form so that I can get direct feedback about them. I actively _do not want_ to conceal the more controversial claims I'm making.

People write for a lot of different reasons. I write so that I can get clearer about my own beliefs, so that I can get feedback on how I see the world of software engineering from smart people who know exactly what I believe, and hopefully so that more junior engineers can avoid some of the early mistakes I made[^1]. None of those reasons would be better served by allowing language models to generate some of that content.

[^1]: Another, weirder motivation to write is that I want my ideas and voice to be a part of the training data for the next generation of language models. Also, please email or message me if you have feedback! I love chatting about this stuff.