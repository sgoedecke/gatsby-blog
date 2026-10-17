---
title: Writing is no longer proof of work
description:
order: 255
date: '2026-10-18'
tags: ["tech companies", "writing"]
---

Tech companies structurally depend on writing to serve as evidence, in the same way that Bitcoin depends on proof-of-work hashing. However, in the last few years, LLMs have started to undermine this practice.

How can writing be like proof-of-work? When I'm writing something at work, it's not always to communicate an idea. Sometimes it's because having a piece of writing is useful as _evidence_: of compliance with some process, of the fact that I put in effort, or of the fact that I know about some topic. Here are some examples.

### Writing as evidence of compliance

The most obvious instance of writing as evidence is filling out mandatory templates: "risk assessments", "impact evaluations", and so on. The purpose of these is rarely to assess risk or evaluate impact. It's some combination of:

- Employees wanting to demonstrate that they're taking some incident seriously by introducing new process
- A legal requirement that companies have developed the least-expensive way to technically satisfy
- Internal company rules intending to scare lazy or uncommitted engineers away from making dangerous changes
- Smaller companies trying to role-play processes from larger companies that are doing one of the above

It's a mistake to buckle down and produce an excellent piece of writing here. You simply need to dash off something plausible enough to tick the box.

### Writing as evidence of effort

In the kinds of hundred-page reports produced by consultants, writing is evidence of _effort_. The actual piece of communication is the first page of text (or often not even that). The remaining ninety-nine pages are proof that the first page is well-researched, and that the money spent on hiring the consultancy wasn't wasted.

Another example: if you're working on a project by yourself, why spend time creating tickets and filling them out? I suppose theoretically someone could read them to get a sense of what you're doing, but in that case you've failed to communicate the project via normal channels: telling people in Slack or in meetings, writing a proposal document, and so on. The tickets are primarily valuable as _evidence_: proof[^1] that you haven't just been screwing around playing video games.

### Writing as evidence of learning

A third subcategory of writing-as-evidence is writing that proves that the writer has understood some topic.

The best example of this is reporting. Large organizations function via a tree of nested reports, often called "rollups". Individual contributors give status updates to their managers, who summarize and combine those into team-level updates for their managers, and so on all the way to the top.

One of the reasons for this practice is that it forces each manager to build at least a minimal mental model of what's going on in their local area. Taking the time to write a status report forces you to wrap your head around each detail, for the same reason that the best way to understand an idea is to try to explain it to someone else. Even if the VP or CEO doesn't read the rollup, the fact that it exists is _evidence_ that the manager has some grip over their domain.

### Proof of work

You can think of all these kinds of writing-as-evidence as [proof of work](/blockchain-explained-simply/). Nobody really cares about the content, they care about the fact that you _sat down and wrote it_. Of course, this requires a measure of trust. Just like cryptocurrency proof-of-work, if you fake it (for instance, by pasting [lorem ipsum](https://www.lipsum.com/) into pages 2-100 of your report), you can swindle the rewards without having to actually put in the effort.

To avoid fraud, tech companies will typically check some percentage of writing-as-evidence: either reactively, such as when an incident causes people to actually go and read the risk assessment on the PR that broke production, or proactively, by tasking some poor soul with reviewing the consultant report in detail. Blockchains, of course, are able to check the work automatically (for instance, by confirming that the nonce and block data do in fact hash to the claimed value).

To break Bitcoin, somebody would have to break SHA-256: to figure out a way to identify in advance what content would hash to a specific value, so you could produce the hash without doing the work. To break writing-as-evidence, somebody would have to figure out a way to generate text on demand, so you could produce the evidence (of compliance, effort or learning) without actually doing the work. Unfortunately, that happened in [2023](https://en.wikipedia.org/wiki/GPT-4).

### LLMs fundamentally break writing-as-evidence

Writing is no longer evidence of anything. LLM-produced writing makes evidence of compliance even more vacuous than it already is. It totally destroys evidence of effort: if you need a hundred-page report, you can generate one with an hour and a few dollars in inference tokens. Evidence of learning is likewise broken, since I can produce a detailed status report full of information that never passed through my mind at all (and certainly was never retained). 

Of course, this problem isn't limited to tech companies. Schools and universities rely on writing to serve as evidence of effort and learning, and students are using LLMs to cheat as hard as they can. Many political or regulatory bodies [require](https://x.com/patio11/status/1640539217498632192) a certain bar of professional writing in order to filter requests, and are or will be overloaded by LLMs making that kind of writing generally available.

### What happens now?

Currently we're suffering through an overhang period where the processes are still in place but everyone knows how to trivially exploit them. It will be interesting to see how organizations adapt. They might:

- Introduce new, harder-to-forge forms of evidence like recording a video or presenting live in a meeting (though this will take more time to consume than written reports)
- Attempt to mandate that certain forms of writing not be AI-generated (universities already do this[^2]), which will be [difficult](/ai-detection/) to enforce
- Find other ways to track effort, such as asking an LLM to review an engineer's code and judge how much work they put in

I can't think of any great options here, which is interesting. If there really is no easy solution to this problem, the overhang period might go on for a while, where nobody is particularly happy with the status quo but there are no good alternatives.

In this scenario, individual software engineers are incentivized to exploit the system while they can, and avoid being harmed by other system-exploiters. In other words: don't trust or waste time poring through LLM-authored documents yourself, but also don't waste time writing documents by hand that are just intended to serve as evidence[^3]. Save that effort for documents that are intended to serve as _communication_.


[^1]: Why not just look at your code? Code is an [illegible](/seeing-like-a-software-company/) metric to non-technical people. Even to technical people it can be tricky to figure out how difficult a piece of code was to write, for the same reason that it's tricky to assess how difficult a [mechanical puzzle](https://en.wikipedia.org/wiki/Mechanical_puzzle) is just by seeing it when it's assembled. But everyone knows roughly how long it takes to write a paragraph of text.

[^2]: Software companies will be reluctant to adopt this, because they see internal LLM adoption as a necessary tool to speed product development. They're already begging employees to use LLMs; if they start telling them to not use LLMs for writing, that muddies the message.

[^3]: Part of this involves getting good at telling the difference (in other words, getting good at figuring out if anyone is actually going to read the document). There may also be a third emerging category here: texts that won't be read but also won't be ignored, because they're intended for consumption by other LLMs.