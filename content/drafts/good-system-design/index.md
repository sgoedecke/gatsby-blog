---
title: Everything I know about good system design
description: 
order: 69
date: '2025-04-21'
tags: ["good engineers"]
---

I see a lot of bad system design advice. One classic is the LinkedIn-optimized "bet you never heard of _queues_" style of post, presumably aimed at people who are new to the industry. Another is the Twitter-optimized "you're a terrible engineer if you ever store booleans in a database" clever trick[^1]. Even good system design advice can be kind of bad. I love _Designing Data-Intensive Applications_, but I don't think it's particularly useful for most system design problems engineers will run into.

What is system design? In my view, if software design is how you assemble lines of code, system design is how you assemble _services_. The primitives of software design are variables, functions, classes, and so on. The primitives of system design are app servers, databases, caches, queues, event buses, proxies, and so on. 

Here's my attempt at good system design advice.

### Recognizing good design

What does good system design look like? I've written before that it [looks underwhelming](/great-software-design). In practice, it looks like nothing going wrong for a long time. You can tell that you're in the presence of good design if you have thoughts like "huh, this ended up being easier than I expected", or "I never have to think about this part of the system, it's fine". Paradoxically, good design is self-effacing: bad design is often more impressive than good. I'm always suspicious of impressive-looking systems. If a system has distributed-consensus mechanisms, many different forms of event-driven communication, CQRS, and other clever tricks, I wonder if there's some fundamental bad decision that's being compensated for (or if the system is just straightforwardly over-designed).

I'm often alone on this. Engineers look at complex systems with many interesting parts and think "wow, a lot of system design is happening here!" In fact, a complex system usually reflects an absence of good design. I say "usually" because sometimes you do need complex systems. I've worked on many systems that earned their complexity. However, a complex system that works always evolves from a simple system that works. Beginning from scratch with a complex system is a really bad idea. I've written much more about this [looks underwhelming](/great-software-design).

### State and statelessness

The hard part about software design is state. If you're storing any kind of information for any amount of time, you have a lot of tricky decisions to make about how you save, store and serve it. If you're not storing information[^2], your app is "stateless". As a non-trivial example, GitHub has an internal API that takes a pdf file and returns a HTML rendering of it. That's a real stateless service. Anything that writes to a database is stateful.

You should try and minimize the amount of stateful components in any system. (In a sense this is trivially true, because you should try to minimize the amount of _all_ components in a system, but stateful components are particularly dangerous.) The reason you should do this is that **stateful components can get into a bad state**. Our stateless PDF-rendering service will safely run forever, as long as you're doing broadly sensible things: e.g. running it in a restartable container so that if anything goes wrong it can be automatically killed and restored to working order. A stateful service can't be automatically repaired like this. If your database gets a bad entry in it (for instance, an entry with a format that triggers a crash in your application), you have to manually go in and fix it up. If your database runs out of room, you have to figure out some way to prune unneeded data or expand it.

What this means in practice is having one service that knows about the state - i.e. it talks to a database - and other services that do stateless things. Avoid having five different services all write to the same table. Instead, have four of them send API requests (or emit events) to the first service, and keep the writing logic in that one service. If you can, it's worth doing this for the read logic as well, although I'm less absolutist about this. It's _sometimes_ better for services to do a quick read of the `user_sessions` table than to make a 2x slower HTTP request to an internal sessions service.

### Databases

Since managing state is the most important part of system design, the most important component is usually where that state lives: the database. I've spent most of my time  working with SQL databases (MySQL and PostgreSQL), so that's what I'm going to talk about.

#### Schemas and indexes

If you need to store something in a database, the first thing to do is define a table with the schema you need. Schema design should be flexible, because once you have thousands or millions of records, it can be an enormous pain to change the schema. However, if you make it too flexible (e.g. by sticking everything in a "value" JSON column, or using "keys" and "values" tables to track arbitrary data) you load a ton of complexity into the application code (and likely buy some very awkward performance constraints). Drawing the line here is a judgement call and depends on specifics, but in general I aim to have my tables be human-readable: you should be able to go through the database schema and get a rough idea of what the application is storing and why.

If you expect your table to ever be more than a few rows, you should put indexes on it. Try to make your indexes match the most common queries you're sending (e.g. if you query by `email` and `type`, create an index with those two fields). Don't index on every single thing you can think of, since each index adds write overhead.

#### Bottlenecks

Accessing the database is often the bottleneck in high-traffic applications. This is true even when the compute side of things is relatively inefficient (e.g. Ruby on Rails running on a preforking server like Unicorn). That's because complex applications need to make a _lot_ of database calls - hundreds and hundreds for every single request, often sequentially (because you don't know if you need to check whether an user is part of an organization until after you've confirmed they're not abusive, and so on). How can you avoid getting bottlenecked?

When querying the database, _query the database_. It's almost always more efficient to get the database to do the work than to do it yourself. For instance, if you need data from multiple tables, `JOIN` them instead of making separate queries and stitching them together in-memory. Particularly if you're using an ORM, beware accidentally making queries in an inner loop. That's an easy way to turn a `select id, name from table` to a `select id from table` and a hundred `select name from table where id = ?`.

Every so often you do want to break queries apart. It doesn't happen often, but I've run into queries that were ugly enough that it was easier on the database to split them up than to try to run them as a single query. I'm sure it's always possible to construct indexes and hints such that the database can do it better, but the occasional tactical query-split is a tool worth having in your toolbox.

Send as many read queries as you can to database replicas. A typical database setup will have one write node and a bunch of read-replicas. The more you can avoid reading from the write node, the better - that write node is already busy enough doing all the writes. The exception is when you really, really can't tolerate any replication lag (since read-replicas are always running at least a handful of ms behind the write node). But in most cases replication lag can be worked around with simple tricks. For instance, in a normal CRUD update API, you can fill in the updated details in-memory instead of immediately re-reading after a write.

Beware spikes of queries (particularly write queries, and _particularly_ transactions). Once a database gets overloaded, it gets slow, which makes it more overloaded. Transactions and writes are good at overloading databases, because they require a lot of database work for each query. If you're designing a service that might generate massive query spikes (e.g. some kind of bulk-import API), consider throttling your queries.

### Slow operations, fast operations

A service has to do some things fast. If a user is interacting with something (say, an API or a web page), they should see a response within a few hundred ms[^3]. But a service has to do other things that are slow. Some operations just take a long time (converting a very large PDF to HTML, for instance). The general pattern for this is splitting out **the minimum amount of work needed to do something useful for the user** and doing the rest of the work in the background. In the PDF-to-HTML example, you might render the first page to HTML immediately and queue up the rest in a background job.

What's a background job? It's worth answering this in detail, because "background jobs" are a core system design primitive. Every tech company will have some kind of system for running background jobs. There will be two main components: a collection of queues, e.g. in Redis, and a job runner service that will pick up items from the queues and execute them. You enqueue a background job by putting an item like `{job_name, params}` on the queue. It's also possible to schedule background jobs to run at a set time (which is useful for periodic cleanups or summary rollups). Background jobs should be your first choice for slow operations, because they're typically such a well-trodden path.

Sometimes you want to roll your own queue system. For instance, if you want to enqueue a job to run in a month, you probably shouldn't put an item on the Redis queue. Redis persistence is typically not guaranteed over that period of time (and even if it is, you likely want to be able to query for those far-future enqueued jobs in a way that would be tricky with the Redis job queue). In this case, I typically create a database table for the pending operation with columns for each param plus a `scheduled_at` column. I then use a daily job to check for these items with `scheduled_at <= today`, and either delete them or mark them as complete once the job has finished.

### Caching

Sometimes an operation is slow because it needs to do an expensive (i.e. slow) task that's the same between users. For instance, if you're calculating how much to charge a user in a billing service, you might need to do an API call to look up the current prices. If you're charging users per-use (like OpenAI does per-token), that could (a) be unacceptably slow and (b) cause a lot of traffic for whatever service is serving the prices. The classic solution here is **caching**: only looking up the prices every five minutes, and storing the value in the meantime. It's easiest to cache in-memory, but using some fast external key-value store like Redis or Memcached is also popular (since it means you can share one cache across a bunch of app servers).

The typical pattern is that junior engineers learn about caching and want to cache _everything_, while senior engineers want to cache as little as possible. Why is that? It comes down to the first point I made about the danger of statefulness. A cache is a source of state. It can get weird data in it, or get out-of-sync with the actual truth, or cause mysterious bugs by serving stale data, and so on. You should never cache something without first making a serious effort to speed it up. For instance, it's silly to cache an expensive SQL query that isn't covered by a database index. You should just add the database index!

I use caching a lot. One useful caching trick to have in the toolbox is using a scheduled job and a document storage like S3 or Azure Blob Storage as a large-scale persistent cache. If you need to cache the result of a _really_ expensive operation (say, a weekly usage report for a large customer), you might not be able to fit the result in Redis or Memcached. Instead, stick a timestamped blob of the results in your document storage and serve the file directly from there. Like the database-backed long-term queue I mentioned above, this is an example of using the caching _idea_ without using a specific cache technology.

### Events

As well as some kind of caching infrastructure and background job system, tech companies will typically have an _event hub_. The most common implementation of this is Kafka. An event hub is just a queue - like the one for background jobs - but instead of putting "run this job with these params" on the queue, you put "this thing happened" on the queue. One classic example is firing off a "new account created" event for each new account, and then having multiple services consume that event and take some action: a "send a welcome email" service, a "scan for abuse" service, a "set up per-account infrastructure" service, and so on.

You shouldn't overuse events. Much of the time it's better to just have one service make an API request to another service: all the logs are in the same place, it's easier to reason about, and you can immediately see what the other service responded with. Events are good for when the code sending the event doesn't necessarily care what the consumers do with the event, or when the events are high-volume and not particularly time-sensitive (e.g. abuse scanning on each new Twitter post).

### Logging

The other thing I've learned from my most paranoid colleagues is to log aggressively during unhappy paths. If you're writing a function that checks a bunch of conditions to see if a user-facing endpoint should respond 422, you should log out the condition that was hit. If you're writing billing code, you should log every decision made (e.g. "we're not billing for this event because of X"). Many engineers don't do this because it adds a bunch of logging boilerplate and makes it hard to write beautifully elegant code, but you should do it anyway. You'll be happy you did when an important customer is complaining that they're getting a 422 - even if that customer did something wrong, you still need to figure out _what they did wrong_ for them.

### Killswitches

link

### Failing open and closed

For instance, say you have some rate limiting code that checks a Redis bucket to see if a user has made too many requests in the current window. What happens when that Redis bucket is unavailable? You have two options: fail _open_ and let the request through, or fail _closed_ and block the request with a 429.

Whether you should fail open or closed depends on the specific feature. In my view, a rate limiting system should almost always fail open. That means that a problem with the rate limiting code isn't necessarily a big user-facing incident. However, auth should (obviously) always fail closed: it's better to deny a user access to their own data than to give a user access to some other user's data. There are a lot of cases where it's not clear what the right behavior is. It's often a difficult tradeoff.


[^1]: You're supposed to store timestamps instead, and treat the presence of a timestamp as `true`. I do this sometimes but not always - in my view there's some value in keeping a database schema immediately-readable.

[^2]: Technically any service stores information of some kind for some duration, at least in-memory. Typically what's meant here is storing information outside of the request-response lifecycle (e.g. persistently on-disk somewhere, such as in a database).

[^3]: Gamedevs on Twitter will say that anything slower than 10ms is unacceptable. Whether that ought to be the case, it's just factually not true about successful tech products - users will accept slower responses if the app is doing something that's useful to them.