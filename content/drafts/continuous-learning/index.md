The problem with continual learning


Why can't models continue to get smarter after they're deployed? Humans do, after all. If you hire a human employee, they will become familiar with your systems over time, and (if they stick around long enough) eventually become much more effective than they were when they were hired. AI models are not like this. They are always exactly as capable as the first moment you use them.

Once an AI lab trains the model, the weights are frozen. The model can only "learn" by updating its own context: in effect, it can take new information into its short-term memory, but not its long-term memory. "Continual learning" - the ability for a model to oupdate its own weights over time - is thus [often described](https://www.dwarkesh.com/p/timelines-june-2025) as the bottleneck for AGI.

I think people have some big misconceptions about continual learning.

First, **continual learning is not hard**. The technical problem of "how do you change the weights of a model at runtime" is straightforward. It's the exact same process as post-training: you determine some kind of reward from the user input, and then run backpropagation across the model weights. To update the weights themselves, you either update them in-place if you can tolerate pausing inference while the data is loaded back into GPU memory, or you stand up a new version of the model in parallel and seamlessly switch over.

The hard part about continual learning is **changing the model in ways that make it better, not worse**. I think many people believe that model training is a bit like climbing a big mountain: you get as far up the mountain as you can, and then 

- mecha-hitler/Tay risk
- finding good rewards just can't be that difficult
- reputational risk
- degradation of quality - rolling dice for a lucky seed, training good models is far less deterministic than imagined, training runs just can't be that _long_ for strong models, etc
