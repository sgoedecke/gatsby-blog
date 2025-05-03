---
title: Writing a tech blog people want to read
description: What I think about when I write blog posts
order: 28
date: '2025-01-10'
tags: ["writing", "meta"]
---

My blog has gotten a lot of traffic in the last few months[^1]. Here's what I think I've been doing that's working, and a few things that have been surprising to me. It's a bit self-indulgent to write a meta post like this, but that's what blogs are for.

### What I write about and why

By far the most popular things I write about are my thoughts on [how to ship projects](/how-to-ship), what makes an engineer [strong](/what-makes-strong-engineers-strong) (or [weak](/weak-engineers)), how to [navigate](/glue-work-considered-harmful) [company politics](/ratchet-effects), and so on. In general, I think the recipe for a popular post is **to have a clear opinion about working in tech that many people disagree with**. That means that people might learn something from the article (or at least that discussion about it will be lively and interesting).

I don't think people want to read opinions that aren't controversial (e.g. "unit testing is good"). I'd also avoid topics that have been rehashed a thousand times, unless you've got something new to say about them (e.g. "dynamic vs static types"). If you're just writing posts to get things clearer in your head, of course write about what you want. This is just my sense of which topics people are interested in.

I suppose you could try to exploit this by pretending to have maximally controversial opinions. But I don't think that would be very fun or very worthwhile. Tech blogs don't make any money, so there's no real value in just driving up the number of eyeballs. The real value of a technical blog is to express my own opinions as clearly and widely as possible, so either:

- I can read feedback from people who might cause me to change my mind, or
- I can encounter people who share my mindset who I can talk to/work with/etc

For me, having an actual tech job that I take seriously is essential. I get most of my ideas for blog posts by just writing down the things I'm already thinking about as a part of regular work. I don't sit in an armchair and think "what does it mean to be a strong engineer", I encounter strong engineers in my regular work and (naturally) think about what they're doing differently.

I touch on the same themes fairly regularly - the importance of being agentic and tactical, how companies value results, what makes engineers strong or weak - but I think that's fine. Coming at the same ideas from different angles typically yields new insights, and from reading comments on my posts people take a very wide array of things from them. If I ever start seeing comments like "didn't I read this post before" I'll probably change it up.

### Tone and style

I try to be as clear and casual as possible. This is largely influenced by grad school in analytic philosophy, which aims to be much more straightforward in tone than other liberal arts fields. In terms of technical writing, Dan Luu and Paul Graham's blog are more or less the kind of style I aim for. I don't know if this is particularly good or bad - I've seen many successful tech blogs with a more colourful style - but it works for me.

One thing I explicitly do differently from philosophical writing is I try not to include too many caveats. For instance, I'll say "companies reward pragmatic engineers" instead of saying "in my experience, I've seen companies reward pragmatic engineers, but every company operates differently so it's hard to say anything for sure". If you include no caveats, you'll sound too dictatorial, but including caveats all the time makes articles too awkward to read and buries your actual point. Sensible readers will know that of course you're speaking from your own experience, and other readers won't pay attention to the caveats anyway.

As part of that, I try to be as upfront as possible about the quantity and nature of my actual experience. I link my resume up the top of the blog, and I try to be concrete when I talk about years of experience or the size of a codebase. This is sometimes painful. Every popular post gets a handful of Hacker News comments being explicitly critical about the details of my career path. But since I'm writing in a fairly caveat-free style, I think it's important to not mislead people into thinking I've had 30 years of experience in all FAANG companies (instead of 10 years of experience across two big-but-not-quite-FAANG companies).

### Writing process

Writing a technical blog is a balance between writing quickly (because you don't know which ideas will resonate with people, so you shouldn't spend too much time on any one idea) and writing carefully. I like to draft posts in a separate folder and then give them at least one other pass before posting them. Right now I have seven drafts on-the-go, including this one. They're still drafts because they haven't quite come together yet: either they're literally unfinished, or when written down the idea doesn't seem interesting enough for a post.

I use Gatsby/React for my blog for purely historical reasons: at the time I was leading a project to shift [developer.zendesk.com](https://developer.zendesk.com) from a gnarly Sinatra app to a Gatsby-based static site. I wanted to get more experience with Gatsby, so that's what I picked. It's fine. I don't like how heavy it is or the build times, but the experience of writing posts and using the site is acceptable. It's deployed via Netlify. I can feel the temptation to write my own static site generator or endlessly migrate to new ones, but it's not that strong: I'm more interested in writing new posts than noodling on my blog infrastructure.

I pay a small amount for Netlify analytics. I think some kind of analytics is important, so you know which posts people are interested in (and you can follow the top referrers to read comments). 

### Audience

I write under my real name, and I try to write things that people want to read and share on sites like Hacker News. That means that people who know me and work with me read my posts. I have a lot less freedom to share identifiable details or specifics than I would have if I were writing anonymously. When I do share a story that's more identifiable, I try to make sure it's >5 years old and doesn't apply to anyone I currently work with. I also don't share interesting technical details if they could reveal too much about the company I work for. Probably in ten more years I could write some really interesting posts.

Sometimes I share my own posts on Hacker News - i.e. blogspam - but I generally just write and hope other people share posts that they find paritcularly interesting. It's important to have a RSS feed set up so that if someone likes one of your posts they can follow others without having to go and check the site. You should have that set up _before_ you write your first post that gets attention. I only set up my RSS feed after my [how to ship](/how-to-ship) post blew up, and I probably missed a bunch of potential readers because of it.

### Summary

- Try and find opinions you have that lots of people disagree with. Those are the interesting opinions others might want to read about
- Ideas should come naturally from doing actual work, not from sitting and reflecting on what a good blog post would be
- It's OK to write multiple posts about the same thing
- I deliberately don't include every caveat - good readers will know I'm only writing about my old experience; bad ones won't care anyway
- I try to be upfront about my experience so readers can judge how seriously to take what I'm saying
- Set up a RSS feed and some kind of analytics

[^1]: Concretely: ~10 posts on the HN frontpage, with one at #1 for multiple days, and a few posts with attention on lobsters and reddit. All in all, 2-3 million pageviews and a couple of thousand comments. Much less than any of the big tech bloggers, but certainly more than I've had before.