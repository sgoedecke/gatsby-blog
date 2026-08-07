---
title: How to keep thinking
description:
order: 220
date: '2026-08-07'
tags: ["ai"]
---

Imagine you're the guest on some kind of frenetic, software-engineering-themed game show. The host is constantly flipping over new cards with questions that you have to answer as fast as possible:

- Is this adjustment to the database schema right?
- Do these bits of data look plausible?
- Do these five paragraphs of text describe an actual series of manual tests that took place?
- Does this suggested architecture pass the smell test?
- Is this implementation better than the current code? Or this one? Or this one?

Working in 2026 feels a bit like this. When frontier AI models can do most of the tasks in your queue, the most efficient way to work is often spinning off tasks for an AI agent and continually context-switching between the results[^1]. This isn't _quite_ mindless - in fact, it requires quite a lot of skill to skim the AI response and rapidly decide what to do with it - but it certainly involves less time for slow, careful reflection.

### Why not slow down?

Why does it have to be frenetic? Why not just slow down? I suppose you _could_, but I don't recommend it. **It's just such a miserable experience to spend your day close-reading LLM output**: carefully chewing and savoring each morsel of slop. It's far less unpleasant to skim through quickly and pick out the useful nuggets of content.

Couldn't you simply do more of the work by hand? It's unfortunately true that [tech is high-pressure these days](/good-times-are-over/). If you've got the time and space to work more slowly, that's great! But when your company gives you a "solve this task ten times more quickly" button, you are heavily incentivized to use it as much as possible, or risk being outcompeted by your peers.

I sometimes worry that working with LLMs is making me dumber. Not in the "literally melting your brain" sense that some [papers](/your-brain-on-chatgpt/) [imply](/how-does-ai-impact-skill-formation/), but in the sense that it's biasing me towards the quick "skimming and judging" parts of my mental toolkit and away from the slow ["hammock time"](https://www.youtube.com/watch?v=f84n5oFoZBc) needed for deep thought and real creativity. I don't want to attribute this shift entirely to LLMs, since the post-2010s tech industry has become more frenetic for [broader economic reasons](/good-times-are-over/). But either way, it's got me wondering how I can keep [thinking](/you-dont-have-to-be-smart-if-you-think-clearly/) [slowly](/thinking-clearly/).

### To keep on thinking, read and write

The main thing that's worked for me is to write more. Specifically, I mean **writing in my own words**. Writing with an LLM does not work for this at all, even if you're going to some effort to iterate on the content and outline the things you want to say. Why? Having to put the words together yourself forces you to articulate your thoughts. In a very real sense, it forces you to _think_.

When you have an idea in your head for something to write, you don't really have an idea. What you have is a kind of directional sense of where an idea might be, or a fragment of the kind of thing that might eventually become an idea. You construct the idea itself while writing. Incidentally, this is why I don't really agree with ["ideas are easy, execution is everything"](https://www.goodreads.com/quotes/9292714-ideas-are-easy-execution-is-everything)[^2]: most "ideas" are not really even ideas.

The other thing I recommend is to **read actual books**. Books - particularly dense non-fiction books - are the antithesis of AI slop. The slower you can read them, the better. I've been reading more and more non-fiction in the last few years, and I don't think it's a coincidence. I think my brain is naturally craving information-dense content, in the same way that sodium-deficient people [start to crave salt](https://pmc.ncbi.nlm.nih.gov/articles/PMC4433288/).

In fact, I've been combining the two approaches: reading a book and then [writing about it](/tags/book%20reports/). This process is _exactly_ what I've been craving since I started programming with LLMs. I get to carefully read a book, think hard about it, often go and read another book or two on the same topic, then sit and try to articulate what I've learned. It's great! I can feel parts of my brain stretching again.

### Don't lose the habit

It was pretty nice when I got paid to use those parts of my brain all day. Unfortunately, I think [those times are coming to an end](/software-engineering-may-no-longer-be-a-lifetime-career/). There will always be room for _some_ amount of careful, slow reflection in software engineering, but (for at least a little while) we'll be expected to be rapidly switching between LLM outputs. We may have to find ways outside of work to continue the habit of thinking slowly. 

Even just in terms of work, I think losing that habit entirely would be a big mistake. There are still plenty of ordinary problems that are too hard for current LLMs to solve on their own. The most common example I run into is "large refactor on a complicated codebase". Current-generation LLMs can do this without (many) errors, but they can't yet do it _tastefully_. Sometimes you need to be able to think a problem through entirely with your own brain. 



[^1]: This doesn't mean switching between _tasks_. I routinely use six or seven different agent sessions on the same task: one for exploration, two or three for trying out different implementations, two or three for review, one for manual testing, and so on. Many of these can proceed in parallel.

[^2]: I remember reading a story[^3] about a well-known author. Someone wanted to tell him their book idea, but they were so protective of it that they forced him to first sign a NDA before they retrieved the idea from their office safe. It was a single word "bioweapons" written on a slip of paper.

[^3]: Ironically, when I tried to google the source, Gemini kept trying to write me a story about bioweapons. 