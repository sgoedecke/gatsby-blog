---
title: How I spend my time at large tech companies
description: What is your actual job?
order: 26
date: '2025-01-05'
---

Your job as a software engineer is to deliver value to the company. What is value, in this context? It shouldn't be understood in an objective sense, like ethical values, but instead as something _valued by_ somebody. Concretely, value is the set of goals that are valued by the people who control the company: executives up to and including C-staff. This is usually some combination of increasing revenue, growing the user base, avoiding embarrassing public incidents, and delivering important projects.

Your work is valuable only to the extent that it drives these goals. Internalizing this helps you avoid political fights you won't win. Here's an example. For a while I worked on the GitHub markdown rendering engine: the code that turns user-provided markdown in issues, READMEs, gists, and hundreds of other places into rendered HTML. This was a really cool project, and technically central to a lot of functionality on the site. But it didn't _directly_ deliver any value. To the extent that my work was important, it was because:

- it helped unblock new user-facing GitHub features that needed to integrate with markdown (like [tasklists](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/about-task-lists))
- it helped increase usage of features like Gists or Wikis by making those markdown surfaces as powerful as the one in PRs
- it meant we had enough markdown-engine expertise on hand to respond to any security or availability fires, if needed

So when I was working on a nice refactor or performance improvement, and a security issue came in 

There are always about one million useful things you can do to any piece of software. Knowing how your work connects to actual value lets you pick the two or three things from that list that your company actually cares about. 

I've seen the reverse of this play out many times. A senior engineer decides that some particular task is important (say, adding support for some obscure input format, or removing an out-of-date library) and spends weeks or months working on this. They do all the correct Agile things: communicate early with their manager, create issues, break up their work into modular PRs. And then the first time this project conflicts with a _real_ company value, they're told to drop it, which makes them furious (or sad) about all the wasted effort.

Is this a failure of management? Yes and no. In theory, their manager could have warned them early on that this was low-priority work and probably not worth their time. But managers often trust their senior engineers when those engineers tell them that technical work is important. Managers also tend to communicate gently about priorities: for instance, they'll give lukewarm responses like "sure, if you think this is worth doing go ahead" instead of explicitly saying "I don't see the value in this work".

---
