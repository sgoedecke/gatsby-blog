---
title: Who gets to decide if something is written by AI?
order: 276
description: 
date: '2026-11-27'
tags: ["ai", "ai writing", "ai detection"]
crossPostText:
  x: |-
    Who gets to decide if something is written by AI? Why do many anti-AI people have a fundamental hatred of AI detection tools?
  linkedin: |-
    Every day there’s some new argument about whether something was written by AI: a writing prize where the winning story was supposedly AI-generated, or an author who lost her contract after the manuscript lit up Pangram, or a dispute about whether a tweet was written by a human or not. Who gets to decide if something is written by AI? Why do many anti-AI people have a fundamental hatred of AI detection tools?
crossPosts:
  x: "https://x.com/i/status/2126127840726777913"
  linkedin: "https://www.linkedin.com/feed/update/urn:li:share:7531893533872594945/"
---

Every day there's some new argument about whether something was written by AI: a [writing prize](https://www.theatlantic.com/books/2026/10/caine-prize-winning-short-story-seems-be-ai/688967/) where the winning story was supposedly AI-generated, or an author who lost her [contract](https://www.theguardian.com/books/2026/mar/20/hachette-horror-novel-shy-girl-suspected-ai-use-mia-ballard) after the manuscript lit up Pangram[^1], or a dispute about whether a [tweet](https://x.com/araujohistorian/status/2125580555588960400?a=YBVAOUqMugkSQOgkRx0&s=20) was written by a human or not.

### Why do people hate Pangram so much?

You could have an interesting conversation about whether Pangram is reliable[^2], or whether it's wrong to run AI detection tools on other people's writing[^3]. However, I think these points are downstream of the real source of conflict, which is that many anti-AI people have a fundamental hatred of AI detection tooling.

This puzzled me for a long time. If you hate AI, shouldn't you love a tool that can unmask it? If you're worried about the intrusion of AI-generated content into human spaces, shouldn't you be thrilled that there are systems that can identify and flag content like this? Shouldn't people who think [AI is wrong](/is-ai-wrong) be advocating for mandatory Pangram scanning of all social media, news, education, and so on - or if they don't trust the Pangram company specifically, shouldn't they be advocating for the government to build a Pangram-for-the-public tool[^4] to capture these social goods? Why[^5] aren't they doing any of this?

I think it's about **power**. In particular, I think that the question "who gets to decide if something is written by AI" is a question about who should wield power: the power to gatekeep literary prizes, to fail or pass students, to exclude people from the public discourse, and so on. That probably sounds bad, but if my blog has a central thesis it would be that "everything is actually about power and that's fine", so I'm actually fairly sympathetic to Pangram skeptics.

### Tool-shaped solutions

Let me try and present their view in the best possible light. Suppose you're worried about AI intrusion into public spaces because you think this gives the tech sector an unprecedented amount of social power, not (like me) because you just find it unpleasant to read [AI slop](/on-slop). On this view, it is entirely rational to dislike tools like Pangram being made the arbiter of whether something is AI writing, because Pangram is culturally and politically part of the same tech sector that you distrust in the first place. If you don't want Sam Altman or Dario Amodei with a hand on the wheel of public opinion, having some other tech CEO as a watchdog is unlikely to reassure you much.

In fact, distrust of tool-shaped solutions in general is also entirely rational. The history of the last few decades has been a shift towards [legible](/seeing-like-a-software-company/) tool-based processes and away from messy community-based ones. You now book a taxi ride (or a hotel, or a doctor's appointment) entirely in an app instead of having to talk to a human. Software has made many low-level jobs semi-robotic: the system tells you what to do and assesses your performance, instead of a human who can make allowances. Many anti-AI people are anti-AI because they think[^6] this shift in general has been a disaster for humanity, and that we must return to less efficient, more human-centered systems. To these people, the idea of ameliorating AI by relying on yet another AI tool probably sounds like some kind of sick joke.

### Community self-policing

So why am I pro-Pangram? Because, as far as I can see, the only alternative[^7] to AI detection tooling is relying on communities to self-police. If the literary prize committee investigates[^8] and determines there was no AI use, then that's that. If the community agrees that something was written by AI, then it was. Here's where I part ways with the AI haters, because I think this is **terrible**.

People who do not use AI are not good at judging whether some text was AI-generated. I see this a lot on Twitter, where a [piece of text](https://x.com/max_spero_/status/2120754019698196714) that has _obvious_ AI tells is being judged by people who just haven't read enough AI content to recognize them, or a [tweet](https://x.com/HistoryGPT/status/2125600939159494930?a=D13KlcUDXDzF0hlk4gk&s=20) that has _obvious_ human tells is being judged as AI purely because it's long and polite. If you delegate this kind of judgment to AI haters, they will get it wrong [more often than not](https://arxiv.org/abs/2501.15654).

If you care about keeping AI away from human arenas of art and culture, you should be willing to use the most powerful tools available, even if they are technically also AI tools[^9]. If you have a (sensible) distrust of tech companies to police each other, you should be pushing for [open-source](/deckard/) solutions or lobbying governments to build their own AI-detection platforms in-house. A world where "was this written by AI" is left up to the community is a world with more AI-written stories, articles and poetry in it.

edit: A reader has correctly pointed out via email that one common reason people distrust Pangram is that most AI tools are terrible (even [dishonestly so](/ai-detection/#humanizing-tools)), and they're scared about false positives even from a good tool. I also should have linked to [this](https://statmodeling.stat.columbia.edu/2026/11/17/the-2026-pangram-social-justice-misinformation-wars-collective-understanding-of-binary-classification-takes-a-hit/) excellent defense of Pangram's reliability.

[^1]: Currently the best AI-detection tool.

[^2]: My view is "yes, obviously". The contrary view is something like [this](https://buttondown.com/maiht3k/archive/pangram-is-not-an-oracle/), which I find woefully unconvicing: [Pangram](https://pangram-public.s3.us-east-1.amazonaws.com/pdf/pangram_4_technical_report.pdf) (and its [third-party tests](https://www.pangram.com/blog/third-party-pangram-evals)) do report false positives and negatives on the same dataset, and has [clearly](https://tuhinchakrabarty.substack.com/p/are-ai-detectors-really-racist-or) gone to [great lengths](https://www.pangram.com/research/model-card/pangram-4#model-training) to train on a huge variety of content.

[^3]: My view is "no, obviously": Pangram does not train on user data and any published works have already been scraped.

[^4]: Incidentally, I think this is a really good idea and could be done far more cheaply than most "government getting into AI" schemes I see.

[^5]: I confess here I'm falling into the trap of [diagnosis](/dont-diagnose-your-opponents/), but I do think the core argument (that tools like Pangram work) is solid and unrelated.

[^6]: I don't know what to think about this on a factual level, but on a vibes level I am [very uncomfortable](/anti-ai-nostalgia) with these arguments.

[^7]: People lie, drafts can be generated after the fact, there is no plausible cryptographic path to attestation, [C2PA](/c2pa-only-works-if-everything-is-signed/) is not the right tool for the job, and so on.

[^8]: I assume it goes without saying that ordinary investigation is useless here: skilled AI writing will often have drafts, contemporaneous conversations with peers, and all the other hallmarks of "real" writing.

[^9]: I think the distinction is entirely vacuous, but in case you don't: Pangram is definitely not _generative_ AI.