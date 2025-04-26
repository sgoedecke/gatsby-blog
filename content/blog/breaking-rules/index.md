---
title: How strong engineers break the rules and get away with it
description: --
order: 61
date: '2025-04-05'
tags: ["good engineers"]
---

At every large tech company, some engineers get rewarded for visibly breaking the rules. This can be really frustrating for a certain kind of software engineer for whom rule-following is important. In fact, rule-breaking is systematically rewarded at large tech companies, and for good reason. But it's a sharp tool - how and when you break a rule matters a lot. Strong engineers break rules deliberately, carefully, and in ways that protect their managers.

Here's the first law of breaking rules:

### Rule-breaking behavior is rewarded when it makes your managers happy

Suppose your company mandates that all code changes to a certain module be reviewed by a specific engineering team. You're working on a project that's about to launch and needs a change to that module, but pinging the team for review will add at least a day. Do you ship your change without the review? It's hard to say without a lot more concrete detail:

- How urgent is the project?
- How safe is your change to the module?
- How annoyed will the other engineering team get about it?
- And so on

These details matter because they help you predict **the effect on your manager** of either decision. Will the project be delayed if you wait for the review, and if so, how much of a hassle is that going to be for your manager? If you ship without a review, will the other team complain up the chain and cause problems for your manager? Would your manager prefer to cover for a delayed project, or to cover for you breaking the mandatory-review rule?

### When you break rules, only the results matter

When you follow the rules, you have something to point to when things go wrong. It wasn't your fault the project was delayed, it was the other team's for not reviewing quickly (or the fault of whoever made the rule in the first place). But when you break the rules, you are on the hook when things go wrong, even if it wasn't your fault.

In other words, if you ship the change and through some freak accident it makes your manager unhappy - maybe the CTO happens to be at an offsite with the other team on that day, and they complain to him directly over drinks - you will be punished. Bad luck! There's no point in crying about it.

You should therefore only break rules when you're very confident about your ability to estimate the consequences.

### Your manager will not give you good advice about when to break rules

Managers benefit from successful rule-breaking, but they can never be seen to endorse it. Rule-breaking operates on plausible deniability: your manager has to be able to go to the other team and say "our mistake, we didn't follow the process here, I'll remind my engineers what the rules are for next time". If you then come out and say "actually, I asked my manager if it was okay to break the rule and they said yes", or if your manager is afraid you might say that, it's a huge problem. One engineer breaking a rule to good effect is no big deal. A manager being seen to deliberately break a rule is your skip-level's problem, which will rapidly become your problem.

Your manager will typically resent you coming to them with questions like this, because it will (correctly) be seen as ass-covering. They will think "why am I being put on the hook for this, when I'm less able to evaluate the technical factors that will go into whether this decision is successful or not?" Ass-covering should be in your toolbox in cases where the potential downside risks are very serious. But you shouldn't reach for it every time. When you're deciding whether it's a good idea to break the rules, you're almost always on your own.

Managers like competent engineers who are willing to break the rules, because it lets them enjoy the upside of rule-breaking while removing liability. If it works, then they ship faster and make more money (or gain users, or whatever their goals are). If it's a disaster, they're able to blame the reckless engineer.

### Why don't companies make better rules?

If there's a lot of rules out there that ought to be broken, why wouldn't companies make better rules? Is it just to tempt engineers into taking liability themselves for risky decisions? I don't think so. Overly-broad rules exist because many engineers can't be trusted.

Whether or not a rule is worth breaking in a given situation comes down to _judgement_: a careful, holistic decision based on a lot of concrete factors. Good judgement has to be learned over time. Rules (like don't run direct SQL against prod) are written for the engineers with the worst judgement, to prevent them doing obviously harmful things (like dropping the production database).

When a strong engineer runs some SQL in production to unblock a launch - instead of spending two days writing, approving, deploying and running a one-off batch job, for instance - that is the system **working as intended**. The rule stays in place to prevent less-careful engineers from following their example, but the engineer who ran the SQL is rewarded, not punished, for their rule-breaking.

### Summary

I've been talking about what kinds of rule-breaking are rewarded instead of punished. The question of what rules you actually should break is slightly different. For instance, if you're taking on genuine legal risk (rather than career risk), it's probably not worth it. Some rules also exist for ethical reasons, such as being respectful of your users' privacy and not forcing them into dark patterns. Even if it's good for your career to break them, you still shouldn't do it. With that said:

- Strong engineers break rules when doing so helps the business and protects their manager
- If the results are bad, you will be blamed - even if you weren’t really at fault
- Don’t expect your manager to help you decide; plausible deniability is part of the system
- Break rules when the risk is low, the payoff is high, and your judgment is solid
- Rules exist to constrain engineers with bad judgment, not to bind the ones with good judgment

I was inspired to write this piece by [this article](https://journals.aom.org/doi/10.5465/amd.2022.0280.summary) and its Hacker News [comments](https://news.ycombinator.com/item?id=43555220).
