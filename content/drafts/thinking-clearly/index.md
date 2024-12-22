---
title: How to think clearly about software
description: Thinking slow and slow
order: 18
date: '2024-12-16'
---

You can go a long way as a software engineer without ever managing to think clearly. The feedback loop of writing and running code is so immediate that we can often get by with trial-and-error. It's a truism that software engineers don't know why their code is working any more than they know why it's broken. But it's still worth doing.

### Why is it important to think clearly?

Here are five reasons.

If you can think clearly about software, you can communicate clearly, which can lift other people up out of their confusion. If you write it down, you can do that at scale. There are few higher-leverage things you can do in an organization than writing down clear thoughts about your work.

Thinking clearly increases the rate at which you can learn. You can learn by trial-and-error, but what you learn is mostly heuristics: this kind of thing tends to work in that situation. If you can, it's better to learn systematically, so you can understand _why_ things work or don't work. 

Clear thought is not a binary but a spectrum. Your progress along that spectrum compounds with practice: if you've been trying to think clearly for ten years, you'll be more successful than someone who's just starting now.

If you can think clearly about some parts of a problem, that gives you a clear indication of the difficult parts that you ought to spend more time on: i.e. the parts that you're struggling to think clearly about. 

Unlike many other avenues of work, software systems are largely deterministic, so it's both easier and more useful to think clearly about them.

### To think clearly, think slowly

My philosophy MA supervisor, Karen Jones, used to tell me to "think in slow motion". She was right, and the lesson applies doubly to tech. Slow down! The opposite of thinking clearly is frantically trying different things until the problem goes away. Instead, take no action, breathe, and think slowly and deliberately through the problem. This is intellectually hard, but the main challenge is actually emotional. You need to get comfortable with the problem just sitting there in your mind: the bug, or the incident, or the thing you don't understand. 

When thinking slowly, you should never take an action (e.g. running a test or interacting with your program) without predicting what will happen and why. Do this even with the most obvious predictions: this empty test should pass, or when I visit my local app I should see the main page in my browser. Be as specific as possible. Don't predict "I should get an error here", predict the specific type of error. This is particularly important when debugging, because a buggy program always reflects a lack of understanding, and a lack of understanding always causes failed predictions about how the software should behave. If you can find the spot where you fail to predict the software, you're well on your way to debugging it.

### Focus on the invariants

What's the difference between a complete beginner and an expert? The beginner sees a thousand facts and has a thousand ideas. The expert sees the one key fact and has the one correct idea. That's because expertise in software is the mastery of invariants: beliefs about how software works that are true 99.99% of the time.


how to think clearly about software
- important bc you can get a long way without clarity just by trying things- but you don't really learn unless you're thinking clearly- can't communicate clearly without thinking clearly- clarity is a spectrum, you get better with practice, results compound- if you're unclear about everything you don't know what's interesting. if you're clear about 90%, you know the remaining 10% is where you can learn- you can't debug without thinking clearly. you can sometimes fix bugs by accident, but you can't understand why a bug is happening and address it, which is what debugging is 
- think in slow motion- slow down, reason deliberately- the opposite of frantically trying things
- predict what will happen and why before each action- (should this pass? what output should I see?)- take obvious actions to lock in easy predictions (e.g. empty test should pass)
- focus on invariants first- software is great because there are lots and lots of invariants- obvious invariants (if the computer is off it is not running the program) and probably-right ones (the execution of this unit test is stateless)- what do you know. make it explicit. what are the bounds of the problem- sometimes invariants are wrong but it's (a) rare and (b) always worth exhausting the problem first- really nasty debugging sessions are usually being wrong about some invariant (e.g. there actually is state)