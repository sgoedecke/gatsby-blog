---
title: What is "good taste" in software engineering?
description: --
order: 142
date: '2025-09-25'
tags: ["good engineers", "software design"]
---

What does it mean to have good taste in software engineering?

Taste is different from technical skill. You can be technically strong but have bad taste, or technically weak with good taste. Taste sometimes runs ahead of technical ability: just like you can tell good food from bad without being able to cook, you can know what kind of software you like before you've got the ability to build it. You can develop technical ability by study and repetition, but you develop good taste in a more mysterious way.

Here are some hallmarks of software taste:

- What kind of code "looks good" to you and what kind of code "looks ugly"
- Which design decisions you feel really good about and which ones are just fine
- Which software problems really bother you and which you can easily brush off

### Why taste is different from skill

Aren't all these things just a part of skill? Doesn't code look good _if it's good code_? I don't think so.

Let's take an example. Personally, I feel like code that uses map and filter looks nicer than using a for loop. It's tempting to think that this is a case of me being straightforwardly correct about a point of engineering. For instance, map and filter typically involve pure functions, which are easier to reason about, and they avoid an entire class of off-by-one iterator bugs. It feels to me like this isn't a matter of taste, but a case where I'm right and other engineers are wrong.

But of course it's more complicated than that. Languages like Golang don't contain map and filter at all, for principled reasons (though many disagree). Iterating with a for loop is easier to reason about from a performance perspective, and is more straightforward to extend to other iteration strategies (like taking two items at a time). I don't care about these reasons as much as I care about the reasons in favour of map and filter - that's why I don't write a lot of for loops.

It would be far too arrogant for me to say that engineers who prefer for loops are less skilled. In many cases, they have technical capabilites that I don't have. They just care about different things. In other words, our disagreement comes down to a difference in _values_.

Maybe I wrote about this point in [_I don't know how to build software and you don't either_](/confidence). Even if the big technical debates do have definite answers, no working software engineer is ever in a position to know what it is, because you can only fit so much experience into one career. We are all at least partly motivated by our own taste.

### Disagreements about taste

It's better to avoid disagreeing about taste, if you can. It's OK that other engineers value different things than you do - they've had different experiences that have shaped them, and that's good. A diverse set of perspectives is helpful on a team.

But sometimes you have to disagree. If an engineer on your team refactors some code because they feel like it reads better the new way, but it looks _awful_ to you, you ought to say something about it. Isn't that kind of strange? If it's just a matter of taste, why not just accept it?

The main reason is that **we care a lot about matters of taste**. That's just what taste _means_. It sucks to work in a codebase that doesn't reflect your tastes at all[^1].

But the other reason is that **engineering taste is not purely arbitrary**. It may not be the case that map is better than a for loop overall (or that Rust is better than Python, etc), but in individual cases it does make a difference to the success of the project which one you choose.

An engineer with a strong taste for state machines is going to build state machines to solve all of their problems - which will be correct for the subset of problems that are best solved that way. An engineer with a strong taste for performance work is going to trade off other values (like readability) in favor of performance - which will be correct for the subset of services where performance is very important.

Is it possible to have "perfect taste", where you care about things in precisely the right ratio for the current project? I doubt it. We don't develop our tastes by sitting down and deriving from scratch the ideal needs of the system. Instead, we develop them from our own personal experience. For instance, I will always have a distaste for local Docker development environments, because I spent so much time and effort keeping a complex web of containers running at a previous job. Even in cases where that's the right decision, I have to push past my initial negative gut reaction.

### What engineering taste actually is

Almost every decision in software engineering is a tradeoff. In other words, you're rarely picking between two options where one is strictly better. Usually each option has its own benefits and downsides. In fact, often you have to make hard tradeoffs between engineering _values_: past a certain point, you cannot easily increase performance without harming readability, for instance[^2].

Really understanding this point is (in my view) the biggest indicator of maturity in software engineering. Immature engineers are rigid about their decisions. They think it's always better to do X or Y (often this comes with an uncritical "it's best practice"). Mature engineers are usually willing to consider both sides of a decision, because they know that both sides come with different benefits. The trick is not deciding if technology X is better than Y, but whether the benefits of X outweigh Y _in this particular case_.

In other words, **immature engineers are too inflexible about their taste**. They know what they like, but they mistake that liking for a principled engineering position. So what is taste?

In my view, **your engineering taste is the set of values you are typically reluctant to trade off**. For instance:

- 


[^1]: Some amount of this is good for you, and can teach you to broaden your tastes. I learned to like Golang slowly, and now I quite enjoy it.

[^2]: Of course this isn't always true. There are win-win changes where you can improve several usually-opposing values at the same time. But mostly we're not in that position.

give reasons but its not about that



---
What is good taste

Clearly important - it's not just skill. It's what kind of code "looks good" to you, what kind of solutions you feel the most happy with, what kind of problems really bother you vs you can just brush off

I've worked with technically capable engineers who I constantly disagree with about about taste

Taste as a set of engineering values - not necessarily wrong answers, just tradeoffs. 

But you can have bad taste. At least, you can have taste that's a bad fit for your current environment
