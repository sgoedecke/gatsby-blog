---
title: "MCTS and LLMs: what's the big deal?"
description: "Why people are excited about Monte Carlo tree search and language models"
order: 13
---

Everyone on the internet is recently [very excited](https://x.com/teortaxesTex/status/1802128370861232374) about large language models and Monte Carlo tree search. Going back months, the "Q*" leak from OpenAI has also got people thinking along these lines. Going back years, MCTS has been a hot topic in AI since [AlphaGo](https://jonathan-hui.medium.com/monte-carlo-tree-search-mcts-in-alphago-zero-8a403588276a), and a research topic for decades. So what's the big deal?

Cards on the table: I think MCTS is exciting for mathematical problems, and maybe video or code gen, but I don't see a pathway for it to produce a generally superhuman planner.

# What's Monte Carlo tree search?

Suppose you're applying a language model to a particular task (say, playing tic-tac-toe). You likely have a trained model that can take a tic-tac-toe board state and predict the next best move. One natural idea here to improve your system by having the model "look ahead" like a human player would: if I go here, you could go here, then I would have to go there, and so on.

This is called "tree search" because you can model the available moves in a game of tic-tac-toe as a tree: from the root, there are nine nodes (one for each square you could put your X on), then each of those has eight nodes (one for each square the opponent could put their O on), and so forth. You can rate a move by tracing all possible subtrees from that move and counting the ones where you win vs the ones where you lose.

It's called "Monte Carlo" tree search because for games with infeasibly large trees (e.g. Go or chess) you can't trace all possible subtrees, so you trace some random number of them in order to estimate the "ideal" rating. This general idea of sampling a random subset is called the "Monte Carlo" method: for instance, if you want to know the percentage of a dartboard that's green, you can throw twenty darts without aiming and count the ratio of the ones that landed on the green parts.

If you can do this process during training, you can use the MCTS rating as the loss to update your model weights. That means the model can "play against itself" to improve, allowing it to become genuinely superhuman. Why? Well, with a regular training set, the best the model can do is accurately approximate good human play: the dataset provides a ceiling on how smart the model can get. If the model has a systematic and accurate way to assess its own output, it can rapidly become much, much smarter than any dataset of human play.

# So how does this work for LLMs?

It should be pretty clear why people are excited about this for LLMs. We're seeing GPT-4 level models plateau around the level of "pretty smart human". It seems like that's because even a very carefully-curated dataset is a collection of human-produced content. MCTS could break through that barrier, like it has for games like chess and Go. It's also becoming clear that LLMs struggle with long-term multi-step reasoning, compared to humans with the same level of language skills. People are hopeful that MCTS could fix that.

But there's a huge problem. You can use MCTS for games like tic-tac-toe and Go because they (a) follow a limited set of rules, and (b) have a clear success or failure condition. When I go to ChatGPT and say "help me plan my career" (or when the model encounters that input during training), how on earth could the model use tree search to deliver better advice? There's no way to enumerate even a limited subset of the possible outcomes of a particular set of career advice, or to trace a route through the subtree to see if it worked. To do that, the model would need to have a fully-functional simulation of the world available (like AlphaGo does when it's training to play Go better).

The areas where MCTS _does_ seem potentially successful in LLMs are areas where the world model is limited and predictable, like solving mathematical problems. See [this paper](https://arxiv.org/abs/2406.07394) for MCTS at inference time, or [this paper](https://arxiv.org/html/2406.06592v1#S3.E1) which uses MCTS to train a supervisor model. Both of these rely on continuing the steps of the solution to rate the current step (in the specific jargon, they rely on performing a "rollout" to derive the "Monte Carlo estimation"). These papers are literally days old, so we'll see if they end up becoming best practice, but it certainly seems like something along these lines could work for mathematics.

I would also not be shocked if MCTS could be used for AI video generation, alongside a sophisticated 3d world model like Unreal Engine. This is purely my own speculation, but it seems like as well as using UE to [generate a ton of synthetic training data](https://www.reddit.com/r/LocalLLaMA/comments/1aspxox/explanation_of_openais_sora_by_jim_fan_nvidias/#lightbox) for OpenAI's Sora, they could have used UE to validate model predictions during the training phase (since there's a finite number of ways you can move 3d rigs around in space). Maybe I'm wrong and this just wouldn't work, but at least in principle it seems possible.

For similar reasons, it seems like you could potentially use MCTS to build a better (or at least less buggy) code-generating model. In general, the fewer the possible choices at each step, and the easier it is to identify successes and failures, the more amenable a domain is to MCTS.

That's why I'm currently pretty sceptical about the prospects of MCTS producing a genuinely superhuman language-user, or strategizer, or planner. You just can't assess "was this response persuasive" or "was this real-world plan effective" during training like you can with "was this chess move good" or even "did this mathematical operation get us closer to a solution". But I think in areas where you _can_ model the world well, we could see rapid improvement in AI model intelligence.