---
title: Acing the design interview
description: "Practical advice on succeeding at a design interview"
---

If you haven’t designed an actual system before, design interviews can be tough. Knowing how to work with a particular web service or framework doesn’t always translate to knowing about the design of systems in general. It’s easy to feel overwhelmed when asked to lay out a system on a whiteboard. Here’s one approach. We’re going to start with a toy problem: building a journal app that allows you to post public or private journal entries with comments.

Disclaimer: every company interviews differently, and this is based mainly on my own experience performing interviews. My advice here is just one approach and won’t be relevant to every job. Reading the room and following your interviewers’ suggestions is always more important.

## Breaking down the domain model
The first step is to identify the actual pieces that will go into your system. This is effectively brainstorming: don’t worry about what’s going to be a database table or a class or service, just write down the entities that your system will support. For our journal app, this might be: journal, user, post, comment, reply, mood. Leave this list on one side of the whiteboard with room to extend it - you’ll add more entries to it as you go on and realise you forgot things that need to be modelled.

Once you’ve got that list, start another list next to it with what data will go into each record. For a relational database like MySQL, this would be the columns of each table. Use this task to track the relationships between the records (e.g. the foreign keys). Here’s what that might look like:
```
journal: id, owner_id, name, subdomain
user: id, name, bio
post: id, content, timestamp, journal_id, mood
comment: id, content, post_id, owner_id
reply: id, content, comment_id, owner_id
```

It’s often useful to annotate these fields as well with their type (number, string, datetime). For instance, `content` would be a string, but `owner_id`  would be a number.

## Identifying tradeoffs
At this point you’ll have some decisions to make. Should comment and reply be separate records, or should comments have an optional `comment_id` that allows them to be treated as replies? Should `post.mood` be a string, or a foreign key to a `moods` table? Should journal have an `owner_id`, or should users have a `journal_id`? These decisions are a key part of what you’ll be assessed on in a design interview. And there’s usually not a single correct answer to them: the important thing is recognising the tradeoffs that each answer would commit you to.

For instance, giving a journal an `owner_id` makes it straightforward for one user to maintain many journals, but impossible for a journal to be co-owned by a group of users. To support that potential use case, you might design a many-to-many relationship between users and journals with a join table, or propose a separate `groups` table that can own journals. If you go for that option, should journals have separate `owner_id` and `group_id` columns, or should a journal always be owned by a group (albeit sometimes a group of one)? And so on.

In an interview, it’s critical to verbalise these tradeoffs as you consider them. Don’t stand there silently mulling over where a field should go; describe the problem out loud and give reasons for doing it either way. Your interviewers might help you out with a new requirement that will settle the issue. Either way, you’ll be demonstrating some of the key skills they’re looking for.

## Identifying data flows
Once you’ve got some idea of what your data model looks like, it’s time to think about data flows. These are actions that your app or service will be asked to do by its users. As above, it’s helpful to write these down briefly, like so:
```
* create a new journal
* post a journal entry
* read a list of journal entries
* read comments on a journal entry
* comment on a journal entry
```

No need to be exhaustive here, just capture the key ones. Flesh out how each of these will work in practice against the data model you’ve laid out already. For instance:
```
Read comments on a journal entry:
1) Fetch post record by id
2) Fetch all comments where post_id matches that id
3) Fetch all replies where comment_id matches any of the ids in (2)
```

You should explicitly look for opportunities to refine your data model. For instance, this step (3) looks awkward. For posts with lots of comments, that could grow to be be a large query. To avoid this, you could add a `post_id` to replies, or to drop the replies entity entirely and model replies as comments with an extra `comment_id`. The first approach would risk adding two sources of truth to your schema: the reply’s `post_id` and the associated comment’s `post_id`. If those were out of sync, it would be possible for your data model to represent invalid data. By introducing an optional field, the second approach risks complicating the program, which might now have to check for each comment whether it has the `comment_id` field or not.

Again, the point is not to accommodate the above problems and make the “right” decision, but to explain the problem to your interviewers and think out loud about the tradeoffs. Expect interviewers to point out things you’ve missed or add extra requirements. In the above example, you might reasonably want to show user names next to each comment, in which case you’ll need to add an extra step somewhere to fetch all users that match a comment `owner_id` (or solve the problem some other way).

Don’t treat questions like these as a sign that you’re failing the interview. If you give neat solutions to all the interview requirements, the interviewers will likely add requirements until you reach a problem that you can’t give a neat solution for, to force you into talking through the various considerations.

## Asking real-world questions
At this point you may be asked to move from general data models and flows into specifics. What would you do if you actually had to design the system? Depending on the role you’re interviewing for, you shouldn’t treat this question quite as if you were actually given the problem once hired.  Outside of an interview, you ought to begin with a flurry of questions about what tech stack the company uses, what infrastructure is most easily supported for its services, what kind of interoperability or communications protocol works best with existing services, which stakeholders you’d need to collaborate on the design with, and so on. Inside the interview,  you’re likely expected to come up with a design on the spot. (One exception is if you’re being interviewed for an architect or engineering lead role, in which case you might be expected to demonstrate that you actually know how you would go about doing this on the job.)

What questions should you focus on, if not organisational requirements? You should ask about operational constraints: uptime, speed and scale. A journal website that needs to scale to a hundred thousand concurrent users is different from one that needs to only support a few hundred. Likewise, requiring three or more nines of uptime or sub-50ms latency will impose strict restrictions on your design. If you are posed tough operational requirements, it’s worth asking about graceful degradation. Is it OK for posting new journal entries to sometimes fail, as long as reading journal entries always succeeds? Is it OK for a list of comments to be a minute or two out of date if that means we can make reading comments blazing fast? The answer to these questions can dramatically change the appropriate design.

## Laying out services
The key to a good interview design is flexibility: demonstrating that you know a couple of ways to lay out a problem, and that you’re willing to go down the road that your interviewers are guiding you down. As always, it’s about articulating the tradeoffs. The first tradeoff to be made is about how you split up your services. Do you stick with a monolithic `JournalService`, or do you attempt to split it up into a `UserService`, `CommentService`, `AuthService`, and so on? My advice here is to demonstrate that you’re comfortable with either approach, and to carefully read the room. Start simple, with a monolithic design, but watch for signs that your interviewers are really looking for a service split. If not, proceed to the next steps - there’s plenty of other ground to cover.

If you do get asked to split up your monolith, try to keep it straightforwardly linked to your data model. Have each service own its associated data: if you have a `UserService`, that should be the only service reading the `users` table. All other services that need user data should communicate with the `UserService` over the network. To enforce this, typically each service will have a database all to itself. Your service model will end up looking a lot like your data model, with lines between the boxes that represent network calls instead of foreign key relationships.

Be ready to give a list of tradeoffs for and against splitting up the monolith. Keeping it together allows for faster development, removes the need to synchronise deploys or database migrations, allows multi-table writes to happen in an atomic database transaction, and removes the potential failure point of internal network calls. Splitting it up allows for easier distribution of the app between multiple teams, allows crucial or performance-sensitive components to be written in different languages or technologies, and potentially makes it easier to horizontally scale your app (since each individual service can be scaled independently to meet its needs). As always, it’s more important to demonstrate that you understand reasons on both sides than to arrive at the ‘correct’ answer.

## Choosing technologies
Once you’ve got a sense of the problem, it’s time to lay out some technology choices. You’ve likely already committed yourself to a particular kind of data store in the way you’ve laid out your data model. For instance, our discussion above  presupposes a relational database. If you feel comfortable talking about the tradeoffs between different databases, you can pick a particular relational database technology (MySQL, Aurora, Postgres, etc).

When it comes to services, you typically want to choose languages and technologies that naturally fit the operational constraints. If the goal is sub-second latency, dynamic languages like Ruby and Python can provide that and make writing code quicker. However, if the goal is too keep latency under 50ms, a naturally faster server-side language like Golang or Java might be a better fit. Of course it is possible to keep Ruby or Python services that fast, with a little effort. The point here is to convey to your interviewers that you’re not a technology zealot and will happily choose the best tool for the job, whatever it may be. If you know what languages your team or company is using, it is a good idea to use those in your examples to make it abundantly clear that you won’t come in demanding to rewrite everything in Haskell (or whatever).

## Adding operational components
An app running in production is almost never a single service connected to a data store, particularly if scaling is a concern. It is generally a complex distributed system. Even if the application itself is a monolith, it needs read-replicas of its data store, layers of caching, queues and workers, streams, CDNs, and so on. You should familiarise yourself with the point of these components so you can deploy them in your design where appropriate.

Your interviewers will probably not ask you to put in a cache or a queue. Instead, with that solution in mind, they will ask you to make a particular operation faster or more reliable in your current design, and you will be expected to come up with the solution on your own. Here’s a quick run-down of what some of the relevant components do, and when you might want to use them.

A read-replica of a data store is a separate database, automatically kept up to date by the db technology, that can only handle read requests. Writes must (typically) still go to a single writer node to prevent conflicts. The advantage of read replicas is that they can (a) support large volumes of traffic, since they’re not doing the hard work of accepting writes, and (b) live in different geographical regions, so requests to them can be low-latency even if the writer node is on the other side of the planet. Use them to scale up your data store or to make read-only operations (reading a journal entry or comments) faster worldwide, but be aware that they can be seconds behind the main writer node, or much worse if something goes wrong.

A cache is a separate data store held entirely in memory. It is much faster than a proper database, but does not persist data (so nothing can be permanently written there). This can be a separate service on the network (memcached, redis), or a component of the application itself running in the actual server process. A cache is a bit like a read-replica: once a piece of data is cached, it makes reads very fast and reduces load on the data store at the cost of potentially being a bit out of date. Use caches to make expensive read-only operations (like a network call) much faster, but be aware that stale cache data can lead to services operating on the wrong information.

Queues and workers are typically used to farm out expensive tasks. Instead of doing a task (like sending an email) immediately, your service can make a request to put an item in the queue (which, much like a cache, is effectively another data store). Meanwhile, a worker service is continually checking the queue to see if there are any items there. It will pick up your item and perform the task, without your main service having to wait for it.  If the task fails, it can be put back on the queue to be retried later. Use queues and workers to avoid important requests being slowed down by expensive tasks . For instance, writing a new post might notify all subscribers to your journal by email, but the request that submits a post shouldn’t have to wait for hundreds of emails to be sent. Instead, it can enqueue an email-sending task that can be done later. One pitfall of using queues is that it can be hard to let users know when an enqueued task fails, because the initial request is already complete.

## Summary
Overall, the most important thing is to listen to your interviewers, ask questions, and read the room, so you can make sure you’re answering the questions they’re actually asking. The second most important thing is to articulate the tradeoffs you’re making: in how you lay out your data store,  how you split up your services, and how you choose operational components. You should treat the design problem as a problem that you have a list of potential solutions for, not as a problem that you know the one correct way to solve. Be responsive to where your interviewers are guiding you. I've laid out one kind of design interview you might be given, but every interview is different and demands different tools. If you stay flexible and can keep a number of different approaches in mind, you should be adequately prepared for anything.
