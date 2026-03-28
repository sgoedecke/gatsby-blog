---
title: Working on products people hate
description:
order: 183
date: '2026-03-27'
tags: ["good engineers"]
---

I've worked on a lot of unpopular products.

At Zendesk I built large parts of an app marketplace that was too useful to get rid of but never polished enough to be loved. Now I work on GitHub Copilot, which many people think is crap[^1]. In between, I had some brief periods where I worked on products that were well-loved. For instance, I fixed a bug where popular Gists would time out once they got more than thirty comments, and I had a hand in making it possible to write LaTeX mathematics [directly](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions) into GitHub markdown[^2]. But I've spent years working on products people hate[^3].

If I were a better developer, would I have worked on more products people love? No. Even granting that good software always makes a well-loved product, big-company software is made by _teams_, and teams are shaped by _incentives_. A very strong engineer can slightly improve the quality of software in their local area. But they must still write code that interacts with the rest of the company's systems, and their code will be edited and extended by other engineers, and so on until that single engineer's heroics is lost in the general mass of code commits. I wrote about this at length in [_How good engineers write bad code at big companies_](/bad-code-at-big-companies).

Looking back, I'm glad that people have strongly disliked some of the software I've built, for the same reason that I'm glad I wasn't born into oil money. If I'd happened to work on popular applications for my whole career, I'd probably believe that that was because of my sheer talent. But in fact, you would not be able to predict the beloved and disliked products I worked on from the quality of their engineering. Some beloved features have very shaky engineering indeed, and many features that failed miserably were built like cathedrals on the inside[^4]. Working on products people hate forces you to accept how little control individual engineers have over whether people like what they build.

In fact, a reliable engineer ought to be comfortable working on products people hate, because **engineers work for the _company_, not for _users_. Of course, companies want to delight their users, since delighted users will pay them lots of money, and at least some of the time we're lucky enough to get to do that. But sometimes they can't: for instance, they might have to [tighten](https://techcrunch.com/2025/07/17/anthropic-tightens-usage-limits-for-claude-code-without-telling-users/) previously-generous usage limits, or shut down a [beloved product](https://www.failory.com/google/reader) that can't be funded anymore. Sometimes a product is funded just well enough to exist, but not well enough to be loved (like many enterprise-grade box-ticking features) and there's nothing the engineers involved can do about it.

It can be emotionally difficult working on products that people hate. Reading negative feedback about things you built feels like a personal attack, even if the decisions they're complaining about weren't your decisions. To avoid this emotional pain, it's tempting to make the mistake of ignoring feedback entirely, or of convincing yourself that you're much smarter than the stupid users anyway. Another tempting mistake is to go too far in the other direction: to put yourself entirely "on the user's side" and start pushing your boss to do the things they want, even if it's technically (or politically) impossible. Both of these are mistakes because they abdicate your key responsibility as an engineer, which is to try and find some kind of _balance_ between what's sustainable for the company and what users want. That can be really hard!

There's also a silver lining to working on disliked products, which is that people only care _because they're using them_. The worst products are not hated, they are simply ignored (and if you think working on a hated product is bad, working on an ignored product is much worse). A product people hate is usually providing a fair amount of value to its users (or at least to its purchasers, in the case of enterprise software). If you're thick-skinned enough to take the heat, you can do a lot of good in this position. Making a widely-used but annoying product slightly better is pretty high-impact, even if you're not in a position to fix the major structural problems.

Almost every engineer will work on a product people hate. That's just the law of averages: user sentiment waxes and wanes over time, and if your product doesn't die a hero it will live long enough to become the villain. Given that, it's sensible to avoid blaming the engineers who work on unpopular products. Otherwise you'll end up blaming yourself, when it's your turn, and miss the best chances in your career to have a real positive impact on users.


[^1]: We used to be broadly liked, then disliked when Cursor and Claude Code came out, and now I'm fairly sure the Copilot CLI tool is changing people's minds again. So it goes.

[^2]: Although even that got some [heated criticism](https://news.ycombinator.com/item?id=31450597) at the time.

[^3]: Of course, I don't mean "every single person hates the software", or even "more than half of its users hate it". I just mean that there are enough haters out there that most of what you read on the internet is complaints rather than praise.

[^4]: This is reason number five thousand why you can't judge the quality of tech companies from the outside, no matter how much you might want to (see my post on ["insider amnesia"](/insider-amnesia)).