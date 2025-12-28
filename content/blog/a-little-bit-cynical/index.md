---
title: Software engineers should be a little bit cynical
description: --
order: 163
date: '2025-12-28'
tags: ["tech companies"]
---

A lot of my readers [call](https://lobste.rs/c/ch8tn0) [me](https://news.ycombinator.com/item?id=46085088) [a cynic](https://news.ycombinator.com/item?id=46082989) when I say things like "you should do things that [make your manager happy](/how-to-ship)" or "big tech companies [get to decide](/bad-code-at-big-companies) what projects you work on". Alex Wennerberg put the "Sean Goedecke is a cynic" case well in his post [_Software Engineers Are Not Politicians_](https://alexwennerberg.com/blog/2025-11-28-engineering.html). Here are some excerpts:

> I have no doubt that [Sean's] advice is quite effective for navigating the upper levels of an organization dedicated to producing a large, mature software product. But what is lost is any sort of conception of value. Is it too naive to say that engineers are more than "tools in a political game", they are specialized professionals whose role is to apply their expertise towards solving meaningful problems?

> The irony is that this kind of thinking destroys a company's ability to actually make money ... the idea that engineers should begin with a self-conception of doing what their manager tells them to is, to me, very bleak. It may be a good way to operate smoothly within a bureaucratic organization, and of course, one must often make compromises and take direction, but it is a bad way to do good work.

I can see why people would think this way. But I _love_ working in big tech companies! I do see myself as a professional solving meaningful problems. And I think navigating the organization to put real features or improvements in the hands of users is an excellent way - maybe the best way - to do good work.

Why do I write such cynical posts, then? Well, I think that a small amount of cynicism is necessary in order to think clearly about how organizations work, and to avoid falling into the trap of being overly cynical. In general, I think **good engineers ought to be a little bit cynical**.

### The idealist view is more cynical than idealists think

One doctrinaire "idealist" view of software engineering goes something like this. I'm obviously expressing it in its most lurid form, but I do think many people believe this more or less literally:[^1]

> We live in a late-stage-capitalist hellscape, where large companies are run by aspiring robber barons who have no serious convictions beyond desiring power. All those companies want is for obedient engineering drones to churn out bad code fast, so they can goose the (largely fictional) stock price. Meanwhile, end-users are left holding the bag: paying more for worse software, being hassled by advertisements, and dealing with bugs that are unprofitable to fix. The only thing an ethical software engineer can do is to try and find some temporary niche where they can defy their bosses and do real, good engineering work, or to retire to a hobby farm and write elegant open-source software in their free time.

When you write it all out, I think it's clear to see that this is _incredibly_ cynical. At the very least, it's a cynical way to view your coworkers and bosses, who are largely people like you: doing a job, balancing a desire to do good work with the need to please their own bosses. It's a cynical way to view the C-staff of a company. I think it's also inaccurate: from my limited experience, the people who run large tech companies really do want to deliver good software to users.

It's idealistic only in the sense that it does not accept the need for individual software engineers to compromise. According to this view, _you_ never need to write bad software. No matter how hard the company tells you to compromise and just get something out, you're morally required to plant your feet and tell them to go to hell. In fact, by doing so, you're taking a stand against the general degeneration of the modern software world. You're protecting - unsung, like Batman - the needs of the end-user who will never know you exist.

I can certainly see the appeal of this view! But I don't think it's an _idealistic_ appeal. It comes from seeing the world as fundamentally corrupted and selfish, and believing that real positive change is impossible. In other words, **I think it's a _cynical_ appeal.**

### The cynical view is more idealistic than idealists think

In my view, there's no hard distinction between engineers being "tools in a political game" and professionals who solve meaningful problems. In fact, I think that in practice **almost all meaningful problems are solved by playing political games**.

There are very few problems that you can solve entirely on your own. Software engineers encounter more of these problems than average, because the nature of software means that a single engineer can have huge leverage by sitting down and making a single code change. But in order to make changes to large products - for instance, to make it possible for GitHub's 150M users to [use LaTeX in markdown](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions) - you need to coordinate with many other people at the company, which means you need to be involved in politics.

It is just a plain fact that software engineers are not the movers and shakers in large tech organizations. They do not set the direction of the company. To the extent that they have political influence, it's in how they translate the direction of the company into specific technical changes. But **that is actually quite a lot of influence!** 

Large tech companies serve hundreds of millions (or billions) of users. Small changes to these products can have a massive positive or negative effect in the aggregate. As I see it, choosing to engage in the messy, political process of making these changes - instead of washing your hands of it as somehow impure - is an act of idealism. 

I think the position of a software engineer in a large tech company is similar to people who go into public service: idealistically hoping that they can do some good, despite knowing that they themselves will never set the broad strokes of government policy.

Of course, big-tech software engineers are paid far better, so many people who go into this kind of work in fact are purely financially-motivated cynics. But I'm not one of them! I think it's possible, by doing good work, to help steer the giant edifice of a large tech company for the better.

### Cynicism as inoculation

In my view, cynical writing is like most medicines: the dose makes the poison. A healthy amount of cynicism can serve as an inoculation from being overly cynical.

If you don't have an slightly cynical explanation for why engineers write bad code in large tech companies - such as the one I write about [here](/bad-code-at-big-companies) - you risk adopting an overly cynical one. For instance, you might think that big tech engineers are being [deliberately demoralized](https://news.ycombinator.com/item?id=46082989) as part of an anti-labor strategy to prevent them from unionizing, which is nuts. Tech companies are simply not set up to engage in these kind of conspiracies.

If you don't have a slightly cynical explanation for why large tech companies sometimes make inefficient decisions - such as [this one](/seeing-like-a-software-company) - you risk adopting an overly cynical one. For instance, you might think that tech companies are full of incompetent [losers](https://news.ycombinator.com/item?id=46133179), which is simply not true. Tech companies have a normal mix of strong and [weak engineers](/weak-engineers).

### Final thoughts

In my opinion, **idealist writing is massively over-represented in writing about software engineering**. There is no shortage of books or blog posts (correctly) explaining that we ought to value good code, that we ought to be kind to our colleagues, that we ought to work on projects with positive real-world impact, and so on. There _is_ a shortage of writing that accurately describes how big tech companies operate.

Of course, cynical writing can harm people: by making them sad, or turning them into bitter cynics. But **idealist writing can harm people too**. There's a whole generation of software engineers who came out of the 2010s with a _factually incorrect_ model of how big tech companies work, and who are effectively being fed into the woodchipper in the 2020s. They would be better off if they internalized a correct model of how these companies work: not just less likely to get into trouble, but better at achieving their own idealist goals[^2].

[^1]: I don't _think_ I'm strawmanning here - I've seen many people make all of these points in the past, and I suspect at least some readers will be genuinely nodding along to the following paragraph. If you're one of those readers (or if you only agree with about 50%), consider doing me a favor and emailing me to let me know! If I don't get any emails I will probably rewrite this.

[^2]: For some concrete details on this, see my post [_How I influence tech company politics as a staff software engineer_](/how-to-influence-politics). Also, if you're interested, I wrote a much less well-developed version of this post right at the start of 2024, called [_Is it cynical to do what your manager wants?_](/cynicism).