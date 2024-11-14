---
title: How LLMs work
description: 'A deep-dive into the specifics of LLMs, via llama2.c'
order: 11
date: '2023-11-26'
---

Over the last few weeks I've been playing around with the excellent [llama2.c](https://github.com/karpathy/llama2.c) repository, which is basically a simple one-file C implementation of the Transformer architecture that powers models like Meta's LLaMA and OpenAI's GPT models. I've learned a lot and want to write about what I've learned. 

My general idea is to start very broad, then slowly zero in until I'm deep in the specifics of how the llama2.c architecture works (and thus how transformers work in general). If you want to follow along with my JS port, it's [here](https://github.com/sgoedecke/llama2.js/blob/work/run.js).

## What is a neural network? What is a LLM?

A LLM, or "large language model", is a particular kind of "neural network". Neural networks aim to predict some likely output based on a given input, with applications as broad as that description suggests. Think of a neural network model as a deliberately complex apparatus with hundreds of thousands of knobs and levers that transform input to output. As the model is trained, those knobs and levers are twiddled by trial and error into a configuration that works pretty well for some specific task.

For context on why you'd do this instead of trying to actually program the task, see Rich Sutton's [The Bitter Lesson](https://www.cs.utexas.edu/~eunsol/courses/data/bitter_lesson.pdf).

A LLM specifically is a kind of model that aims to predict the next piece of text in a sequence. For instance, if it had the prompt "Once upon", it might predict "Once upon a" - and then if you feed that back in and let it predict again, it might arrive at "Once upon a time", and so on. Models like LLaMA and GPT-3/4 do this surprisingly well due to a number of innovations, some of which I'm going to go on to explain.

Some more detail: in practice, the "knobs and levers" are numerical values in a set of giant multi-dimensional matrices, called "weights". And the model doesn't predict a word, it predicts a "token", which is usually a piece of a word (for instance "raven" might decompose into "ra" and "ven"). Spaces and punctuation are tokens too. Finally, when we say the model "predicts a token", what it's really doing is outputting the probabilities of _all possible tokens_ (so if there's 32,000 possible tokens, it outputs a 32,000 length list of probabilities). That gets turned into text by picking the most likely token, or by some slightly more complex method that we'll talk about later. We call these probabilities "logits".

## "LLM engineering" at different layers

We can divide "AI engineering" or "LLM engineering" into five rough domains:

1. Designing and innovating model architecture: e.g. attention mechanisms like RoPE, non-linearity like SwiGLU
2. Training new models: building datasets, messing with head sizes/layers/etc
3. Inference engineering: making changes during the model's inference (token generation) step
4. Post-processing: making changes after the logits are produced, such as token sampling techniques, confidence estimates, and grammar-aware logit sampling
5. Prompt engineering, agents, and chaining: engineering a system around a text-in/text-out API

I've put these in rough order of effort. To design and train models, you need a lot of compute, time and money. You can do inference engineering and post-processing by messing around with a small local model (which is what I've done). And you can do prompt engineering and some post-processing against the OpenAI API, or even sometimes without programming at all.

I'm going to be mostly talking about (3) and (4). But as one point of context, I want to emphasize that you can't make drastic changes to the model's inference step without designing and training a new model. You train a new model _by running the inference step_ over and over as the weights get fiddled with, so if you take an existing model and try to do inference differently, the weights won't work as they're supposed to. Changes to the inference step are mostly performance-related (e.g. you can train a model using slower but more readable/powerful Python code, but rewrite the inference step in fast C++ for the production deployment - or you can train with 32-bit floats, but round your weights down to 4-bit ints during inference for faster but less accurate operations, which is called "quantizing"). I say _mostly_, because as we'll see there's some interesting things you can do to the inference step without breaking the model.

## General structure and tokenization

In the rest of this post I'll be talking in some detail about llama2.c, as an example of how LLMs work. In practice, I think it's slightly architecturally ahead of GPT-2, a bit behind GPT-3 (maybe?), and definitely behind GPT-4. But the principle is the same: more complex models just have more complex systems bolted on in different ways. So how does it work?

1. Take a prompt as a command-line argument from the user
2. Decompose the prompt into a sequence of tokens
3. Run the model through that sequence with a "forward pass", repeatedly
4. Once we're at the end of the prompt, start adding the model's most likely prediction to the end of the sequence
5. Continue until we've done the requested number of steps or until we hit a special "end sequence" token

I'm going to mostly talk about how (3) works, but a quick word on 2: we decompose the prompt into tokens by using what is effectively a giant lookup table. Each element in that table is formatted like this.

```javascript
{
    tokenId: 1,
    tokenContent: 'elem',
    tokenScore: 0.52 
}
```

That `tokenScore` is crucial, because it determines what tokens are "better" than others. Remember that we have 32,000 possible tokens: every letter is a token, and every letter pair, and every letter with a space before or after it. When we're tokenizing "Once", we want to make sure we have a single token that represents the entire word, not four tokens for each letter, or two tokens for "On"/"ce". (Note that the model doesn't think like us, and sometimes prefers to split a word into tokens, or to include a space on one end).

When we tokenize the prompt, we begin by assigning each letter its own token. We then iterate over that array of tokens trying to merge pairs (e.g. seeing if the merged token has a higher `tokenScore` than its individual components). When we can't merge anymore, we're done.

## Forward pass, embeddings and attention

Now we're finally on the crucial part of the model: the "forward pass", which is the part that takes a sequence of tokens and figures out what the next one should be. Since we're working with large multi-dimensional arrays of floats (often called 'tensors'), the model needs a way to represent each token as an array of floats. This process - expressing a token as an array of floats - is called "embedding" the token, and the mapping between tokens and embeddings is included in the weights file as the `tokenEmbeddingsTable`. (For llama2.c, each token is represented as an array of 288 floats.)

Every forward pass begins by reading the embedding for the most recent token from the embeddings table. That array gets assigned to a variable on the run state (we'll use `state.x`), and that's the variable that gets operated on during each forward pass.

The forward pass is broken up into a series of "layers". You can think of each layer as basically a version of the model with different weights. Adding different layers is a way to add complexity to the model and let it learn more things during training. Our model here has six layers.

Each layer has two main sections: the attention mechanism, and the feed-forward-network mechanism. The attention mechanism is the crucial insight that enabled LLMs to be as dominant as they are today. Its goal is to decide how important each of the previous tokens in the sequence ought to be when predicting the next one. The output of the attention mechanism is essentially a numerical score for each previous token (for instance, when predicting the next token for "I fired my", the scores might be something like [0.1, 0.8, 0.1], to represent that the next token must be something that can be "fired"). The feed-forward-network mechanism is basically a "normal" neural network architecture: a set of three matrices full of weights that get multiplied into `state.x` to determine what the embedding for the next token should look like.

So right now our mental model looks like this:

1. Initialize `state.x` with the embedding for the most recent token (a 288-size array of floats, chosen out of an array of 32,000 possible tokens)
2. For each layer:
    1. Run the attention mechanism to determine scores for the previous tokens in sequence
    2. Based on attention, run the feed-forward-network mechanism on `state.x` to determine an embedding for the next token
3. Calculate the distance between our predicted `state.x` and all possible token embeddings to determine how likely all possible tokens are (producing a 32,000-element array of logits)

## Attention

Okay, let's go deep into the attention mechanism. Are you ready? For each layer:

1. Populate `state.xb` with the RMSnorm of `state.x`
2. Initialize `state.q`, `state.k`, and `state.v` by performing `state.xb * weights.wq[layer]`
3. Perform RoPE positional encoding by rotating `state.q/k` into the complex plane for each head
4. Populate `state.keyCache` and `state.valueCache` for the current layer and position from `state.k` and `state.v`
5. For each head:
    1. Go through each previous token and populate each head's segment of `state.att` with `state.q` (for the current token) multiplied by `state.keyCache` for each previous token
    2. Softmax that segment of `state.att`
    3. Reset `state.xb` to the sum of `state.att` over all previous positions for each element of `headSize`
6. Populate `state.xb2` with `state.xb * weights.wo[layer]` (the output weights)
7. Sum `state.x` with `state.xb` (as a residual connection), which finally integrates the attention scores into `state.x`

That was a lot. But it's the most important thing here, so it makes sense that it'd be pretty complex. The entire LLM revolution grew out of a paper called [Attention Is All You Need](https://arxiv.org/abs/1706.03762), after all. Let's go through it carefully.

First up, what's RMSnorm and softmax? RMSnorm is a mathematical way to normalize (i.e. shrink big values and grow small ones) across a tensor without changing the mean value. This provides stability and consistency across layers. As with a lot of other things we'll discuss, this is a part of the model architecture that people figured out improved things - it's not strictly essential, it just gives much better results if you train and inference the model with it in. Softmax takes an array of values and turns them into a probability distribution (i.e. makes all values between 0 and 1, and makes it so summing over the array is equal to 1). This happens in an exponential way: small values get smaller, large values get larger. 

What's all this q/k/v stuff? These stand for "query", "key", and "value", and they're crucial parts of the attention mechanism. The query vector represents the attention mechanism's view of current in-progress token for which we're calculating the attention scores. The key vectors represent the attention mechanism's view of all previous tokens (in practice, these live in `state.keyCache` - `state.k` is the key vector for the current token only). The value vectors represent the actual content of all previous tokens.

They all get initialized at the start of the layer by multiplying `state.x` by that layer's version of the query/key/value weights. Then we calculate the attention score of each previous token by taking the dot product of the query vector (i.e. the current token's attention embedding) and each key vector (i.e. each previous token's attention embedding). That attention score gets used to weight the value vector (`state.v`), which is what gets summed back into `state.x` at the end.

What's a "head"? You can think of a head as kind of like a "layer" but only for this attention mechanism. Just like the model has eight layers to increase the complexity of what it can learn during training, it has eight heads that can each learn how to pay attention to different things. For instance, one head might learn to pay attention to grammar, so it can treat an unclosed `(` as important until it gets closed, while another head might learn about pronouns having to match, so if it's preparing to generate a new pronoun it can treat previous pronouns as important. Each head produces its own set of attention scores, which are combined at the end of the attention mechanism by running them against another set of attention-specific weights.

Note: head attention processing can be done entirely in parallel, which is a big reason why the transformer architecture performs well. (It's worth knowing that _layers_ can't be done in parallel, because subsequent layers operate on the state.x output of the previous layer.)

### RoPE and positional encoding

Finally, what's RoPE, and how and why do we rotate `state.q` and `state.k` into the complex plane? RoPE is a form of "positional encoding". The key insight here is that the model doesn't only need to know what tokens came before the current one, but also the _relative position_ of those tokens. That means that when we choose which tokens to pay attention to, we need some way for the attention weights to know not just what those tokens are but where they are.

The original way of doing this in the Transformer paper encoded each token with a different embedding based on its position in the sequence (between 0 and some limited sequence length like 512 tokens). So the token "the" had a different embedding from "the-at-position-2", or "the-at-position-100", and so on. This meant that the token embedding section of the weights had to be 512x the size.

RoPE is an innovation on that strategy that allows us to include positional information in a token embedding without needing any more embeds. The idea is to take the token embedding (that array of 288 floats) and rotate it into the complex plane by some angle which represents its position in the sequence. The model can then learn to pay attention to that complex rotation and interpret positional metadata from it.

How do you rotate an array of 288 real numbers into the complex plane, without having to store it as 288*2 numbers (for the real and complex parts)? The trick is that we only care about the size of the rotation, not specifically that it's a rotation on the original embeddings vector. So we can treat the embedding as 144 pairs, each of which represents a complex number with a real and imaginary part, and rotate that 144-length complex vector instead. For instance, the embedding `[1, 2, 3, 4]` becomes `[1 + 2i, 3 + 4i]`, which can now be easily rotated by some angle.

The consequence of all this is that by rotating `state.q` and `state.k`, their dot product now contains information about how close they are to each other. The model can attend to that information to learn (during training) all kinds of stuff about how a token's position in a sequence reflects its importance. It can then use that information during inference to assign more accurate attention scores.

## Feed-Forward

We've completed the attention part of the layer (attention scores are now a part of `state.x`) and can how move on to the feed-forward-network (FFN) part.  This is going to be a lot more straightforward. The steps here:

1. Populate `state.xb` with the RMSnorm of `state.x`
2. Populate `state.hb` with `state.xb * weights.w1[layer]`
3. Populate `state.hb2` with `state.xb * weights.w3[layer]`
4. Apply SwiGLU non-linearity to `state.hb`
5. Elementwise multiply `state.hb` by `state.hb2`
6. Replace `state.xb` with `state.hb * weights.w2[layer]`
7. Sum `state.x` with `state.xb` (as a residual connection)

Most of this is a series of "normal" neural network matrix multiplications against this layer's weights. The main surprising thing here is "SwiGLU", which stands for "swish-gated linear unit". Like RoPE from the attention mechanism, SwiGLU is a mathematical trick that helps the model capture more information during the training phase. That means we have to perform it again during inference, or the weights won't operate in a useful way. Here's the trick:

`runState.hb[i] = runState.hb[i] * (1.0 / (1.0 + Math.exp(-runState.hb[i])));`

Why include it? It introduces an important _non-linear_ behaviour: instead of just applying a weight to each element in the vector, it can approximate a boolean "include this weight nor not" gate. That's because when you take the sigmoid (`(1.0 / (1.0 + Math.exp(x))`) of large positive numbers you very rapidly approach 0 (while negative numbers rapidly approach 1). So the model can learn to completely zero out certain sections of `state.x` by making them very large when multiplied by the first layer of weights, or to leave them alone by making them very small.

Finally let's talk about residuals: why we're _summing_ back into `state.x` here and at the end of the attention mechanism. The simplest neural network is an input, a bunch of matrix multiplications across various layers, and then an output. At each stage, the input is transformed by the weights of each layer. However, in this naive approach, it can be easy for early layers to get forgotten, since each subsequent layer can dramatically reduce the valence of a previous layer's output.

"Residuals" are a way to avoid this. The idea is to add (not multiply) the output of each layer directly to `state.x`, which effectively creates "direct" connections that bypass the weights of future layers. This complicates the architecture of the neural network, allowing the model to encode more sophisticated relationships. It also means that all layers can be important, instead of later layers dominating earlier ones, so we can end up stacking more layers into a model without losing efficacy.

## Wrap-up

I wrote this post largely as a learning exercise for myself: to polish up and collate all the notes I made while porting llama2.c to javascript. Doing so significantly increased my understanding of positional encoding, q/k/v tensors, attention mechanisms, residuals, non-linearity in the feed-forward step, and so on. I hope it's also helpful to other people.
