---
title: Yes, LLMs are still next token predictors
description: 
order: 213
date: '2026-07-25'
tags: ["ai"]
---



llms really are just next token predictors. rlhf does not change that

grain of truth - with rl, llms aren't predicting the next token with reference to some training data token stream
they're predicting the next token _that would solve the problem_

of course, predicting the next token does not imply zero foresight or model of the world. that was a prediction that has proven false