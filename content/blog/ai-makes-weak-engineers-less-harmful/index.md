---
title: AI makes weak engineers less harmful
description: 
order: 191
date: '2026-05-09'
tags: ["ai", "good engineers", "tech companies"]
---

Like other kinds of puzzle-solving, software engineering ability is strongly heavy-tailed. The strongest engineers produce way more useful output than the average, and the weakest engineers often are actively net-negative: instead of moving projects along, they create problems that their colleagues have to spend time solving. That's why many tech companies try to [build](https://www.levels.fyi/companies/jane-street/salaries) a small, ludicrously well-paid team instead of a large team of more average engineers, and so far this seems to be a winning strategy.

Being effective in a large tech company is often about managing this phenomenon: trying to arrange things so that the most competent people land on projects you want to succeed, and the least competent are shunted out of the way[^1]. For instance, if you're technical lead on a project, you more or less have to ensure[^2] that the most critical pieces are in the hands of people who won't screw them up (whether by directly assigning the work, or by making sure someone can "sit on the shoulder" of the engineer who you're worried about).

Claude Code changed this. Frontier LLMs don't have the taste or the system familiarity of a strong engineer, but they have absolutely raised the floor for weak engineers. Instead of getting a pull request that could never possibly work or would cause immediate problems, the worst you'll now see is a standard LLM pull request: wrong in some ways, baffling in others, but at least functional on the line-by-line level and not so obviously incorrect that someone with no knowledge of the codebase could point it out. That is a huge improvement!

You can try this out yourself. If you attempt to deliberately make mistakes while working with a coding agent, you'll find that the agent pushes back hard against many obvious errors (i.e. caching user data with a non-user-specific key, writing an infinite loop that might never terminate, or leaking open files). Of course, the agent will still miss subtle errors, particularly ones that require understanding other parts of the codebase.

Working with the least effective engineers is now sometimes like working with a Claude Opus or Codex instance that you communicate with over Slack. Occasionally it's _literally_ that: your colleague is simply pasting your messages into Claude Code and pasting you the response. This is annoying, but it's a much better experience than working with this kind of engineer directly. After all, you probably already work with a bunch of LLM instances. The Slack interface is not ideal - unlike using Claude Code directly, you sometimes wait hours or days for a response, and you don't get visibility into the agent's thought processes - but it's still helpful on the margin. More compute being thrown at your problem is better than less.

Of course, this isn't a great state of affairs for the engineer in question, who is almost certainly learning less than if they were making their own (bad) decisions. It's also a bad state of affairs for the company, who is paying a human salary and getting a Copilot subscription (which they're likely also paying for)[^3]. After the current push to figure out what value AI is adding to engineers, I suspect there will be a push to figure out what value _engineers are adding to AI_, and the engineers who aren't adding much may find themselves out of a job.

You can't talk to Claude-over-Slack like you'd talk to normal Claude. If you tend to handle LLMs roughly (insulting them, or just being very curt), you'll have to change your communication style. A human is going to read your messages, after all, even if you're really interacting with a LLM. There's no point being rude. But if, like me, you say please-and-thank-you to the models[^4], you can treat your LLM-using coworker as just another Copilot window or Codex tab. It's far better than having to treat them as an unwitting saboteur.

Not all net-negative engineers use AI tools like this. Many are strongly convinced in their own wrong opinions about how to build good software, or mistrust AI in general, or believe that relying heavily on LLMs is not a good way to improve[^5]. But _no_ strong engineers use AI tools like this. Even when they're being lazy or sloppy, a capable engineer will have enough baseline taste to catch obvious AI-generated errors. So the phenomenon of engineers[^6] becoming thin wrappers around Claude Code is limited to the kind of engineers for whom this is an improvement in their work product.



[^1]: More charitably: many "least competent" engineers are just out of their comfort zone, and can be fine or even excel under the right circumstances (though in my view the best engineers are able to do good work in a wide variety of environments). Another disclaimer: I don't currently work with a lot of incompetent people. Much of this is based on past experience or talking to other engineers in the industry.

[^2]: Since your managers are doing the same thing, this can sometimes feel like Moneyball: you're trying to identify underappreciated talent who are strong enough to help you win without being so high-profile that your boss poaches them to lead something else.

[^3]: I suppose it's better to pay for nothing than to pay for net-negative output, but it still doesn't seem _good_.

[^4]: I think this is actually the right way to hold Claude Opus 4.7.

[^5]: Is this true? I think relying on LLMs is not a great way for most engineers to improve, but if LLM output is consistently better than your own, it might be different. So long as you're paying attention to where the LLM does better, it could actually be a good way to learn.

[^6]: I don't have as much experience (or anecdotes) about non-engineers falling into this trap, but [this post](https://nooneshappy.com/article/appearing-productive-in-the-workplace/) has convinced me that it might be worse.