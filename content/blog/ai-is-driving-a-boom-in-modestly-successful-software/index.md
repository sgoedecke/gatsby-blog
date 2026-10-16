---
title: AI is driving a boom in modestly successful software projects
description: 
order: 254
date: '2026-10-16'
tags: ["ai"]
---

If AI is so great, why aren't we seeing an explosion of new, amazing software products? If anyone can turn their idea into working software with coding agents, [where is all that software](https://www.natemeyvis.com/where-is-all-the-new-good-software/)? People have been [asking](https://mikelovesrobots.substack.com/p/wheres-the-shovelware-why-ai-coding) [this question](https://www.answer.ai/posts/2026-03-12-so-where-are-all-the-ai-apps.html) for years. As far as I can tell, the answer is that it's spread out over a lot of modestly successful projects:

- Somewhere between 2x and 20x new software is being created, depending on where you look
- There's no real growth in massively successful software projects (not counting AI tools)
- There is around 2x growth in modestly successful software projects

### Where all the new software is

I picked[^1] around twenty separate sources - software marketplaces, plugin registries, modding platforms, etc - which [expose](https://github.com/sgoedecke/where-is-the-software/blob/main/WRITEUP.md) installation counts. I then compared the number[^2] of successful software projects between 2022-24 and 2025-26: i.e. before and after agentic coding hit the mainstream in mid-2025.

There's a clear jump in _modestly_ (not wildly) successful projects. For instance, the NVDA screen-reader [addons directory](https://nvda-addons.org/) had a bit over twice as many new addons with more than a thousand downloads (though no change in addons with more than ten thousand). The HACS open-source home automation [community plugins store](https://www.hacs.xyz/) likewise saw twice as many new addons with over a hundred installs but no change in ones with over a thousand. New Steam games with over a hundred reviews are about 60% more common now than pre-2024. Obsidian plugins, Firefox and Chrome extensions, Nexus game mods, and Blender extensions had the same pattern. The Google Play store, WordPress plugins, and a few others didn't show this pattern, but I think it's still enough to conclude that AI is indeed driving a boom in hobbyist software.

### Why addons and plugins?

I think examining addons, mods, and plugins is useful for a few reasons. First, it's usually pretty easy to tell how many people are using them, or at least have installed them. Obviously AI is letting people produce a lot of software - I work at GitHub, so I see this first-hand, but the explosion in vibe-coded repos is clear to everyone - but without checking installation counts it's unclear how much of this is actually being used.

Second, it's a good way to minimize the amount of software that's _about AI_. It doesn't tell us much about AI's effect on software to point out all the successful software projects that help people code with AI. That's just selling shovels. The real question is whether AI is helping generate software _that solves people's ordinary problems_.

AI-generated game mods and [ports](https://tech.yahoo.com/gaming/articles/ai-game-ports-bring-original-103210194.html) are a great example of this, because gamers aren't trying to change the world with AI coding. They just want to play multiplayer Halo CE in the browser, or [fly a plane](https://www.reddit.com/r/Helldivers/comments/1x6leq7/modders_are_insane/) in Helldivers, or play Super Smash [online](https://yougame.co/base/wii/super-smash-bros-brawl-usa) with rollback netcode. It's looking like[^3] AI can supply this need effectively.

### Were these projects actually AI generated?

Everyone is very coy about AI usage in hobbyist communities. In the rare cases where people admit it, they often get dogpiled. People really don't like AI, even when it's producing software they find useful. Given that, I don't think it's possible to use voluntary AI disclosure data to figure out whether AI is driving a software boom: the presence of the tag itself will discourage use, and many developers are just not going to admit it.

A 2x growth in successful projects between 2022-24 and 2025-26 is clearly _something_ to do with AI, particularly in the background of a 10x growth in total projects. Of course not all of these projects will have AI involvement. But when people ask "why hasn't AI improved software", they're talking about a missing _trend_[^4]: wondering where all the new software is. As it turns out, it's going towards a lot of small software projects that a few hundred or thousand people find useful.

### Why small, moderately successful projects?

Why is AI growth visible in small projects but not big software companies? Why is it concentrated in moderately successful products and not wildly successful ones? I don't have any data for this, but here's my speculation.

Big, successful software companies often have all the visible features they want That's why there's not a wild explosion of new features in, say, macOS or Gmail: what would those features even be? As I've written about [before](/difficulty-in-big-tech/), they're also technically paralyzed by the features they have, so it's not trivial for even very good coding agents to add new ones.  Finally, many new features in successful products are subtle (e.g. enterprise compatibility things that almost all users will never encounter, or purely internal systems that slightly increase reliability).

It's less clear to me why there aren't many new _wildly_ successful hobbyist projects. Maybe it's just hard to have a really good idea for a product, and AI can't help with that. Or maybe it takes years for a really successful project to develop, and we need to be patient for the current crop of thousand-user tools to grow into hundred-thousand-user tools.


[^1]: As you might expect, this research was all done with the help of AI. It wasn't purely vibed - I gave a lot of feedback about where and how to look - but I would definitely not have scraped or analyzed this much data on my own. If you want to see the actual research data (or more likely point an agent at it), I've pushed it [here](https://github.com/sgoedecke/where-is-the-software/tree/main).

[^2]: Sometimes scaling to take into account platform growth. For instance, between the two windows I measured, Obsidian relaxed their requirement that all new plugins be reviewed by an admin, which predictably caused an explosion of plugins on the marketplace.

[^3]: It certainly seems like it can so far, but who knows. Maybe once the hype has died down people will return to less buggy artisanal human-made mods and ports.

[^4]: They might also be asking "why hasn't the software I use gotten better?" For that, see my thoughts in the final section of this post.