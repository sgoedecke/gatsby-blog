---
title: The first big AI disaster is yet to happen
description:
order: 22
date: '2024-12-16'
tags: ["ai"]
---

The first public passenger locomotive, _Locomotion No. 1_, began service in September 1825. The first mass-casualty railway disaster happened seventeen years later, in May 1842. A train to Paris derailed, killing at least fifty passengers in the ensuing fire.

The first passenger flight happened in March 1908. Eleven years later, the first mass-casualty airline disaster happened, when a flight to Milan [disintegrated mid-air](https://en.wikipedia.org/wiki/1919_Verona_Caproni_Ca.48_crash), killing all twelve passengers.

The first publicly-available AI language model, _ChatGPT_, was released in November 2022. The first mass-casualty AI language model disaster is yet to happen.

### What will the first big AI disaster look like?

To predict the nature of the first disaster, we could start by looking at how AI language models have already been involved in [deaths](https://www.qut.edu.au/news/realfocus/deaths-linked-to-chatbots-show-we-must-urgently-revisit-what-counts-as-high-risk-ai)[^1]. Chatbot sites like character.ai and Chai AI have been linked to user suicides, for understandable reasons: if you allow users near-unlimited control over chatbots, over time you'll eventually end up with some chatbots who get into an "encouraging the user to self-harm" state. Likewise, OpenAI's recent [sycophancy](/ai-sycophancy) incident could plausibly have contributed to violence (though I'm not aware of any specific cases, so maybe they caught it in time). An AI-encouraged mass-shooter could certainly be the first disaster.

Another candidate is bad AI advice feeding into public policy. The first big batch of 2025 USA tariffs [looked a lot](https://www.theverge.com/news/642620/trump-tariffs-formula-ai-chatgpt-gemini-claude-grok) like some it was AI-generated. Language models are almost certainly being used to write (or at least help write) bills. Bad automation combined with public policy can cause mass casualties - for an example in my country, take the 2016 [Robodebt](https://en.wikipedia.org/wiki/Robodebt_scheme) scandal, where the Australian government automated the welfare debt-recovery process badly, causing mass false-positives and suicides[^2].

However, it's unclear to me how strongly you might attribute these two types of disaster to the _AI language model_. Language models are not strong enough persuaders to turn anybody into a mass shooter. If a government is making bad policy based on AI, isn't that ultimately the government's fault? I think it's more likely that the first widely-recognized AI language model disaster comes from **agents**.

### Agents

People have been talking about AI agents for years now, but it's been mostly speculative. In short, an AI agent is "tools in a loop": instead of chatting with an AI, you let the AI "talk to itself" and periodically take actions (like searching the web, sending emails, or running terminal commands) in order to complete some task. Until very recently, AI language models were not strong enough to do this effectively. After a few iterations they would go off track, or fail to recover from the first mistake.

However, this is changing rapidly. At the start of 2025, multiple AI labs released "deep research": an AI agent that talks to itself and performs web searches to do research for the user. And in February 2025, AI coding companies like Cursor and GitHub (that's me!) began to move their largely-experimental coding AI agents front-and-center. What's changed? The short answer is that **the models have gotten better**. New-generation models (like o3, Claude 4, and Gemini 2.5) can keep it together over longer and longer periods of work. They can identify and retract mistakes instead of getting muddled. Right now the only two proven AI agent areas are research and coding, but _it's only June_. Billions of dollars are currently hard at work to see what other tasks can be done by AI agents.



[^1]: Of course _AI_ has been involved in many more deaths - from self-driving and industrial AI accidents, to the use of AI in military targeting and intelligence, to the direct use of AI in autonomous killer drones. But I'm talking here about _language models_.

[^2]: The exact number is debated. It's probably not as many as [2000](https://www.rmit.edu.au/news/factlab-meta/robodebt-not-directly-responsible-for-more-than-2000-deaths), but it's at least three and plausibly in the tens or hundreds.