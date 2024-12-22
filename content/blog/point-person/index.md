---
title: Why some engineers get trusted with high-impact work
description: Thoughts on building and maintaining trust with very senior managers
order: 19
date: '2024-12-22'
---

Why do some engineers get assigned all the good projects at large tech companies?

It's fun and rewarding to work on critical tasks. But there's only so much important work to go around: a company only cares about a limited number of things at any given time. Worse still, the chances to work on or lead these projects are unevenly distributed. Often this work is done by small, hand-picked teams. I've been on a fair few of those. What gets an engineer put on that list?

### Circles of trust

As you acquire more recognition among managers at your company, you rise up through a series of concentric circles.[^1]

![layers](layers.svg)

At the center is being the go-to engineer on your own team. You start here by just being straightforwardly good at your job. At this point, your manager will (explicitly or implicitly) be steering important work your way.

Next up is being the go-to engineer in your org. At this point, your manager's peers are asking your manager to task you with key pieces of work. You'll probably be on the shortlist to lead any cross-team projects, or at least be tactically placed on cross-team projects that must succeed. Your org's leader (typically a director or VP) knows your name, and may occasionally reach out to you directly to get an engineering perspective. 

Finally, you could be the go-to engineer at your company. All the engineering-facing directors and VPs know your name, and you're routinely pulled onto cross-org ad-hoc teams to execute on key bets. You're considered a key resource, so you're typically not allowed to sit on an individual project for very long - the company will shuffle you over to whatever it considers most important at any given time.

These concentric circles are circles of _trust_: first by your own manager, then by your manager's peers and direct bosses, and finally by the real movers-and-shakers in your company, all the way up to the CEO. Unless you're already snowboarding buddies with your VP, you must pass through those levels in order. Your boss's boss is willing to consider trusting you because your boss does, and so on.

How do you move up through the circles? In my experience, by being invited each step of the way. Unlike in your own team, you can't go up and ask to be put on a particular piece of work. Instead, you get some contact with senior managers by working on important projects, which (if you do a good job) encourages those managers to tap you for more important projects, which gets you contact with more senior managers, and so on. You have very little direct control over any of it - all you can do is put yourself out there and try to be the kind of engineer that leadership wants to put on other projects.

So the question "how do I get the good opportunities" really boils down to this: **what does it take to be the kind of engineer the company can trust?**

### Why trust is so hard

Very few engineers really appreciate just how delicate the relationship is between themselves and very senior managers.[^2] As you talk to people higher in the management chain, they have less and less technical context, and no direct power to affect the product. But they have a lot of institutional power to ask engineers to do things, and a lot of _responsibility_: it's inconvenient to you if a product you work on doesn't succeed, but it will cost your leadership team real money in lost bonuses (and maybe get them fired). That creates a dynamic where they're heavily invested in success, but almost entirely dependent on their engineers: to actually do the work that needs doing, and to tell them what can be done in the time available.

That's why the engineer-leadership relationship is strange and delicate to maintain. These are very powerful people at the company, who can mobilize hundreds or thousands of people to achieve their goals, but they _need your help_ to do anything directly. It's an awkward position for them to be in.

One reason large tech companies have many layers of managers is to avoid having to rely on this relationship. VPs are supposed to be able to talk to their manager direct reports, who talk to their manager direct reports, who get estimates and plans out of their engineers. Everything thus gets triple-handled on the way up and down the chain. In practice, very senior leadership people often chafe at this indirection, and quietly rely on a few very senior engineers as a sounding board or a sanity check. Sometimes this is even formalized in the org chart (for instance, as a 'floating' staff engineer reporting directly to the VP or CEO)[^2].

Even Caesar felt helpless when in the dentist's chair. If you can be genuinely helpful in these circumstances, you will reap the benefits of having Caesar as an ally. But of course, if you betray his trust, you may get your head cut off.

### Maintaining the trust

How can you keep their trust? One easy way is to stay discreet. If your boss's boss's boss comes to you with a quiet question, and you immediately start saying in Slack things like "as I talked about with Big Boss the other day", you have exposed what should have been a private interaction. Even directly bringing it up with your manager _can_ fall into this category, if your manager is the type to potentially get annoyed at being gone around and to complain up the chain.

You should also consciously learn how to talk to them. You and your CTO share almost completely different contexts: different working spheres, different problems, different tools. When they come to you and ask how well a particular feature works (for instance), that question may as well be in a foreign language if you don't have their specific context. If you immediately launch into a reply about SLOs or the quality of the code, you are going to bore them and provide no value. They are almost certainly coming to you because they heard some claim that they want to double-check. You need to draw out some sense of what that claim is before you commit to a response.

Finally, you must get the technical questions - the ones they're trusting you to answer - correct. If you tell them that something works a certain way and it doesn't, or that it's impossible to do X and it turns out to be possible, the trust will be gone. Very senior managers are distant enough from the work that they can't double-check you on details, but because of that they'll be laser-focused on the things they _can_ check you on, like the customer-facing results of a project.

What happens if you do mess it up? Unlike the lion, your friendly neighbourhood executive is not going to literally bite your head off if you mess up the interaction. But you will silently and immediately be dropped from that circle of trust. They will never ask you a direct question again, never loop you into early planning discussions about secret projects, and they won't mention your name in private discussions about who should lead what project. This is not the end of the world, or even the end of your ability to be promoted at the company. But it is the end of your close relationship with that particular executive. For the reasons above, it is risky for a very senior manager to put their trust in an engineer: too risky to take a chance on someone who has once proved unreliable.

### Keep it in your management chain

A word of warning. It is great to be trusted by managers at your company. But **you must try to keep it inside your management chain**. I have seen engineers fall into the trap of becoming the go-to person for managers or product people from different orgs, at the expense of their [actual job](https://charity.wtf/2021/03/07/know-your-one-job-and-do-it-first/). There is no shortage of predatory managers outside your org who would love to have more engineer time "for free" (i.e., they don't have to bargain for it with people who they're actually accountable to) [^3]. One "quick favor" can be a sensible idea. Two or three is a mistake.

It can be pleasant to feel helpful, and for many engineers the opportunity to solve someone's problem is tempting enough. But it's a really bad idea to get involved like this. These people will be very persuasive - it's their job! - but they won't be there during your next promo discussion, and they'll walk away from you the second it's in their interest to do so. Save your energy for the work your org actually pays you to do.

How do you push back against these requests? Directly involve your actual management chain. Say something like "hey, I'd love to help you, let me run that request by my manager so she knows what I'm doing". Your manager will probably bite their head off for poaching her engineers.


### Summary

- The foundation of trust is being good at your job. Be good at your job!
- You get noticed by working on important projects, which gets you noticed by more senior folks, and so on
- The more senior a manager you're trying to build trust with, the more delicate the relationship will be
- It's a different set of skills than building trust with your direct manager
- Direct trust relationships are very useful but violate the "normal" chain of command, so must be kept relatively discreet
- Do not alienate your own direct manager
- Do not invest in these relationships outside your own management chain! Maybe it's possible, but I've never seen it work

[^1]: I'm going to talk about your relationship with very senior managers (e.g. directors, VPs), but I think all of this applies basically anywhere above your direct manager. It becomes more important the higher up you go.

[^2]: There's a loose analogy here to [residual connections](https://en.wikipedia.org/wiki/Residual_neural_network) in transformers - connections in a deep learning model that skip over some layers of weights to ensure that information doesn't get completely lost.

[^3]: What about predatory managers _inside_ your org? They're fine. Those people will be involved in your promo/bonus discussions, and they'll be incentivized to reward you for helping them out.