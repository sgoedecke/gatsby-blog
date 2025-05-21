---
title: Practical AI techniques for daily engineering work
description: 
order: 85
date: '2025-05-21'
tags: ["ai"]
---

Popular advice about using AI is obsessed with tools and ["magic prompts"](/magic-prompts). To me, this is like if software engineering advice was all about memorizing the right vim commands: useful, but not really getting at the [core skills involved](/beyond-prompting).

Also unlike most popular advice, this post is for people who are already competent software engineers, not less-technical people looking to vibe code a working app. They're techniques I use daily as a staff engineer at GitHub. I use Copilot for most of this stuff, but the techniques are tool-agnostic: you can use anything that exposes a chat interface.

### The "Second opinion" technique

One problem with trusting AI output in areas you're unfamiliar with is that AI will often get it wrong. Like weaker engineers, one way it often gets it wrong is by providing a technically-correct but overcomplicated or unidiomatic solution[^1]. However, if you _already have_ a working solution, there's no harm in running it by AI to see if it can identify something simpler or more idiomatic.

Even very strong engineers will sometimes miss nice solutions. But they can always recognize a nicer solution if somebody else (human or LLM) suggests it to them. Quickly copy-pasting your branch diff into your preferred AI chat only takes a moment, and doesn't require a prompt more sophisticated than "hey, how does this look?" If you get a response back that seems unhelpful, skim it and ignore it. However, some percentage of the time you'll get a response that makes you think "oh yeah, I forgot about that", and will meaningfully improve your code change.

It's important to only spend a few minutes on this. If you don't get an immediate Eureka moment, stop trying right away. Otherwise you'll be co-designing your solution with AI - which could be a useful thing to do sometimes, but it's a completely different technique of AI use.

I don't recommend using existing code review tooling for this. In my experience, code review tooling is primarily designed to catch subtle bugs and suggest line-level refactors, but what I'm suggesting here is more of a high-level gut check. It's useful not just on code changes, but also on architecture plans, debugging notes, or any kind of technical work product.

### The "Throwaway debugging scripts" technique

When it comes to making code changes in large programs, current-generation AI is nowhere near as strong as a strong engineer. However, AI is much better than strong engineers at writing very short programs: in particular, it can produce ten to thirty lines of straightforward mostly-working code faster than any engineer.

How can you leverage this? There's not much demand for this kind of program in the day-to-day of a normal software engineer. Usually code either has to be a modificaton to a large program, or occasionally a short production-data script (such as a data backfill) where accuracy matters a lot more than speed. But the ease of creating short programs unlocks many new possible use-cases, just as the ballooning availability of compute during the 90s and 2000s did for software in general.

The main new use-case for this capability is **debugging**. I don't think a lot of engineers appreciate just how easy it is. For instance, I was recently setting up a new Elasticsearch index for the first time, and I was trying to figure out why a complex query wasn't returning the results from my new index. GPT-4o immediately produced a long script that ran sub-parts of my query in order to narrow down what specific condition was ruling out my results. This is more or less what I would have done by hand, but it turned ten minutes of fiddling around and running `curl` commands into thirty seconds of copy-pasting a script.

A key precondition for this kind of work is having _some_ understanding of the problem. If you're totally lost, you won't be able to interpret the results of the script or even articulate the exact kind of debugging script you want[^2]. This strategy works best when it's automating the debugging steps that you were planning to do manually.

### Other techniques

Here are some more techniques that I use. They aren't as important as getting a second opinion or writing throwaway code, but I wanted to quickly mention them.

**Finding evidence for things you already know.** Strong engineers are often in a situation where they need to publicly justify some position, and it can be really useful to cite third-party studies or evidence. Any LLM with search (especially Deep Research style tools) are great for this. You could just use Google, but it's quicker to let the model google it for you.

**Plugging technical gaps when you're outside your area of expertise.** For large projects, it's common to have to write some small piece that you're not particularly confident about (for instance, maybe your service needs a new nginx config block). LLMs can take you from zero to "strong junior" immediately. Just make sure you get your change reviewed by someone who's actually familiar with the area.

### Summary

This post is a kind of companion piece to a [previous post](/how-i-use-llms) I wrote about how I use LLMs day-to-day. Here I'm trying to pull out some reusable techniques as well. You may also be interested in [this post](/ai-security) about the security aspects of programming with AI, or my AI [posts](/tags/ai/) in general.

Using large language models to give a quick **second opinion** is a good technique for experienced engineers using AI. Because you've already spent the time solving the problem, you're able to quickly assess the quality of the output, and it can occasionally throw up really significant improvements.

Language models also excel at writing **throwaway debugging scripts**. Because the code is never going to be merged, it doesn't matter if it follows the conventions of the codebase (which AIs are bad at). If you already know what debugging steps you're planning to take, AI can reliably save you tens of minutes by generating the code for you.

I also find LLMs useful to gather evidence for internal company posts when I'm trying to persuade people, and to help me out when I'm making small changes outside my area of expertise, but in my view those are more "helpful use cases" than "techniques".


[^1]: For instance, it recently suggested that I read a request body and parse the encoded form data structure by writing some Rails backend code, instead of setting a json `Content-Type` header on the request (which would have handled it automatically).

[^2]: Trying anyway might still be useful, but it's not the approach I'm recommending here.