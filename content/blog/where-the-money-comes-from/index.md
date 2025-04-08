---
title: Knowing where your engineer salary comes from
description: How tech companies make money and why it's important
order: 50
date: '2025-03-01'
---

With the recent flurry of US federal firings, many people are [pointing and laughing](https://www.washingtonpost.com/politics/2025/02/27/fired-federal-worker-trump-voter/) at the Trump-voting federal employees who are just now finding out that they've voted for themselves to be let go. How could you have this poor a mental model of _what your job even is_? Well. In my opinion, many software engineers are operating under a mental model that's just as bad, and are often doing the equivalent of voting for the person promising to fire them.

I won't quote the tweets, but I regularly see stories like "I convinced my idiot bosses to _finally_ let me do only tech debt work, and would you believe they fired me after a few months?" Or "I've been busting my ass on this underfunded project and I still got a bad performance review". Or "it's so unfair that I haven't been promoted - look at all this amazing accessibility/standards/open-source work I've been doing!" The basic structure goes like this:

1. A bright-eyed engineer joins a tech company, excited to go and make the world a better place
2. They throw themselves into various pieces of work that don't make money (improving FCP performance, better screenreader support, refactoring)
3. Their managers desperately try to redirect them to work that does make money, causing a long frustrating power struggle
4. Eventually the bright-eyed engineer gives up and unhappily focuses on Profitable Product X, or
5. The bright-eyed engineer leaves or is fired, and goes on Twitter to complain about their important work not being valued

The complaint in this story is basically equivalent to "I can't believe Trump is firing me from the IRS when I voted for the guy". It represents a fundamental misunderstanding of what tech companies _are_.

### What are tech companies?

So what is the right understanding? Let's start as simple as possible. Tech companies are run by small groups of people with the goal of making money[^1]. Successful tech companies make a lot of money, by definition. They hire software engineers in order to continue doing the things that make that money, or to do new things that make more money.

At successful tech companies, engineering work is valued in proportion to how much money it makes the company (directly or indirectly). Patrick McKenzie has an [excellent post](https://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/) on this:

  > Profit Centers are the part of an organization that bring in the bacon: partners at law firms, sales at enterprise software companies, “masters of the universe” on Wall Street, etc etc.  Cost Centers are, well, everybody else.  You really want to be attached to Profit Centers because it will bring you higher wages, more respect, and greater opportunities for everything of value to you.  It isn’t hard: a bright high schooler, given a paragraph-long description of a business, can usually identify where the Profit Center is.  If you want to work there, work for that.  If you can’t, either a) work elsewhere or b) engineer your transfer after joining the company.

Companies value work more the closer it is to a profit center. I don't think you necessarily have to work _in_ profit centers (in most tech companies, that would mean abandoning your engineering title and role). But you need to demonstrate your value to the profit center in order for your own work to be valued. I'm not saying you need to do this to keep your job. Companies pay lots of people who don't deliver value, sometimes for many years. What I'm saying is this:

**If your work isn't clearly connected to company profit, your position is _unstable_**

In other words, you're probably depending on a kind-hearted manager (or CEO) who personally values your work. When they leave, you're in trouble. Or you're depending on a large company not really caring to check if a small team is bringing in profits. When they look, you're in trouble. Or you're depending on a cultural climate where your work has temporary cultural cachet (e.g. biofuels in the early 2000s). When that changes, you're in trouble. The only way to have a stable position is to be connected to the way the company makes money.

### Connecting your work to profit

In order to know if your work is connected to company profits, you have to know two things:

1. What is your company's business model? How do they make money?
2. How does your work support the business model?

Publicly traded companies must publish their business model and finances every year, which means you can either just go read that or read what people are writing about it on business blogs, magazines, and so on. (If you're working for a well-known company, you can probably just ask a LLM). If you're working for a private company, that can be harder, but usually it's not too hard to get the gist. For instance, the broad strokes of where Valve get their money from are pretty clear: it's Steam, not their first-party games.

Being an engineer at a company will give you much more visibility into the business model. For instance, you can run analytics queries that identify the ten largest customers. Often you won't have to run these queries directly - they'll be shared among the product-and-business folks, in channels that most engineers have no interest in. It's worth trying to learn about the business model. For instance, if I were working for Valve, I'd want a much clearer answer than "it's Steam": I'd want to know which kind of games were bringing in the most money, the distribution between new users and existing users, and so on.

Once you have an idea how your company makes money, you can gauge how your work supports it. If you build a product that many people are buying, this is easy: calculate how big a percentage of company profit your product is. What if you don't build a product? Say you're on the accessibility team, or the German localization team. In that case, you ought to figure out why your company is investing in these things. For example, working on accessibility might be valuable because:

- It allows us to sell to (e.g.) visually-impaired customers, growing the total addressable customer base by X%
- It enables us to meet specific regulatory requirements that allow us to sell to large enterprise customers (e.g. governments)
- It makes us look good, or at least avoids us looking bad
- It's just good work that is worth doing because it's the right thing to do

Some reasons are only important when times are good. If the company is doing great and has more money than it knows what to do with, the last two points are probably worth spending money on. (If the company is doing _really_ great, like a lot of companies in 2019, "literally anything" is worth spending money on in order to accumulate engineers). When interest rates rise, those reasons vanish.

These reasons will apply to some companies more than others. For instance, if you work at Google, the first reason is important because growing a customer base worth ~270B by 2% unlocks ~5.5B of new revenue. If Google is paying your team less than 5B in total, your team is probably making enough money to justify its existence. But if you work at a smaller company with revenue measured in millions, that math goes the other way.

There's an obvious consequence to this: if you want your work to be valued (i.e. you don't want to be reshuffled or fired), and you want to work on personally-satisfying features like accessibility, or UI polishing, or anything else not directly connected to profit - **you need to go and work for a very profitable company**.

### Delivering marginal value

When I [wrote about](/difficulty-in-big-tech) this idea - that very large tech companies deliver marginal features as a way of slightly growing their massive addressable customer base - some readers found the idea depressing. Maybe so! But at least it's a theory for how it might be possible to work on these kinds of features and get paid for it. The alternative theory is something like:

1. Accessibility, clean code, good performance, and so on are all Good Features
2. Good Companies care about Good Features
3. I just need to keep looking until I find a Good Company and not a Bad Company

I don't think that a smart engineer who thinks about this problem will come away believing this. But lots of smart engineers don't like thinking about how their work connects to company profits, so their implicit beliefs often add up to something like this. These engineers will often go through the five-step process I mentioned in the introduction to this post. I hate to see technically strong, motivated, kind-hearted engineers run headlong into burnout for completely predictable reasons.

### Summary

- It's easy to fall into the trap of thinking that you get paid for work because it's important
- You get paid for work because it makes money. If your work doesn't contribute to that, your position is inherently unstable
- If you want a stable position, you should try and figure out how your work connects to company profits, and strengthen that connection if possible
- All kinds of seemingly-unprofitable work makes money, particularly at large companies where small percentages are a lot
- If you want to work on seemingly-unprofitable work, you're probably better off working for large successful tech companies

**Update:** This post was discussed on [Hacker News](https://news.ycombinator.com/item?id=43603646) with many comments. Some experienced engineers in the comments [claim](https://news.ycombinator.com/item?id=43611609) that companies set their values in more mysterious ways than "what makes us money". I'm sure this is true, but in my own experience it's less true now than at any time during the 2010s.

[^1]: Often there are other goals involved, such as amassing political power or changing the world in some way that's personally satisfying to the founder, but money is the only goal shared by everyone involved.