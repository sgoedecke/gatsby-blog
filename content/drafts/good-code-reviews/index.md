---
title: Mistakes I see engineers making in code review
description: 
order: 100
date: '2025-06-21'
tags: ["good engineers", "software design", "explainers"]
---

"Code review" is the practice of having all code changes be reviewed by another engineer before they're deployed. There are a lot of different ways to do code review, and everyone seems to have strong opinions about it. Here's my list of the mistakes I see people making in code review.

### Don't just review the diff

The biggest mistake I see is **doing a review that focuses solely on the diff**[^1]. Most of the highest-impact code review comments have very little to do with the diff at all, but instead come from your understanding of the rest of the system.

For instance, one of the most straightforwardly useful comments is "you don't have to add this method here, since it already exists in this other place". The diff itself won't help you produce a comment like this. You have to already be familiar with other parts of the codebase that the diff author doesn't know about.

Likewise, comments like "this code should probably live in this other file" are very helpful for maintaining the long-term quality of a codebase. The cardinal value when working in large codebases is _consistency_ (I write about this more in [_Mistakes engineers make in large established codebases_](/large-established-codebases)). Of course, you cannot judge consistency from the diff alone.

Reviewing the diff by itself is much easier than considering how it fits into the codebase as a whole. You can rapidly skim a diff and leave line comments (like "rename this variable" or "this function should flow differently"). Those comments might even be useful! But you'll miss out on a lot of value by only leaving this kind of review.

### Don't leave too many comments

Probably my most controversial belief about code review is that **a good code review shouldn't contain more than five or six comments**. 

Most engineers leave too many comments. When you receive a review with a hundred comments, it's very hard to engage with that review on anything other than a trivial level. Any really important comments get lost in the noise. [TODO]

What do you do when there's twenty places in the diff that you'd like to see updated? Instead of leaving twenty comments, I'd suggest leaving a single comment explaining the stylistic change you'd like to make, and asking the engineer you're reviewing to identify the correct updates themselves.

There's at least one exception to this rule. When you're onboarding a new engineer to the team, it can be helpful to leave a flurry of stylistic comments to help them understand the specific dialect that your team uses in this codebase. But even in this case, you should bear in mind that any "real" comments you leave are likely to be buried by these other comments. You may still be better off leaving a general "we don't do early returns in this codebase" comment than leaving a line comment on every single early return in the diff.

**Why do engineers leave so many comments?** When you start working as an engineer, you're still developing your taste for good code. To have an opinion about whether a piece of code is good, you need to be able to imagine at least one other way to write it, and very junior engineers can struggle with finding even one possible solution. These engineers often don't leave any comments at all.

Once you start building your initial opinions about good and bad code, those opinions are usually felt strongly. This is the dangerous zone: many enthusiastic engineers will absolutely pepper their reviews with comments, sharing every single thought they have. Expect lots of "this `.map(...).filter(...)` could be rewritten as `.reduce(...)`, or "this should/shouldn't be its own method", or "it's better practice to order the fields in this function like so". These comments aren't necessarily _bad_, but they just aren't that important, and much of the time they make it more difficult to do the actual job of code review.

### Don't review with a "how would I write it?" filter

One reason engineers leave too many comments is that they review code like this:

1. Look at a hunk of the diff
2. Ask themselves "how would I write this, if I were writing this code?"
3. Leave a comment with each difference between how they would write it and the actual diff

This is one way to end up with hundreds of comments on a pull request: an endless stream of "I would have done these two operations in a different order", or "I would have factored this function slightly differently", and so on.

I'm not saying that these minor comments are always bad. Sometimes the order of operations really does matter, or functions really are factored badly! But one of my strongest opinions about software engineering is that **there are multiple acceptable approaches to any software problem**, and that which one you choose often comes down to [taste](/taste).

You must be able to identify cases where you would have done it differently, but either way is acceptable, and to approve those cases without comment. Otherwise you're putting your colleagues in an awkward position. They can either accept all your comments to avoid conflict, adding needless time and setting you up as the _de facto_ gatekeeper for all changes to the codebase, or they can push back and argue on each trivial point, which will take even more time. **Code review is not the time for you to impose your personal taste on a colleague.** 

### Code reviews are not just about readability



### Values

This serves many purposes in a tech company:

- To make sure multiple people on the team are familiar with every part of the codebase
- To let the team discuss the software design of each change
- To catch subtle bugs that a single person might not see
- To transmit knowledge horizontally across the team
- To increase perceived ownership of each change
- To enforce code style and format rules across the codebase
- To satisfy SOC2 "no one person can change the system alone" constraints

But of course it's a costly practice. Engineers work fastest alone

I've listed these in the order I care about them. Engineers who would order these differently will have a very different approach to code review. I'm 


[^1]: For readers who aren't software engineers, "diff" here means the difference between the existing code and the proposed new code, showing what lines are deleted, added, or edited.


---

[^1] It just doesn't 


[^1]: There are definitely exceptions to this. It's a trend I've noticed, not something that _makes_ engineers good or bad. Some people just love leaving line comments. It's also sometimes good to leave a ton of line comments for people who are very junior or brand-new to the team, so they can absorb the coding style of the team quickly.
---

- don't just review the code. it should mostly be about where the code is and what's maybe missing
- minimize comments! only say the most important things
- prioritize unblocking but feel bad if you approve broken code
- leaving blocking reviews vs non blocking

When do I write code that isn't reviewed? Sometimes I run code in a production database console that isn't reviewed, and some services I've deployed to production have started their life with an initial scaffold that I've just pushed up without review.