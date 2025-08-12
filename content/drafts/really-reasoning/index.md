https://arxiv.org/pdf/2508.01191

Reading research papers and articles about chain-of-thought reasoning[^1] makes me frustrated.

There are many interesting questions to ask about chain-of-thought: how accurately it reflects the actual process going on, why training it "from scratch" often produces chains that switch fluidly between multiple languages, and so on. However, people keep asking the least interesting question possible: **whether chain-of-thought reasoning is "really" reasoning**.

Apple took up this question in their [Illusion of Thinking](/illusion-of-thinking) paper, which I've already written about. Now there's a [paper](https://arxiv.org/pdf/2508.01191) from Arizona State University that's getting some attention called _Is Chain-of-Thought Reasoning of LLMs a Mirage?_ As will become clear, I do not think this is a very good paper.

### What does the Arizona State paper argue?

Here's the core point:

> CoT reasoning works effectively when applied to in-distribution or near in-distribution data but becomes fragile and prone to failure even under moderate distribution shifts. In some cases, LLMs generate fluent yet logically inconsistent reasoning steps. The results suggest that what appears to be structured reasoning can be a mirage, emerging from memorized or interpolated
patterns in the training data rather than logical inference.

The strategy of the paper is to train a small transformer model (~600k params) on a corpus of non-language data transformations. What does this mean? As far as I can tell, that when prompted with something like "A B C D [M1]", the model should respond "B C D E", if the "M1" operation in training data means "advance each letter forward by one"[^2]. The training data contained several kinds of operation, which were composed arbitrarily (e.g. "A B C D [M1] [M1]" should produce "C D E F"). Finally, the training data included chains-of-thought like:

```
A B C D [M1] [M1]
<think>
B C D E [M1]
</think>
C D E F
```

Overall, the idea is to teach the model a very simple way of expressing chains-of-thought to solve toy alphabet problems, which has the good effect of making it trivial to determine at scale if and when the model made a mistake in its reasoning. You can straightforwardly generate ten thousand completions and then algorithmically check the models work, which is what the paper did.

The paper draws all kinds of conclusions from these reasoning traces: 

- When a requested reasoning path (like "[M1] [K1]") doesn't appear in the training data (even though the individual "M1" and "K1" operations do), their model struggled to actually perform the operations requested instead of outputting a similar path that was in the training data.
- When the requested reasoning path is even a little bit longer than those in the training data, performance drops noticeably.
- Any changes (even minor ones) to the format, like adding a meaningless "noise" token, cause the model to make many more mistakes.
- The model can be rapidly fine-tuned to cope with any of these issues, but that only addresses the specific pattern being fine-tuned for.

From all this, the paper concludes that model chain-of-thought reasoning does not operate out-of-distribution, and is instead just copying specific reasoning patterns that occurred in the training data.

### What do I think about it?

- training reasoning without language is really silly
- it's literally not reasoning, but raw computation
- it's a tiny tiny model!
- even if none of this would true, the philosophy would still suck
- how do humans reason??

[^1]: The process where language models "think out loud" before arriving at an answer, which forms the backbone of AI "reasoning models" like o1 and now GPT-5-Thinking.

[^2]: The paper itself doesn't use "M1" - I'm picking an overly simple example here to make it easier to explain.