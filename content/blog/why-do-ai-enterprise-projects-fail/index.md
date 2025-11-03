---
title: Is it worrying that 95% of AI enterprise projects fail?
description: 
order: 153
date: '2025-11-03'
tags: ["ai", "tech companies", "papers"]
---

In July of this year, MIT NANDA released a report called _The GenAI Divide: State of AI in Business 2025_. The report spends most of its time giving advice about how to run enterprises AI projects, but the item that got everybody talking was its headline stat: **95% of organizations are getting zero return from their AI projects**.

This is a very exciting statistic for those already disposed to be pessimistic about the impact of AI. The incredible amounts of money and time being spent on AI depend on language models being a transformative technology. Many people are expecting AI to eventually unlock hundreds of billions of dollars in value. The NANDA paper seems like very bad news for those people, if the last three years of AI investment really has failed to unlock even one dollar in value for most companies.

Cards on the table - I think AI is going to have an impact about on-par with the internet, or railroads, but that we're also definitely in a bubble. I wrote about this in [_What's next after the AI bubble bursts?_](/after-the-ai-bubble)[^1]. **I am not convinced that the NANDA report is bad news for AI**.

### What about the base rate?

The obvious question to ask about the report is "well, what's the base rate?" Suppose that 95% of enterprise AI transformations fail. How does that compare to the failure rate of normal enterprise IT projects?

This might seem like a silly question for those unfamiliar with enterprise AI projects - whatever the failure rate, _surely_ it can't be close to 95%! Well. In 2016, Forbes [interviewed](https://www.forbes.com/sites/brucerogers/2016/01/07/why-84-of-companies-fail-at-digital-transformation/) the author of another study very much like the NANDA report, except about IT transformations in general, and found an 84% failure rate. [McKinsey](https://www.mckinsey.com/~/media/McKinsey/Business%20Functions/McKinsey%20Digital/Our%20Insights/Delivering%20large%20scale%20IT%20projects%20on%20time%20on%20budget%20and%20on%20value/Delivering%20large%20scale%20IT%20projects%20on%20time%20on%20budget%20and%20on%20value.pdf) has only one in 200 IT projects coming in on time and within budget. The infamous 2015 [CHAOS report](https://cdn1-public.infotech.com/agile/CHAOSReport2015-Final.pdf) found an 61% failure rate, going up to 98% for "large, complex projects". **Most enterprise IT projects are at least partial failures.**

Of course, much of this turns on how we define success. Is a project a success if it delivers what it promised a year late? What if it had to cut down on some of the promised features? Does it matter which features? The NANDA report defines it like this, which seems like a fairly strict definition to me:

> We define successfully implemented for task-specific GenAI tools as ones users or executives have remarked as causing a marked and sustained productivity and/or P&L impact.

Compare the CHAOS report's definition of success:

> Success ... means the project was resolved within a reasonable estimated time, stayed within budget, and delivered customer and user satisfaction regardless of the original scope.

I think these are close enough to be worth comparing, which means that **according to the NANDA report, AI projects succeed at roughly the same rate as ordinary enterprise IT projects**. Nobody says "oh, databases must be just hype" when a database project fails. In the interest of fairness, we should extend the same grace to AI.

### Are AI projects unusually hard?

81% and 95% are both high failure rates, but 95% is higher. Is that because AI offers less value than other technologies, or because AI projects are unusually hard? I want to give some reasons why we might think AI projects fall in the CHAOS report's category of "large, complex projects".

**Useful AI models have not been around for long.** GPT-3.5 was released in 2022, but it was more of a toy than a tool. For my money, the first useful AI model was GPT-4, released in March 2023, and the first cheap, useful, and reliable AI model was GPT-4o in May 2024. That means that enterprise AI projects have been going at most three years, if they were willing and able to start with GPT-3.5, and likely much closer to eighteen months. The [average duration](https://www.mckinsey.com/industries/public-sector/our-insights/unlocking-the-potential-of-public-sector-it-projects?utm_source=chatgpt.com) of an enterprise IT project is 2.4 years in the private sector and 3.9 years in the public sector. Enterprise AI adoption is still very young, by the standards of their other IT projects.

Also, to state the obvious, **AI is a brand-new technology.** Most failed enterprise IT projects are effectively "solved problems": like migrating information into a central database, or tracking high-volume events, or aggregating various data sources into a single data warehouse for analysis[^2]. Of course, any software engineer should know that solving a "solved problem" is not easy. The difficulties are in all the myriad details that have to be worked out.

But enterprise AI projects are largely not "solved problems". The industry is still working out the best way to build a chatbot. Should tools be given as definitions, or discovered via MCP? Should agents use sub-agents? What's the best way to compact the context window? Should data be fetched via RAG, or via agentic keyword search? And so on. This is a much more fluid technical landscape than most enterprise AI projects. Even by itself, that's enough to push AI projects into the "complex" category.

### Can we trust the NANDA report?

So far I've assumed that the "95% of enterprise AI projects fail" statistic is reliable. Should we? NANDA's source for the 95% figure is a survey in section 3.2:

![nanda](nanda.png)

The immediate problem here is that **I don't think this figure even shows that 95% of AI projects fail**. As I read it, the leftmost section shows that 60% of the surveyed companies "investigated" building task-specific AI. 20% of the surveyed companies then built a pilot, and 5% built an implementation that had a sustained, notable impact on productivity or profits. So just on the face of it, that's an 8.3% success rate, not a 5% success rate, _because 40% of the surveyed companies didn't even try_. It's also unclear if all the companies that investigated AI projects resolved to carry them out. If some of them decided not to pursue an AI project after the initial investigation, they'd also be counted in the failure rate, which doesn't seem right at all.

**We also don't know how good the raw data is.** Read this quote, directly above the image:

> These figures are directionally accurate based on individual interviews rather than official company reporting. Sample sizes vary by category, and success definitions may differ across organizations.

In Section 8.2, the report lays out its methodology: 52 interviews across "enterprise stakeholders", 153 surveys of enterprise "leaders", and an analysis of 300+ public AI projects. I take this quote to mean that the 95% figure is based on a subset of those 52 interviews. Maybe all 52 interviews gave really specific data! Or maybe only a handful of them did.

Finally, **the subject of the claim here is a bit narrower than "AI projects"**. The 95% figure is specific to "embedded or task-specific GenAI", as opposed to general purpose LLM use (presumably something like using the enterprise version of GitHub Copilot or ChatGPT). In fairness to the NANDA report, the content of the report does emphasize that many employees are internally using AI via those tools, and at least believe that they're getting a lot of value out of it. This one's more a criticism of the people who've been tweeting that "95% of AI use at companies is worthless", and so on.

### Summary

The NANDA report is not as scary as it looks. The main reason is that **~95% of hard enterprise IT projects fail no matter what, so AI projects failing at that rate is nothing special**. AI projects are all going to be on the hard end, because the technology is so new and there's very little industry agreement on best practices.

It's also not clear to me that the 95% figure is trustworthy. Even taking it on its own terms, it's mathematically closer to 92%, which doesn't inspire confidence in the rest of the NANDA team's interpretation. We're forced to take it on trust, since we can't see the underlying data - in particular, how many of those 52 interviews went into that 95% figure.

Here's what I think it's fair to conclude from the paper. Like IT projects in general, almost all internal AI projects at large enterprises fail. That means that enterprises will reap the value of AI - whatever it turns out to be - in two ways: first, illicit use of personal AI tools like ChatGPT, which forms a familiar "shadow IT" in large enterprises; second, by using pre-built enterprise tooling like Copilot and the various AI labs' enterprise products. It remains to be seen exactly how much value that is.

[^1]: In short: almost every hugely transformative technology went through its own bubble, as hype expectations outpaced the genuine value of the technology that was fuelling the market. I expect the AI bubble to burst, the infrastructure (e.g. datacenters full of GPUs) to stick around at cheaper prices, and AI to eventually become as fundamental a technology as the internet is today.

[^2]: By "solved problem" I mean that the technology involved is mature, well-understood, and available (e.g. you can just pick up Kafka for event management, etc).
