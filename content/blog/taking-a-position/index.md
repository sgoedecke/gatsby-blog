---
title: Engineers who won’t commit
description: Why remaining non-commital is cowardly
order: 42
date: '2025-02-10'
---

Some engineers think it's a virtue to remain non-committal in technical discussions. Should our team build a new feature in an event-driven or synchronous way? Well, it depends: there are many strong technical reasons on each side, so it's better to keep an open mind and not come down on either side. This strategy is fine when you're a junior engineer, but at some point you'll be the person in the room with the most context (or technical skill, or institutional power). At that point, **you need to take a position**, whether you feel particularly confident or not. 

If you don't, you're forcing people with less technical context than you to figure it out themselves. Often that means somebody will take a random guess. In the worst case, the weakest-but-loudest engineer on the team will take the opportunity to push for a spectacularly bad idea. If you're a strong engineer, it's your responsibility to take a position in order to prevent that from happening, even if you're only 55% or 60% confident[^1].

## Why remaining non-committal is cowardly

Like most forms of cowardice, remaining non-committal feels like sensible caution from the inside. After all, technical problems are complicated. There are always reasons to express uncertainty or to add caveats to a statement. If the right way to go really is unclear, then (they say) it's strictly correct to express uncertainty.

I think what's often motivating this attitude is that many engineers (me included) really, really, pathologically hate being wrong. I get a sick feeling in my chest when I'm wrong about something, particularly in public. I think about it afterwards for a long time. This is useful, because it makes me put in the effort to be right. But it also makes it emotionally difficult to give an educated guess in a meeting that might end up being dead wrong. I've had to work to become OK with doing that, so I sympathize with people who can't. But I also see it for what it is: cowardice. When people are relying on you to make a call, you ought to step up and make it.

### What if you're wrong?

When an engineer overuses caveats and qualifiers, managers do not typically think "wow, I'm glad this person is being so careful and accurate". They think "ugh, why are you forcing me to make the decision myself?"

In my experience, managers are very forgiving when you make a technical call and it ends up being incorrect. That's because their job involves making a lot of educated guesses as well, so they've internalized that some guesses don't pan out. This goes double when the call you're making is genuinely difficult - for instance, a technical problem comes up in a meeting and everyone falls silent. If you're the only one stepping forward to answer, that can still be valuable even if you're wrong. Going in the wrong direction will at least often give you information, or provide a base to iterate on.

Of course, if you're wrong too much, people won't trust your estimates anymore. Or if you're too wrong in any particular instance - for instance, you offer a solution to an incident which ends up causing a much worse incident - you'll lose credibility too. I suggest avoiding this by being [right, a lot](/being-right-a-lot).

### Sometimes avoiding commitment is smart

Estimates are an interesting example of this. Many engineers default to "well, it depends, hard to say, could be a few days or could take a month" for everything but the most obviously-one-line changes. But your manager isn't asking out of curiosity, they're asking because they need a loose estimate for planning purposes. If you give a non-answer, they will just sigh internally and guess the estimate themselves.

However, sometimes avoid estimates isn't a matter of cowardice. In some companies, engineers avoid firm estimates because they'll face real, unfair consequences when those estimates aren't met. Here the trust between engineering and product has been fully broken. Engineers are incentivized to keep their heads down and never commit to anything (at least in front of management)[^2].

I'm sure there are company environments where every technical commitment is this risky. I don't have any criticism for engineers in those environments.

### Summary

I want to finish by repeating a caveat of my own. I'm saying you should force yourself to make commitments _when you're the person in the room best positioned to know the answer_. When you're talking to a technical peer - e.g. another engineer on your team - with your level of context, you can be as non-committal as you like. Still:

- If you don't take a position, you're tacitly endorsing the decision that eventually gets made
- In the extreme, this forces your manager to make hard technical decisions that are _your responsibility_
- The harder the decision, the more uncertainty you should be willing to accept
- I'm only talking about functional environments. If your manager will PIP you for a missed estimate, that sucks - I don't have any criticism for people who stay silent in that situation
- It can be genuinely scary to make a claim that you're not sure about. But you should still do it

edit: this post was discussed on [Hacker News](https://news.ycombinator.com/item?id=43678914) and [Reddit](https://www.reddit.com/r/programming/comments/1jyxu3p/engineers_who_wont_commit/) with lots of comments.

[^1]: This is a bit ironic, given that I've written [before](/confidence) about not taking firm stances on big-picture questions. The difference is whether you're doing it in the workplace or not. Outside of the workplace, I don't really know whether typed languages are better than untyped ones. In the workplace, I'll advocate for Typescript, because I'm ~60% sure it's net-positive.

[^2]: In my experience, this doesn't actually work. Product managers just make up or semi-hallucinate estimates, then hold the team accountable anyway. But my experience with deeply dysfunctional companies is limited.