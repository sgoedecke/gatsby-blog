---
title: Low-hanging fruit in tech companies
description: 
order: 132
date: '2025-08-24'
tags: ["good engineers", "software design"]
---

Suppose your job is to pick fruit in a giant orchard. The orchard covers several hills and valleys, and is big enough that you'd need a few weeks to walk all the way around the edge. What should you do first?

### What is low-hanging fruit?

Like a good engineer, you might reduce this to an optimization problem: in order to harvest the most amount of fruit possible, you should maximise the quantity of fruit you get from each individual tree. Just by walking up to a tree, you estimate you can get about thirty percent of the fruit by standing on your tiptoes, but most of the fruit is higher than you can reach. You start by building a tall ladder so you can pick fruit from the highest branches, which ups your yield percentage to ninety percent. But some fruit is out wide as well as high up, on branches too flimsy to lean a ladder against. So you design a picker arm that lets you reach out sideways to pick more fruit. This ups your yield to ninety-five percent, but the arm isn't perfect - there's fruit that's awkward to reach, or that clings to the tree too tightly for the arm to pluck it off. You tweak your picker arm design, incrementally improving your yield. After a lot of work you triumphantly achieve ninety-eight percent.

Meanwhile, some other joker has wandered off into a nearby valley, where the trees have ten times as much fruit on them, and has come out with three times as much fruit as you just by mindlessly picking what they could reach.

The obvious moral is that **you should try to pick the low-hanging fruit**. Setting aside the metaphor, you should try to spend your time doing the kind of work that delivers the most value for the least amount of effort. At a tech company, the value of work is highly variable[^1]. Some engineers spend weeks of hard work for the same amount of value as other engineers deliver in half an hour. This is not an exaggeration - I have seen this happen more times than I can count.

### Low-hanging fruit at tech companies

But how do you actually do that? The easiest way is to **listen for what the company is telling you**. Companies usually have a small set of active priorities at any given time. Working on those priorities is typically very highly leveraged, because you have the entire momentum of the company behind you. As a concrete example: shipping some polish on an old established feature might at best deliver some incremental value, but shipping the same polish on a brand-new high-profile feature might determine whether the feature succeeds or fails. 

However, there's also lots of low-hanging fruit from a technical perspective. I have spent a lot of time in my career speeding up endpoints and page loads. It's one of my favourite things to do[^2]. The same principle applies here: many engineers spend a lot of time shaving 5ms off a page load by micro-optimizing asset sizes or extracting logic into a cached code path, when another page (or even the same page) spends 200ms in an un-indexed database query.

**When you're trying to optimize, you should take as wide a view as possible.** Don't stop when you see the first thing that looks slow. Scan through the whole thing, taking notes as you go, in case you see something that looks even worse later on. Most code paths (more on this later) will have multiple areas you could optimize if you wanted to. Picking the low-hanging fruit means starting with the worst bit.

### Profiling and metrics

If you can, **profile before optimizing**. I like to use [flamegraphs](https://www.brendangregg.com/flamegraphs.html) where possible: visualizations of the call stack where the initial caller sits at the bottom and the stack extends vertically.

![cpu](cpu-mysql-updated.svg)

The huge benefit of this approach is that you can just see which operations are taking the most time. When you can generate a flamegraph, low-hanging-fruit optimization becomes almost a mechanical process: take the longest span that originates from your own code (i.e. not from libraries or frameworks), see how much quicker you can make it, then move to the next longest span and repeat.

However, bear in mind that flamegraphs can be misleading. They only give you the data for a single request. Sometimes the lowest-hanging fruit only occurs in a subset of requests (i.e. for customers with lots of records in your system, or when a cache miss occurs for a particular internal API). To catch cases like these, **you should pay attention to metrics**. Specifically, p95 and p99 request duration metrics, which means metrics that track how slow your slowest 5% or 1% of requests are.

If you're just looking at averages, you might miss that your snappy 100ms API request actually takes five seconds for some cohort of users. Optimizing that away won't have a significant impact on the average duration (maybe it'll take it from 100ms to 99ms), but it'll have a significant impact on those users. This is more important than it sounds, because your slowest 1% of users are probably your _biggest_ 1% of users, which means they're probably paying you the most money and are your most important set of customers.

Much of the performance work I did was only felt at p95 or above. The average didn't move at all, but I've sped up 

[^1]: For much more on that, see my posts [_What is Important_](/what-is-important), [_The Spotlight_](/the-spotlight), and [_Crushing JIRA tickets is a party trick, not a path to impact_](/party-tricks). Of course "value" here is a bit subjective - I mean value _to the company_, or more specifically shareholder value. But I think this also applies to "value for customers", or whatever other definition of value you prefer.

[^2]: That's what I regret most about the [industry turn](/good-times-are-over) in ~2023: you used to be able to spend most of your time doing this kind of optimization work, but now you have to deliver shareholder value more directly. I miss it.