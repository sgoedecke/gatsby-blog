---
title: What makes strong engineers strong?
description: Self-belief, pragmatism, speed, and technical ability
order: 26
date: '2025-01-09'
---

As I've [written about before](/weak-engineers), what defines a strong engineer is the ability to do tasks that weaker engineers can't, even with near-unlimited time. But what are the concrete skills or traits that make up that ability? What is it about strong engineers that makes them able to do a much wider range of tasks? In order of importance, I think it's self-belief, pragmatism, speed, and technical ability.

### Self-belief

Strong engineers believe they can succeed, even on hard or unfamiliar problems. Many technically capable people are weak engineers purely because they lack confidence. Why? Because **software problems are all unfamiliar problems**. Software engineers work in the dark. For almost every piece of real work, it's impossible to say how tricky it'll be to do until it's completed. That's why estimation in tech companies is famously hard: you just don't know ahead of time what issues are going to come up.

There are many smart people who just can't work in this environment. It violates their core engineering sense-of-self to talk about projects when they're not sure of the technical details, or to start work on a project where so much is still unknown. To be a strong engineer, you need the raw confidence to believe that you will figure it out, whatever it is (or if it's genuinely too hard, then the problem must be so fiendish that there's no shame in failing to solve it)[^1].

This doesn't just affect what projects engineers work on, but the quality of the work itself. If you pick up a hard task, it makes a big difference whether you immediately tackle the hardest part head-on, or if you put it off and try to work around it. I've seen engineers spend weeks avoiding a difficult task that could have been accomplished in a serious day of effort.

### Pragmatism

Strong engineers get things done. They bias towards working solutions. In my experience, strong engineers are all ruthless pragmatists: every design decision is judged by how well it will work, not how clean or elegant it is. That's not to say strong engineers don't produce elegant solutions. Elegant solutions are often the most straightforward ones. But strong engineers resist adding layers of abstraction just for neatness' sake. They're typically happy to make compromises in the interest of shipping.

Because of this, strong engineers often come into conflict with smart, technically capable, weak engineers. Typically the flashpoint is something like "do we need to do this refactor two weeks before launch", or "is this design pattern overkill for our use case". It can be hard to judge these conflicts as an outsider, because both parties are technically strong. If you're in this position, I recommend tiebreaking on which side of the argument has the best track record of shipping.

### Speed

Strong engineers work fast. I have never seen a strong engineer who wasn't a speedy worker. I think there are two reasons for that. First, many engineers are slow because they put off hard work. Strong engineers don't do that (see the point above about self-belief). Second, fast workers tend to become strong engineers over time because they accumulate experience rapidly. I'd write more on this, but Dan Luu already said it best [here](https://danluu.com/productivity-velocity/). I endorse that post wholeheartedly, in particular these points:

- Fast execution lets you experiment rapidly enough to find the right solution
- Fast execution makes low-chance-but-high-reward ideas worth trying, which eventually produces high reward
- Fast execution is qualitatively different from slow execution. Whole different tasks become possible

I don't think strong engineers need to be particularly hard workers, in the sense of working long hours. In my experience, good work looks like short intense bursts of productivity separated by long periods of relative inactivity. Of course, there are probably some absolute monsters out there who are both intensely productive and work long hours (reportedly John Carmack is one of these). But I don't think you need to do that to be a very strong engineer at your tech company.

### Technical ability

There's certainly a baseline level of technical skill you need to be a strong engineer, and being more technically capable is always an advantage. Deeply technical people will see simple solutions that others miss, and will be able to solve whole categories of problem that others can't. 

How technical does a strong engineer need to be? That's a question about how good a fit your specific technical strengths are for the work that needs doing. For instance, I am very good at tracing through a large Rails codebase. That's made me a good fit for debugging and building line-of-business features, but none of those strengths helped much on a recent piece of work when I had to add some functionality to an inhouse C library. In general, a company working on a brand-new engineering field will need more technical skill than a company applying established engineering practice.

Strong engineers don't need to be geniuses. In fact, often genius runs counter to the skills you need to be a strong engineer. Some of the smartest people I've worked with - in terms of raw brainpower - were not particularly effective engineers, because they struggled with pragmatism and speed. I'd much rather work with an averagely-intelligent engineer who was unusually confident and pragmatic.

### Summary

- Strong engineers believe in their ability to solve almost any problem. They tackle the scariest unknowns head-on instead of procrastinating
- Strong engineers are pragmatic, which often gets them into arguments with smart, weaker engineers
- Strong engineers are always fast workers, but not necessarily grinders
- Strong engineers are technically strong, but it's usually a case of their strengths being a good fit to the work, not "this person is a genius"

Thanks to Zakir for inspiring this post in an email discussion.

[^1]: Back in my philosophy-grad-school days, the logician Graham Priest was well-known for confidently asking even the most basic questions in conference talks or seminars - because if even he was confused, he was confident that all the other attendees had to be confused as well. That's self-belief!