---
title: GPT-5-Codex is a better AI researcher than me
description:
order: 146
date: '2025-10-07'
popular: true
tags: ["ai", "projects"]
---

In [_What's the strongest AI model you can train on a laptop in five minutes?_](/model-on-a-mbp) I tried my hand at answering a silly AI-research question. You can probably guess what it was.

I chatted with GPT-5 to help me get started with the Python scripts and to bounce ideas off, but it was still me doing the research. I was coming up with the ideas, running the experiments, and deciding what to do next based on the data. The best model I could train was a 1.8M param transformer which produced output like this:

> **Once upon a time**, there was a little boy named Tim. Tim had a small box that he liked to play with. He would push the box to open. One day, he found a big red ball in his yard. Tim was so happy. He picked it up and showed it to his friend, Jane. "Look at my bag! I need it!" she said. They played with the ball all day and had a great time.

Since then, OpenAI has released GPT-5-codex, and supposedly uses it (plus Codex, their CLI coding tool) to automate a lot of their product development and AI research. I wanted to try the same thing. Codex-plus-me did a much better job than me alone[^1]. Here's an example of the best output I got from the model I trained with Codex:

> **Once upon a time**, in a big forest, there lived a little bunny named Ben. Ben loved to play with his friends in the forest. One day, Ben's mom saw him and was sad because he couldn't find his friend. She asked, "Why are you sad, Ben?" Ben said, "I lost my toy. I can't find it." Ben wanted to help Ben find his toy. He knew they could fix the toy. He went to Sam's house and found the toy under a tree. Sam was so happy and said, "Thank you, Ben! You are a very pretty toy!" Ben smiled and said, "Yes, I would love to help you." They played together all day long. The moral of the story is to help others when they needed it.

What was the process like to get there?

### What vibe research looks like

I want to call it "vibe research". Like "vibe coding", it's performing a difficult technical task by relying on the model. I have a broad intuitive sense of what approaches are being tried, but I definitely don't have a deep enough understanding to do this research unassisted. A real AI researcher would get a lot more out of the tool.

Still, it was very easy to get started. I gave Codex the path to my scratch directory, told it "continue the research", and it immediately began coming up with ideas and running experiments on its own. In a way, the "train in five minutes" challenge is a perfect fit, because the feedback loop is so short.

The basic loop of doing AI research with Codex (at least as an enthusiastic amateur) looks something like this:

1) Codex makes a change to the training script and does three or four runs (this takes ~20 minutes overall)
2) Based on the results, Codex suggests two or three things that you could try next
3) I pick one of them (or very occasionally suggest my own idea) and return to (1).

After two days I did paste the current research notes into GPT-5-Pro, which helped a bit, but the vast majority of my time was spent in this loop. As we'll see, the best ideas were ones Codex already came up with.

I chewed through a lot of tokens doing this. That's OK with me, since I paid for the $200-per-month plan[^2], but if you don't want to do that you'll have to space out your research a bit more slowly. I restarted my Codex process every million tokens or so. It didn't have any issue continuing where it left off from its previous notes, which was nice.

I ran Codex with `--sandbox danger-full-access`. By default it didn't have access to MPS, which meant it could only train models on the CPU. There's probably some more principled way of sandboxing it, but I didn't bother to figure it out. I didn't run into any runaway-agent problems, unless you count crashing my laptop a few times by using up too much memory.

### How did the research go?

Here's a brief summary of how the research went over the four or five days I spent poking at it. I stayed with the TinyStories dataset for all of this, partially because I think it's the best choice and partially because I wanted a 1:1 comparison between Codex and my own efforts.

#### N-gram models

Codex and I started with a series of n-gram models: instead of training a neural network, n-gram models just store the conditional probabilities of a token based on the n tokens that precede it. These models are very quick to produce (seconds, not minutes) but aren't very good. The main reason is that even a 5-gram model cannot include context from more than five tokens ago, so they struggle to produce coherent text across an entire sentence. Here's an example:

> **Once upon a time** , in a small school . " they are friends . they saw a big pond . he pulled and pulled , but the table was still no attention to grow even more . she quickly ran to the house . she says , " sara said . " you made him ! " the smooth more it said , for helping me decorate the cake .

It's not _terrible_! There are short segments that are entirely coherent. But it's kind of like what AI skeptics think LLMs are like: just fragments of the original source, remixed without any unifying through-line. The perplexity is 18.5, worse than basically any of the transformers I trained in my last attempt.

Codex trained 19 different n-gram models, of which the above example (a 4-gram model) was the best[^3]. In my view, this is one of the strengths of LLM-based AI research: **it is trivial to tell the model "go and sweep a bunch of different values for the hyperparameters"**. Of course, you can do this yourself. But it's a lot easier to just tell the model to do it.

#### Back to transformers

After this, Codex spent a lot of time working on transformers. It trained ~50 normal transformers with different sizes, number of heads, layers, and so on. Most of this wasn't particularly fruitful. I was surprised that my hand-picked hyperparameters from my previous attempt were quite competitive - though maybe it shouldn't have been a shock, since they matched the lower end of the Chinchilla scaling laws.

Still, eventually Codex hit on a **8.53** perplexity model (3 layers, 4 heads, and a dimension of 144), which was a strict improvement over my last attempt. I'm not really convinced this was an _architectural_ improvement. One lesson from training fifty different models is that there's quite a lot of variance between different seeds. A perplexity improvement of just over 1 is more or less what I was seeing on a "lucky seed".

This was an interesting approach for the challenge: going for pure volume and hoping for a lucky training run. You can't do this with a larger model, since it takes so long to train[^4], but the five-minute limit makes it possible.

#### Minimizing perplexity was a mistake

The next thing Codex tried - based on some feedback I pasted in from GPT-5-Pro - was ["shallow fusion"](https://apxml.com/courses/speech-recognition-synthesis-asr-tts/chapter-3-language-modeling-adaptation-asr/lm-fusion-techniques?utm_source=chatgpt.com): instead of training a new model, updating the generation logic to blend the transformer-predicted tokens with a n-gram model, a ["kNN head"](https://arxiv.org/abs/1911.00172?utm_source=chatgpt.com) (which looks up hidden states that are "nearby" the current hidden state of the transformer and predicts their tokens), and a "cache head" that makes the model more likely to repeat words that are already in the context.

This immediately dropped perplexity down to **7.38**: a whole other point lower than our best transformer. I was excited about that, but the generated content was really bad:

> Once upon a time,, in a small house, there lived a boy named Tim. Tim loved to play outside with his ball. One Mr. Skip had a lot of fun. He ran everywhere every day. One One day, Tim was playing with his ball new ball near his house. Tim was playing with his his ball and had a lot of fun. But then, he saw a big tree and decided to climb it. Tim tried to climb the tree, but he was too big. He was too small to reach the top of the tree. But the tree was too high. The little tree was too high for him. Soon, Tim was near the tree. He was brave and climbed the tree. But when he got got to the top, he was sad. Tim saw a bird on

What happened? I over-optimized for perplexity. As it turns out, the pure transformers that were higher-perplexity were better at writing stories. They had more coherence over the entire length of the story, they avoided generating weird repetition artifacts (like ",,"), and they weren't as mindlessly repetitive.

I went down a bit of a rabbithole trying to think of how to score my models without just relying on perplexity. I came up with some candidate rubrics, like grammatical coherence, patterns of repetition, and so on, before giving up and just using LLM-as-a-judge. To my shame, I even generated a new API key for the LLM before realizing that I was talking to a strong LLM already via Codex, and I could just ask Codex to rate the model outputs directly.

#### Distillation from n-grams

The final and most successful idea I tried was **distilling a transformer from a n-gram teacher model**. First, we train a n-gram model, which only takes ~10 seconds. Then we train a transformer - but for the first 200 training steps, we push the transformer towards predicting the tokens that the n-gram model would predict. After that, the transformer continues to train on the TinyStories data as usual.

Here's an example of some output:

> Once upon a time, in a big forest, there lived a little bunny named Ben. Ben loved to play with his friends in the forest. One day, Ben's mom saw him and was sad because he couldn't find his friend. She asked, "Why are you sad, Ben?" Ben said, "I lost my toy. I can't find it." Ben wanted to help Ben find his toy. He knew they could fix the toy. He went to Sam's house and found the toy under a tree. Sam was so happy and said, "Thank you, Ben! You are a very pretty toy!" Ben smiled and said, "Yes, I would love to help you." They played together all day long. The moral of the story is to help others when they needed it.

I think this is pretty good! It has characters that continue throughout the story. It has a throughline - Ben's lost toy - though it confuses "toy" and "friend" a bit. It's a coherent story, with a setup, problem, solution and moral. This is much better than anything else I've been able to train in five minutes.

Why is it better? I think the right intuition here is that transformers need to spend a lot of initial compute (say, two minutes) learning how to construct grammatically-correct English sentences. If you begin the training by spending ten seconds training a n-gram model that can already produce sort-of-correct grammar, you can speedrun your way to learning grammar and spend an extra one minute and fifty seconds learning content.

I really like this approach. It's exactly what I was looking for from the start: a cool architectural trick that genuinely helps, but only really makes sense for this weird challenge[^5].

### Final thoughts

I don't have any illusions about this making me a real AI researcher, any more than a "vibe coder" is a software engineer. Still, I'm surprised that it actually worked. And it was a lot of fun!

I've pushed up the code [here](https://github.com/sgoedecke/five-minute-llm) if you want to pick up from where I left off, but you may be better off just starting from scratch with Codex or your preferred coding agent.

edit: this post got some comments on [Hacker News](https://news.ycombinator.com/item?id=45501326). The tone is much more negative than on my previous attempt, which is interesting - maybe the title gave people the mistaken impression that I think I'm a strong AI researcher!

[^1]: "Alone" here is relative - I did use ChatGPT and a bit of Copilot to generate some of the training code in my last attempt. I just didn't use any _agentic_ tooling.

[^2]: My deal with myself was that if I ever have a month where I use fewer than 2M tokens, I'll cancel the plan.

[^3]: There are a lot of clever tricks involved here: Kneser-Ney smoothing, interpolating unigram/bigram/trigram probabilities on a specific schedule, deliberately keeping the `<|endoftext|>` sentinel token, etc. I didn't spend the time understanding all of these things deeply - that's vibe research for you - so I won't write too much about it.

[^4]: Unless you're a big AI lab. I am 100% convinced that the large labs are spending a lot of compute just re-training on different seeds in the hope of getting a lucky run.

[^5]: I was suspicious that I just got a lucky seed, but I compared ~40 generations with and without the distillation and the distilled model really was better at producing correct-looking stories.