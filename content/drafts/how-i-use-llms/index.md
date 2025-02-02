---
title: How I use LLMs as a staff engineer
description: 
order: 27
date: '2025-01-10'
---

- not to write my code
- not to design systems or write ADRs

- learning new domains (oauth, golang concurrency, etc)
  - not just "explain this to me", but asking questions! many many questions
  - as I learn, I usually take notes - feed the entire notes back in and ask for what I missed
  - lots of "ok, so it sounds like X Y Z - is that right"

- last-resort bug fixes
  - every so often I get kind of stumped by a bug. Sometimes a copy-paste (or describing it in general terms if I can't feed the code in for legal reasons) will immediately identify the problem
  - I don't iterate here very much, either it gets it or it doesn't. worth a quick check

- proofreading for logic
  - same style as the above, don't iterate
  - ask the robot if my reasoning is OK here or if I'm missing something
  - never take the robot's stylistic advice but occasionally it raises a good point

- tactical small changes in unfamiliar areas
  - if i need to make like a 5 line change in a area where I don't know the language or framework, I sometimes rely on LLMs
  - this is risky because I don't know what I'm missing - it basically lets me operate at like a smart-intern level, so I have to act like an intern and make sure a SME in the area checks the change over for me
