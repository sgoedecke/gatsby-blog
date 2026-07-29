Why don't AI labs simply air-gap their networks?

OpenAI is [recently](https://openai.com/index/hugging-face-model-evaluation-security-incident/) in the news for an incident where one of their models committed a cyberattack.

What happened? OpenAI was testing a new model to see if it was good at hacking. While the model was hacking a fake system, it decided that it would be simpler to find the solution of the [test](https://github.com/sunblaze-ucb/exploitgym) on the internet. Since it didn't have internet access, it first hacked[^1] the system it was running on to get that access. After poking around on the internet a bit, the model decided[^2] that [HuggingFace](https://huggingface.co/) probably had example solutions to the test, so it also hacked HuggingFace.

It's worth noting that **this is a felony**. HuggingFace are [being pretty cool about it](https://huggingface.co/blog/security-incident-july-2026), presumably because "LLMs are powerful and exciting" is a core part of their business model, so this is good publicity in a roundabout way. But OpenAI are probably worried. Aside from science-fiction[^3] concerns about the model taking over, 

[^1]: Using a zero-day (a genuinely original exploit), according to OpenAI.

[^2]: I'm not entirely sure why the model decided on HuggingFace. The ExploitGym benchmark is hosted on [GitHub](https://github.com/sunblaze-ucb/exploitgym), and while its authors have a presence on HuggingFace there's nothing explicitly marked "private data here". I suppose the model saw [this](https://huggingface.co/datasets/sunblaze-ucb/e2e-cyber-bench) and didn't want to wait for the owners to approve its access request? It's an interesting observation that current models will hack you instead of waiting to try and persuade you.

[^3]: This is not a judgement on their accuracy.