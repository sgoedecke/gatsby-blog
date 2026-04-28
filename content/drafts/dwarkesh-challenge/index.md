* A couple years ago, there was this idea that AI progress might slow down as we make further progress into the RL regime. 1. Because as horizon lengths increase, the AI needs to do many days’ worth of work before we can even see if it did it right, so if we’re still in a naive policy gradient world, the reward signal / FLOP goes down, and 2. We’d crossed through many OOMs of RL compute from GPT 4 to o1 to o3, and it would not be feasible to replicate that many OOMs increase in compute immediately again. But AI progress seems to have been fast nonetheless - even potentially speeding up if rumors about Spud or Mythos are to be believed. What gives? What did that previous intuition pump that motivated longer timelines miss? Feel free to deny premise of question.

Intuitions about "is AI progress fast" are weird and unreliable.
    Humans measure AI progress on a really uneven scale
    If an AI is smarter than you, you stop being able to tell; if dumber, it seems really dumb no matter what
    GPT-3 to GPT-4 seemed _huge_ because GPT-4 was sometimes as smart as a human. But moving from "smart as a human 20% of the time" to "smart as a human 40$% of the time" is less visible

AI is not progressing on a human scale. 
    If Mythos has super-cybersecurity powers (or agents are now good), that might be because of the ability to synthesize long contexts, not because of any extra intelligence. So a working-memory boost, not a straight brainpower boost. 
    Capabilities are emergent and spiky. See "grokking", etc
    Many capabilities are obscured. Some people think GPT-4 is dumber than GPT-3 because in some ways it's "less weird" - that's a case of it being deliberately obscured. In other cases it's harder to tell. Can you still give a model an image and have it geoguessr it, o3-style?

So "is the rate of increase of intelligence-unit-per-flop slowing down" is not a very useful question, because humans can't judge intelligence except through the lens of the few capabilities they care about, and those capabilities often emerge (or are obscured) all at once. The rate of appearance of new capabilities might be only weakly correlated with the rate of change in raw intelligence

How fast did John von Neumann progress? He had prodigy-like abilities as a child. As an adult, he had the same abilities. Did he stand still? Are we in a position to assess that? Was he?



* What’s the most plausible story where foundation model companies actually start making money? If you consider each individual model as a company, then its profits may be able to pay back the training cost. But of course, if you don’t train a bigger, more expensive model immediately, then you stop making money after 3 months. So when does the profit start? Maybe at some point scaling will plateau, but if progress at the frontier has slowed down, then the combination of distillation and low switching costs (cloud margins result from high switching costs) makes it really easy for open source to catch up to the labs, eating into their margins. So how do the labs actually start making money?

Mythos is one pathway. If you get a step change in capabilities, you can sell _that capability_ to a small set of privileged users who you trust not to distil your model. You don't _have_ to expose every new model as a public API, and in the scaling regime where models genuinely become scary fast, I think companies will stop doing that. It's like exiting by being bought - exiting by no longer offering an API, and trusting other frontier labs to make the same game-theory calculation.

A less exciting pathway is Codex/CC/etc: offer a product on top of your model. While the product and model are both replicable, it's hard for anyone but a foundation model company to replicate _the synergy_ between the two: using the product to fine-tune the model over time. Cursor is kind of back-dooring their way into this too.

Is open source catching up to the labs? Probably. I hear of people using Kimi K2 and similar.

Of course if you're hoping for the singularity, all bets are off - but in that case I think you still have to stop offering a public API, right?


* With OpenAI’s new raise at an $852B valuation, OpenAI Foundation’s stake is now worth $180B. Anthropic’s cofounders have pledged to donate 80% of their wealth. Nobody seems to have a concrete idea of how to deploy 100s of billions (soon trillions) of wealth productively to “make AI go well”. If you were in charge of the OpenAI Foundation right now, what exactly would you do? And when? It’s not enough to identify a cause you think is important, because that doesn’t answer the fundamental problem of how you convert money to impact. Identify the concrete strategy you recommend pursuing.

Christ, I have no idea. 


* What should countries which are not currently in the AI production chain (semis, energy, frontier models, robotics) do in order to not get totally sidestepped by transformative AI? If you’re the leader of India or Nigeria, what do you do right now?

Any advantages to being an early _adopter_? Maybe you at least buy yourself into the conversation.

Hard to get enough semis for training, and not much point getting into energy if you don't have semis. But maybe you could get into _inference_? I don't know, stand up an Indian Kimi Datacenter and offer subsidized inference to your citizens? It's a cool idea but I don't know if it helps you not get sidestepped, whatever that means.

What does getting sidestepped mean? 