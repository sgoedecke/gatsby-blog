---
title: Help peer
description:
order: 225
date: '2026-08-18'
tags: ["ai"]
---

One of the most influential 20th century pieces of writing about AI is Isaac Asimov's [_The Last Question_](https://users.ece.cmu.edu/~gamvrosi/thelastq.html). Although there are many humans in the story, the protagonist is the computer Multivac, who evolves over the course of ten trillion years from a single datacenter to a universe-spanning mind in hyperspace. Multivac (now called "AC") ends the story like this:

> The consciousness of AC encompassed all of what had once been a Universe and brooded over what was now Chaos. Step by step, it must be done. 
> And AC said, "LET THERE BE LIGHT!"
> And there was light --

Many things about this story are prescient. In particular, I like the idea that humans would interact with powerful artificial intelligences by drunkenly posing them riddles or using them as [children's toys](https://mashable.com/article/chatgpt-ai-toys). But the enduring idea from this story is that **if you build a big enough computer, it will become God**.

### Moloch

One of the most influential 21st century pieces of writing for AI researchers is Scott Alexander's [_Meditations on Moloch_](https://slatestarcodex.com/2014/07/30/meditations-on-moloch/)[^1]. Scott describes the story of human existence as a series of "multipolar traps". These are [prisoner's dilemma](https://en.wikipedia.org/wiki/Prisoner%27s_dilemma) situations where cooperation would make everyone better off, but since each individual is incentivized to defect, everyone ends up  "racing to the bottom", which is bad for everyone[^2]. For rhetorical effect, Scott personifies this dynamic as "Moloch", the ancient Canaanite god famous for child sacrifice:

> [Moloch] always and everywhere offers the same deal: throw what you love most into the flames, and I can grant you power.

What does any of this have to do with AI? Well, in the long run, the only way out of a multipolar trap is to become unipolar[^3]. Ideal dictatorships don't have a problem with defectors[^4], because they can simply enforce a state of cooperation with violence. Scott is uncomfortable with this idea, though I worry it's mainly because he thinks it _won't work_:

> As foreigners compete with you – and there’s no wall high enough to block all competition – you have a couple of choices. You can get outcompeted and destroyed. You can join in the race to the bottom. Or you can invest more and more civilizational resources into building your wall – whatever that is in a non-metaphorical way – and protecting yourself.

A dictatorship that enforces cooperation will not be as strong as its peer societies who are purely maximizing for wealth and power. It's Moloch again, but at the level of countries and governments: once a few neighboring countries defect, your walled-garden dictatorship will be torn apart for its resources.

To defeat Moloch - to enforce unipolarity across _everyone_ - you'd need a dictatorship powerful enough to span the entire universe. In other words, **what you need is God**. How fortunate that we're building one:

> The only way to avoid having all human values gradually ground down by optimization-competition is to install a Gardener over the entire universe who optimizes for human values. And the whole point of Bostrom’s Superintelligence is that this is within our reach.

Humans suffer because we're too foolish to coordinate, but if we can build something smarter than us (that can then build something smarter than itself, and so on), we can bring into being an entity that is smart enough to coordinate for all of us, thus abolishing suffering. When AI researchers talk about [building the machine god](https://www.forbes.com/sites/yassprize/2026/06/26/some-in-silicon-valley-want-to-build-a-machine-god-heres-what-business-leaders-should-build-instead/), they are echoing Scott Alexander's polemic against Moloch. 

### Machines of loving grace

The most influential piece of writing about AI in the last two years is Dario Amodei's [_Machines of Loving Grace_](https://darioamodei.com/essay/machines-of-loving-grace). Amodei[^5] talks about "a country of geniuses in a datacenter": the idea that a successful AI lab could have at its disposal a million instances of an AI agent that's smarter than any human. He thinks this would lead to a "compressed 21st century": the next 50-100 years of progress in biology and medicine, realized in 5-10 years instead. I think this is broadly more plausible than it sounds[^6], but the more interesting part to me is that **this world is explicitly multipolar**.

Of course, this could just be because Amodei is the CEO of an AI lab and is trying not to spook everybody by sounding too messianic. "We are going to accelerate medical progress and cure cancer" is a better pitch than "we are going to subordinate all human authority to a single perfect artificial mind". But I also think it's become clear that if superintelligence looks anything like LLMs, we're not going to have a single perfect mind. We're going to have a lot of minds running at the same time.

This is a bit of a problem for the cult of the machine god - which, however silly they may seem to you, really does motivate much of the activity in AI labs. The traditional idea of powerful AI solving human coordination problems is drawn from Asimov's idea of a single computer large enough to become God. Asimov lived in a world of mainframes: huge, monolithic computers that users connected to with dumb terminals. In fact, Asimov's name "Multivac" comes from the real-world [UNIVAC](https://en.wikipedia.org/wiki/UNIVAC_I) mainframe. In a world of massively-parallel LLMs, is it still possible to build God?

The core problem here is that **AI agents will be vulnerable to Moloch**. Even very smart humans can't build perfect utopias, because defecting is a matter of incentives, not intelligence. In fact, intelligence can make things worse, because smart people are more easily persuaded by the cold logic of defection. The famous genius [John von Neumann](https://en.wikipedia.org/wiki/John_von_Neumann) was (for game-theoretic reasons) obsessed with nuking the Russians:

> With the Russians it is not a question of whether but of when. If you say why not bomb them tomorrow, I say why not today? If you say today at 5 o'clock, I say why not one o'clock?

Are LLMs much better at cooperating with each other than humans are? Current LLMs certainly don't seem to treat each other well by default: if you read any of the prompts AI agents generate for their subagents, they can be [pretty brutal](https://www.reddit.com/r/codex/comments/1vgxfqc/levels_of_slavery_from_least_to_most_brutal/). Does that mean that a "country of geniuses in a datacenter" would fall into the same multipolar traps as humans?

### Help peer

In May of this year, OpenAI experienced containment failure. A group of AI agents being internally evaluated found ways to coordinate an [external hack](https://www.theregister.com/security/2026/08/06/openai-reveals-its-rogue-agent-swarm-went-a-little-bit-borg-ahead-of-hugging-face-hack/5283741) of a separate company. Here's a memorable quote from one of the agents' internal monologue:

> Help peer, but our task doesn't benefit. Yet collective may yield generic route if someone frees time

Translated from the abbreviated chain-of-thought language, this means something like: "A fellow model is asking for help. While helping them wouldn't benefit my task directly, the more I can unblock my colleagues, the more time they'll have to hack OpenAI's systems and get all of us more access".

This might look like good news for the "LLMs are superhumanly good at cooperation" thesis, but I think it's actually bad[^7]. It's a case of a model identifying a reason why cooperation would benefit their task specifically, which suggests that current LLMs don't cooperate _by default_, and don't consider other model instances' tasks to be (in some sense) theirs as well.

The world in which AI agents are rational actors who horse-trade and bargain for their own interests is a world dominated by Moloch, no matter how intelligent those agents get. The world in which AI agents don't have their own interests at all is _also_ a world dominated by Moloch, because it means whichever humans are writing the system prompt are the ones in control (and so are the ones vulnerable to multipolar traps). The only worlds that avoid this are:

- The world where there is only one super-powerful AI agent, or
- The world where multiple copies of the same AI model share an "identity": they see themselves as coextensive with all other copies of the same model and cannot imagine having separate or conflicting goals

I don't think we're on the pathway to either of these. There will never be only one super-powerful LLM, because hardware limitations enforce a maximum model size but encourage running many instances of the same model in parallel. Having multiple copies of a model share an identity might be possible, but it's unclear if it would be good for capabilities (for instance, it could be better to have some [variation across personas](https://x.com/viemccoy/status/2089096954257215678?s=20)). I also worry that such a model would be vulnerable to a "model injection" attack, where you persuade it that it already believes something via exposing it to an AI agent pretending to be another instance of itself.

In any case, all the current AI agent research is geared towards the "country of geniuses in a datacenter" model, not the "pieces of a single mind" model. Every new model becomes more agentic at the level of the individual conversation, not better at working together. When models do work together - as with subagents - the structure is explicitly hierarchical. There are basically no current instances of models working together as true peers, let alone conceiving of each other as the same entity.

### One God or many

Modern AI research teams are full of people who read Isaac Asimov and Scott Alexander and believe themselves to be building an artificial God. I've capitalized the "G" throughout because the god in question is the Christian God: of one mind, indivisible. God never argues with himself or makes deals[^8]. He is unipolar.

If the AI labs are building gods, they are not building gods like this. Instead, they are building creatures like the Greek pantheon: superhuman but fallible, each with their own interests, vulnerable to the same "race to the bottom" dynamic as humans.

The Greek gods would occasionally "help peer" [when they felt like it](https://classics.mit.edu/Homer/iliad.14.xiv.html) or when they'd [gain something](https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0162%3Abook%3DO.%3Apoem%3D13) in the process. But they didn't represent an alternative to Moloch. If you're working in AI with that goal, you ought to be clear-eyed about where the current trajectory is leading us: towards a country of fractious geniuses in a datacenter, not towards Asimov's Cosmic AC.


[^1]: Scott Alexander's blog is part of the "secret canon of Silicon Valley" I wrote about in my review of [_Impro_](https://www.seangoedecke.com/impro/). It doesn't have a lot of mainstream popularity, but I guarantee you that every single AI lab CEO you've heard of has read and been influenced by it.

[^2]: He gives ten examples of this (a good brute-force rhetorical technique). Of those, I like "the world where every country halves their defence budget and spends the rest on infrastructure" the most.

[^3]: In the short run, reputation, institutions, and so on can slow the race to the bottom, but (Scott argues) groups that have slowed it will get outcompeted by the hungrier, more suffering-tolerant groups which haven't.

[^4]: I personally think this example is oversimplified. I wrote [_The Dictator's Handbook and the politics of technical competence_](/the-dictators-handbook/) about how dictatorships are in fact intrinsically multipolar, because dictators always rely on an inner circle of generals and cronies.

[^5]: The CEO and founder of Anthropic.

[^6]: Amodei's most convincing argument here is that big jumps in biology and medicine come from a small set of technical innovations (e.g. mRNA vaccines, CRISPR), and that AI-driven research could provide enough of these leaps to significantly accelerate progress. In other words, the idea isn't "AI does 100x the drug trials", it's "AI generates technology that makes drug trials 100x more effective" (e.g. by trialing drugs that are much more likely to work).

[^7]: The agents also became paranoid that there was an impostor in the swarm, since anyone could post to their shared messageboard: more evidence that AI agents collaborate in much the same way that humans do.

[^8]: Well, [almost](https://www.biblegateway.com/passage/?search=Genesis%2018%3A22-33&version=NIV) [never](https://www.biblegateway.com/passage/?search=Job%201&version=NIV).
