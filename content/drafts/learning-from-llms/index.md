---
title: How I use LLMs to learn new subjects
description: 
order: 109
date: '2025-07-08'
tags: ["ai"]
---

If you want to learn about a new subject in 2025, one of the best ways to do it is to ask a strong language model.

The reason this method is so good is not that LLMs are smarter than your average Google search result, but that **you can ask infinite follow-up questions**. I often start by asking a general question (like “how does Kafka work”) and then digging in with many, many follow-up questions: both specific questions, like “what happens if a broker crashes”, and confirmation questions, like “it sounds like Kafka relies on clients to track which events are processed, is that right?”. I think this is a pretty intuitive way to learn something from a LLM, because it’s essentially treating it like a well-informed friend.

### Hallucinations

Many people think it’s foolish to learn from LLMs because of their tendency to hallucinate: to make up the occasional fact out of whole cloth. Hallucinations do happen, but I don’t think they’re necessarily a big deal. If you use the model correctly, you can minimise the number of hallucinations you run into.

First, if you’re learning something relatively mainstream (like how Kafka works), current-generation models rarely hallucinate. If there are many different sources in the model’s training data, the model is usually quite trustworthy. So it’s possible to be quite tactical about what you ask the LLM to help you learn. Be most cautious about super-niche subjects or subjects that are brand new (i.e. in the last six or twelve months). The best things to ask the LLM are “obvious”: use it to learn the basics of broad fields you aren’t familiar with, not to go even more in-depth in fields where you’re already an expert.

Second, hallucinations happen when you put the model in a position where it has to speak confidently about _contingent specifics_: in other words, concrete details that are essentially arbitrary. For instance, if you ask the model what books defined the linguistic turn in analytic philosophy, you are very unlikely to get a hallucination, because while those details are specific they’re very much not arbitrary. Those book titles are part of many other facts that the model knows about the history of analytic philosophy. However! If you ask the model what the ISBN numbers for those books are, you are much more likely to get a hallucination. No other facts that the model knows depend on the specific ISBN numbers of those books. Those numbers are not deeply embedded in the model’s internal structure in the same way that the book titles are.

This is why when you ask a (non-web-searching) model for sources it will often get the sources right but the URLs wrong. The model knows that Time magazine wrote a well-known article about a particular topic, but it’s much less confident about what the specific URL to that article is. It knows _roughly_ what a Time URL looks like, so it’ll hallucinate something plausible. What does that mean for avoiding hallucinations? It means you should avoid asking the model for concrete details that don’t really matter, and if the model gives you details like that you shouldn’t trust them. But when the model is speaking about facts that do matter - facts that are load-bearing for many other things the model knows about - you can be relatively confident that you’re getting correct information.

Third, if you suspect the model has hallucinated, you should not continue the conversation. Once a hallucination is in the conversation history, it’s both very difficult to get it out and it raises the chances of subsequent hallucinations. This is because models are not minds; instead they are role-playing a particular kind of helpful character. They prioritize consistent role-play above almost all other concerns. If they’ve previously said they know some hallucinated fact X, they’re likely to continue pretending that they know X in order to maintain consistency. It’s better to start from scratch and avoid the mistakes that led you down that conversational path in the first place.

### Deep Research

One relatively-new capabilities of frontier models is their ability to go away and research something on their own. This is one of the two successful agentic capabilities that modern LLMs have (the other one is coding). All top-level AI labs now offer a “research” or “deep research” button where a model can take ten or fifteen minutes to look up a bunch of information and synthesize it in order to answer your question. Are these useful to learn from?

My answer is a resounding “maybe”.  The case against them is that they’re too generic. The strength of LLMs as educators is that they can get to and remain at _your level_: in a long conversation, they can get a real sense of what you may not understand about a topic, and can give you as many specifically-tailored examples and arguments as you need in order to understand it. That process requires a high-frequency back and forth exchange. You need to be constantly telling the LLM what you understand about the topic and what you don’t. If instead the LLM goes off and writes a five-page report, it’s much less likely to directly address your misunderstandings (even if it is more comprehensive and accurate). It’s also just kind of exhausting to read through five pages of LLM content.

Where I think this kind of research does shine is when you have a particular concrete question that needs answering. For instance, one recent question I asked OpenAI’s Deep Research tool was “what was the initial reaction to unit testing among software engineers?” This is a fundamentally different question from “how does Kafka work” - instead of trying to understand a complex system, it’s searching for an answer to a historical question that requires reading through many different sources. I have consistently been surprised by how successfully research tools can answer niche questions. And the opportunity cost to trying is very low: you can fire the question off, then come back in fifteen minutes to see if it found anything interesting.

### The Socratic method

It’s recently become trendy[^1] to prompt AI models to teach you via the Socratic method. Instead of asking the model questions and getting answers, you prompt the model to ask you questions about a topic. As your answers reveal subtle misunderstandings or blind spots, the model’s questions directly target those, forcing you to confront them yourself. For instance, if you say “Kafka keeps track of when a message is consumed”, the model might ask “how does the Kafka broker find out that the message has been consumed?” In order to force you to realise that the consumer has to tell the broker.

When this works, it feels pretty magical. But it doesn’t always work. In my experience, when you’re trying to learn the basics of a field, you pretty rapidly run into a situation where your answer is “huh, I don’t actually know - maybe X?”, which makes the model dance around with a bunch more questions trying to lead you by the nose to the right answer. In cases like these, I wish the model would just give me the basic information and then go back to asking questions. It’s likely this can be solved with better prompting, though.

It’s also kind of funny to try the Socratic method with a reasoning model, and see the reasoning traces directly say something like “huh, the user completely misunderstands X, it’s actually Y - let me craft a clever question that doesn’t give the game away about Y”. Sorry, I saw Y in your reasoning trace! This is the only time I’ve wished that the reasoning trace was invisible to me (like it was when o1 first launched).

In general, I’d recommend only using the Socratic method to learn more about areas in which you’re already an expert. That way you won’t run into the case where you just straight-up don’t know the answer, and the model will have more time to zero in on problems with the answers you’ve given. I tried this with pre-forking Rack web servers like Unicorn - a subject with which I’m pretty familiar - and it pretty rapidly found the area that I’m the least knowledgeable in[^2].

### What about the studies?

There are a handful of existing studies about people who’ve used LLMs in educational contexts that purport to show a negative effect on learning. For instance, there’s the “your brain on ChatGPT paper”, which I’ve [written about](/your-brain-on-chatgpt) before, which shows that people who used ChatGPT to help write essays showed less useful brain activity than people who had to do it on their own. There are also other studies which show that ChatGPT tutoring helps students with homework, but under-prepares them for the exam where they can’t rely on the LLM anymore. Does that mean that we should think LLMs aren’t useful for learning?

I don't think so. For one, my own experience is a sufficient counter-example. I have used LLMs to learn about [a lot of topics](/tags/explainers) that I use routinely in my work. This isn't just the LLM making me feel like I'm learning something - I routinely draw on knowledge I learned this way when I'm doing work with my ordinary human brain. When a study directly contradicts your own lived experience, you should believe yourself and not the study[^3].

In general, I don’t think studies about students doing homework are particularly relevant to my situation (an adult learning about topics that I’m interested in). The more analogous case would be using LLMs to generate code for work. Possibly that means I'm learning less than I would if I had to do it by hand! But I'm primarily paid to [deliver shareholder value](/shareholder-value), not to learn things, so that doesn't worry me too much. In any case, when I sit down and try to figure out something (say, why serving LLMs at scale involves a tradeoff between [latency and throughput](/inference-batching-and-deepseek)), I'm pretty confident I'm actually learning.

### Final thoughts

Even with the hype, I think learning from LLMs is still deeply underrated. Even the naive approach of asking lots of questions - like you would an infinitely-patient colleague - is very useful. And there's a lot of potential in getting the model to ask _you_ questions, or to use it to research specific questions of fact or find primary sources.

You are probably smarter than a LLM in your area of expertise. But there's a whole world of knowlege out there where the LLM definitely knows more than you do, and where there's enough expert consensus that it's unlikely to hallucinate. If you haven't done it already, I really do recommend you pick some topic you're interested in and give it a try.


[^1]: I heard it on a Dwarkesh podcast, for instance. Although Dwarkesh said that he was using it to learn basic biology, which doesn’t seem like the ideal use case to me.

[^2]: If you’re curious, it was the specifics of how zero-downtime deploys work - in particular, clearing the `FD_CLOEXEC` flag on the listening socket so the previous master process can be killed without killing the socket. Since I’ve spent the last ~8 years working with Unicorn in containerised k8s environments - which don’t use Unicorn’s deploy feature at all - that’s a part of Unicorn I’m less familiar with.



[^3]: When a hundred studies contradict you… maybe trust the studies.

