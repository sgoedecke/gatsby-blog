---
title: On being the go-to engineer
description: Pros, cons, and how to do it
order: 18
date: '2024-12-16'
---

In every group of engineers there are a few with the reputation of being able to get things done. Their names come up in meetings: "this task is important, we should put engineer X on it". This doesn't always correlate to a senior/staff title, but having this status is a great help for engineers who want to get promoted to those levels. Being this kind of engineer is important to me. For many engineers, I think it's their main motivation, greater even than extra compensation or titles. They want to be recognized by their colleagues as capable: as the go-to engineer when something really needs doing. They want to be hand-picked by the company leadership for important projects.

How do you get that recognition?

### Circles of trust

As you acquire more recognition among managers at your company, you rise up through a series of concentric circles[^1].

![layers](layers.svg)

At the center is being the go-to engineer on your own team. At this point, your manager will (explicitly or implicitly) be steering important work your way.

Next up is being the go-to engineer in your org. At this point, your manager's peers are asking your manager to task you with key pieces of work. You'll probably be on the shortlist to lead any cross-team projects, or at least be tactically placed on cross-team projects that must succeed. Your org's leader (typically a director or VP) knows your name, and may occasionally reach out to you directly to get an engineering perspective. 

Finally, you could be the go-to engineer at your company. All the engineering-facing directors and VPs know your name, and you're routinely pulled onto cross-org ad-hoc teams to execute on key bets. You're considered a key resource, so you're typically not allowed to sit on an individual project for very long - the company will shuffle you over to whatever it considers most important at any given time.

These concentric circles are circles of _trust_: first by your own manager, then by your manager's peers and direct bosses, and finally by the real movers-and-shakers in your company, all the way up to the CEO. So the question "what does it take to be the go-to engineer" really boils down to this: **what does it take to be the kind of engineer a VP or C-staff executive can trust?**

### Helping out the lion

Very few engineers really appreciate just how delicate the relationship is between themselves and very senior managers.[^1] As you talk to people higher in the management chain, they have less and less technical context: less and less familiarity with the actual nuts-and-bolts rubber-meets-the-road mechanics of building the product. They certainly have no direct power to affect the product, like you do. But they have a lot of institutional power to ask engineers to do things, and a lot of _responsibility_: it's inconvenient to you if a product you work on doesn't succeed, but it usually directly costs your leadership team money in lost bonuses, and may well cost them their entire jobs. That adds up to a dynamic where they're heavily invested in success, but almost entirely dependent on their engineers: both to actually do the work that needs doing, and to tell them what's hard and what's easy, or what can be done in the time available.

That's why the engineer-leadership relationship is strange and delicate to maintain. These are very powerful people at the company, who can mobilize hundreds or thousands of people to achieve their goals, but they _need your help_ to do anything directly.

One reason large tech companies have many layers of managers is to avoid having to rely on this relationship. VPs are supposed to be able to talk to their manager direct reports, who talk to their manager direct reports, who get estimates and plans out of their engineers. Everything thus gets triple-handled on the way up and down the chain. In practice, very senior leadership people often chafe at this indirection, and quietly rely on a few very senior engineers as a sounding board or a sanity check. Sometimes this is even formalized in the org chart (for instance, as a 'floating' staff engineer reporting directly to the VP or CEO)[^2].

It's like the story of the lion who needs a dextrous human to pull the thorn out of its paw, or how even the President of the USA feels helpless when in the dentist's chair. If you can be genuinely helpful in these circumstances, you will reap the benefits of having a lion (or President) as an ally. But of course, if you betray their trust, you may get your head bitten off.

### Breaking the trust and its consequences

How can you betray their trust? One easy way is by spilling the beans. If your boss's boss's boss comes to you with a quiet question, and you immediately start saying in Slack things like "as I talked about with Big Boss the other day", you have exposed what should have been a discreet interaction. Even directly bringing it up with your manager _can_ fall into this category, if your manager is the type to potentially get annoyed at being gone around and to complain up the chain.

Another way is by not knowing how to talk to them. You and your CTO share almost completely different contexts: different working spheres, different problems, different tools. When they come to you and ask how well a particular feature works (for instance), that question may as well be in a foreign language if you don't have their specific context. If you immediately launch into a reply about SLOs or the quality of the code, you are going to bore them and provide no value. They are almost certainly coming to you because they heard some claim that they want to double-check. You need to draw out some sense of what that claim is before you commit to a response.

Finally, you can't get the technical questions - the ones they're trusting you to answer - too badly wrong. If you tell them that something works a certain way and it doesn't, or that it's impossible to do X and it turns out to be possible, the trust will be gone. Very senior managers are distant enough from the work that they can't double-check you on details, but because of that they'll be laser-focused on the things they _can_ check you on, like the customer-facing results of a project. You don't rise to a high  You have to be right about those things.

What happens if you do mess it up? Unlike the lion, your friendly neighbourhood executive is not going to literally bite your head off if you mess up the interaction. But you will silently and immediately be dropped from that circle of trust. They will never ask you a direct question again, never loop you into early planning discussions about secret projects, and they won't mention your name in private discussions about who should lead what project. This is not the end of the world, or even the end of your ability to be promoted at the company. But it is the end of your close relationship with that particular executive. For the reasons above, it is very risky for an executive to put their trust in an engineer: too risky to take a chance on someone who has once proved unreliable.

### Don't be too available

A word of warning. It is great to be trusted by people in your management chain. But 


### Summary

- 

[^1]: I'm going to talk about your relationship with very senior managers (e.g. directors, VPs), but I think all of this applies basically anywhere above your direct manager. It becomes more important the higher up you go.

[^2]: There's a loose analogy here to [residual connections](https://en.wikipedia.org/wiki/Residual_neural_network) in transformers - connections in a deep learning model that skip over some layers of weights to ensure that information doesn't get completely lost.