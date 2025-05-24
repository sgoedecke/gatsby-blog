---
title: How does ChatGPT work? What is AI, really?
description: 
order: 87
date: '2025-05-24'
tags: ["ai", "explainers"]
---

How does AI work? Since 2022, it's been possible to have a conversation with a computer: first with ChatGPT 3.5, and now with a variety of AI models from multiple companies. AI can answer your questions, write letters or essays, code for you, and so on. In some areas it's superhuman - for instance, it can write a short working program faster than any person could - but in other areas it makes mistakes that a child would catch. Many top AI models struggle with questions like "count the number of 'r's in 'strawberry'", or "is 9.11 greater than 9.5?" What explains this weird variance in ability?

I'm going to pitch this explanation at the level of an intelligent person with no technical background: no jargon, no mathematics. If you want an explanation pitched for a software engineer, try my [other posts about AI](/tags/ai).

### AI models only predict the next word

An AI model is the thing you're talking to when you talk to ChatGPT. Like a human, it takes as an input some text (for instance, the message you send it), and outputs some more text (the response it sends you back). People have been producing AI models for decades, but only since 2022[^1] have they been "smart enough" to actually understand and talk in human language.

AI models are built by engineers, but they're not normal computer programs: they're not hand-made with a set of pre-baked rules. Instead, they're "trained". That means they start out "empty", and then millions of sentences are fed into them. With each sentence, they grow a little bit smarter, until eventually they can output sentences themselves.

How does this work? A model starts out as an assemblage of billions of random numbers, called the "weights". You can think of these numbers as the knobs and dials of a very complicated, multi-purpose machine. If you have the billions of knobs and dials set the exact right way, it can do almost anything. How do you figure out which way to set them (i.e. what the weights should be)? That's what training is. As you feed in each word[^2] in each sentence, you ask the model to predict what the next word should be. If it gets it wrong, you change all the weights a little bit. If it gets it right, you keep the weights the same[^3]. Early on in training, the model gets almost everything wrong. But over time it gets better and better, and after many millions of sentences it ends up quite good at predicting the next word in the sentence.

Now we can articulate exactly what an AI model is doing (in fact, the _only_ thing an AI model is doing). **Given some existing words, AI models predict the next word.**

### How does that add up to something you can talk to?

That's it! By itself, it seems kind of basic. How does that add up to something you can actually talk to? Well, when you go and talk to ChatGPT, it has a bunch of pre-written text in the conversation (called the "system prompt"). It might look something like this[^4]:

> You are a helpful AI assistant called ChatGPT. You take the "assistant" parts in this conversation.
> User: [whatever first message you've sent, e.g. "Hi"]
> Assistant: 

If you were predicting the next word in that text, it would probably be something like "Hello". ChatGPT predicts the same way you do, which is why when you say "Hi" it says hi right back. If your first message instead was "Where is Paris?", the next word would instead probably be something like "Paris" (and then "is", "in", "France", and so on). When you talk to ChatGPT, the messages you're seeing are whatever is filled into those "User:" and "Assistant:" parts.

Note that the model is _talking like a person_ without _actually having a personality_. If the pre-written text said "You are an angry pirate", it would predict the content of the "Assistant:" parts very differently[^5]. The apparent personality of ChatGPT is in large part the result of the pre-written text. In practice, this pre-written text can be many hundreds of words, with lots of specific instructions and context for the model.

### Hallucinations

This is why AI makes up facts. ChatGPT has a lot of sentences in its training data about Lionel Messi. If it's asked to pick the next word in the sentence "Messi plays"[^6], it'll probably pick "soccer" instead of "cricket", because it's seen "Messi" and "soccer" together in hundreds of thousands of pieces of its training data. That means that in practice, ChatGPT "knows" that Messi plays soccer. But if instead it's completing the sentence "Messi's childhood pet was a", it might not have that in its training data. In that case, it'll **still pick the next likeliest word**, because that's what it _always_ does. Maybe it'll say "dog", because it's been trained on a lot of sentences about pet dogs. 

It's popular to call this a "hallucination". From a human, it would certainly seem like one. But from ChatGPT's perspective, it's not really doing anything different than when it says "Messi plays soccer". In both cases, it's picking what it thinks the next most likely word is - it's just that in one case that happens to be correct, and in the other case it happens to be false.

When a human doesn't know something, they might be vague or evasive. When ChatGPT doesn't know something, it often speaks with the same perfect confidence and detail as it does about everything. For instance, if it makes up a fake citation for a source, it'll be a real-sounding paper name with a real-sounding author. If you then ask it for more details, it'll happily continue to make stuff up - because it's just predicting the next words that a helpful AI might say in response, and it doesn't know the difference between a correct word and a false word.

Current AI models will sometimes tell you that they don't know something instead of making stuff up. There are lots of clever tricks that go into making that work. But they'll all _sometimes_ hallucinate at you, because that's just a fundamental part of how AI models work.

### The power of predicting the next word

If AIs can't distinguish truth from fiction, and will occasionally make up facts out of thin air, why are people excited about them? Why can they do some things that seem genuinely difficult (such as [identifying the location of a blurry photo](https://simonwillison.net/2025/Apr/26/o3-photo-locations/), or out-performing almost all humans at [competitive programming](https://codeforces.com/blog/entry/134002))?

The central insight here is that **being good at predicting the next word requires understanding how the world works**. To put it slightly differently, next-word-prediction is a much more fundamental skill than it appears to be. If you can make a model that's very good at that, your model will be very good at a whole bunch of real-world tasks.

Why is that? As a trivial example, consider simple language-based physics problems. If ChatGPT can complete the sentence "if I put a grape in a sealed box, then put the box on a table, then knock the table over, the grape is now", then ChatGPT has to have some kind of mental model of how physical objects work in the real world. It learned that model from language alone, but that still counts. It's no different from how I have a model for how black holes work despite having only read about them.

The surprising power of AI is a demonstration of the power of human language. ChatGPT really can understand more about the world by just being trained on a lot of text. Maybe "understand" isn't the right word - certainly it's different from how humans understand things - but as a user of AI it amounts to much the same thing. 

### Summary

- All ChatGPT does is predict the next word, given a bunch of previous words
- A pre-written preface makes it seem like someone you can talk to
- It does this by being trained on millions and millions of existing sentences
- If you're asking it about something in its training data, it will probably be correct
- Otherwise it'll confidently hallucinate - so be careful about relying too heavily on ChatGPT for facts!
- This "one trick" is much more powerful than it seems, because completing sentences requires building a functional model of how the world works

If you're interested in how much water AI uses, you might want to read [this post](/water-impact-of-ai) I wrote. If you're interested in the moral arguments against AI in general, I cover those [here](/is-ai-wrong)

[^1]: If you're wondering what changed, it began with [this insight](https://en.wikipedia.org/wiki/Attention_Is_All_You_Need). (Probably there were models internally available at AI labs that could do this in 2019, they just weren't available to the general public.)

[^2]: Models don't actually learn in words, they learn in "tokens", which include words, punctuation, and some sub-word parts (e.g. the word "strawberry" might be decomposed into the tokens "stra", "w" and "berry"). Which set of tokens to pick is itself an open research problem, but in theory you could train a model on individual letters alone if you wanted to.

[^3]: You're not changing all the weights the same amount - weights that were most involved in generating the word get updated more strongly.

[^4]: In practice, the "User:" and "Assistant:" stuff is not directly part of the system prompt, it's "trained into" the model directly. But it amounts to much the same thing.

[^5]: This is not the whole truth. Current models have personality "trained into them", to some extent, via techniques like [this](https://en.wikipedia.org/wiki/Reinforcement_learning_from_human_feedback).

[^6]: Possibly because you asked it "what sport does Messi play?", and it's already generated "Messi" and "plays" in response.