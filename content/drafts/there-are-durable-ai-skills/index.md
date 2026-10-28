---
title: Getting good at AI takes time and practice
description: 
order: 200
date: '2026-05-23'
tags: ["writing", "meta"]
---


It's a [popular take](https://fishbowl.pastiche.org/2026/10/26/ai-skills) that getting "good at AI" is trivial. Sure, with some early models there were tricks you had to learn,[^1] but current models don't need them. Even if there are different tricks[^2] that work on current models, the next generation will render them obsolete, so why bother? Just tell the model what you want it to do.

This take is particularly popular with the anti-AI crowd, who scoff[^3] at the idea that AI-reluctant people are being left behind. According to them, if AI does ever become capable enough to be worth using, they'll be able to start using it with no learning curve. Is that right?

No. Like most things, getting good at using AI takes time and practice. Here's a list of some concrete skills[^4] that take time to master.

## Rapidly skim-reading AI slop

AI models produce a lot of useful output, but it's often lost in a thick forest of verbiage. Once you've read enough of it, you can sort of just let your eyes flow over the phrasing until you get to the specific claims and evidence. If you're not used to this, you will waste a lot of time and emotional energy trying to cut through the foliage.

## Supplying the right context

One failure mode I've seen with people who are new to AI is expecting it to read their mind: for instance, asking it to "solve my issue" without ever saying what the issue is, or asking it some Slack-related problem without actually connecting your agent to Slack. Agents are flexible and will try their absolute hardest to guess what problem you're facing and how to solve it, but the guesses will be largely wrong. Skilled AI users will pick up on the fact that the agent is missing key context and backtrack.

Skilled AI users will also reflexively include [why](/tell-agents-the-why/) they want to achieve their current goal, so that the agent has enough context to make decisions. This is often non-trivial: most of us know what we want to do but have to take a second to think about the broader reasons behind it.

## Knowing what the model can and can't do

AI capabilities are _weird_: they are very good at some tasks and very bad at others, and it's hard to predict which task falls into which category. For instance, I know that I can ask an agent to come up with new architectural ideas for how to structure a service, but that I shouldn't ask it to come up with new features that the service can offer. Worse still, there is a third category[^5] of tasks that AI models are bad at but can be prompted into being good: for instance, writing PR descriptions.

Of course, this changes with new models, but less than you'd think. In general, new models get much better at the tasks the old models were already good at, and a little better at the tasks the old models sucked at. So developing a sense of what AI can and can't do is a surprisingly durable skill.

Really internalizing what the model can do is trickier than it sounds. For instance, I initially struggled to set up MCP servers for GitHub Copilot before realizing[^6] I could just ask Copilot to install its own MCP servers. I now reflexively ask AI agents to do local testing of changes - standing up servers, hammering them with curls, running through variations and edge cases - but it took me a while to realize I could ask for that. I have only just started scheduling a job for 6am my time for an agent to go through messages that have come in from different timezones and do some preliminary investigation. What other capabilities[^7] am I leaving on the table? 

### Knowing what mistakes the models make

Reviewing AI-generated code is a substantially different skillset from reviewing human-written code. There are whole categories of bugs - off-by-one errors, for instance - that human-written code is prone to but AI-generated code is not. Similarly, there are mistakes that are rare in human-written code but are very common in AI-generated code. I've written about how these tend to be mistakes of [misalignment](/human-ai-partnerships-are-for-alignment-not-capability/): over-engineering some areas that humans would know aren't important, or trading off important requirements in order to satisfy made-up ones, and so on. 

Skilled reviewers are often dazzled by the fluency of AI-generated code. It's always exhaustively commented and tested and uses sophisticated language features. If a human programmer produced code like this, you'd be inclined to trust their judgment that a mutex is required in this case - but with an AI programmer, you ought to be very suspicious about new mutexes, which are often introduced to satisfy completely insignificant edge cases.

## Will these skills be made obsolete too?

It's possible that these skills are also temporary. Maybe we won't ever need to AI slop because the agent will just do what we want perfectly, freeing us from the need to actually read its output. Maybe model tooling will get good enough to automatically supply the right context, and the models get good enough to be able to do everything and make no mistakes. Maybe! But in this world, there would be no need for humans to do anything at all.

Don't be a doomer. Like chess, software's centaur age - the period where a human-machine pairing can beat individual humans or machines - may last [decades](/softwares-centaur-age-may-last-decades/). Developing skills for the centaur age is still worthwhile, just like it was worthwhile to learn Angular or React even though it seemed likely that those frameworks would be obsolete[^8] in a decade.

## Conclusion

That working with AI involves actual skills shouldn't be surprising. It's like working with a really weird person: a savant with mad skills in some areas and huge gaps in others, a prolific but inexpert communicator, a workaholic with no long-term memory, and so on. If you were a manager and had someone like that as your employee, you could likely get a lot of value out of them, but it would take time[^9] to figure out how.

Unfortunately, if you're deliberately avoiding using AI, you are likely being left behind by the people who aren't. If you're advising other people to avoid AI completely, you are doing them no favors. While I do think it's a mistake to go _fully_ into AI - [LLMs reward expertise](/llms-reward-expertise/), which is best gained by hand - if you never practice using AI, you are never going to get good at it.

[^1]: Like asking it to think step-by-step or saying "you are a skilled software engineer" at the start of the prompt.

[^2]: Like offering [moral support](/ai-models-need-moral-support/).

[^3]: In fact, they often believe that AI users are literally damaging their brains. As I've said [a few](/your-brain-on-chatgpt/) [times](/how-does-ai-impact-skill-formation/), I think this idea is mistaken.

[^4]: Incidentally, the reuse of the word "skills" to refer to "job-specific dynamically-loaded prompts" has made this post a nightmare to write.

[^5]: There's not even consensus on which tasks are in which category. Many people think LLMs are great at writing prompts for other LLMs, but I think they're terrible (overly prescriptive, etc). This is obscured by the fact that LLMs can manage swarms much more efficiently than humans, but I think most people agree that having a single subagent is worse than just doing it on the main thread.

[^6]: Shout out to my brother, who told me to stop being stupid and just ask the robot to do it.

[^7]: I could list like six other things here (e.g. asking agent sessions to get second opinions from the latest Gemini/OpenAI models). If you want me to write a post on that, email me.

[^8]: As it turned out, those people were wrong: React was pretty good, and [the end of ZIRP](/good-times-are-over/) meant that the framework treadmill stopped, so React skills continue to be useful today.

[^9]: In no small part because you can't trust their own claims about their abilities.