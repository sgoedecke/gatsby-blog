---
title: Keep incidents boring
description: "The internet is full of war stories, but almost no incidents are like that"
---

The internet is full of exciting incident war stories. Tough engineering problems, solved under pressure by sleep-deprived developers. In an industry where the best code is usually the most boring implementation, it’s nice to think that there’s at least one place where hacking up a cool idea is heroic rather than irresponsible. For some engineers, me included, being on-call has a really seductive appeal. Working under pressure is fun, and there’s a lot of immediate validation in being the one who figures an incident out. Other people have written a lot about the problems with this hero-mentality: both for the engineer, who rapidly becomes a single point of failure and burns out, and for the organisation, which incentivises incident _response_ rather than incident _prevention_. I agree with all of that. But I think the prevalence of war stories also misrepresents what it’s like to be an effective incident responder. *Almost no incidents are interesting.* High-pressure, yes, but typically boring from an engineering perspective.

Ninety-nine out of a hundred incidents are solved by either waiting or rolling back a recent change. Most of the work involved in an incident, at least in an org with more than a few engineering teams, is in figuring out which change needs to be rolled back or which other team needs to be paged. If you make a habit of reading post-mortems, you’ll notice this as well. While the chain of cause-and-effect that caused a particular change to lead to an outage is complex, the actual experience of managing that outage is usually quite simple: revert that change. Effective incident calls are full of people staring at graphs to figure out what service is actually unhealthy, then reviewing the recent changes to that service (or paging the team who owns the service, who typically review the same list of changes themselves). It’s even common for incidents to resolve themselves without any action required, as a third-party vendor like AWS resolves the incident on their end, or as the system’s own recovery mechanisms kick in.

When incidents deviate from this pattern, it’s usually bad news.

First, some engineers don’t like rolling back bugs in their service. It’s emotionally difficult to admit defeat, particularly when the bug itself is obvious (once spotted). It feels a lot better to roll forward: to write up a quick patch in the middle of the night, shove it through some approximation of the usual test-QA-CI pipeline, and deploy it to production. This is almost always a bad idea! High-stress situations make for poor code, as does the pressure of “we need to ship this to get on top of the incident”. Even a simple fix can have unintended consequences. Moreover, a buggy area of code might have more than just the one bug. Fixing the original issue can reveal other problems, which can snowball into an even bigger roll-forward as the engineer - now committed - frantically tries to patch up a problem feature. Your code can almost always go out the next day, when the rest of the team is awake.

Second, some engineers really don’t like doing nothing during an incident. When everyone is stressed, methodically going through logs or alerts is really difficult. It feels bad to not be actively addressing the problem in some way. When there’s no obvious bug to address, engineers tend to flail: to take effectively random actions that _might_ have something to do with the incident. The most common is to redeploy your service to “shake something loose”, but there are lots of actions in this category. Manually clearing caches and rolling back other services that might be related are two common ones. If an action was used to solve a previous incident, a flailing engineer will try to repeat it in this incident, even if there’s no good reason to expect it to work. The problem with flailing is that it can make the incident much worse. If you roll back the users service, which removes a change that the payments service was depending on, you now have two incidents to diagnose and fix. If you blindly redeploy, and the problem is with your container orchestration service failing to spin up new service instances properly, you have now turned a high-error-count incident into a full service outage. If you have no real idea what is going on in an incident, it’s better to do nothing - or to force yourself to investigate more before acting - than to start changing things at random.

If you want to be really helpful during an incident, don’t try to be a wizard who always solves the problem. Try to be a calm professional who brings the stress level of the incident down and patiently investigates the least-risky way to get back to a normal state. If your heart is beating fast and you’re freaking out, _do nothing_. If you’re unhappy that you’re rolling back a stupid little bug that’s a one-line fix, _do nothing_. Keep the incident as boring as possible. You won’t have as many war stories, but you’ll have happier customers and make less critical mistakes.