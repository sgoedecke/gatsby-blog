---
title: Large tech companies don't need heroes
description:
order: 173
date: '2026-02-08'
tags: ["tech companies"]
---

Large tech companies operate via _systems_. What that means is that the main outcomes - up to and including the overall success or failure of the company - are driven by a complex network of processes and incentives. These systems are outside the control of any particular person. Like the parts of a large codebase, they have accumulated and co-evolved over time, instead of being designed from scratch.

Some of these processes and incentives are "legible", like OKRs or promotion criteria. Others are "illegible", like the backchannel conversations that usually precede a formal consensus on decisions[^1]. But either way, **it is these processes and incentives that determine what happens, not any individual heroics**.

### How heroes are forged in large tech companies

This state of affairs is not efficient at producing good software. In large tech companies, good software often seems like it is produced _by accident_, as a by-product of individual people responding to their incentives. However, that's just the way it has to be. A shared belief in the mission can cause a small group of people to prioritize good software over their individual benefit, for a little while. But thousands of engineers can't do that for decades. Past a certain point of scale[^2], companies must depend on the strength of their systems.

Individual engineers often react to this fact with horror. After all, _they_ want to produce high-quality software. Why is everyone around them just cynically[^3] focused on their own careers? On top of that, many software engineers got into the industry because they are internally compelled[^4] to make systems more efficient. For these people, it is viscerally uncomfortable being employed in an inefficient company. They are thus prepared to do _whatever it takes_ to patch up their system's local inefficiencies.

Of course, making your team more effective does not always require heroics. Some amount of fixing inefficiencies - improving process, writing tests, cleaning up old code - is just part of the job, and will get engineers rewarded and promoted just like any other kind of engineering work. But there's a line. Past a certain point, working on efficiency-related stuff instead of your actual projects will get you punished, not rewarded. To go over that line requires someone willing to sacrifice their own career progression in the name of good engineering. In other words, it requires a _hero_.

### Large tech companies do not benefit from heroes

You can sacrifice your promotions and bonuses to make one tiny corner of the company hum along nicely for a while. However, like I said above, the overall trajectory of the company is almost never determined by one person. It doesn't really matter how efficient you made some corner of the [Google Wave](https://en.wikipedia.org/wiki/Google_Wave) team if the whole product was doomed. And even poorly-run software teams can often win, so long as they're targeting some niche that the company is set up to support (think about the quality of most profitable enterprise software).

On top of that, **heroism makes it difficult for real change to happen**. If a company is set up to reward bad work and punish good work, having some hero step up to do good work anyway and be punished _will only insulate the company from the consequences of its own systems_. Far better to let the company be punished for its failings, so it can (slowly, slowly) adjust, or be replaced by companies that operate better.

### ...but will exploit them

Large tech companies don't benefit long-term from heroes, but there's still a role for heroes. That role is _to be exploited_. There are no shortage of [predators](/predators) who will happily recruit a hero for some short-term advantage.

Some product managers keep a mental list of engineers in other teams who are "easy targets": who can be convinced to do extra work on projects that benefit the product manager (but not that engineer). During high-intensity periods, such as the lead-up to a major launch, there is sometimes a kind of cold war between different product organizations, as they try to extract behind-the-scenes help from the engineers in each other's camps while jealously guarding their own engineering resources.

Likewise, some managers have no problem letting one of their engineers spend all their time on [glue work](/glue-work-considered-harmful). Much of that work would otherwise be the manager's responsibility, so it makes the manager's job easier. Of course, when it comes time for promotions, the engineer will be punished for not doing their real work.

This is why it's important for engineers to pay attention to their _actual_ rewards. Promotions, bonuses and raises are the hard currency of software companies. Giving those out shows what the company really values. Predators don't control those things (if they did, they wouldn't be predators). As a substitute, they attempt to appeal to a hero's internal compulsion to be useful or to clean up inefficiencies.

### Summary

- Large tech companies are structurally set up to encourage software engineers to engage in heroics
  - This is largely accidental, and doesn't really benefit those tech companies in the long term, since large tech companies are just too large to be meaningfully moved by individual heroics
  - However, individual managers and product managers inside these tech companies have learned to exploit this surplus heroism for their individual ends

- As a software engineer, you should resist the urge to heroically patch some obvious inefficiency you see in the organization
- Unless that work is explicitly rewarded by the company, all your efforts will do is delay the point at which the company has to change its processes

- A background level of inefficiency is just part of the landscape of large tech companies
  - It's the price they pay to be so large (and in return reap the benefits of scale and [legibility](/seeing-like-a-software-company))
  - The more you can learn to live with it, the more you'll be able to use your energy tactically for your own benefit



[^1]: I write about this point at length in [_Seeing like a software company_](/seeing-like-a-software-company).

[^2]: Why do companies need to scale, if it means they become less efficient? The best piece on this is Dan Luu's [_I could build that in a weekend!_](https://danluu.com/sounds-easy/): in short, because the value of marginal features in a successful software product is surprisingly high, and you need a lot of developers to capture all the marginal features.

[^3]: For a post on why this is not actually that cynical, see my [_Software engineers should be a little bit cynical_](/a-little-bit-cynical/).

[^4]: I write about these internal compulsions in [_I'm addicted to being useful_](/addicted-to-being-useful).