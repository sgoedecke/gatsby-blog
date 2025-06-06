---
title: Diffusion models explained simply
description: 
order: 84
date: '2025-05-19'
tags: ["ai", "explainers", "diffusion"]
---

Transformer-based large language models are relatively easy to understand. You break language down into a finite set of "tokens" (words or sub-word components), then train a neural network on millions of token sequences so it can predict the next token based on all the previous ones. Despite some clever tricks (mainly about how the model processes the previous tokens in the sequence), the core mechanism is relatively simple.

It's harder to build the same kind of intuition about diffusion models (in part because the papers are much harder to read). But diffusion models are almost as big a part of the AI revolution as transformers. High-quality image generation has driven a lot of user interest in AI, particularly ChatGPT's recent upgraded image generation.

Even if you don't care much about images, there are also some fairly capable text-based diffusion models - not yet competitive with frontier transformer models, but it's certainly possible that we'd someday see a diffusion language model that's state-of-the-art in its niche.

### The core intuition

So what are diffusion models? How are they different from transformers? What is the animating intuition that makes sense of how diffusion models work?

Imagine a picture of a dog. You could slowly add randomly-colored pixels to that picture - the visual equivalent of "white noise" - until it just looks like noise. You could do the same for any possible image. All those possible images look very different, but the eventual noise looks the same. That means that **for any possible image, there is a gradient of steps between that image and "pure noise"**.

![gaussian noise](/gaussian-noise.jpg)

What if you could train a model to understand that gradient?

### Training and inference

To train a diffusion model, you take a large set of images, each expressed as a big tensor, and a caption for each image, each expressed as a normal text-model embedding. At each step in the training, for the current image, you add a little bit of random noise. Then you pass that noisy image and caption to the model, and ask it to predict exactly what noise was added to the image (e.g. which pixels changed from what color to what color). Unlike a language model, there's no "tokens" - every model step takes a full image as input and produces a "noise report" as output.  Finally, you reward the model[^1] based on how close the model's prediction was. 

It's important to train on noisy images, all the way from a little bit of noise to images that are indistinguishable from static. Typically that's done by adding increasing amounts of noise to images in the training set during training (on a fixed schedule). Eventually your model gets really good at identifying the last layer of noise, even from images that just look like the "pure noise" image above.

At inference time, that's exactly what you do: start with pure noise and a user-provided caption, then run the model to identify the "top" layer of noise. Remove that layer, then keep running the model and removing layers until you're left with the "original" image. In reality, that image was entirely generated by the model. **This process of identifying a layer of noise and reversing it is called "denoising".**

There are lots of tricks that get used in this process, but the two most important ones are variational auto-encoders and classifier-free guidance.

#### Variational auto-encoders

Expressing an image (or a video) as a big tensor is very expensive. Images have a lot of pixels! In practice, diffusion models operate on a _compressed_ version of each image, kind of like how text models operate on strings of tokens rather than individual letters of bytes. How is that compressed version generated?

Typically with a variational autoencoder (VAE) model that is trained first. That model learns to turn a big image tensor into a smaller random-looking tensor, while still being able to convert it back into the original image. Why use a VAE rather than an existing well-known compression like JPEG?

- It's important that the compressed representation be random-looking (i.e. Gaussian-shaped) so the denoising process works properly. JPEG compression is highly structured
- The compressed representation must always be the same size, which current compression algorithms don't do
- It's OK for the VAE to discard some details (e.g. camera noise) which JPEG compression will retain

So the usual strategy for training and inference is to run a VAE over your image tensor, add noise, denoise on that, and then decode it back to an original full-size image. Note that there are some models that don't use VAE, like DALLE-3, but it's much slower and more expensive.

#### Classifier-free guidance

There's a common trick to make sure the model is actually learning to generate images based on the caption, instead of just any possible image. During training, you zero out the caption for some images, so the model learns two functions: not just how to remove the noise for a caption, but how to remove the noise for any possible image. During inference, you run once with a caption and once without, and blend the predictions (magnifying the difference between those two vectors). That makes sure the model is paying a lot of attention to the caption.

### Key differences from transformers

The fundamental operation here is totally different from transformer-based language models, so many of your intuitions about transformers won't apply. For instance:

- At each inference step, transformers keep generating new tokens, while diffusion models go from a (e.g.) 256x256 pixel image to a different 256x256 pixel image.
- Transformers start with nothing but the prompt, but diffusion models need a "blank canvas" of pure noise to work from.
- Transformers don't "edit" previously generated tokens - once they're outputted, they're locked in - but diffusion models can and do change previous output as they go. 
- If you stop a transformer early, you probably don't get the answer you were looking for. If you stop a diffusion model early, you get a noisy version of the image you wanted.

That last point indicates an interesting capability that diffusion models have: you get a kind of built-in quality knob. If you want fast inference at the cost of quality, you can just run the model for less time and end up with more noise in the final output[^2]. If you want high quality and you're happy to take your time getting there, you can keep running the model until it's finished removing noise.

### Why does it work?

Transformers work because (as it turns out) the structure of human language contains a functional model of the world. If you train a system to predict the next word in a sentence, you therefore get a system that "understands" how the world works at a surprisingly high level. All kinds of exciting capabilities fall out of that - long-term planning, human-like conversation, tool use, programming, and so on.

What is the equivalent animating intuition for diffusion models? I don't really know, but it's probably something about the relationship between noise and data - if you can train a system to tell the difference between them, you're necessarily encoding a model of the world into that system? I bet there's a much nicer way of articulating this, or a better intuition that could be teased out here.

The same principles that work for images work for other kinds of data: video, audiom, and even text.

### Diffusion video models

So far this has all been about image diffusion models. What about diffusion models that generate video? As far as I can tell, there are lots of different approaches, but the simplest one is to treat the entire video as a single noisy input. Instead of having your input be a tensor that represents a single picture, your input is a (much larger) tensor that represents all the frames in a video clip. As the model learns to identify noise, it's also learning each frame relates to the other frames in the clip (object permanence, cause and effect, and so on).

I find it very cool that you can run effectively the same approach for video that you do for single images. It suggests that the fundamental mechanism here is very powerful. It also sheds some light on why the current video diffusion models (like OpenAI's Sora or Google's VEO) only generate clips and can't just "keep going" like a text-based transformer model can.

Incidentally, audio generation works the same way, just with a big audio tensor instead of a big video tensor.

### Diffusion text models

What about diffusion models that generate text? Text-based diffusion models are really strange, because you can't just add noisy pixels to text in the same way that you can to images or video. The [main strategy](https://pmc.ncbi.nlm.nih.gov/articles/PMC10909201/#sec12) seems to be adding noise to the text _embeddings_[^3]. At inference time, you start with a big block of pure-noise embeddings (presumably just random numbers) then denoise until it becomes actual decodable text.

How do you turn embeddings back into text? There's no obvious way. If you just try and look up the "closest" token to each embedding, you often end up with gibberish. If you use a separate decoder model to translate the embeddings, that works but feels a bit like cheating - at that point your diffusion model is really just generating a plan for your real text-generation model.

### Summary

- Diffusion models are trained to identify small amounts of noise in images, based on a caption embedding
- That means you can start with pure noise and a user-provided caption and just keep chipping away layers of noise until you get to what the model thinks the original image should look like
- The operating model is very different from transformers: not sequence-based, operates on previous outputs, and can in principle be sped up or stopped early
- Video diffusion works the same way as image diffusion, but it's harder for the model to learn because it requires tracking consistency over time
- Text diffusion is weird because you can't easily add noise to language, and if you convert to embeddings before adding noise it's hard to reliably convert back

edit: I should have said "autoregressive LLMs" instead of "transformers" throughout this post, since diffusion models can and do use transformers as the internal model for the denoising step. I don't think this changes any of the points I made here, but I want to include this note to avoid confusion.

edit: this post was discussed on [Hacker News](https://news.ycombinator.com/item?id=44029435) with lots of comments.

edit: Wow, Google released [Gemini Diffusion](https://deepmind.google/models/gemini-diffusion/) less than 24 hours after I published this post - supposedly a state-of-the-art text diffusion model. 

[^1]: In concrete terms, you update the model's weights via backpropagation so that the weights that lead to accurate predictions get reinforced and the weights that don't get adjusted.

[^2]: In practice, you need a special kind of sampler to avoid having visible ugly noise in your image.

[^3]: You can also convert the text into a dictionary of token IDs and denoise on that.