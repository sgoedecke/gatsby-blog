---
title: Building intuitions
description: 
order: 78
date: '2025-05-08'
tags: ["tech companies"]
---

Whenever a new piece of technology comes out (these days, mostly AI) I go to some effort to understand it. Usually I end up writing [a post](/tags/explainers) about it, so I can be confident that I do understand: partly because the act of writing is useful for clarifying my thoughts, and partly because producing a written artifact means I can trivially ask o3 "hey, what did I miss?".

What's the point of doing this? And what kind of understanding am I aiming for here? Obviously my explainers about [diffusion models](/diffusion-models-explained) aren't detailed enough to do useful research on diffusion models. What are they for, then?

In my view, **good engineering requires having broad intuitions about how things work**. That doesn't mean a _full understanding_ of how things work, or even a good enough understanding to work usefully in that area of the stack. But you should try to minimize the number of items that are purely black boxes.

### Database indexes

Let me give an example that isn't about AI. If you've done any kind of web development, you rely heavily on database indexes. For some engineers, these are black boxes. All they know is _what they do_: specifically, that if you set up the right kind of index, you can turn very slow queries into very fast ones. Sometimes they've learned some more rules of thumb, such that you should avoid having too many unused indexes.

Instead of learning rules of thumb, you should instead learn at a very high level what an index is: essentially a large dictionary that maps some combination of column values to the location on-disk where the full record is stored. This is not good enough to let you _implement_ a database index. But it's very useful when you're _using_ a database index. From that definition, you can conclude:

1. That without an index, the database is forced to iterate over every single record in the table to satisfy your query (unless your query explicitly sets a `LIMIT` on records returned)
2. That an index is only useful if it matches the actual query your application is making. If you index on "name plus email" and then start querying on "name plus address", your index won't be used and you're back to the full table scan described in (1)
3. That indexes massively speed up reads, but must slow down database writes and updates, because each change must also be made again in the index "dictionary"

I don't think it's necessarily useful to go deeper than this, unless you're actively maintaining a database. You _could_ learn about the data structures that represent the index, about how they're stored on-disk and in-memory, about all the tricks that go into updating them efficiently, and so on. All that stuff is very interesting. But it will very rarely inform the database migration or query you're writing.

### Large language models

At GitHub, I work with large language models every day. I've worked on the Copilot side of things, and now I work on [GitHub Models](https://docs.github.com/en/github-models), where we're actually exposing language model inference directly via our API. It has been very useful to understand what language models actually are, and I've spent a lot of time doing that (coding LLM inference from scratch in [Javascript and Ruby](/porting-and-hacking-llama2), for instance).

As one example of how it's been useful, some time ago I implemented a "json output" mode for the Models [playground](https://github.com/marketplace/models). It slightly surprised me to learn that although almost every model in the catalog technically supported json output, the smaller ones did not support it _well_. Specifically, when json mode was enabled, the smaller models would sometimes get stuck and endlessly output `\n` after a few characters of valid json.

However, that behavior is actually predictable. Language models do not directly output words (or tokens). Instead, they output the entire set of probabilities over all possible tokens every time, and a simple function (called a sampler) selects a token from that set - for instance, by picking the token with the highest probability. When a model supports json output, what that typically means is that **the _sampler_ can be told to only select tokens that continue a valid json string**.

For instance, when picking the first token in the model response, the sampler will only pick from `\n`, `{` or `[`. This works great for large models or models trained on a lot of json. After a few tokens, they "get the idea" that they're outputting json and do most of the work themselves. But small models don't really understand json, so they might think `\n` is more likely than a token like `[`. Once they've outputted a couple of `\n` characters, that makes them even more likely to output more. So you end up in a loop where the model prefers to keep spitting out new lines than to try and continue the json string.

It was useful to understand the problem at this level of detail, because it let me conclude:

1. Some small models will just never be able to reliably output json unprompted - this isn't a bug in the setup, but a feature of the actual technology
2. Even so, you could probably get those small models to do it by prompting them with some sample json, so it's in the context
3. Just because a _sampler_ supports a strategy doesn't mean it plays nicely with the actual model

We ended up supporting json mode for most models via the API, but not giving a UI option for it except for models that were smart enough to output json effectively. That way we don't confuse people who aren't familiar with the points above and just want to try the LLMS out, while still letting developers have control over what they're building with the models.

### Where do you draw the line?

If a basic understanding of how technologies work is helpful when you're writing software on top of them, would a full understanding be even more useful? Maybe!