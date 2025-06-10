---
title: The first big AI disaster is yet to happen
description:
order: 95
date: '2025-06-10'
tags: ["ai"]
---

The first public passenger locomotive, _Locomotion No. 1_, began service in September 1825. The first mass-casualty railway disaster happened seventeen years later, in May 1842. A train to Paris derailed, killing at least fifty passengers in the ensuing fire.

The first passenger flight happened in May 1908. Eleven years later, the first mass-casualty airline disaster happened, when a flight to Milan [disintegrated mid-air](https://en.wikipedia.org/wiki/1919_Verona_Caproni_Ca.48_crash), killing all twelve passengers.

The first publicly-available AI language model, _ChatGPT_, was released in November 2022. The first mass-casualty AI language model disaster is yet to happen.

### What will the first big AI disaster look like?

To predict the nature of the first disaster, we could start by looking at how AI language models have already been involved in [deaths](https://www.qut.edu.au/news/realfocus/deaths-linked-to-chatbots-show-we-must-urgently-revisit-what-counts-as-high-risk-ai)[^1]. Chatbot sites like character.ai and Chai AI have been linked to user suicides, for understandable reasons: if you allow users near-unlimited control over chatbots, over time you'll eventually end up with some chatbots who get into an "encouraging the user to self-harm" state. Likewise, OpenAI's recent [sycophancy](/ai-sycophancy) incident could plausibly have contributed to violence (though I'm not aware of any specific cases, so maybe they caught it in time). An AI-encouraged mass-shooter could certainly be the first disaster.

Another candidate is bad AI advice feeding into public policy. The first big batch of 2025 USA tariffs [looked a lot](https://www.theverge.com/news/642620/trump-tariffs-formula-ai-chatgpt-gemini-claude-grok) like some it was AI-generated. Language models are almost certainly being used to write (or at least help write) bills. Bad automation combined with public policy can cause mass casualties - for an example in my country, take the 2016 [Robodebt](https://en.wikipedia.org/wiki/Robodebt_scheme) scandal, where the Australian government automated the welfare debt-recovery process badly, causing mass false-positives and suicides[^2].

However, it's unclear to me how strongly you might attribute these two types of disaster to the _AI language model_. Language models are not strong enough persuaders to turn anybody into a mass shooter. If a government is making bad policy based on AI, isn't that ultimately the government's fault? I think it's more likely that the first widely-recognized AI language model disaster comes from **agents**.

### Agents

People have been talking about AI agents for years now, but it's been mostly speculative. In short, an AI agent is "tools in a loop": instead of chatting with an AI, you let the AI "talk to itself" and periodically take actions (like searching the web, sending emails, or running terminal commands) in order to complete some task. Until very recently, AI language models were not strong enough to do this effectively. After a few iterations they would go off track, or fail to recover from the first mistake.

However, this is changing rapidly. At the start of 2025, multiple AI labs released "deep research": an AI agent that talks to itself and performs web searches to do research for the user. And in February 2025, AI coding companies like Cursor and GitHub (where I work) began to move their largely-experimental coding AI agents front-and-center. What's changed? The short answer is that **the models have gotten better**. New-generation models (like o3, Claude 4, and Gemini 2.5) can keep it together over longer and longer periods of work. They can identify and retract mistakes instead of getting muddled. Right now the only two proven AI agent areas are research and coding, but _it's only June_. Billions of dollars are currently hard at work to see what other tasks can be done by AI agents.

The first big AI disaster will probably involve an AI agent. Any other use of AI has to involve a human-in-the-loop - the AI can provide information or suggestions, but a human has to actually take the actions. AI agents can thus go truly off the rails in a way that a human can't. If I had to bet, I'd guess that some kind of AI-powered Robodebt might be the most plausible case: some government or corporate entity wires up an AI agent to a debt-recovery, healthcare or landlord system, and the agent goes off the rails and hassles, denies coverage, or evicts a bunch of people. 

As we move towards robotic AI, the chances of a kinetic disaster go up as well. Early prototypes of general-purpose robots have a LLM driving a smaller, non-language model that actually moves the servos. That's an AI agent, and like all AI agents it can fail in surprising and dangerous ways.

### Misaligned AI girlfriends

So far I've talked about "misguided" AI agents. But it's also worth considering "misaligned" AI: AI which ends up being actively malicious. I don't think misaligned AI is likely to contribute to the risks I've talked about above - the best reason for that is that AI labs are highly motivated to ship safe models, and so far they've been successful at it. I expect anyone hooking up an AI to a high-stakes agentic system will be cautious enough - because they'll likely be a government or large company - to use a proven, safe model.

It's always possible that we discover a horrible alignment flaw at the worst time. But I think the more immediate alignment problem will come from AIs that are _already_ misaligned: wish-fulfilment chatbots like those from character.ai. You can think of those chatbot sites as crowdsourced attempts to misalign AI models (for instance, to get them to act like lovers or roleplay anime characters). About a week after the first commercially-available robot is sold, somebody is going to flash it with their [waifu](https://en.wiktionary.org/wiki/waifu) AI model to create their ideal robot girlfriend. And that could go _really_ wrong: models that have been pushed into weird latent spaces like this can lash out and genuinely attempt to harm humans. If the top labs' AI models are too safe to do this with, there's no shortage of almost-as-good open-source models that aren't (and people fine-tuning them to be even less safe). There's a possible world in which the first robot mass-murderer happens this decade.

### Final thoughts

In the [radium craze](https://en.wikipedia.org/wiki/Radium_fad) of the early 20th century, companies were trying to introduce radioactivity into everything: face creams, soap, tableware. The world was mad for nuclear power. The world is now mad for large language models. In a few decades, we'll have a much clearer idea of the risks, just as by the late 20th century people understood that nuclear reactors were dangerous and radioactive face creams were a really bad idea. 

I don't know what we can do about it in the meantime. Nobody's slowing the train down now. It's probably a good idea to build whatever safety tooling we can (I'm doing my part by working on [evals](https://docs.github.com/en/github-models/use-github-models/evaluating-ai-models#evaluating-outputs) at GitHub). But I suspect the real lessons have to be learned the hard way.

[^1]: Of course _AI_ has been involved in many more deaths - from self-driving and industrial AI accidents, to the use of AI in military targeting and intelligence, to the direct use of AI in autonomous killer drones. But I'm talking here about _language models_.

[^2]: The exact number is debated. It's probably not as many as [2000](https://www.rmit.edu.au/news/factlab-meta/robodebt-not-directly-responsible-for-more-than-2000-deaths), but it's at least three and plausibly in the tens or hundreds.
