---
title: A database is a store for global variables
description: 
order: 266
date: '2026-11-06'
tags: ["software design"]
---

Databases are for storing global variables. We usually call them "rows" or "records" instead, but they're definitionally global variables: any part of your program can read or write them. Isn't this kind of weird? It's common programming advice that global variables are bad, and yet many elegant programs rely on databases. Either the common advice is wrong, or there's something special about databases that makes them the exception to the rule.

What's so bad about global variables? Here's the two main[^1] reasons, in my view:

- They allow any part of your program to implicitly send data to any other part instead of passing it around via function signatures
- They couple different parts of your program: if one part depends on a variable having some value, any other part can break it

Both of these apply to databases. Any part of your program that makes a query can send and receive data from any other part of your program. In practice this happens all the time: one function will save some data  on a record, and another one will check for it. And if you haven't seen bugs where some piece of code makes some incorrect expectation about the shape[^2] of a database column, you haven't been working on web systems for long enough.

So why aren't database-backed apps in terrible architectural shape? In the rest of this post I'll consider some options.

First, we could [bite the bullet](https://en.wiktionary.org/wiki/bite_the_bullet): **maybe all database-backed apps really are a mess**. This is surprisingly plausible. When I think about the systems I've worked on that haven't involved a database, they're usually much cleaner and more elegant. If managing state is the hardest thing about designing software - and I think it is - then systems that manage less state are going to be better-designed. However, this doesn't explain everything. Database-backed apps aren't _that_ bad, and even in database-backed apps, we try to avoid introducing regular global variables[^3], so in practice we treat global variables as worse.

Second, we could say that **databases offer ACID guarantees that mitigate the damage of global variables**. Unlike regular global variables, databases offer a consistent view of state and the ability to atomically change multiple pieces of state together. I don't really buy this. The problem with global variables is not just that they can get out of sync, it's that they exist at all. If you think this is the difference, you are committed to thinking[^4] that if you stick a mutex around a global variable then it suddenly becomes acceptable.

Third, we could say that **databases are more explicit**. Mutating or reading a global variable looks like ordinary code, but database queries need some connection object to be passed in and some query function to be invoked. When you're scanning through code, you can see where the database queries are at a glance[^5]. Not so for global variables. This does actually kind of mitigate the implicit-coupling problem. Maybe regular global variables would be better if you had to set and get them with long, involved function calls.

Fourth, we could say that **databases are less flexible**. A global variable could store _anything_: a function, a class, an image, and so on. A database just stores _data_. I can buy this explanation for untyped languages. Global Ruby variables that could be reassigned from a string to a hash table are far more terrifying than a "global" database column that could change from one string to another string. But since the advice to avoid global variables applies to typed languages as well, I don't think this could be the reason why databases are better.

Fifth, we could say that **we know how to use databases**. For instance, whenever I read from a database, I reflexively check the type of the column so that my code doesn't make assumptions that aren't guaranteed by the database. There are use-cases that I would never even consider using a database for (e.g. to track a counter in a loop, or to store the name of the `.env` file where my config is stored). In other words, we have norms and customs[^6] around using databases that minimize a lot of the damage that global variables can cause. There's nothing inherent about databases that make them better, it's just how we use them in practice.

Overall I think the third and fifth reasons are most convincing: databases are better because they're more explicit and because we only tend to use them for a limited set of purposes. It's interesting to note that these reasons are _contingent_, not inherent. A codebase which had conventions around global variable use[^7] could also fulfil these conditions. Would this make global variables fine, or at least no worse than a database? I think so.

I don't recommend you go out and start putting global variables in your programs. It's more interesting to note the meta-point here: that two pieces of common software engineering dogma - avoid global variables and use a database for state - are partially inconsistent. Most software design knowledge is still just a pile of loose heuristics. [I don't really know how to build software and you don't either](/confidence/). As I've [written about before](/taste/#how-to-identify-bad-taste), we should therefore all be very suspicious of engineers who appeal to "best practice" without being able to give concrete reasons, even in cases as obvious as "global variables are bad".


[^1]: For instance, concerns about [readability and tracing](https://embeddedartistry.com/fieldatlas/the-problems-with-global-variables/) follow from the first reason. I don't really buy reasons like "it's not thread-safe" or "global variables might shadow local variables": any architectural problem that can be trivially solved with a mutex or a linter is not a real problem.

[^2]: For instance, that a string supports 4-byte UTF-8, or that a column can/can't be NULL.

[^3]: You could say we avoid introducing global variables because databases are essential and global variables are not. In theory you could replace any global variable by threading a local variable through, but you do need a database if you've got gigabytes of structured data to manage. However, that doesn't explain why database-backed apps still tend to be better-designed than apps with many global variables.

[^4]: I'm not saying this is necessarily wrong. The argument would go something like "well, if you implement a simple in-memory database for your global variables, that _is_ better!"

[^5]: This is only sort of true. If you're designing a system, you'd be well-advised to make it as true as you can. While I love Rails, my main beef with ActiveRecord is that it makes queries invisible.

[^6]: To be fair, some of these are guaranteed by the fact that the database exists over the network.

[^7]: Plus types, probably, and concurrency controls if we're not in a single-threaded language.