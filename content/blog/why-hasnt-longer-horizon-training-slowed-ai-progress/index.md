---
title: Why hasn't longer-horizon training slowed AI progress? 
description:
order: 189
date: '2026-05-07'
tags: ["ai"]
---

Dwarkesh Patel[^1] recently [posted](https://www.dwarkesh.com/p/blog-prize) an award for the best answers to four key questions about AI. It's partly a challenge and partly a job interview, since some of the winners will get offered a role as a "research collaborator". I don't want the job, but I do want to write down my answer to his first question: **why hasn't AI progress slowed down more?**

There are a few reasons we might think AI progress would slow down. The particular reason Dwarkesh is interested in goes like this. Training a model (specifically reinforcement learning) requires the model to perform a task and then get "graded" on the output. As models get more powerful and tasks become harder, they take longer and require more FLOPs[^2] to complete, and thus more FLOPs to train: thus training harder models will take longer.

But intuitively, AI progress hasn't slowed down that much. The famous METR horizon-length [graph](https://metr.org/time-horizons/) shows that AI systems are capable of more and more complex tasks over time, and that this process is accelerating, not slowing down. Why would that be?

### What's in a FLOP?

Firstly, **it might just be the case that newer models are benefiting from orders of magnitude more FLOPs**. Of course, AI labs aren't standing up orders of magnitude more GPUs (they're trying, but there are hard physical limits on how fast you can scale up a physical datacenter). But it's certainly possible that they're learning to use their existing FLOPs orders of magnitude more efficiently.

The efficiency of complex software systems - and the training code for a frontier AI model certainly qualifies - is not typically determined by the number of genius ideas in it. It is determined by the number of boneheaded mistakes. Take [this story](https://www.dwarkesh.com/p/what-i-learned-april-15)[^3] of how the initial GPT-4 training run used FP16 when summing many small values, which will _completely_ mess up your results if the sum of those values is large. How much training-efficiency-per-FLOP does solving bugs like that buy? Plausibly enough to outweigh any inherent lack of efficiency from training more powerful models.

### People are bad at judging intelligence

Secondly, **intuitions about the speed of AI progress [are weird and unreliable](/are-new-models-good)**. Humans measure AI progress - and intelligence in general - on a really uneven scale. It's easy to tell when an AI (or a person) is less smart than you, because you can just see them making mistakes. It's very hard to tell if they're smarter, because in that case you're the one making mistakes. You have to rely on more subtle context clues: do they get better long-term results than you, or do they often confuse you in situations where you later end up agreeing with them, and so on.

The jump from GPT-3 to GPT-4 seemed _huge_ because GPT-3 was dumber than almost all humans, and GPT-4 was sometimes as smart as a human. However, frontier models are now smart enough to be in the realm of ambiguity on many topics. It's thus much harder to tell the "real" rate at which they're getting smarter. Maybe the rate of growth of "raw intelligence" really has slowed down! I don't know how we'd be in a position to know for sure.

### Intelligence is not the sole determinant of capability

Thirdly, **many traits other than intelligence determine the capabilities of AI models**. Take the jump in October last year where OpenAI and Anthropic models were suddenly "agentic" (i.e. they could reliably perform complex tasks end-to-end). That might be intelligence, but it might also just be a greater working memory, or more rote familiarity with the basic tools of a LLM harness, or more ability to attend to the context window, or even simply a [personality](/ai-personality-space/) more suited to tools like Claude Code or Codex. Of course, all of these traits are plausibly "intelligence". But they're traits you might instil by various clever tricks (or even just tweaking the system prompt), not by brute-forcing more FLOPs.

It's illustrative here to consider the mistake made by Apple's infamous [_The Illusion of Thinking_](/illusion-of-thinking/) paper, where the researchers asked various models to brute-force solve Tower of Hanoi puzzles with different numbers of disks, using the results to score how good at reasoning the models were. But of course when you read the output, all of the failures were cases of the model realizing that many hundreds of steps were required, and refusing to even try. These same models could trivially write code to perform the steps, or correctly go through any smaller subset of the steps. The problem wasn't intelligence, it was _persistence_: these models lacked the willingness to dig in and keep powering through steps until they got to an answer[^5].

### Final thoughts

Even inside an AI lab, I don't think anyone has a good understanding of how many "real" FLOPs are being thrown at a training run (not counting FLOPs that are wasted on bugs). We also don't have a clear sense of whether AI progress really is slowing down or not. Mythos seems impressive, and coding agents are really good now, but once the models get close to human intelligence it becomes really tricky to monitor. Finally, almost everyone judges intelligence by capabilities, but capabilities are produced by a constellation of many traits (intelligence is just one of them).

I think this stuff is really complicated. A general theory like "RL takes more flops-per-reward as tasks get longer, therefore training will gradually slow down" sounds good, but in practice AI development is dominated by lightning strikes: silly bugs that make training a hundred times worse, clever ideas that make models a hundred times more useful, and spiky capabilities that can produce dazzling results in some areas but zero improvement in others. We are still [very early](/ai-and-informal-science/).


[^1]: If you're reading this you probably know who Dwarkesh is, but if you don't: he's a well-known tech-adjacent podcaster whose gimmick is that he actually does extensive research before each guest and asks specific technical questions.

[^2]: A FLOP is a floating-point operation, i.e. a matrix multiplication, i.e. "time on a GPU".

[^3]: I saw this in a tweet and only realized that the source was Dwarkesh when I was researching for this post.

[^4]: What if AI progress stalls for technical reasons, and everyone gives up on training new models? In that world, open source models will _eventually_ catch up, and AI labs won't be in a privileged position.

[^5]: Incidentally, this is my pet theory about why models got much better at agentic tasks last year: training on longer and longer agentic traces meant that models started to "believe they could do it", and made them much less likely to just give up and take shortcuts or refuse to continue.