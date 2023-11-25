---
title: Writing good technical explanations
description: "How to explain complex technical concepts by starting with why"
order: 2
---

Software engineering is mainly learning. There is a great demand for technical explanations, and many thousands of books, talks and blog posts devoted to this purpose. In the workplace, most engineers will have more than one conversation each day where some tool, library or framework is explained. What is Docker? What's the deal with Kubernetes? I heard we should consider using Kafka - what is that? But so many of these technical explanations follow the same unhelpful pattern: explaning what X is by recounting details of its implementation or design. For instance, you might explain what Docker is by describing cgroups, the mechanics of OS-level virtualization, mounting volumes, and so on. The problem is that this completely ignores the most important things that beginners to a particular technology need to learn: what problem is Docker solving, and why do I need to care about it? Good technical explanations start by explicitly addressing these questions and only address implementation details afterwards. Bad technical explanations never address these questions at all, leaving the poor listener to try and piece together why anybody would want all these disparate technical features in the first place.

If you only take one thing away from this article, take this: when you're explaining something technical, always say something about what problems it's trying to solve before you go into detail about what it is or how it works.

Where there's money at stake, companies generally get this right. For instance, the Docker company has invested a fair amount of engineering time and effort into the introductory text on their [website](docker.com). The first link in the top bar is titled "Why Docker?", and the linked page lays out the key problems Docker is attempting to solve, from the broadest to the most granular:

1. Developing today requires wrangling a bunch of tooling as well as writing code
2. Each language and framework has different tools that don't talk to each other well
3. Programs that aren't isolated from their environment invite the classic 'works on my machine' problem

Only then is there a link to a page that explains what a "containerized app" is. Once the problems are made clear, the technical details of how containers work begin to make sense. We care about OS-level virtualization because it lets us package a full environment alongside our program. We need a tool like Docker to manage it because that lets us package all kinds of language-specific tooling behind a consistent interface. And so on.

## Layers of problems

One reason the above advice is harder than it sounds is that often a problem itself is a complex technical concept. One key problem Docker addresses is the size and slow boot times of VMs. But to a junior developer unfamiliar with any kind of virtualization, this problem itself needs to be carefully explained. To a non-technical person who is unfamiliar with the concept of an operating system, the situation is even worse. Technical explanations aimed at wide audience should try to go a few layers deep. As well as explanining the problem that your tool or library is solving, explain why people encountered the problem in the first place.

This is why more detailed technical explanations (such as [this article](https://dzone.com/articles/docker-explained-an-introductory-guide-to-docker)) often follow up a discussion of the key problems with an assessment of the historical attempts to solve them. In the case of Docker, this would involve talking about the tedious sysadmin work of lining up OS versions and system libraries on bare metal hosts, then the more predictable but less performant strategy of running production software in VMs.

It can be frustrating to spend so much time talking about other subjects before explaining a tool you're excited about. But it's crucial to convince people that the problem your tool solves is real. 
