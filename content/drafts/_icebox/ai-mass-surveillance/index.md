Can LLMs be the silver bullet for mass surveillance?

Since 2001, Western governments have been collecting a firehose of data about their citizens. This probably isn't great, but one mitigating factor has been that the sheer volume of data makes it impossible for _everyone_ to be watched. There are a few governments who could read my emails if they wanted to, but they're very unlikely to notice anything suspicious[^1] unless they're already looking at me specifically.

The [NSA](https://en.wikipedia.org/wiki/National_Security_Agency) employs about 32,000 people to watch around 340 million Americans. In Australia, where I live, ASIO employs around 2000 people to watch 27 million Australians. That's around ten thousand people per spook: far too many to keep an eye on manually. This is a difficult political and moral problem. It's also a difficult _engineering_ problem.

Intelligence agencies have been tinkering with various machine learning classification models for decades. However, the AI big success story of the past four years has been LLMs, which are surprisingly good at handling unstructured text (like, say, a bundle of somebody's emails). I haven't seen this first-hand, but I would be shocked if there isn't currently a quiet frenzy of government software [contractors](https://www.palantir.com/) trying to sell LLMs as a silver bullet solution for mass surveillance. Could this work? How worried (or excited) should we be about the potential for LLMs to make it possible to watch _everybody_?

### The simplest possible solution

Let's start with the simplest version of the problem: identifying terrorists via email, one prompt at a time. How much data is that?

About 380 billion emails are sent [per day](https://www.emailtooltester.com/en/blog/how-many-emails-are-sent-per-day/). If you scale that down to the US, you still get around thirty billion[^2] emails. Spam is [75% of traffic](https://securelist.com/kaspersky-security-bulletin-spam-evolution-2013/58274/), and detecting spam is a relatively solved problem that does not require a LLM (yet), so we're down to 22 billion emails per day. Let's say the average email is a few hundred words. A LLM [token](https://seantrott.substack.com/p/tokenization-in-large-language-models) is about 3/4 of a word, so we're looking at roughly seven trillion tokens per day. That's a lot, but it would eventually be doable: based on public metrics, it'd be around a third of OpenAI's [total daily token usage](https://www.theregister.com/2026/04/01/openai_122_billion/).

However, if you're only spending seven trillion tokens, you're using LLMs in the simplest possible way: take each email, append it to a prompt like "does this look like a terrorist to you? Only answer yes or no", and then parse the immediate answer. This is a bad way to use LLMs, because it doesn't allow them to reason. Once you start letting the model "think out loud", you probably end up doubling your token usage.

It's also a bad idea to try and assess each email in isolation. Instead, we want to feed the model as much context as possible: previous emails, for sure, but also biographical data about everyone in the email chain. That will triple your token usage again, since the model doesn't just have to ingest that new data but also reason over it. We're rapidly approaching numbers that are genuinely untenable, even for large and powerful governments. And remember, this is only for email. Including instant messaging will triple this again.

This is a classic LLM "pipeline" design

I think this is a bad design. It handwaves a lot of really difficult technical problems (like assembling the per-person biographical data), and it doesn't seem like it'd do a good job at evading even minimal attempts at obfuscation. 

[^1]: There is nothing suspicious in my emails.

[^2]: US population is ~4% of the world, then double it to account for the fact that Americans do more office jobs and have more smartphones and so probably send more emails than the average.



how to build llm powered mass surveillance?
not a trivial problem at all
first what is the point - what are you watching for?
building 'personas' from mass data is its own problem (not really helped by LLMs, at scale, right? llms can probably extract a few bespoke personas, but in practice it's a normal ML clustering problem)

likewise do you just feed everything through a prompt that says "does this merit human attention", given the context of persona data?
or an agentic system with an alert_user call? just let the LLM figure out how to navigate the sea of data itself?
  how to partition? if you just let X agents loose you will get a ton of overlap before you get decent coverage. but partitioning may drop key data

fine-tuning is an easy way to do "something" with mass data, but IMO it doesn't help bc (a) you still need to DO something, and (b) models don't do well fine-tuned on random, non-tightly-semantically-linked data. You won't just magically get a LLM that knows all about all its training data and can simply reflect to generate personas and make assessments
