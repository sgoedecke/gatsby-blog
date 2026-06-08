---
title: Working with product managers
description: 
order: 204
date: '2026-06-08'
tags: ["tech companies"]
---

The relationship engineers have with product management is more dysfunctional than with any other part of the company. There's no shared culture or language like there is with other engineers, and the rules of "who gets to tell who what to do" aren't as clear-cut as they are with managers. Engineers don't have a lot in common with legal, or design, or sales, but they also don't need to interact much with those roles. In my experience, engineers are communicating with product managers almost every single day.

### Against the "product mommy"

The worst version of the product/engineering relationship goes something like this:

Engineers are technically competent but are too autistic to be fully trusted. They need a kind-but-stern parental figure who knows how to communicate to other stakeholders in the organization (for instance, by being comfortable using the word "stakeholders"), and how to keep engineers from going off in the wrong direction.

This entire gross dynamic is neatly captured by the popular term ["product mommy"](https://x.com/search?q=%22product%20mommy%22&src=typed_query)[^1].
I really, really don't like that term, or this entire dynamic in general. Almost none of my relationships with my product managers have been anything like this, though I have seen it at a distance.

Working well with product managers can be the difference between succeeding and failing at a company. Why is it so hard to maintain good relationships between engineering and product? What does a good relationship look like?

### Why it's so hard to build trust

Product managers and engineers have largely non-overlapping skillsets. Product managers don't understand the technical work engineers do and aren't equipped to talk about it: if an engineer gives a technical reason for something, product managers generally have to shrug and say "sure, I guess". Likewise, engineers don't have anything like the visibility into the organization that product managers do. Particularly in large organizations, it is the product manager who is the source of truth about who wants what and which features are important. When a product manager says that something is critical, engineers generally have to shrug and say "sure, I guess".

This obviously requires a lot of trust. What's a little less obvious is that **this trust is continually broken by both sides**. Every single product manager has been told _thousands_ of times that technical task X is technically impossible or would be disastrous, only for that task to end up being done fairly smoothly and successfully. Every single engineer has been told _thousands_ of times that requirement X is absolutely critical and worth going to enormous effort for, only for that requirement to be silently dropped or changed with no apology.

Of course this isn't malicious. Engineers often give wrong estimates because [estimation is impossible](/how-i-estimate-work/), and sometimes the dire consequences they warn about really do happen (they're just handled behind the scenes, like engineers handle many other kinds of technical dysfunction). Product managers "change their minds" because what's important in a large tech company does genuinely change hour-by-hour[^2], and even the best attempts to only filter the most reliable priorities through to the engineering team will sometimes go wrong.

### Manipulation and lies

The consequence of this broken trust is that the relationship becomes very difficult to maintain. When you're an engineer, and you explain something to your product manager, and you _know_ they don't believe you (despite having no ability themselves to judge the question), it can be incredibly frustrating. Likewise, when you're a product manager, and you're desperately trying to explain what we need to do to an engineer, and you know they're internally shrugging their shoulders, it must be unbearable. Don't they know this is critical to the company? You were just in a meeting with the leaders of the organization!

The natural tool for a mistrustful product manager is _manipulation_. I still remember a product manager who tried to extract a commitment from my team by asking us to go around and all say "I commit to getting this work done in two weeks", after a conversation where we'd explained the risks that cause it to take longer. I suppose the idea was that we'd all work much harder, having taken a sacred oath? More subtle variants of this approach involve suggesting that you would be really disappointed if this work was delayed (in true "product mommy" style), or vaguely suggesting the possibility of some abstract reward (that the product manager is not empowered to deliver) if work gets done ahead of schedule.

The natural tool for a mistrustful engineer is _lies_. The most benign version of this is exaggerating estimates: for instance, the classic advice to [double your estimate and add 20%](https://news.ycombinator.com/item?id=19671824). I've seen engineers claim that they've had to follow up on all sorts of largely-fake tasks (one common example is "reaching out to a neighbor team to confirm X") in order to gain more time. In the worst case, engineers might even straight-out lie that work has been completed, and then track the "it doesn't work in production" feedback as a bug.

Once this starts happening, it's nearly impossible to repair the relationship. I can't bring myself to trust a product manager who's clearly trying to pull my strings, and I'm sure a product manager can't trust an engineer who's lied to their face in the past. That's why it's so important to avoid getting into a bad relationship in the first place.

### Don't fight with the product manager

Why bother? If it's so hard to hammer out a good working relationship with product managers, why not just settle for a bad one? Product managers can absolutely _bury_ you if you're not careful.

Product managers are almost always more politically sophisticated than engineers. This is partly structural: product managers are simply in more conversations with the company's movers and shakers, and so naturally have a better relationship with them (and are thus better attuned to which way the wind is blowing). It's also partly selection bias: engineers can be hired even with relatively poor social skills, because they're primarily being assessed on technical ability, but social skills are a core part of the product role[^3].

**If you are feuding with a product manager, you will probably lose**. Unless you're unusually influential, they will simply have far more opportunities to quietly talk you down in influential circles than you will. All it takes is a few comments like "oh, I probably wouldn't pick Sean for that project" to wreck your reputation. In the case where you are _openly_ feuding with a product manager, the company's leaders will by default take the product manager's side over yours. They're likely to know them better, have more shared cultural context with them, and in general be willing to interpret the situation as "another engineer who doesn't understand how the organization works".

There are huge benefits to being trusted by a product manager. Product managers _want to ship things_, and typically understand a fair amount about all of the non-technical barriers to shipping. If you also want to ship things, you can become a fearsome team.

On top of that, because trust between engineers and product managers is so difficult, once you're in you're in all the way. Product managers often pick one or two engineers as their go-to for getting the "real story" on technical questions. If that's you, you have an outsized position of influence in the organization, which you can use to [get the things you want done](/how-to-influence-politics/).

### How can you build trust with product managers?

As an engineer, how can you build trust with your product manager?

The first step is to **understand where they're coming from**. When they tell you something is important or that a requirement has come in, be aware that this is rarely their decision. It's not them who's jerking you around, it's someone higher up in the food chain jerking you both around. If you can adopt a conspiratorial mindset _with_ them, instead of _against_ them, that's a good start. Try just asking "oh man, alright, what can we do about this?" instead of complaining.

The second step is to **be right, a lot**. This is a silly-sounding Amazon leadership principle that turns out to be entirely accurate. I wrote more about it [here](https://www.seangoedecke.com/being-right-a-lot/), but (as unfair as it sounds) you really do have to be mostly accurate if you want to build trust with a product manager. When you say something will ship, it has to ship; when you say something is impossible, it can't happen days or weeks later. It's okay to be wrong _sometimes_, but you have to establish a pattern of you providing them useful, correct technical information.

The third step is to **let them make the political calls most of the time**. If you expect them to trust your technical calls, you have to extend them the same trust when it comes to navigating the organization. Don't publicly undermine them in meetings, bring up your concerns in private. If they say something is important and you're not so sure, at least act like it is. Accept that sometimes they're going to be wrong, just like you're sometimes wrong about technical questions.

The fourth step is to **get lucky**. Sometimes your product manager will just be a dud. You can't build trust with someone incompetent: there's nothing for you to trust them with, and they aren't in a position where they can usefully extend trust to you. Working in large organizations requires getting comfortable with the fact that some of your colleagues will be stronger than others, and figuring out ways to work with (or bypass) people who make the work harder, not easier.

### "Technical" product managers

Many product managers were once engineers. If your product manager is technical, does that make you immune from these problems? Absolutely not!

You likely won't have much choice in which product managers you work with, but be aware that having once been an engineer is a _negative_, not a positive. No product manager can ever be technical enough to matter, because [they don't work on the codebase](/you-cant-design-software-you-dont-work-on/): even if they were a full-time engineer, they wouldn't have the time to build the specific context on the system they'd need to be a real participant in technical discussions. It's thus better to have a product manager who knows they're not technical than to have one who mistakenly thinks they might be.

The worst-case scenario is an ex-engineering product manager who believes they're technical enough to detect when engineers are lying to them. This kind of paranoia is an easy trap for "technical" product managers to fall into, particularly when they don't have a trusted engineer on the team they can lean on. If you're dealing with one of these, prepare to spend a lot of time explaining why you can't "just" do things (and prepare to have those explanations not be believed).

### Conclusion

At its worst, a product manager relationship is like an unhealthy family: driven by condescension, emotional manipulation, lies, and mistrust. This isn't because product managers are bad people! It's because the structure of the relationship creates conflict. Both sides must make commitments (about the technical system or goals of the organization) that are (a) often wrong, and that (b) the other side is unable to independently verify. To avoid the trap, both sides have to be generous, willing to trust each other in their areas of expertise, and most importantly _competent_.


[^1]: Unlike most roles in tech, product management (particularly the lower-level roles that are more engineer-facing) has close to an [even](https://www.productplan.com/blog/gender-diversity-better-products) gender split.

[^2]: For instance, based on the whims (or snap decisions, more charitably) of the CEO.

[^3]: I have worked with product managers with poor social skills, but it's rare: about as rare as working with engineers with genuinely poor (i.e. by general-population standards) technical skills.