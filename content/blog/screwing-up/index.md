---
title: On screwing up
order: 174
date: '2026-02-11'
tags: ["good engineers", "tech companies"]
---

The most shameful thing I did in the workplace was lie to a colleague. It was about ten years ago, I was a fresh-faced intern, and in the rush to deliver something I'd skipped the step of testing my work in staging[^1]. It did not work. When deployed to production, it didn't work there either. No big deal, in general terms: the page we were working on wasn't yet customer-facing. But my colleague asked me over his desk whether this worked when I'd tested it, and I said something like "it sure did, no idea what happened".

I bet he forgot about it immediately. I could have just messed up the testing (for instance, by accidentally running some different code than the code I pushed), or he knew I'd probably lied, and didn't really care. I haven't forgotten about it. Even a decade later, I'm still ashamed to write it down.

Of course I'm not ashamed about the _mistake_. I was sloppy to not test my work, but I've cut corners since then when I felt it was necessary, and I stand by that decision. I'm ashamed about how I handled it. But even that I understand. I was a kid, trying to learn quickly and prove I belonged in tech. The last thing I wanted to do was to dwell on the way I screwed up. If I were in my colleague's shoes now, I'd have brushed it off too[^2]. How do I try to handle mistakes now?

### Handling the emotional reaction

The most important thing is to **control your emotions**. If you're anything like me, your strongest emotional reactions at work will be reserved for the times you've screwed up. There are usually two countervailing emotions at play here: the desire to defend yourself, find excuses, and minimize the consequences; and the desire to confess your guilt, abase yourself, and beg for forgiveness. Both of these are traps. 

Obviously making excuses for yourself (or flat-out denying the mistake, like I did) is bad. But going in the other direction and publicly beating yourself up about it is _just as bad_. It's bad for a few reasons.

First, you're effectively asking the people around you to take the time and effort to reassure you, when they should be focused on the problem. Second, you're taking yourself out of the group of people who are focused on the problem, when often you're the best situated to figure out what to do: since it's your mistake, you have the most context. Third, it's just not professional. 

So what should you do? **For the first little while, _do nothing_.** Emotional reactions fade over time. Try and just ride out the initial jolt of realizing you screwed up, and the impulse to leap into action to fix it. Most of the worst reactions to screwing up happen in the immediate aftermath, so if you can simply do nothing during that period you're already off to a good start. For me, this takes about thirty seconds. How much time you'll need depends on you, but hopefully it's under ten minutes. More than that and you might need to grit your teeth and work through it.

### Communicate

Once you're confident you're under control, the next step is to **tell people what happened**. Typically you want to tell your manager, but depending on the problem it could also be a colleague or someone else. It's really important here to be matter-of-fact about it, or you risk falling into the "I'm so terrible, please reassure me" trap I discussed above. You often don't even need to explicitly say "I made a mistake", if it's obvious from context. Just say "I deployed a change and it's broken X feature" (or whatever the problem is).

You should do this _before_ you've come up with a solution. It's tempting to try to conceal your mistake and just quietly solve it. But for user-facing mistakes, concealment is impossible - somebody will raise a ticket eventually - and if you don't communicate the issue, you risk someone else discovering it and independently raising it.

In the worst case, while you're quietly working on a fix, you'll discover that somebody else has declared an incident. Of course, you understand the problem perfectly (since you caused it), and you know that it was caused by a bad deploy and is easily fixable. But the other people on the incident call don't know all that. They're thinking about the worst-case scenarios, wondering if it's database or network-related, paging in all kinds of teams, causing all kinds of hassle. All of that could have been avoided if you had reported the issue immediately.

In my experience, tech company managers will forgive mistakes[^3], but **they won't forgive being made to look like a fool**. In particular, they won't forgive being deprived of critical information. If they're asked to explain the incident by their boss, and they have to flounder around because they lack the context _that you had all along_, that may harm your relationship with them for good. On the other hand, if you give them a clear summary of the problem right away, and they're able to seem like they're on top of things to their manager, you _might_ even earn credit for the situation (despite having caused it with your initial mistake).

### Accept that it's going to hurt

However, you probably won't earn credit. This is where I diverge from the popular software engineering wisdom that incidents are always the fault of systems, never of individuals. Of course incidents are caused by the interactions of complex systems. Everything in the universe is caused by the interactions of complex systems! But one cause in that chain is often _somebody screwing up_[^4].

If you're a manager of an engineering organization, and you want a project to succeed, you probably have a mental shortlist of the engineers in your org who can reliably lead projects[^5]. If an engineer screws up repeatedly, they're likely to drop off that list (or at least get an asterisk next to their name).

It doesn't really matter if you had a good technical reason to make the mistake, or if it's excusable. Managers don't care about that stuff, because they simply don't have the technical context to know if it's true or if you're just trying to talk your way out of it. What managers do have the context to evaluate is _results_, so that's what they judge you on. That means some failures are acceptable, so long as you've got enough successes to balance them out.

Being a strong engineer is about finding a balance between [always being right](/being-right-a-lot) and [taking risks](/taking-a-position). If you prioritize always being right, you can probably avoid making mistakes, but you won't be able to lead projects (since that always requires taking risks). Therefore, **the optimal amount of mistakes at work is not zero.** Unless you're working in a few select industries[^6], you should _expect_ to make mistakes now and then, otherwise you're likely working far too slow. 


[^1]: From memory, I think I _had_ tested an earlier version of the code, but then I made some tweaks and skipped the step where I tested that it worked even with those tweaks.

[^2]: Though I would have made a mental note (and if someone more senior had done this, I would have been a bit less forgiving).

[^3]: Though they may not forget them. More on that later.

[^4]: It's probably not that comforting to replace "you screwed up by being incompetent" with "it's not your fault, it's the system's fault for hiring an engineer as incompetent as you".

[^5]: For more on that, see [_How I ship projects at large tech companies_](/how-to-ship).

[^6]: The classic examples are pacemakers and the Space Shuttle (should that now be Starship/New Glenn)?
