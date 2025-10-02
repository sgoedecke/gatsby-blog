---
title: How to influence tech company politics as a lowly software engineer
description: --
order: 144
date: '2025-09-28'
tags: ["good engineers", "tech companies"]
---

Many software engineers are fatalistic about company politics. They believe that it's pointless to get involved, because[^1]:

- Technical decisions are often made for [completely selfish reasons](https://news.ycombinator.com/item?id=45441068) that cannot be influenced by a well-meaning engineer
- Powerful stakeholders are typically [so stupid and dysfunctional](https://news.ycombinator.com/item?id=45442587) that it's effectively impossible for you to identify their needs and deliver solutions to them
- The political game being played depends on private information that software engineers do not have, so any attempt to get involved will result in just blundering around
- Managers and executives spend most of their time playing politics, while engineers spend most of their time doing engineering, so engineers are at a serious political disadvantage before they even start

The general idea here is that **software engineers are simply not equipped to play the game at the same level as real political operators**. This is true! It would be a terrible mistake for a software engineer to think that you ought to start scheming and plotting like you're in _Game of Thrones_. Your schemes will be immediately uncovered and repurposed to your disadvantage and other people's gain. Scheming takes practice and power, and either of those things are available to software engineers.

It is simply a fact that software engineers are tools in the political game being played at large companies, not players in their own right. However, there are many ways to get involved in politics without scheming.

The easiest way is to **actively work to make a high-profile project successful**. This is more or less what you ought to be doing anyway, just as part of your ordinary job. If your company is heavily investing in some new project - these days, likely an AI project - using your engineering skill to make it successful[^2] is a politically advantageous move for whatever VP or executive is spearheading that project. In return, you'll get the rewards that executives can give at tech companies: bonuses, help with promotions, and positions on future high-profile projects. I wrote about this almost a year ago in [_Ratchet effects determine engineer reputation at large companies_](/ratchet-effects).

A slightly harder way (but one that lets you exert more power) is to **make your pet idea available for an existing political campaign**. Suppose you've wanted for a while to pull out some existing functionality into its own service. There are two ways to make that happen.

The hard way is to expend your own political capital: drum up support, let your manager know how important it is to you, and slowly wear doubters down until you can get the project formally approved. The easy way is to **allow some executive to spend their (much greater) political capital on your project**. You wait until there's a company-wide mandate for some goal that aligns with your project (say, a push for reliability, which often happens in the wake of a high-profile incident). Then you suggest to your manager that your project might be a good fit for this. If you've gauged it correctly, your org will get behind your project. Not only that, but it'll increase your political capital instead of you having to spend it.

The idea here is that organizational interest for particular kinds of project comes in waves. When it's reliability time, VPs are desperate to come up with plausible-sounding reliability projects that they can fund, because they need to go to their bosses and point at what they're doing for reliability. When the organization's attention is focused somewhere else - say, on a big new product ship - the last thing they want is for engineers to spend their time on an internal refactor that's invisible to customers.


[^1]: I was prompted to write this after reading Terrible Software's article [_Don't avoid workplace politics_](https://terriblesoftware.org/2025/10/01/stop-avoiding-politics/) and its [comments](https://news.ycombinator.com/item?id=45440571) on Hacker News.

[^2]: What it takes to make a project successful is itself a complex political question that every senior+ engineer is eventually forced to grapple with (or to deliberately avoid, with consequences for their career). For more on that, see [_How I ship projects at large tech companies_](/how-to-ship).