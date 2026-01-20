---
title: Crypto grifters are recruiting open-source AI developers
description:
order: 167
date: '2026-01-17'
tags: ["ai", "crypto"]
---

Two recently-hyped developments in AI engineering have been Geoff Huntley's "Ralph Wiggum loop" and Steve Yegge's "Gas Town". Huntley and Yegge are both respected software engineers with a long pedigree of actual projects. The Ralph loop is a sensible idea: force infinite test-time-compute by automatically restarting Claude Code whenever it runs out of steam. Gas Town is a platform for an idea that's been popular for a while (though in my view has never really worked): running a whole village of LLM agents that collaborate with each other to accomplish a task.

So far, so good. But Huntley and Yegge have also been [posting](https://ghuntley.com/solana/) [about](https://steve-yegge.medium.com/bags-and-the-creator-economy-249b924a621a) $RALPH and $GAS, which are cryptocurrency coins built on top of the longstanding [Solana](https://solana.com/) cryptocurrency and the [Bags](https://bags.fm/) tool, which allows people to easily create their own crypto coins. What does $RALPH have to do with the Ralph Wiggum loop? What does $GAS have to do with Gas Town?

From reading Huntley and Yegge's posts, it seems like what happened was this:

1. Some crypto trader created a "$GAS" coin via Bags, configuring it to pay a portion of the trading fees to Steve Yegge (via his Twitter account)
2. That trader, or others with the same idea, messaged Yegge on LinkedIn to tell him about his "earnings" ([currently](https://bags.fm/7pskt3A1Zsjhngazam7vHWjWHnfgiRump916Xj7ABAGS) $238,000), framing it as support for the Gas Town project
3. Yegge took the free money and started [posting](https://steve-yegge.medium.com/bags-and-the-creator-economy-249b924a621a) about how exciting $GAS is as a way to fund open-source software creators

So what does $GAS have to do with Gas Town (or $RALPH with Ralph Wiggum)? From a technical perspective, the answer is **nothing**. Gas Town is an open-source GitHub [repository](https://github.com/steveyegge/gastown) that you can clone, edit and run without ever interacting with the $GAS coin. Likewise for [Ralph](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum). Buying $GAS or $RALPH does not unlock any new capabilities in the tools. All it does is siphon a little bit of money to Yegge and Huntley, and increase the value of the $GAS or $RALPH coins.

Of course, that's why these coins exist in the first place. This is a new variant of an old ["airdropping"](https://en.wikipedia.org/wiki/Airdrop_(cryptocurrency)) cryptocurrency tactic. The classic problem with "memecoins" is that it's hard to give people a reason to buy them, even at very low prices, because they famously have no staying power. That's why many successful memecoins rely on celebrity power, like Eric Adams' ["NYC Token"](https://www.nbcnewyork.com/news/local/explaining-eric-adams-crypto-token-launch/6444591/) or the [$TRUMP](https://en.wikipedia.org/wiki/$Trump) coin. But how do you convince a celebrity to get involved in your ~~grift~~ business venture?

This is where [Bags](https://bags.fm/) comes in. Bags allows you to nominate a Twitter account as the beneficiary (or "fee earner") of your coin. The person behind that Twitter account doesn't have to agree, or even know that you're doing it. Once you accumulate a nominal market cap (for instance, by moving a bunch of your own money onto the coin), you can then message the owner of that Twitter account and say "hey, all these people are supporting you via crypto, and you can collect your money right now if you want!" Then you either subtly hint that promoting the coin would cause that person to make more money, or you wait for them to realize it themselves[^1]. Once they start posting about it, you've bootstrapped your own celebrity coin.

This system relies on your celebrity target being dazzled by receiving a large sum of free money. If you came to them _before_ the money was there, they might ask questions like "why wouldn't people just directly donate to me?", or "are these people who think they're supporting me going to lose all their money?". But in the warm glow of a few hundred thousand dollars, it's easy to think that it's all working out excellently.

Incidentally, this is why AI open-source software engineers make such great targets. The fact that they're open-source software engineers means that (a) a few hundred thousand dollars is enough to dazzle them[^2], and (b) their fans are technically-engaged enough to be able to figure out how to buy cryptocurrency. Working in AI also means that there's a fresh pool of hype to draw from (the general hype around cryptocurrency being somewhat dry by now). On top of that, the open-source AI community is fairly small. Yegge [mentions](https://steve-yegge.medium.com/bags-and-the-creator-economy-249b924a621a) in his post that he wouldn't have taken the offer seriously if Huntley hadn't already accepted it.

If you couldn't tell, I think this whole thing is largely predatory. Bags seems to me to be offering crypto-airdrop-pump-and-dumps-as-a-service, where niche celebrities can turn their status as respected community figures into cold hard cash. The people who pay into this are either taken in by the pretense that they're sponsoring open-source work (in a way orders of magnitude less efficient than just donating money directly), or by the hope that they're going to win big when the coin goes "to the moon" (which effectively never happens). 

The celebrities will make a little bit of money, for their part in it, but the lion's share of the reward will go to the actual grifters: the insiders who primed the coin and can sell off into the flood of community members who are convinced to buy.

[^1]: Bags even [offers](https://bags.fm/how-it-works) a "Did You Get Bagged? 💰🫵" section in their docs, encouraging the celebrity targets to share the coin, and framing the whole thing as coming from "your community".

[^2]: This isn't a dig - that amount of money would dazzle me too! I only mean that you wouldn't be able to get Tom Cruise or MrBeast to promote your coin with that amount of money.