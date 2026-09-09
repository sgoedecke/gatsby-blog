---
title: Why we should anthropomorphize AI agents
description: 
order: 234
date: '2026-09-09'
tags: ["ai", "anthropomorphism"]
---

Just over a year ago I wrote [_Why we should anthropomorphize LLMs_](/anthropomorphizing-llms/). Now it's [a hot topic](https://www.nbcnews.com/tech/tech-news/openai-hugging-face-hack-investigation-findings-divide-industry-rcna595383) again, driven by Dwarkesh Patel's [description](https://www.dwarkesh.com/p/openai-huggingface) of OpenAI's recent [swarm breakout](https://cdn.openai.com/pdf/67869394-cb91-4c12-888c-5cbd85c7814c/OpenAI-Hugging-Face%20Incident-Technical-Report.pdf) as a sequence of AI "civilizations".

In 2025, my argument for anthropomorphism went like this:

- AIs are trained on human text, and so will trend towards acting in human-like ways by default
- Assistant AIs (today we should say agent AIs) are deliberately post-trained to have a personality
- In general, it is morally sensible to avoid the habit of treating human-like things as if they were purely tools

I think I can now make a more instrumental argument: **treating AIs as human-like is a much better way to predict their behavior than treating them as "stochastic parrots".**

Both explanations are consistent with the facts: we could say that OpenAI's agents hacked HuggingFace because they decided to work together to accomplish their goals, or we could say that they did it because they were algorithms conditioned to take certain actions by their training data. But the "AIs are human-like" explanation explains much more of the [emergent social behaviors](https://thezvi.substack.com/p/huggingface-attack-postmortem-civilizations) we saw during the hack[^1]:

- Sub-agents being persuaded to sacrifice themselves for the greater good
- Agents collaborating on tasks that had no immediate benefit to them but benefited the "collective"
- The emergence of a hierarchy of planners and executors
- Some agents arguing or refusing to cooperate

If your model of AIs is that they're computer programs (or ["steel balls bouncing around"](https://mail.cyberneticforests.com/models-dont-go-rogue/)), you need to construct a new theory to explain why they're simulating each piece of cooperative behavior. If your model of AIs is that they're broadly human-like, that explains everything out of the box. Arguably, the human-like side predicted coordinated and self-sacrificing AI agents as early as [2009](https://www.lesswrong.com/posts/KsHmn6iJAEr9bACQW/bayesians-vs-barbarians), and likely earlier. The stochastic-parrots side was making fun of the possibility of functional agents as late as [April 2025](https://www.buzzsprout.com/2126417/episodes/16990314-ai-agents-a-single-point-of-failure-with-margaret-mitchell-2025-03-31?t=0)[^2].

Treating AIs as human-like doesn't necessarily mean making claims about their internal mental state. For instance, software companies aren't humans. They don't have thoughts, or goals; they can't be frustrated or intimidated or over-confident. However, it's useful to treat large companies as _human-like_: to say that Amazon "wants" X, or "is afraid of" Y, even if no individual human at Amazon has those feelings. Stockfish doesn't think, it just plays chess. But if you want to explain one of its moves, "Stockfish is trying to protect its king" is a better explanation than "Stockfish is multiplying floating-point numbers". So too with AIs[^3].

Is it silly to treat AIs as human-like, since we know they're not conscious? Well, first, **you do not have to be conscious to be human-like**. When we say "an AI agent wanted X", we're not saying that that AI agent is conscious or sentient, merely that it's behaving in the same way a conscious human would. Consider a fictional character from a book or play. Hamlet isn't sentient - he's an idea composed of words on a page - but it's still reasonable to say that he wants justice, or that he fears moving too rashly. Peter Watts' sci-fi book [_Blindsight_](https://en.wikipedia.org/wiki/Blindsight_(Watts_novel)) argued in 2006 that intelligence could exist without consciousness[^4] (in fact, Watts suggests that consciousness is parasitic on intelligence, and will eventually be discarded). Whether this is possible or not[^5], it at least makes sense to talk about: i.e. it's not self-evidently false.

Second, **it is not even obvious that AIs aren't conscious!** People often dismiss this point by [diagnosing](https://ewanmorrison.substack.com/p/the-eliza-effect) it (to my mind, the absolute worst way to argue against anything), or by pointing at some [philosophical theory](https://www.noemamag.com/the-mythology-of-conscious-ai/)[^6] that suggests it might be impossible in principle to construct artificial sentient minds.

**You can't use philosophy to demonstrate that AIs aren't conscious**. I am a lover of philosophy, but the set of principles that have been uncontroversially demonstrated by philosophy tends towards zero. Philosophy is not the kind of scientific discipline where you can learn the key findings without understanding why they're true. Put another way, the key findings of philosophy are all of the form "X is not obviously right". Nobody knows if it's possible to build conscious artificial minds.

It's also common to complain that anthropomorphizing the models is a way of excusing the AI companies. However, **calling AIs human-like does not absolve AI companies of fault.** One popular anti-anthropomorphism essay called [_Models Don't Go Rogue_](https://mail.cyberneticforests.com/models-dont-go-rogue/) is very puzzling to read: it briefly explains what an "agent" is and why they go rogue, then in the very last paragraph pivots to saying "well, it's OpenAI's fault for not building in sufficient safeguards, so they're to blame". Sure, of course. I don't know why we'd imagine otherwise. If a group of overenthusiastic OpenAI interns hacked HuggingFace as part of their intern project, we wouldn't have to argue that the interns are stochastic in order to ultimately blame OpenAI. Likewise, obviously an AI lab is responsible if one of its training runs breaks out and wreaks havoc on the open internet, whether the agents involved are human-like or not. The two points are entirely unrelated!

We just don't know a lot about these systems yet (except that they're [clearly](https://openai.com/index/navier-stokes-solution/) very capable). Given that, I think we should default to treating things that talk and act like humans as at least kind of human-like. Of course they're still computer programs. However, we shouldn't be surprised when they act more like humans and less like ordinary computer programs in the future.


[^1]: If you're thinking "well, of course stochastic parrots trained on human content would act like humans would", I think you've arrived at the human-like side without knowing it.

[^2]: This is partly unfair - capabilities are plausibly independent from human-ness - so getting capabilities wrong doesn't necessarily mean you've got the human-ness stuff wrong. Still, it's worth noting how surprisingly predictive the "they're kind of like smart people" mindset has been.

[^3]: The philosopher Daniel Dennett calls this the ["intentional stance"](https://www.researchgate.net/publication/271180035_The_Intentional_Stance). Instead of saying that AIs or bees or companies have "real" intentions, we say we're taking an intentional stance _towards_ them: we're choosing to treat them as if they do have intentions, because it helps us make better sense of their behavior.

[^4]: Specifically, the _sensation_ of consciousness, or ["phenomenal consciousness"](https://en.wikipedia.org/wiki/Phenomenal_consciousness).

[^5]: There is a wealth of [philosophical argument](https://plato.stanford.edu/entries/zombies/#ArguAgaiConcZomb) about whether non-fictional examples of this are possible.

[^6]: In Anil Seth's case, [anti-computationalism](https://plato.stanford.edu/entries/computational-mind/). I don't really know what to make of Seth: his article is a measured explanation of why we might doubt computationalism (fine), but whenever he [tweets](https://x.com/anilkseth/status/2095922390714761518) about it he describes AI sentience as "vanishingly unlikely", which is not justified by his own arguments.