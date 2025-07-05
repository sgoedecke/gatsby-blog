---
title: Building tiny AI tools for developer productivity
description: 
order: 107
date: '2025-07-05'
tags: ["ai"]
---

The two current paradigms of AI app development are **agentic coding** (using an AI to help you write your ordinary line-of-business code faster) and **building AI apps for mass consumption** (working on the next Lovable or Character.ai). There's no shortage of useful things written about either of those tasks. However, there's a third way to work with AI that I think is underrated: building tiny AI-driven programs.

Unlike the first two paradigms, this is not going to make you rich. It's not the next industry-defining "killer app". It's the AI equivalent of the ordinary scripting and alias-writing that software engineers have been doing forever, except applied to repetitive text-heavy workflows. Any areas where you're already using AI chat are good candidates for automation in this way.

## Standup reports

Here's an example. This weekend I built [gh-standup](https://github.com/sgoedecke/gh-standup), a GitHub CLI extension to help me write my standup reports. If you have the GitHub CLI installed, like I do, it's very easy to use:

```
gh extension install sgoedecke/gh-standup
gh standup
```

I've played around with previous standup-generating scripts before. The fundamental design is pretty easy - make a bunch of GitHub API calls to pull your history, then display the data - but my previous attempts haven't been very useful because I don't like reading through individual commits. If I have to scan through them to figure out the gist of what I did, I may as well just close my eyes and try to remember. Feeding it through a simple AI prompt changes that. And since it's just for me, I can iterate on the prompt how I want.

## Weekly rollups

Let me describe another example I built last year (I can't share the source for this one, unfortunately, but it's [along these lines](https://docs.github.com/en/github-models/github-models-at-scale/use-models-at-scale#example-use-github-models-with-github-actions-to-summarize-issues)). GitHub is an async-first company, so we do a lot of written communication. There's a concept (that I'm sure isn't unique to GitHub) called rollups, where individual engineers put updates on their issues, then a project lead collates them into a project update on that issue, then a manager collates all the project updates into a team update, and so on up the org chart.

This process - of going through the individual updates and merging them into a shared one - is largely mechanical. You can spend a lot of time doing this if you're an engineer or engineering manager. Spending a few days putting together a weekly GitHub Action to do this with an AI prompt saved a lot of time across the team. It was the kind of thing where if it broke, my manager would DM me about it within the hour[^1].

This isn't a billion dollar company idea. Each company handles internal communication differently, and much of the work here is parsing the specific tags and tools to fetch the summary content. The actual implementation work is almost too simple to try and sell. But it's work that's really valuable to do inside your own team.

## Final thoughts

The job of software engineering requires a lot of thinking. But not all of that thinking is equal: some of it is executive, where you exercise fine judgement and decide what to do, and some of it is mechanical, where you do the kind of parsing-and-summarizing work that an AI model could do pretty well. For the first time, it's now possible to automate some of that.

Some of these use cases are going to get absorbed into popular apps and tooling. But some of them will remain too niche or too unprofitable to be worth selling at scale. As software engineers, we're in the position to build those ourselves, for our own specific use cases.

As more engineers build these tiny AI tools, we'll develop new patterns that make this kind of automation even easier. In parallel, freely available models will continue to become more capable. Five years from now, I bet many common organizational tasks will be entirely automated.

[^1]: As a side note, if you're wondering how you can tell whether a piece of internal automation is valuable - that's how.