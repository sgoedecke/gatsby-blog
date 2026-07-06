---
title: Everything I know about debugging
description: 
order: 205
date: '2026-07-04'
tags: ["debugging"]
---

People often describe debugging as a mechanical process. You simply step through some broken code with debugging tools until you arrive at the offending lines. According to this view, being good at debugging is partly mastery of tools like [gdb](https://en.wikipedia.org/wiki/GNU_Debugger) or the browser [developer panel](https://developer.chrome.com/docs/devtools), and partly familiarity with tricks like binary search to help you arrive at the right part of the codebase sooner.

But the good debuggers I've worked with don't seem like mechanics. They seem like wizards. Often they arrive at the correct solution _instantly_, as if via divine revelation, without having to use any debugging tools at all. When I debug, I sometimes perform mechanical steps, but it's pretty rare that I solve a hard problem this way. In fact, the mechanical debugging is more of a meditative process that my hands perform while I reflect on the problem, which eventually solves itself in a flash of insight.

This post is my attempt to write down what I know about this numinous side of debugging. While the mechanical process is [still important](https://danluu.com/teach-debugging/), I'm not going to say much about it because I think that's [well](https://dwheeler.com/essays/debugging-agans.html) [covered](https://www.reddit.com/r/ExperiencedDevs/comments/1cj43et/what_are_your_favorite_debugging_techniques/) [elsewhere](https://jvns.ca/blog/2022/12/21/new-zine--the-pocket-guide-to-debugging/).



- debugging needs information. pour it all in the funnel
- you need a good sense for what bits are "weird". what is familiar, what surprises you? you should dig _hard_ at the bits that surprise you
  - ofc you need a very strong baseline familiarity for this to work, otherwise everything will be weird
- 


https://dwheeler.com/essays/debugging-agans.html - quit thinking and look