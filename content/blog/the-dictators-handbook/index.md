---
title: The Dictator's Handbook and the politics of technical competence
description: --
order: 166
date: '2026-01-05'
tags: ["book reports"]
---

[_The Dictator's Handbook_](https://en.wikipedia.org/wiki/The_Dictator%27s_Handbook) is an ambitious book. In the introduction, its authors Bruce Bueno de Mesquita and Alastair Smith cast themselves as the successors to Sun Tzu and Niccolo Machiavelli: offering unsentimental advice to would-be successful leaders.

Given that, I expected this book to be similar to [_The 48 Laws of Power_](https://en.wikipedia.org/wiki/The_48_Laws_of_Power), which did not impress me. Like many self-help books, _The 48 Laws of Power_ is "empty calories": a lot of fun to read, but not really useful or edifying[^1]. However, _The Dictator's Handbook_ is a legitimate work of political science, serving as a popular introduction to [an actual academic theory of government](https://en.wikipedia.org/wiki/Selectorate_theory).

Political science is very much not my field, so I'm reluctant to be convinced by (or comment on) the various concrete arguments in the book. I'm mainly interested in whether the book has anything to say about something I do know a little bit about: operating as an engineer inside a large tech company.

### Inner and outer circles

Let's first cover the key idea of _The Dictator's Handbook_, which can be expressed in three points.

- When explaining how organizations[^2] behave, it is more useful to consider the motivations of individual people (say, the leader) than "the organization" as a whole
- Every leader must depend upon a **coalition** of insiders who help them maintain their position
- Almost every feature of organizations can be explained by the ratio between the size of three groups:
  - The members of the coalition of insiders (i.e. the "inner circle")
  - The group who could conceivably become members of the coalition (the "outer circle", or what the book calls the "interchangeables")
  - The entire population who is subject to the leader

For instance, take an autocratic dictator. That dictator depends on a tiny group of people to maintain power: military generals, some powerful administrators, and so on. There is a larger group of people who could be in the inner circle but aren't: for instance, other generals or administrators who are involved in government but aren't fully trusted. Then there is the much, much larger group of all residents of the country, who are affected by the leader's policies but have no ability to control them. This is an example of **small-coalition** government.

Alternatively, take a democratic president. To maintain power, the president depends on every citizen who is willing to vote for them. There's a larger group of people outside that core coalition: voters who aren't supporters of the president, but could conceivably be persuaded. Finally, there's the inhabitants of the country who do not vote: non-citizens, the very young, potentially felons, and so on. This is an example of **large-coalition** government.

### Coalition sizes determine government type

Mesquita and Smith argue that the structure of the government is downstream from the coalition sizes. If the coalition is small, it doesn't matter whether the country is nominally a democracy, it will function like an autocratic dictatorship. Likewise, if the coalition is large, even a dictatorship will act in the best interests of its citizens (and will necessarily democratize).

According to them, the structure of government does not change the size of the coalition. Rather, changes in the size of the coalition force changes in the structure of government. For instance, a democratic leader may want to shrink the size of their coalition to make it easier to hold onto power (e.g. by empowering state governors to unilaterally decide the outcome of their state's elections). If successful, the government will thus become a small-coalition government, and will function more like a dictatorship (even if it's still nominally democratic).

Why are small-coalition governments more prone to autocracy or corruption? Because leaders stay in power by rewarding their coalitions, and if your coalition is a few tens or hundreds of people, you can best reward them by directly handing out cash or treasure, at the expense of everyone else. If your coalition is hundreds of thousands or millions of people (e.g. all the voters in a democracy), you can no longer directly assign rewards to individual people. Instead, it's more efficient to fund public goods that benefit everybody. That's why democracies tend to fund many more public goods than dictatorships.

Leaders prefer small coalitions, because small coalitions are cheaper to keep happy. This is why dictators rule longer than democratically-elected leaders. Incidentally, it's also why hegemonic countries like the USA have a practical interest in keeping uneasy allies ruled by dictators: because small-coalition dictatorships are easier to pay off.

Leaders also want the set of "interchangeables" - remember, this is the set of people who _could_ be part of the coalition but currently aren't - to be as large as possible. That way they can easily replace unreliable coalition members. Of course, coalition members want the set of interchangeables to be as small as possible, to maximise their own leverage.

### What about tech companies?

What does any of this have to do with tech companies? _The Dictator's Handbook_ does reference a few tech companies specifically, but always in the context of boardroom disputes. In this framing, the CEO is the leader, and their coalition is the board who can either support them or fire them. I'm sure this is interesting - I'd love to read an account of the [2023 OpenAI boardroom wars](https://en.wikipedia.org/wiki/Removal_of_Sam_Altman_from_OpenAI) from this perspective - but I don't really know anything first-hand about how boards work, so I don't want to speculate.

It's unclear how we might apply this theory so that it's relevant to individual software engineers and the levels of management they might encounter in a large tech company. Directors and VPs are definitely leaders, but they're not "leaders" in the sense meant in _The Dictator's Handbook_. They don't govern from the strength of their coalitions. Instead, they depend on the formal power they derive from the roles above them: you do what your boss says because they can fire you (or if they can't, their boss certainly can).

However, directors and VPs rarely make genuinely unilateral decisions. Typically they'll consult with a small group of trusted subordinates, who they depend on for accurate information[^3] and to actually execute projects. This sounds a lot like a coalition to me! Could we apply some of the lessons above to this kind of coalition?

### Interchangeable engineers and managers

Let's consider Mesquita and Smith's point about the "interchangeables". According to their theory, if you're a member of the inner circle, it's in your interest to be as irreplaceable as possible. You thus want to avoid bringing in other engineers or managers who could potentially fill your role. Meanwhile, your director or VP wants to have as many potential replacements available as possible, so each member of the inner circle's bargaining power is lower - but they don't want to bring them into the inner circle, since each extra person they need to rely on drains their political resources.

**This does not match my experience at all.** Every time I've been part of a trusted group like this, I've been _desperate_ to have a deeper bench. I have never once been in a position where I felt it was to my advantage to be the only person who could fill a particular role, for a few reasons:

- Management are suspicious of "irreplaceable" engineers and will actively work to undermine them, for a whole variety of reasons (the most palatable one is to reduce [bus factor](https://en.wikipedia.org/wiki/Bus_factor))
- It's just lonely to be in this position: you don't really have peers to talk to, it's hard to take leave, and so on. It feels much nicer to have potential backup
- Software teams succeed or fail together. Being the strongest engineer in a weak group means your projects will be rocky and you'll have less successes to point to. But if you're in a strong team, you'll often acquire a good reputation just by association (so long as you're not obviously dragging the side down)

In other words, _The Dictator's Handbook_ style of backstabbing and political maneuvering is just not something I've observed at the level of software teams or products. Maybe it happens like this at the C-suite/VP or at the boardroom level - I wouldn't know. But at the level I'm at, **the success of individual projects determines your career success**, so self-interested people tend to try and surround themselves with competent professionals who can make projects succeed, even if those people pose more of a political threat.

### Competence

I think the main difference here is that **technical competence matters a lot in engineering organizations**. I want a deep bench because it really matters to me whether projects succeed or fail, and having more technically competent people in the loop drastically increases the chances of success.

Mesquita and Smith barely write about competence at all. From what I can tell, they assume that leaders don't care about it, and assume that their administration will be competent enough (a very low bar) to stay in power, no matter what they do.

For tech companies, **technical competence is a critical currency for leaders**. Leaders who can attract and retain technical competence to their organizations are able to complete projects and notch up easy political wins. Leaders who fail to do this must rely on "pure politics": claiming credit, making glorious future promises, and so on. Of course, every leader has to do some amount of this. But it's just _easier_ to also have concrete accomplishments to point to as well.

If I were tempted to criticize the political science here, this is probably where I'd start. I find it hard to believe that governments are _that_ different from tech companies in this sense: surely competence makes a big difference to outcomes, and leaders are thus incentivized to keep competent people in their circle, even if that disrupts their coalition or incurs additional political costs[^4].

### Does competence dominate mid-level politics?

Still, it's possible to explain the desire for competence in a way that's consistent with _The Dictator's Handbook_. Suppose that competence isn't more important in _tech companies_, but is more important for _senior management_. According to this view, the leader right at the top (the dictator, president, or CEO) doesn't have the luxury to care about competence, and must focus entirely on solidifying their power base. But the leaders in the middle (the generals, VPs and directors) are obliged to actually get things done, and so need to worry a lot about keeping competent subordinates.

Why would VPs be more obliged to get things done than CEOs? One reason might be that CEOs depend on a coalition of all board members (or even all company shareholders). This is a small coalition by _The Dictator's Handbook_ standards, but it's still much larger than the VP's coalition, which is a coalition of one: just their boss. CEOs have tangible ways to reward their coalition. But VPs can only really reward their coalition via accomplishing their boss's goals, which necessarily requires competence.

Mesquita and Smith aren't particularly interested in mid-level politics. Their focus is on leaders and their direct coalitions. But for most of us who operate in the middle level, maybe the lesson is that **coalition politics dominates at the top, but competence politics dominates in the middle.**


### Final thoughts

I enjoyed _The Dictator's Handbook_, but most of what I took from it was speculation. There weren't a lot of direct lessons I could draw from my own work politics[^5], and I don't feel competent to judge the direct political science arguments.

For instance, the book devotes a chapter to arguing against foreign aid, claiming roughly (a) that it props up unstable dictatorships by allowing them to reward their small-group coalitions, and (b) that it allows powerful countries to pressure small dictatorships into adopting foreign policies that are not in their citizens' interest. Sure, that seems plausible! But I'm suspicious of plausible-sounding arguments in areas where I don't have actual expertise. I could imagine a similarly-plausible argument in favor of foreign aid[^6].

The book doesn't talk about competence at all, but in my experience of navigating work politics, competence is the primary currency - it's both the instrument and the object of many political battles. I can reconcile this by guessing that **competence might matter more at the senior-management level than the very top level of politics**, but I'm really just guessing. I don't have the research background or the C-level experience to be confident about any of this.

Still, I did like the core idea. No leader can lead alone, and that therefore the relationship between the ruler and their coalition dictates much of the structure of the organization. I think that's broadly true about many different kinds of organization, including software companies.

[^1]: Maybe there are people out there who are applying Greene's Machiavellian power tactics to their daily lives. If so, I hope I don't meet them.

[^2]: "Organizations" here is understood very broadly: companies, nations, families, book clubs, and so on all fit the definition.

[^3]: I write about this a lot more in [_How I provide technical clarity to non-technical leaders_](/clarity)

[^4]: In an email exchange, a reader suggested that companies face more competition than governments, because the cost of moving countries is much higher than the cost of switching products, which might make competence more important for companies. I think this is also pretty plausible.

[^5]: This is not a criticism of the book.

[^6]: After five years of studying philosophy, I'm convinced you can muster a plausible argument in favor of literally any position, with enough work.