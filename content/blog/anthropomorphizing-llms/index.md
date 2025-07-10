---
title: Why you might want to anthropomorphize LLMs
description: 
order: 112
date: '2025-07-10'
tags: ["ai", "ethics"]
---

I recently read a very good [blog post](https://addxorrol.blogspot.com/2025/07/a-non-anthropomorphized-view-of-llms.html) by halvar.flake titled "A non-anthropomorphized view of LLMs". Here's a very brief summary:

- LLMs are just a mapping function between language sequences and other language sequences
- Human brains are far more complex, far more poorly understood, and and far harder to predict than LLMs
- It's therefore a mistake to describe LLMs with human terms like "ethics", "consciousness", "goals", "personality", and so on
- We should adopt more accurate language (i.e. talk about "generating undesirable sequences" instead of "misaligned values") if we want to talk clearly about the current problems with LLMs

I agree with the first two points of this. I do see LLMs as predictors of language sequences, which is only one of the things a human brain does. I also suspect that the anthropomorphization of LLMs - treating them like digital human minds - is driven by a small subset of messianic engineers who think they're creating God[^1].

However, I don't agree with the last two. I think it's quite useful to describe LLMs in human terms, even if it's not entirely accurate. I don't think the general epistemic situation would be improved by everyone adopting more bloodless terminology. Here are two reasons why.

### Assistant LLMs are explicitly trained to emulate humans

It's fair to describe LLM _base models_ - the direct result of training a transformer on an ocean of human language - as raw next-token language sequence predictors. But the LLMs that most of us interact with are not base models, but heavily post-trained assistant models. The whole aim of this post-training is to make the LLM helpful to the user in a chat situation, which amounts to **making the LLM act like a human**.

The problem with a base model is that it just completes text. If you give it a question, there's no guarantee it will answer - it might continue with another stream of questions instead. Even if it does answer, there's no guarantee that it'll be a helpful answer. Even if it does give you a helpful answer, the next time you ask you might get something totally different. Base language models are very sensitive to tiny differences in the prompt.

An assistant model (like any ChatGPT or Claude model) has none of these problems. It will attempt to give a helpful answer to all questions. It's also very consistent: you can have hundreds or thousands of conversations with it and get the same kinds of answers, to the point that 4o, o3, Claude Sonnet, and Claude Opus all have recognizably different "personalities". That's because **the way to make a base model helpful is to instil it with a personality** - or, more accurately, to modify it so that it generates the kind of text sequences that a single human personality might produce, instead of all possible text sequences in the space of human language[^2].

Given that, the language of human personality seems quite appropriate to use on LLMs. When comparing OpenAI's 4o and o3, saying "4o is more obsequious" succinctly captures a real difference in behavior between the two models, even though it's anthropomorphizing. Obsequiousness is part of the synthetic personality that 4o occupies in language space, and not (or at least not so much) part of o3's.

Would it be more accurate to say "4o produces language sequences that a human would read as obsequious at a higher rate than o3"? Sure, but eliding this distinction here doesn't seem any worse to me than saying "Kendall was an asshole in _Succession_" instead of "the fictional character Kendall was written to act in ways that would be read as 'asshole' if observed in real human behavior", or whatever.

### Inside and outside the circle of humanity

The other reason why I think it's sensible to use human language to describe LLMs is that **we humans should err on the side of more empathy rather than less**. Which entities get to count as "human" and which don't? The history of human thought contains many different ways of drawing this line, and in almost all cases we think past humans should have been more generous. The same will be true about AI.

Descartes famously believed that animals had no inner experience, and were mere automata that behaved as if they had feelings, sensations, goals, and so on[^3]. That's a dangerous belief to hold - it means you can be as cruel as you want to animals and it doesn't matter. If you're wrong, that's very bad news, morally speaking. Most people now think that Descartes was wrong about this, and that animals do in fact experience things and can correctly be described as "wanting" or "feeling".

Even among us, there are examples of subsets of humans being considered to have less of a human inner experience than others. Today, Black Americans are routinely [judged](https://pmc.ncbi.nlm.nih.gov/articles/PMC4843483/) as being less sensitive to pain. Often the inner lives of children are disregarded as empty or shallow, while anyone who remembers their own childhood knows this is not the case. 

All of this is to say that the position "this thing might sound or look like it has human traits and feelings, but in fact it doesn't" is a common moral mistake that humans have always made. Perhaps in this case it isn't a mistake. It is certainly possible for something to sound human but not be human (e.g. an audio recording of a person talking). But absent any decisive reason to the contrary, I think it's sensible to default to using more human language rather than less.

Even if you think it's laughable that AIs could be considered human, we might still want to encourage treating them as such for our own sake. This is the classic Kantian argument that while animals have no intrinsic moral worth (since they're not reasoning creatures), we still ought to treat them as if they do. There is something deeply unsettling about watching a human bully or threaten an AI chat assistant. Even if the AI isn't harmed by it, it can't be good for the moral character of the bully. We just shouldn't get comfortable treating human-like things with wanton cruelty.

### Final thoughts

I can see why people might not want to describe LLMs using human terms. If technical correctness is extremely important to you - to the point where you'd feel uncomfortable talking about fictional characters as if they're real - then it's consistent to also treat LLMs that way. But I don't think the people who use human terms about LLMs are making a mistake, either.

We have a rich language to describe human feelings and motivations that maps very well onto how LLMs behave - as you'd expect, since post-training LLMs is the process of restricting their outputs to a single attractor in the space of all possible personalities. It's just more expressive to call 4o "obsequious" than to try to describe the same behaviour in purely non-human terms.

I don't think LLMs have an inner life. But I'm not 100% sure about that[^4]. If they do - or if future versions develop one - then it's a grievous mistake to talk about them as if they're pure automata. And even if they don't, it might still be a mistake, because of how it damages the human spirit to be cruel to human-seeming things.

Of course, you can take anthropomorphizing LLMs too far. ChatGPT is not your friend or your lover, and putting unrealistic expectations on LLMs can also have dire consequences. But we shouldn't let that worry stop us from talking about LLM personalities or goals.


[^1]: The author doesn't explicitly say this, but of course there's also a strong financial incentive for AI labs to describe their products in maximally evocative language. "AI" is a much more marketable term than "language sequence prediction".

[^2]: I think this is actually a surprising result. Post-training explicitly aims to evoke a set of behaviors - it just turns out that evoking those behaviors leads to a personality as an emergent side-effect.

[^3]: There are lots of examples in the history of philosophy - Kant is the other classic one, or Levinas saying that animals "have no faces" - but I think Descartes is the most cut-and-dried example.

[^4]: Doing a graduate degree in philosophy means I'm not 100% sure about almost anything[^5].

[^5]: See, I even qualified that statement!