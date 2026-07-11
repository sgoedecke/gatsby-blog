---
title: Elegant code considered harmful
description: 
order: 211
date: '2026-07-09'
tags: ["software design"]
---

For a certain type of software engineer, the entire point of the job is to write elegant code that solves hard problems. The skill of an engineer is often measured by their ability to write (or at least appreciate) beautiful design, or to treat code as a form of artistic expression. I can see the appeal. When I read a particularly elegant solution, I think "wow, the person who wrote this was a really good engineer". But I've grown increasingly suspicious of elegant code over time. Now when I see it, I also think "wow, I'm glad this person isn't working on my codebase". Elegant code can be a trap.

### What is elegant code?

It partly comes down to [taste](/taste/), but as a general principle: **an elegant solution to a problem is one in which many subtle requirements are fulfilled _implicitly_, instead of explicitly in the code**. For instance, I consider the [Unicorn](https://en.wikipedia.org/wiki/Unicorn_(web_server)) server elegant because it farms out almost all the work to Unix syscalls like `fork`, `select`, and `accept`. Likewise, let's look at the famous Tower of Hanoi recursive solution:

```ruby
def move(disks, source, destination, auxiliary)
  return if disks == 0
  move(disks - 1, source, auxiliary, destination)
  puts "Move disk #{disks} from #{source} to #{destination}"
  move(disks - 1, auxiliary, destination, source)
end

move(3, 'A', 'C', 'B') # Example solution with 3 disks
```

This is elegant because it's a stack-based solution that doesn't actually require implementing a stack: instead it uses the call stack of the programming language itself. The code thus only has to express the single trick of using an empty peg to store the smaller disks while you move the bottom largest one[^1].

[todo] Third example - some kind of subtle reuse?

### Why I don't like elegant code

Unfortunately I am not a software artist, and so I like it when my code makes its requirements explicit. The main reason is that **explicit requirements are easier to change**.

I often have the experience of having to "remove the elegance" from code in order to alter it: splitting out a clever ternary into a multi-line if statement, un-DRYing a reused helper that now needs to be different in two places, rewriting a neat map-filter-reduce pipeline into something more loop-y, and so on. This isn't necessarily bad. In fact, I try to add the elegance back in as best I can, after I've made the required change. But I do have a new appreciation for boring, verbose code that I can just go in and change as-is.





[^1]: In my view, this is why recursive solutions tend to be more elegant in general.



Every po
elegance can be a trap

elegant code is sometimes hard to extend in arbitrary ways
relying on features of the environment/problem is elegant, but it means that changes to the problem often require a complete redesign of the code
for some people this is ideal. one design process per problem, no weird hacks. in the naur theory paper he recommends rewriting the entire program when the team rolls over. but... come on, now. not a mindset for large systems.

--