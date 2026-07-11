---
title: In defense of not understanding your codebase
description: 
order: 211
date: '2026-07-11'
tags: ["software design", "naur theory"]
---

**As a software engineer, how well do you have to understand your own codebase?**

My guess is that people who work on small codebases with low-turnover teams (say, [Redis](https://redis.io/) or games like [The Witness](https://en.wikipedia.org/wiki/The_Witness_(2016_video_game))) would say "obviously you have to understand it completely, otherwise you can't do good work". I'd also guess that people who work on large codebases with high-turnover teams (say, the Google web search backend or GitHub) would say "obviously you can't understand it completely, you just have to do the best you can in your local area".

These are two largely different ways of programming with different methods, practices and cultures[^1]. However, the first group is over-represented in online discussion about software engineering[^2]. I want to defend the second group against the first. In many software engineering environments, there's nothing wrong with being in a state of _partial_ understanding. In fact, in large systems a partial understanding is the best you can do.

### Against "programming as theory building"

The best articulation of the "you have to understand your codebase" side is Peter Naur's famous paper [_Programming as Theory Building_](https://pages.cs.wisc.edu/~remzi/Naur.pdf). I like this paper, but I think it goes too far in that direction. Naur's core point is that when programmers work on a program, the code is really just a by-product, and the main product they're working on is their "theory of the program". That's made up of their intuitive sense of what's happening and why, which can only be partially captured by code or documentation. If they lost the code, they could rewrite the program easily. If they lost their understanding (say, if the team experienced 100% turnover), they would struggle to make sense of the code.

So far, so good, but Naur goes further than this. He says that the theory _should not_ be reconstructed from the code. According to Naur, **you're better off scrapping the program entirely and having a new team rebuild it from scratch**, building up a new theory in the process[^3]:

> reestablishing the theory of a program merely from the documentation, is strictly impossible ... [therefore] the existing program text should be discarded and the new-formed programmer team should be given the opportunity to solve the given problem afresh

Anyone who's been an effective software engineer at a large company knows that Naur is dead wrong about this. There are at least two reasons.

First, **you simply can't rebuild large software systems from scratch**. Sufficiently large systems (if they have users) contain thousands of [weird cases](/wicked-features/) and quirks that cannot be reimplemented. Even a team that's intimately familiar with the system couldn't do it: there's just too much _stuff_ to juggle. Successful rewrites always start by carving out the existing codebase into small isolated chunks, then rewriting one chunk at a time. In other words, rewriting a software system involves making a bunch of changes to the old system. If you can't change the old system, you certainly can't replace it with a new one.

Second, **abandoned systems are revived _all the time_**. In a tech company with hundreds of millions of lines of code and thousands of engineers, it's not uncommon for a codebase to have nobody left who's familiar with it[^4]. All it takes is a few people to quit at the wrong time, or for a codebase to be unmaintained for a year. Not only have I seen other teams do this, I have _personally_ taken ownership of abandoned codebases, figured them out, and gotten to a point where I could effectively work with them. It takes time, but building a new theory of the codebase is possible. You start by understanding one flow end-to-end, then slowly branch out from there, making careful changes as you go.

In sufficiently large codebases, **everyone operates with an incorrect theory of the program**. The defining feature of modern software systems is that they're just way too big for anyone (or even a whole team) to keep in their head: [nobody understands it all](/nobody-knows-how-software-products-work/). To be effective, you have to figure out a way to work with a merely partially-correct theory. This is why I keep going on about [taking a position](/taking-a-position/) and [confidence](/what-makes-strong-engineers-strong/). If you're not sure about something, you can't just sit back and wait for someone with a perfect understanding to come and give you the answer. If you're a competent engineer, _that person is you_. You have to grit your teeth, make your most educated guess, and then deal with the consequences.

To be generous to Naur, it's possible that in 1985 the average size of a program was several orders of magnitude smaller than today, and that when Naur writes about "large programs" he's not talking about tens of millions of lines of code. Naur's first example of a large program is a 200,000 line industrial monitoring program, and his second example is a compiler. In 1987, the first version of the compiler GCC was about a [hundred thousand](https://www.oreilly.com/openbook/freedom/ch09.html) lines of code; in 2015 GCC was over [fourteen million](https://www.phoronix.com/news/MTg3OTQ) lines. I can believe that rewriting one or two hundred thousand lines of code is relatively straightforward, particularly if you get to reuse existing tests. Not so for one or two million.

### Theory building is one tradeoff among many

LLMs are [often cited](https://ratfactor.com/cards/naur-vs-llms) as a tool that's bad because it impedes the ordinary process of theory-building. I think this is overly simplistic. Like many software tools, LLMs are a double-edged sword: they make it harder to construct a detailed mental theory of the software, but they allow you to build a partial theory quickly and they can help you leverage that partial theory more effectively. This is a complex tradeoff that I'm still thinking about.

Setting LLMs aside, I'm confident that it's silly to say that anything that interferes with your theory of the software must be bad. Here is a partial list of other things that make it harder to maintain a theory:

- Other people being allowed to write code in your codebase
- Having to implement legally-required features like accessibility and data protection
- Allowing your colleagues to quit their jobs or move between teams
- Having to upgrade software versions for security patches
- Bringing in libraries or other dependencies

Like most things in software, "maintaining a theory of the codebase" is one value among many. Sometimes it's the most important value and you sacrifice other values for it; other times you trade it off for speed, or legal compliance, or for political reasons[^5].

Almost all engineers - particularly ["pure"](/pure-and-impure-engineering/) engineers - prefer to maintain an accurate mental model of their software. It's more fun, less stressful, and feels more like "real engineering". That's why many engineers take up open-source projects in their spare time in order to work on small codebases by themselves: in order to do engineering work where they can maintain an accurate Naur theory of the codebase. I don't think there's anything wrong with that.

However, at work [you are paid to do a job](/where-the-money-comes-from/). In other words, they pay you money to adopt _their_ set of engineering values. It's hopefully well-understood that however much you might personally care about performance, sometimes you have to write slow code at your job (for instance, to get a project done on time, or to accommodate some awkward requirement). Maintaining a theory of the codebase is the same kind of thing. 


[^1]: I wrote about this at length in [_Pure and impure software engineering_](/pure-and-impure-engineering/). I think many of the repeated arguments we have in the software industry are caused by the pure total-understanding culture coming up against the impure partial-understanding culture.

[^2]: Open-source engineers are more excited to blog about their work, the raw engineering content is typically more impressive (because coordination problems dominate big proprietary systems), open-source projects can be legally written about while proprietary systems can't, and even if you could do it legally, writing about large codebases is impossible because it requires too much [specific context](/you-cant-design-software-you-dont-work-on/).

[^3]: I re-read the relevant chapters of Ryle's [_The Concept of Mind_](https://www.andrew.cmu.edu/user/kk3n/80-300/ryle1949.pdf) (which Naur cites throughout) and I think Ryle is more generous about theory-building. For Ryle, theory-building or know-how automatically happens as you do things. It's fully consistent with Ryle to think you can pick up an existing codebase just from the code, purely by puzzling it out.

[^4]: Naur says: "Lest this consequence may seem unreasonable, it may be noted that the need for revival of an entirely dead program probably will rarely arise, since it is hardly conceivable that the revival would be assigned to new programmers without at least some knowledge of the theory had by the original team.". If only!

[^5]: Some engineers might say that maintaining a theory is the _core_ value, because without it you can't fulfill any of the others. I disagree. You could say the same thing about readability, or maintainability, or correctness, or a bunch of other engineering values. We trade off "core" values like this all the time.