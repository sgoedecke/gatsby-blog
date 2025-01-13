---
title: Doing your actual job as a software engineer
description: Figuring out how to deliver value to the company
order: 26
date: '2025-01-05'
---

Here's a story about the angriest I've ever been at work. Early in my career I was deeply invested in keeping a suite of staging integration tests green. It was really hard work: keeping them up-to-date as the app changed, making sure the stateful parts (e.g. the pool of accounts) were healthy, making the tests as resilient as possible to transient issues like slow connections, and so on. I sweated over it for _months_. We went from 90% red to near-100% green. And then in a meeting my manager made some passing comment suggesting I shouldn't spend so much time on it, since it wasn't that important.

I got up and left the meeting midway - the only time I've ever done that, before or since. I went to an empty meeting room, sat down, and updated my resume. I felt like the hard, important work I'd been doing had been completely dismissed.

In hindsight, it's a funny story. I was working so hard! But my manager was right to dismiss the work I was doing, because whatever I was doing it wasn't my actual job.

### Doing your job

Your actual job as a software engineer is not to write code, maintain tests, or close out JIRA tickets. It's to deliver value to the company.

What is value, in this context? It shouldn't be understood in an objective sense, like ethical values, but instead as something _valued by_ somebody. Concretely, value is the set of goals that are valued by the people who control the company: directors, VPs, and C-staff. This is usually some combination of increasing revenue, growing the user base, avoiding embarrassing public incidents, and delivering important projects. Your work is valuable only to the extent that it drives these goals.

Internalizing this helps you avoid political fights you won't win. Here's an example. For a while I worked on the GitHub markdown rendering engine: the code that turns user-provided markdown in issues, READMEs, gists, and hundreds of other places into rendered HTML. This was a really cool project, and technically central to a lot of functionality on the site. But it didn't _directly_ deliver any value. To the extent that my work was important, it was because:

- it helped unblock new user-facing GitHub features that needed to integrate with markdown (like [tasklists](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/about-task-lists))
- it helped increase usage of features like Gists or Wikis by making those markdown surfaces as powerful as the one in PRs
- it meant we had enough markdown-engine expertise on hand to respond to any security or availability fires, if needed

So when I was working on a nice refactor or performance improvement, and another team came in with a new feature request that would have made my refactor awkward, their needs were the priority. Their work delivered more value to the company than mine. If I did try to push back, I would have gotten justifiably overruled. But when I was working on a security issue, the situation was different - then I was the one delivering more value. 

There are always about one million useful things you can do to any piece of software. Knowing how your work connects to actual value lets you pick the two or three things from that list that your company actually cares about. 

### It's not your manager's fault

I've seen my story play out many times. An engineer decides that some particular task is important (say, adding support for some obscure input format, or removing some piece of tech debt) and spends weeks or months working on this. They do all the correct Agile things: communicate early with their manager, create issues, break up their work into modular PRs. And then the first time this project conflicts with a _real_ company value, they're told to drop it, which makes them furious (or sad) about all the wasted effort.

Is this a failure of management? Yes and no. In theory, their manager could have warned them early on that this was low-priority work and probably not worth their time. But managers often trust their senior engineers when those engineers tell them that technical work is important. Managers also tend to communicate gently about priorities: for instance, they'll give lukewarm responses like "sure, if you think this is worth doing go ahead" instead of explicitly saying "I don't see the value in this work".

There's another reason why managers aren't reliable guides: the company's stated values are often at odds with their real values. When I was obsessing over integration tests as a junior, my manager wasn't about to tell me "actually, the company doesn't care _that_ much if our integration tests are flaky", because the company was doing a lot of internal messaging about the importance of integration tests. It was my responsibility to decide how seriously to take that, and to weigh that against the other tasks I had available to me.

### Be wary of convincing your company to do things

By far the easiest way to deliver value is to figure out what the most important thing your organization is doing and help with that. It can be difficult to figure out whether the company's stated tenth highest priority is actually valuable, but the company's stated top priority almost always is. You can usually just ask your manager (or your skip, if you have skip 1:1s) what their top priority is. Alternatively, pay attention to what your skip level and above are asking about in Slack or in meetings.

The hardest way to deliver value is to figure out an important thing that your organization _isn't_ doing and try to convince them to do it. This is basically betting that your company's executives have done a bad job of identifying what they want, and that you can do a better one. Maybe you can! Particularly if your company works on developer tools (like GitHub), you might have a useful perspective. But it's a big risk. Even if you succeed in convincing them it's worth looking at, you're unlikely to put it near the top of their priority list. The next time the wind changes, the project you worked so hard to push is probably going to stop being important. And then you'll be in my position with the automated tests: deeply invested in a hard technical task that the company doesn't value.



