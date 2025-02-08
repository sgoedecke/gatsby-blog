---
title: Remaining non-committal in technical discussions is cowardly
description: --
order: 41
date: '2025-02-06'
---

You can be technically strong and still be a weak engineer. One way is to have no [shipping muscle](/how-to-ship). Another is to be impossible to get along with. In my experience, one of the most common ways is to be a coward. It feels weird to talk about cowardice about a job where you sit in front of a computer with very little at stake[^1]. The kind of bravery needed to be a strong software engineer certainly isn't heroic. All the same, it does exist. 

In my opinion, the most common form of cowardice is **not taking a position in technical discussions** when you're the most informed person in the room.

## Why it's cowardly

Like most forms of cowardice, remaining non-committal feels like sensible caution from the inside. After all, technical problems are complicated. There are always reasons to express uncertainty or to add caveats to a statement. But if you're the most technical person in a room, _you have a responsibility_ to express a clear position. Otherwise you're forcing people with less technical context than you to figure it out themselves.

Cowardly engineers love to say that they're doing the right thing by remaining silent. If the right way to go really is unclear, then (they say) it's strictly correct to express uncertainty. Only an arrogant blowhard (they say) would express confidence about a situation like that. This position (if it's not pure rationalization) reflects a misunderstanding about their job. Engineers are not machines giving technically-correct answers to syntactically accurate questions. They are _people_ who are paid money to provide value to the company. If your educated guess is more likely to be correct than the next best alternative (e.g. a random person in the meeting's guess), it is your responsibility to guess[^2]. You are, in fact, paid to guess!

When an engineer overuses caveats and qualifiers, managers do not typically think "wow, I'm glad this person is being so careful and accurate". They think "god damn it, why are you forcing me to make the decision myself?" (This is often - but not always - also true about junior engineers talking to more senior ones.)

One reason many engineers struggle with this is that they really, really hate being wrong. In many engineers, this is pathological (me included). I get a sick feeling in my chest when I'm wrong about something, particularly in public. I think about it afterwards for a long time. This is useful, because it makes me put in the effort to be right. But it also makes it emotionally difficult to give an educated guess in a meeting that might end up being dead wrong. I've had to work pretty hard to become OK with doing that, so I sympathize with people who can't. But I also see it for what it is: cowardice.

### What if you're wrong?

So what does happen if you're wrong? In my experience, managers are very forgiving when you make a technical call and it ends up being incorrect. That's because their job involves making a lot of educated guesses as well, so they've internalized that some guesses don't pan out. This goes double when the call you're making is genuinely difficult - for instance, a technical problem comes up in a meeting and everyone falls silent. If you're the only one stepping forward to answer, that can still be valuable even if you're wrong. Going in the wrong direction will at least often give you information, or provide a base to iterate on.

Of course, if you're wrong too much, people won't trust your estimates anymore. Or if you're too wrong in any particular instance - for instance, you offer a solution to an incident which ends up causing a much worse incident - you'll lose credibility too. I suggest avoiding this by being [right, a lot](/being-right-a-lot).

### Examples

Estimates are a common case where engineers make this mistake. If you're talking to your manager and they ask "when do you think we could ship this", it is cowardly to give a non-answer. Many engineers default to "well, it depends, hard to say, could be a few days or could take a month" for everything but the most obviously-one-line changes. The cowardly answer is correct! But your manager isn't asking out of curiosity, they're asking because they need a loose estimate for planning purposes. If you give a non-answer, they will just sigh internally and guess the estimate themselves. If you think your guess is going to be more accurate than theirs, you have a responsibility to give your guess.

Other examples:
- Engineers participating in project discussions without expressing what they really think (or expressing it so vaguely as to be useless)
- Engineers in incident calls too scared to offer a theory, even when they're best placed to do so
- Engineers in product planning meetings who don't offer opinions on which tasks are easier than others (or which tasks are prohibitively hard)

### Don't go too far

I'm not saying that all use of caveats is cowardly. Let me repeat a caveat of my own: when you're talking to a technical peer - e.g. another engineer on your team - with your level of context, you can be as non-committal as you like. I'm saying that you should avoid caveats _when talking to people with less technical context_: i.e. managers, product managers, and sometimes engineers on other teams or significantly more junior engineers. When people are relying on you to make a call, you ought to step up and make it.

[^1]: Some software engineering jobs do have a lot at stake - for instance, self-driving cars or pacemaker firmware - but most don't.

[^2]: This is a bit ironic, given that I've written [before](/confidence) about not taking firm stances on big-picture questions. The difference is whether you're doing it in the workplace or not. Outside of the workplace, I don't really know whether typed languages are better than untyped ones. In the workplace, I'll advocate for Typescript, because I'm ~60% sure it's net-positive.