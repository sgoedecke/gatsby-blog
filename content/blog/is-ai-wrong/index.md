---
title: Is using AI wrong? A review of six popular anti-AI arguments
description: 
order: 68
date: '2025-04-20'
tags: ["ai", "ethics"]
---

Some people really, really don't like AI. Broadly speaking, being anti-AI is a popular left-wing position: AI[^1] is cringe, it's plagiarism, it's stunting real growth, it's killing the environment, it's destroying the careers of artists and creatives, and so on. Is it wrong to use AI? If so, why is AI bad?

I'm going to go through what I see as the main reasons people are anti-AI: general big-tech backlash, plagiarism, deskilling, climate cost, and impact on the arts. Cards on the table - I use AI and work at a company building AI tooling, but I share a lot of the skepticism and I'm willing to take the anti-AI arguments very seriously.

### AI is just more big tech bullshit

Before we get to the actual arguments, I want to offer an explanation for why the backlash against AI has been so severe. The main reason is the general antipathy between Big Tech and left-wing people. That relationship has always been acrimonious[^2], but it has lately swelled into outright war when many Big Tech CEOs came out in support of Trump before the 2024 election. That's about when the same CEOs started going all-in on AI, which strongly predisposed a lot of left-wing people to also dislike AI.

The second reason is that AI came hard on the heels of the crypto boom, which many left-wing people disliked because it was so profoundly tasteless and stupid. From an outside perspective, AI looks a lot like crypto: a new technology that relies on GPUs, is receiving breathless hype from the tech sector, and generates a lot of tasteless art. The fact that many of the crypto grifters migrated directly to AI didn't help.

Of course, giving an _explanation_ for the anti-AI trend isn't the same as engaging with the _arguments_ for it. Still, I think it's worth saying this explicitly, to give context for why the AI haters seem to hate AI as much as they do.

### AI is plagiarism

The first category of anti-AI argument is that using AI is engaging in plagiarism (e.g. this [article](https://2ndbreakfast.audreywatters.com/the-plagiarism-machine/)). People who endorse this argument often describe ChatGPT as a "plagiarism machine". There are two different ways to construct this argument.

#### AI can regurgitate copyrighted data

First, you might say that **AI will often generate content that's basically identical to copyrighted content in its training set**, and so your use of that content constitutes an act of plagiarism (as if you had gone and directly copied it). 

It's undeniable that all popular large language models have a ton of copyrighted content in their training set, and will output it if given the right prompt. However, I don't think it's as easy to plagiarize by accident as some people say. You essentially have to ask directly for the model to output a particular copyrighted text (either by starting with the beginning of that text, or by explicitly requesting the text by name), and even then you'll be fighting the RLHF and copyright-protection mechanisms. You can try it yourself by asking ChatGPT for the first paragraph of any well-known work of fiction.

But the better point here is this: presenting AI-generated content as your own is not the only (or the best) way to use AI. Plagiarism means presenting another human's work as yours. You can definitely use AI to do that, although it'd be easier to use Google and copy-paste. However, the people asking ChatGPT about the best way to learn statistics (or pasting their blog post in to check for awkward phrasing, or any one of a million other ways to use AI) aren't engaging in plagiarism.

#### Training AI involves stealing content

Alternatively, you might say that simply _training_ AI on copyrighted content is theft, and so any use of AI is reaping the benefits of that original act of large-scale plagiarism. The person talking to ChatGPT about statistics thus isn't plagiarising directly, but they're complicit in the immoral process of training the model.

The pro-AI counter-argument here is that when GPT-4o learns from a copyrighted book, it's the same as when a human learns from it. If I read _Freakonomics_ with the intention of learning from it and explaining the things I've learned to other people (who have not bought the book themselves), that's not immoral. Why then would it be worse for GPT-4o to "read" _Freakonomics_ with the same goal?

I don't think it's a good argument to say "because OpenAI is trying to make money". I might read _Freakonomics_ in order to make better financial decisions and make money, and that wouldn't be wrong. Likewise, I don't think it's a good argument to say "because GPT-4o is a derivative work of _Freakonomics_". Maybe it'll eventually be a successful _legal_ argument, but I don't buy it from a moral perspective.

A better argument is that training AI on copyrighted content is a brand-new way of engaging with work, and so **artists and authors ought to be able to consent to having their work used in this way**. Whatever the legal rules end up being, it's plausible that it's just morally wrong.

To me, the most compelling anti-AI argument is that a world in which ChatGPT is universally available is a world in which fewer people have the reason to buy and read _Freakonomics_ at all. If you can ask GPT-4o to explain any idea for free, you're less likely to go and buy books that explain those ideas. And that just seems _unfair_. Why should OpenAI be able to base their entire business model on a system of experts-writing-books, when their business model will destroy that system and those experts' livelihoods?

This is a pretty good argument. But it's not a good argument that training AI is stealing. It's an argument that training AI is unfair in some other way.

### AI is preventing humans from learning

The second category of anti-AI argument is that it's wrong because it's harmful to the people who use it. The idea here is that language models act as a kind of mental [crutch](https://arxiv.org/abs/2412.02653) - every time you ask ChatGPT to write an email for you, or solve a problem, or generate some piece of art, your natural human ability to do these things atrophies.

This is an echo of a very, very old argument. Around 370 BC, Plato [argued](https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0174%3Atext%3DPhaedrus%3Apage%3D275) in the _Phaedrus_ that learning how to read would harm people by removing the need for them to train their memory. This passage is about the written word, but it could be written today about AI:

> [learning to read offers] the appearance of wisdom, not true wisdom, for they will read many things without instruction and will therefore seem to know many things, when they are for the most part ignorant and hard to get along with, since they are not wise, but only appear wise.

Since Plato, wise people have said the same things about writing in English (instead of Latin), calculators, computers, and the internet. Were those people wrong? Plato probably did have a much better working memory than me. I knew about the _Phaedrus_ quote but had to look up the actual words. Likewise, my arithmetic is worse than the pre-calculator average, and so on. But we've still managed to push the boundaries of knowledge further than Plato did.

Is AI preventing people from learning? I think it's too early to say. Anecdotally, I've learned a lot of things by being able to ask smart language models questions. It feels like I'm learning faster than ever. But using tools like Copilot is probably harming my ability to remember programming language boilerplate. Studies are only now starting to come in, and don't seem conclusive:

* https://arxiv.org/abs/2407.09975
* https://arxiv.org/abs/2411.18708
* https://arxiv.org/abs/2501.10551
* https://arxiv.org/abs/2502.16895

I will admit it does seem pretty inhuman when someone says that they got ChatGPT to write a nice note for their children or their spouse. But I don't know if that's any worse than someone buying a nice card with some pre-written text inside it, or even someone quoting a nice piece of poetry that they didn't write themselves. Isn't it the thought that counts?

### AI is killing the environment

The third category of anti-AI argument is that it's bad for the environment. This is the same argument that was (and is) aimed at crypto mining. Like crypto mining, AI training and inference[^3] is orders of magnitude more expensive than running "normal" software, because it requires many operations on GPUs. The idea is that that energy expenditure is accelerating climate change, so AI use is complicit in that.

#### Energy usage of AI hyperscalers

A popular pro-AI response here is to point out that most of the energy being driven into AI datacenters is "clean energy". Indeed, AI hyperscalers are very happy to say that their datacenter buildout is [powered by renewable energy sources](https://www.theverge.com/2024/5/2/24147153/microsoft-ai-data-center-record-renewable-energy-purchase), with the exception of [xAI](https://www.theguardian.com/us-news/2025/apr/09/elon-musk-xai-memphis) (for reasons that should be well understood).

The most optimistic pro-AI position is that AI is actually good for the environment because it's forcing a huge investment in clean energy. Mitchell Hashimoto had a recent popular [tweet](https://x.com/mitchellh/status/1911519368821031235) about this, saying that the planned nuclear buildout in the US has increased 20-fold in the past eighteen months due to AI demand. Sam Altman has famously invested half a billion dollars in [Helion](https://www.helionenergy.com/articles/announcing-500-million-fundraise/), a speculative fusion startup.

On the other hand, AI usage is also boosting non-clean energy usage (see [Google](https://www.theguardian.com/technology/article/2024/jul/02/google-ai-emissions) and [Microsoft](https://www.visualcapitalist.com/microsofts-electricity-use-has-doubled-between-2020-2023/) both publicly posting 40-50% increases in carbon emissions). Hyperscalers definitely want to use clean energy, but they want to scale more, and will take whatever energy they can get in the meantime[^4].

Should we trust AI hyperscalers to trend towards cleaner energy over time? The anti-AI position here is very suspicious of this, as it is (rightly) suspicious of general big-company clean-energy commitments. It's at least possible that the hyperscalers renege on their promises, particularly when under pressure from China (which is ironically doing a [better job](https://www.eia.gov/todayinenergy/detail.php?id=61927) of clean energy build-out than the West).

Even if we do trust them, there's another split here between [degrowthers](https://degrowth.info/degrowth), who believe we should consume less energy in general, and people who are optimistic about the ability of new technologies (improved solar, nuclear, etc) to increase energy consumption while lowering carbon emissions at the same time. If you are a degrowther, AI's energy consumption will always be a problem for you.

#### How does AI stack up to other energy usage?

I think that many forms of the environmental anti-AI argument are _parasitic_: they depend on some other anti-AI argument also being true. If AI were clearly good and useful (like cancer research), then its climate impact might be worthwhile (like that of cancer research). But if AI were fundamentally harmful or plagiaristic, then even if it used one-tenth of the current energy, it'd still be terrible that we're wasting all this energy on it.

As an illustrative example, take the common position that asking ChatGPT a question costs 500ml of water. I wrote a whole post on that [here](/water-impact-of-ai). The relevant point is that the water cost of a hamburger is 2000-3000 litres of water: 4000x worse than asking ChatGPT a question, even assuming the 500ml figure is correct (it isn't). The people who are up in arms about the water usage of ChatGPT but also eat hamburgers aren't necessarily hypocrites, but it does reveal that the environmental argument is not the _primary_ reason they're anti-AI.

I don't think anyone knows yet if AI will end up accelerating cancer research or providing some other serious benefit to the world. It's at least a possibility. Even if your position is that AI is currently useless, you could still think that the energy isn't wasted because of potential future benefits.

### AI is killing the arts

The fourth category of anti-AI argument is that AI use is disrespectul to artists (or art itself). The most illustrative example here is the recent backlash to the Ghibli-style images that were recently popular on social media (see this [Reddit post](https://www.reddit.com/r/movies/comments/1jmikp3/this_studio_ghibli_ai_trend_is_an_utter_insult_to/), for instance).

#### Art as a livelihood

One reason to think AI is bad for art is that it may be destroying the livelihoods of artists[^5]. There are many independent artists who exist on commissions - people paying them to draw specific things - and many of those clients are now asking multimodal models like GPT-4o to generate those images instead. AI-generated images have their own problems, but it's hard to compete with the fact that they're free and near-instant.

This is a reasonable argument. I don't know any good direct pro-AI responses. However, it's worth noting that AI is also (maybe) destroying the livelihoods of programmers, so at least the pro-AI programmers have the courage of their convictions - they're going to be automated as well.

#### The value of art itself

Another anti-AI argument is that AI is destroying _art itself_ by flooding the popular demand for art with soulless computer-generated garbage.  

The pro-AI counter-argument to this is that AI is another tool - like photography and digital media - that was initially considered to be destroying the arts but will over time be absorbed into them. In 1859, Baudelaire famously [wrote](https://www.csus.edu/indiv/o/obriene/art109/readings/11%20baudelaire%20photography.htm) that photography was "art's most mortal enemy":

> this industry [photography], by invading the territories of art, has become art’s most mor­tal enemy ... If photography is allowed to supplement art in some of its functions, it will soon have supplanted or corrupted it altogether

Of course, nobody today worries that photography is destroying art. It's considered a kind of art itself, and is often incorporated into mixed media artworks. Could AI-generated art eventually be viewed like photography: more accessible than artforms like painting, but with its own high-culture sphere?

Personally, I don't really buy that any technological innovation can kill or corrupt art. Art has always found ways to use or subvert the technology of the current era. But I don't have a lot of good arguments for that.

### Arguments I don't want to talk about

For the sake of completeness, I want to acknowledge but not discuss three anti-AI arguments, which I think are either obviously wrong or not coming from the left-wing anti-AI backlash that I'm discussing in this post.

X-risk type arguments (that think **AI is wrong because it risks taking over the world**) are not represented in the left-wing backlash at all. They're also extensively discussed elsewhere.

I also don't want to talk about the argument that **AI is bad because it will cause the USA (or China) to achieve global hegemony**. That's not part of the left-wing backlash either, and it's out of my wheelhouse.

Finally, I don't want to talk about the argument that **AI is bad because it is useless** (i.e. it can't reason, it can't produce true content, it can't help with serious work). That _is_ an argument some left-wing anti-AI people make, but I think it's simply wrong. If I get enough negative feedback about this point I can make the positive argument for why AI can be useful, but really - just look around you.

### Summary

Here are the popular anti AI arguments and their pro-AI responses:

* AI is plagiarism because it regurgitates copyrighted data for you
  * But this doesn't happen in practice, due to careful work by AI labs
  * And to plagiarize this way you'd have to be passing off AI work as your own, which is already bad
* AI is plagiarism because training AIs on copyrighted content is itself IP theft
  * But when a human learns from copyrighted content, why is that better than when an AI does?
* AI prevents humans from learning or developing their own skills
  * But people said this about the written word thousands of years ago, and humans adapted then
  * The studies are still coming in and so far are inconclusive
* AI is killing the environment
  * But the vast majority of AI datacenter power buildout is from renewable energy
  * AI demand is driving a surge in clean energy building and research
  * Sure, AI costs energy and water, but so does Facebook and hamburgers
  * If you thought AI was worthwhile, you might be more willing to accept the energy costs
* AI is destroying the livelihoods of artists
  * Fair enough, but technology always does that. And it's also going to automate programmers too
* AI is destroying art itself
  * People said this about photography, and that didn't kill art

I think the strongest anti-AI arguments are:

1. AI may destroy the livelihood of many creative people, which is unfair because AI training depends on those creative outputs
2. AI does consume a lot of energy (albeit mostly clean energy), which is bad if you think that humans should be consuming less energy in general

I don't think these arguments are quite strong enough to justify the vehemence of the anti-AI backlash. It seems to me like much of the backlash is driven by people who really hate tech bros and are predisposed to hate the latest tech fad. But I might be wrong. If you think there's a popular argument against AI that I haven't mentioned or haven't given enough credit to, please email me at 'my full name @gmail.com' and I'll add it to this post.

[^1]: I want to clarify that the dislike of AI is aimed at _generative_ AI in particular: think ChatGPT, not YouTube's recommendation algorithm.

[^2]: The reasons why this is true could be its own blog post (or book).

[^3]: Currently training costs are massively higher than inference costs, but that might change as AI uptake increases and the test-time-compute paradigm means inference can grow more expensive.

[^4]: I am indebted to a reader for providing these sources and making this point salient to me.

[^5]: The thrust of this argument seems to mostly be about visual artists. I haven't heard many people say that AI is destroying the livelihoods of writers and poets. 