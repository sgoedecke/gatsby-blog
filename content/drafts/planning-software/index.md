---
title: How I plan to build software
description: 
order: 64
date: '2025-04-12'
---

Whenever anyone describes a piece of software to me, I think about how I would build it. This is pretty common practice among software engineers, but I think a lot of engineers don't do it very well.

### Two common design mistakes

The first mistake I see a lot is staying too general. Suppose you're building a comments system for a blog. Some engineers will stop at "oh, I'd put the comments in a relational database somewhere and pull them out to put on the page". A relational database might end up being the right choice, but this level of design isn't very useful for actually building the feature.

The second mistake is getting too invested in the wrong specifics. Some engineers will begin designing their commenting system by saying "oh cool, I'll use React", and then diving into a million micro-decisions about whether to use RSC or not, or whether to fetch the data via fetch or TSQ, or to expose the comment data in GraphQL, and so on. The first time you hear about the problem is the wrong time to make decisions like these. You may have to make them eventually, but not at the outset.

### How to do it right

So what is the right way to do it? The right way is to take the **most important user flow** and trace the simplest possible implementation **all the way through** in your head. You can track only one user flow because otherwise you'll get confused[^1]. You have to trace the implementation all the way through because otherwise you'll miss key details. When I say "trace", I mean at the level of pseudocode. You don't have to imagine the entire code in your head, but you do have to imagine each logical step.

This is the mental equivalent of the Pragmatic Programmer's well-known "tracer bullet" [rule](https://wiki.c2.com/?TracerBullets). The tracer bullet rule is that your first prototype should be the minimum you need to build to get one user flow working end-to-end[^2]. The same is true for simply thinking about writing software: your goal should be to think one user flow through end-to-end.

The benefit of thinking through the flow at that level of detail is that you're forced to confront the important questions (just as you would be if you were building a prototype with real code).


### Walking through an example

For instance, in the case of implementing a commenting system:

A user lands on one of my blog posts and should see a enter-your-comment form. That's easily done by adding a `<form>` element to my post template.

When they submit the form, their comment should be stored somewhere. Okay, so I need an endpoint on my backend and some kind of data storage. My add-a-comment endpoint code will be something like this:

```ruby
comment = params['comment_body']
post = params['post_id']
user = ???

Comment.new(comment: comment, post: post, user: user).save!

redirect_to(post)
```

How can I set the user for the comment? If people are commenting anonymously, the solution is simple (add an optional form field for `name`), but otherwise I need to support some kind of login on my previously-static site. This endpoint can be pretty slow. Users will submit comments much less often than they view pages, and it's no big deal if it takes a second.

The user should then be able to view their comment once redirected. That means that I need some logic in my post site like this:

```ruby
comments = Comment.where(post: current_post)
render(post, comments: comments)
```

And then some HTML templating on the post page that renders each comment. This endpoint must be very fast. Users view posts as the main activity on the site, and adding a few hundred ms of latency will meaningfully impact the experience. That points to the potential for caching or deferred loading, and the necessity for pagination once the number of comments grows.

This was a pretty simple example, but you can see how it turns up what infrastructure pieces I'm missing (the ability to run code on the backend, data storage), and what questions I need to answer (how can users log in or set their identity). When you do this for a system in a large tech company, you often turn up interesting questions as well:

* Our system needs data X, but it's only available from a slow endpoint in service Y
* Our system needs data that we don't currently collect (e.g. my static blog doesn't collect data about user identity)
* We need to display new comments on each post, but the posts are currently long-term cached on a CDN, so we'll need to find a way to bust that cache for each new comment
* We need to account for one or more [wicked features](/wicked-features) - for instance, if someone's running the on-premise version of the blog, we'll need to figure out where we can store comments (or hide/disable the comment form)

Note that these points are all largely agnostic about what specific technologies are chosen (Rails or Express for the backend, MySQL or MongoDB for the data storage, etc).The assumptions they make are general ones that flow directly from the requirements: no matter what, comments will have to be stored _somewhere_ and associated with users _somehow_.

### How to communicate about a mental plan

The plan you make should stay mostly in your mind. In my experience, you will not be able to usefully explain it to product managers or even other engineers. The value of the plan is in how it helps you **estimate** and **ask questions**. For instance, the hardest part about adding comments to my blog would be switching to an infrastructure that isn't entirely static (and thus allows me to store data and run my own code in user requests).

[^1]: Well, maybe you're built different and you can track multiple - I can only track one. Even then I suspect you're better off sticking with one and using that extra brainpower on tracing the implementation.

[^2]: It's called the "tracer bullet" rule after real-life tracer bullets, which make it much easier for machine gunners to aim at night. Instead of having to calculate where the bullet will go first try, they can start shooting and adjust based on where the arc of incandescent bullets is landing.

- tracer bullet - follow the happy path all the way through, what data has to go where, what latency requirements, what scale requirements
- then see if anything doesn't make sense. usually something won't make sense (data that we don't have in the right place, etc). or there will be ambiguities worth asking about
- sometimes this rules out or rules in different specifics