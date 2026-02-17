The problem with continuous learning


Why can't models continue to get smarter after they're deployed? Humans do, after all. If you hire a human employee, they will become familiar with your systems over time, and (if they stick around long enough) eventually become much more effective than they were when they were hired. AI models are not like this. They are always exactly as capable as the first moment you use them.

Once an AI lab trains the model, the weights are frozen. The model can only "learn" by updating its own context: in effect, it can take new information into its short-term memory, but not its long-term memory. "Continuous learning" - the ability for a model to update its own weights over time - is thus [often described](https://www.dwarkesh.com/p/timelines-june-2025) as the bottleneck for AGI.

### What's hard about continuous learning?

First, **the _mechanics_ of continuous learning are not hard**. The technical problem of "how do you change the weights of a model at runtime" is straightforward. It's the exact same process as post-training: you determine some kind of reward from the user input, and then run backpropagation across the model weights. To update the weights themselves, you either update them in-place if you can tolerate pausing inference while the data is loaded back into GPU memory, or you stand up a new version of the model in parallel (every hour, say) and switch over in the background.

The hard part about continuous learning is **changing the model in ways that make it better, not worse**. I think many people believe that model training improves linearly with data and compute: if you keep providing more of both, the model will keep getting smarter. This is false. 

If you simply hook up the model to learn continuously from its inputs, you are likely to end up with a model that _gets worse_ over time. At least right now, model learning is a delicate process that requires careful human supervision.

Model training also has a big element of _luck_ to it. If you train the "same" model a hundred times with a hundred different similarly-sized datasets (or even the same dataset and different seeds), you'll get a hundred different models with different capabilities.

Sometimes I wonder if a big part of what AI labs are doing is continually pulling the lever on the slot machine by training many different model runs. Surprisingly strong models, like Claude Sonnet 4, _might_ represent a genuinely better model architecture or training set. But part of it might be that Anthropic just hit on a lucky seed.

- mecha-hitler/Tay risk
- finding good rewards just can't be that difficult
- reputational risk
- degradation of quality - rolling dice for a lucky seed, training good models is far less deterministic than imagined, training runs just can't be that _long_ for strong models, etc
