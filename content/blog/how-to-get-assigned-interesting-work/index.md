---
title: Fast and slow ways to improve your reputation
description: 
order: 263
date: '2026-11-01'
tags: ["tech companies", "good engineers"]
crossPosts:
  x: "https://x.com/i/status/2116680868043387134"
  linkedin: "https://www.linkedin.com/feed/update/urn:li:share:7522446561109311489/"
---

To get a good reputation in tech companies, you need to work on important projects. However, you need a good reputation first in order to get assigned important projects. Doesn't that make it impossible to get started? I get a lot of emails from engineers who are struggling with this problem. They go like this:

> I work with a strong senior engineer. I feel like my manager structures work so that strong engineer always gets the visible work, and the more they do, the more opportunities they get, while I sit on the sidelines. My manager agrees with me that it's time for me to start leading work myself, but every time a new project appears it always goes to the strong engineer. What do I do?

This is a good case study for what I think of as "tech company theory of mind": understanding the [actual incentives](/seeing-like-a-software-company/) that motivate decisions in tech companies, instead of the formal process. According to the formal process, projects should probably be assigned round-robin to whoever has capacity and isn't currently working on one. But (as my emails complain) this is almost never how it works in practice.

### A vicious cycle

Managers care about giving their employees chances to build a reputation, but they care more about developing their own reputation as someone who can deliver. High-profile projects  are the best opportunity for new people to step forward and get known, but blowing up a project[^1] like that is the easiest way for a manager to tank their own reputation. They will thus typically hand these projects to someone they know can deliver, while simultaneously promising (including to themselves) that _next_ time they'll take the risk of letting another person lead it.

Of course it's a vicious cycle. The more you rely on one person, the more reliable they become and the less reliable their colleagues become, since they aren't getting the relevant experience. It's not very sustainable. However, the average manager tenure in big tech is only [a couple of years](https://ravio.com/blog/employee-tenure-trends)[^2]. Given that, it's rational for individual managers to take the long-term risk in exchange for mitigating the short-term risks of project failure.

### The slow way to improve your reputation

So what can you do about it? I wrote about the classic approach years ago in [_Ratchet effects determine engineer reputation at large companies_](/ratchet-effects/):

- Focus on reliably shipping small, low-risk pieces of work
- Communicate to your manager and team that you've done that
- Use that reputation to get slightly higher-risk pieces of work
- Avoid any mistakes that will ratchet up the perception of you as unreliable
- Eventually you will be considered a safe prospect to handle important work

Note that this plan does not involve convincing[^3] your manager that you need projects for your career development, or that it's unfair for you to be overlooked, or that the formal process would mean you should get to lead projects. You are not going to be able to change your manager's incentives, but you may be able to position yourself so that your manager believes their incentives line up with yours.

The problem with this plan is that it's _slow_. It takes months or even years to piece together a reputation like this. That's slow enough for bad luck to intervene by handing you a failure you can't avoid, or having your manager leave, or for [the fundamental nature of software engineering to change](/tags/ai/). What can you do that's faster?

### Fast ways to improve your reputation

The fast path to getting assigned interesting work involves taking risks. This is all [dangerous advice](/dangerous-advice/). Follow it at your own peril.

One way is to **build a relationship with your skip-level**. If your manager's manager thinks you're a stone-cold killer, you are basically guaranteed to get assigned interesting projects. They will straight-up tell your manager "why not put X on this?", and your manager will rationally decide (a) that it's in their best interests to do it, and (b) that if you screw it up, it won't be their responsibility.

But it's not so easy to build a relationship like this. Very senior managers are skilled political operators[^4] who are good at identifying when people are trying to persuade them. If they think you're coming on too strong, that will hurt you far more than it helps. Unfortunately, the most reliable technique for building a relationship with your skip-level is to just be reliably useful to them over a long period of time, which puts us back to the slow way.

Another fast way is to **make side bets**. I wrote about that [here](/side-bets/), but the idea is simple: figure out and implement your own projects. Work that _you_ decide to do is work that doesn't have to be assigned to you, so if you independently identify something important that needs doing, then do it, you've manufactured your own project out of thin air. I think every senior engineer should be trying to do this all the time.

The risk of making side bets is that if they don't work, or turn out to be less important than you think, you've entirely wasted your time. Worse, many managers will get annoyed at engineers who try this, because it can make managers look in meetings like they don't know what their team is working on.

Finally, the best fast way is to **impress your engineer colleagues**. This only really works on a team with a healthy culture, but when it works it's very smooth. Managers are slow to form opinions because they're not close enough to the engineering coalface to know who's doing quality work[^5]. Engineers are informed enough to form opinions quickly. At least I am: it only takes a few ["oh, you saw something I didn't"](/thoughts-about-engineers/) moments for me to decide someone's good.

On a healthy team those engineers will tell their manager that, who will decide that you must be good, and will give you important work far earlier than if you'd had to prove yourself from scratch. On a kind of crappy team, engineers might not be good enough to recognize strong engineers, or they might not communicate freely enough to tell your manager about it. On a _really_ unhealthy team, engineers will actively trash-talk competent colleagues because they (correctly) see them as the biggest threats.

### Conclusion

If you're on a team where all the interesting work is going to someone else, you have a reputation problem. It's probably not personal: your manager is simply incentivized to give new work to known reliable engineers, which is a vicious cycle that leaves you out in the cold. Fixing that can be a safe slow process or a risky fast process.

Either way, I don't recommend simply trying to convince your manager in 1:1s that it's unfair to leave you out of projects. Tech companies [are not supposed to be fair](/dont-anthropomorphize-big-tech-companies/), they are supposed to make money. You're better off finding a way to make it look like it's in your manager's best interests to assign you that work: either by appealing to your skip-level, finding projects of your own, or building a reputation with engineers your manager already trusts.


[^1]: One reason some people find this point tricky to grasp is that they underrate just how hard it is to [ship anything](/how-to-ship/). Projects fail _all the time_. No manager can afford to be sanguine about the risks.

[^2]: I linked the first crappy source I could find, but my main source for this is just noticing how long the managers in my workplaces stick around.

[^3]: You don't even necessarily have to tell your manager you're looking for bigger projects, though I think you probably should.

[^4]: Almost certainly more skilled than you, due to selection effects and the fact that they get way more practice.

[^5]: They typically have to rely on results, which is a slow proxy for technical ability.