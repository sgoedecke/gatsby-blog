**Automation is both a blessing and a curse.** Many incidents are caused by automation behaving in surprising ways (e.g. a dynamic load balancer zeroing out traffic to one upstream after a blip in the error rate). However, automation is also the primary reason that many incidents are prevented. Having a single "deploy this change" button that triggers a gradual rollout with various "is this causing an error" gates is one of the highest value-for-effort reliability changes a technical organization can implement. I don't have a grand theory of automation to offer here, but in general I'd recommend thinking very hard about the parts of your system that can make their own decisions, and making sure you're happy with the tradeoffs.

**Data validation is sometimes a bomb waiting to go off.** I wrote about this a lot more in [_'Make invalid states unrepresentable' considered harmful_](/invalid-states/), but it's worth repeating in the context of incidents. If you ever have a validation around some product invariant, you had better be confident that it is in fact an invariant. For instance, one classic mistake is to put a validation on a child record that its owner must be a certain type. If the owner's type ever changes after the child record is created, the child record will silently become invalid, and (e.g. in Rails) any attempt to update it will fail. Many incidents fit this pattern: the system manages to break some invariant that was painstakingly enforced in code, with disastrous consequences.

---

dwarkesh

### How can AI companies start making real money?

AI companies are bleeding money right now for the same reason that any fabulous new technology bleeds money: even if it could be profitable today, it's a much better idea to try and accelerate in the hopes of being a thousand times more profitable later on. In other words, if Anthropic stopped paying to train new models, they could make a ton of money selling access to Claude Opus and Claude Sonnet - with one huge caveat. OpenAI would have to stop training new models as well, because if they ever release a model better than Claude, all Anthropic's business will go to them[^4]. So how can AI companies start making money?

I think there's three answers here. The most boring answer is to **pivot into an AI _product_ company**. Anthropic are doing this with Claude Code and Claude Cowork, and OpenAI are doing it with Codex and various other moonshot projects. The whole point here is that because you train the model, you're in a position to train it both with and for your specific product: on your tools, with your prompts, and for the concrete tasks that your product performs. Even better, you can feed the data from your product back into the model, so your system gets more tightly integrated over time. That makes it tricky for third-party competitors to come in and beat you.

The slightly more exciting answer is to **sell AI capabilities to a small, exclusive set of customers**. The paradigm (and only) example of this so far is Claude Mythos, where Anthropic have built a powerful cybersecurity model and granted access to a handful of companies. Because they're not selling inference, they're not as vulnerable to distillation, and at least in theory they could charge enormous sums of money. This is more or less what we'd expect from the early stages of the singularity: a superintelligence operating like an ancient Greek Oracle, jealously gatekept by its creators, only accessible to the kings and princes who travel to ask it a single question. Of course, this image is also great marketing for an AI lab, so it's worth being at least a little bit suspicious.

The most exciting answer is that **money won't matter in the singularity**. If you genuinely think you're on track to creating an artificial superintelligence, you might not be angling for money but for _power_: the kind of hard-to-imagine "control over the lightcone" power that comes from shaping the mind of the machine god. I don't want to talk about this too much - it's been done to death - but I think it's at least worth mentioning that many people at the AI labs think this way.

### Other questions

Dwarkesh's challenge has two more questions:

- AI companies have raised more money than they know what to do with. How could you spend trillions of dollars to "make AI go well"?
- If you're the leader of a company with no direct AI involvement (you don't make chips, models, power plants or robots), what can you do to not be left behind?

I have no idea and no strong intuition about either of these. I suspect in both cases you'd want to stay light on your feet, since even the near-term impacts of powerful AI are very hard to predict, so I wouldn't recommend an immediate commitment in any direction. But I'm just speculating here. I don't have any reason to think my wild guesses are particularly accurate.


--
ideal architectures radically change at various "trigger points"
- "can you fit it in memory" - before this, bloom filters/etc are great. after this, you should think in trees (minimize I/O, not cycles) (middle ground where you can mmap)
- "<10ms etc"

---
left-wing arguments for AI

chronic illness support - ADHD
chronic illness support - can't rely on doctors
accessibility - in general you can transform content into the way you can consume it (podcast, quiz, article, dialogue)
making institutional channels accessible to people who can't talk the "elite professional" dialect
if you believe left-wing views are correct, training a superior reasoner will help (and is already helping, plausibly)
fully automated luxury gay space communism plausibly requires AI
AI is a universally available tutor - can turn lectures/etc into quizzes that can be consumed. Obviously you can cheat, but for the students who want to learn, they now have private tutoring on tap

"I've long been uncomfortable with the absolute left-wing anti-AI stance because, if similar reasoning had been applied to outright reject computers as fascist and unethical in the 80s and onward, my own life would have been quite different, and arguably worse. I have enough usable vision to handwrite, uncomfortably, with my head against the page. I did more of that than I wanted in school (I started first grade, in the US K-12 system, in 1987). Computers saved me from having to do even more, starting with my family's home computer and other desktop computers in the classrooms that had them, and then on my own laptop. Would I want a world where I had been forced to handwrite more, or perhaps write in Braille with humans transcribing it for the benefit of sighted teachers and peers, or maybe write on a typewriter (for some reason I don't recall ever trying that)? Then again, am I selfish to consider only my own comfort? After all, the manufacturing of computers inflicts its own harms on people, harms that I'm comfortably distant from. And of course, using computers as a child led to a career in software development. What kind of work would I be doing now if that path hadn't been available? And now that AI helps at least one group of disabled people (of which I'm more or less a part), do I want to deny that benefit?"
- [Matt Campbell](https://toot.cafe/@matt) via email

---

diffs not commits
---

https://www.youtube.com/watch?v=s1eqzfXCgXI
AI makes fake legibility cheap (reports, etc - but fake)
"potemkin" reports/dashboards are trivial to generate
legibility "slop"

Large organizations function via a tree of nested reports. Individual contributors give updates to their managers, who summarize and combine[^1] those into team-level updates for their managers, and so on all the way to the top.

This serves two purposes. The obvious purpose is _legibility_: managers and executives can find out "what is happening in the organization" simply by reading the relevant report[^2]. A less-obvious but equally important purpose is that it forces people to build a mental model of what's going on in their local area.

[^1]: Typically called a "rollup".

[^2]: Of course, these reports are only approximations, and can mislead managers in all sorts of ways. I wrote a lot more about that point in [_Seeing like a software company_](/seeing-like-a-software-company).
---
Really effective staff-plus engineers at big tech companies must be technically strong enough to get things done, but also willing to subordinate their own goals and values to the values of the company. If you're only technically strong, you'll likely end up as a terminal senior (or if your skills are really in demand, as an un-influential staff engineer). If you're only willing to be a company man, you're not useful enough to be worth keeping around at all.

There's no shortage of people who are willing to do whatever the company wants for money. But there is a shortage of people who are like that _as well as being technically strong_. Thos two traits do not fit together. 

---
what kind of ego you have to have to be a big tech swe

high ego - high confidence
willingness to make enemies
belief in the value of your own work, your own decisions

low ego - willingness to subordinate
willingness to set down work half-finished, to not ship at the last minute when a decision is made
high tolerance for lack of reward - some projects you just get punished for, through no fault, and you have to be able to wear it with a smile

---
silver bullets managers love
get a senior swe to review
extra process steps (often just serve as temporary sources of shame)
freezing (e.g. deploys)

--

Business numbers every programmer should know
latency numbers but for stuff like "planning happens for q1, etc"

---

tried generating a SAE
runpod sshing worked out of the box with codex background processes
but by default it tried to extract features from the final layernorm (which is not really a "feature", right? it's like extracting "features" from the logits). Lazy!
layer -10 didn't work well either - outputs degraded before any impact happened, it was more like just giving the model brain damage
Anthropic did exactly halfway through the model, so let's try that
Got the architecture right, but ~10k activations is 2 OOMs too few (at least) to train a useful SAE. The learned features accounted for a tiny fraction of a percent of variance. Need to train until features are tens of percent, at minimum

Token usage: total=11,046,675 input=10,616,967 (+ 126,888,704 cached) output=429,708 (reasoning 181,805)

---
https://www.crassh.cam.ac.uk/wp-content/uploads/2025/01/Freeman-1970.pdf

On screwing up

---
glue work as martyrdom
how to effectively do glue work
recognizing when you do and don't have the space for it
getting credit for glue
when NOT to do glue work (when you're throwing your body to patch up things that are epxected to fail)

You probably shouldn't be doing [glue work](https://www.noidea.dog/glue) in large tech companies. I gave some reasons for this in [_Glue work considered harmful_](/glue-work-considered-harmful), but I didn't present an overall theory. Here's one now: **glue work is heroic, and you shouldn't try to be a hero**.

But first, a note on what glue work is and what it isn't. As I'm using the term, glue work is not just work that your company doesn't ask for. It's work that your company doesn't _reward_[^1]. If I make a [side bet](/side-bets) that my team really wants a new suite of unit tests, and I expect my boss to love it, that isn't glue work. That's just work. However, if I write those unit tests knowing that I _won't_ be rewarded for it - in fact, suspecting that I'll be punished for it - that's glue work.

### Should companies just reward glue work?

Should companies reward glue work? I actually don't think so. In my view, rewarding glue work is a bit like rewarding lines of code written. It might correlate with good behavior, but what you really want to reward is _results_.

Some glue work is genuinely useful (for instance, making sure different teams are talking to each other when they need to collaborate on a key project). But some glue work is more "neatness for neatness' sake". Imagine an engineer who really wants to go through past Jira tickets and re-label them in the current scheme, because it makes the historical statistics more consistent. Or imagine an engineer who spends their time chasing people up for individual estimates on tickets, in a team where fine-grained estimation is (perhaps [justifiably](/how-i-estimate-work)) neglected. All kinds of glue work are not created equal.

[^1]: I acknowledge that this is not quite Tanya Reilly's definition of glue work, though Reilly acknowledges that glue work is often unrewarded. In my view, the term has evolved over time to refer to the subset of the original definition that is unrewarded. Or at any rate, that's what I'm interested in writing about in this post, because it's more interesting (if your company rewards glue work, just do it - problem solved!)



Tech companies fund the work they want. If your company really wants to sell software to large enterprises, it will reward engineers who build enterprise features. If your company really wants to avoid embarrassing reliability incidents, it will reward engineers who fix incidents quickly and engineers who do high-profile preventative work.

---

suppose ai really did make it hard to learn new things/cook your brain. it would not follow that SWEs must avoid it
in many other jobs, "doing th ejob makes you worse at th ejob" is common - manual labor injuries/accumulation of damage
it is very pleasant that doing the job lets you learn quickly right now, but that's really just luck - it doesn't _need_ to be true
we're paid to deliver results, not to learn more or become more well-developed


https://www.youtube.com/watch?v=lpuy9RxJmfU
know how to drive the car

https://www.youtube.com/watch?v=s1eqzfXCgXI
AI makes fake legibility cheap (reports, etc - but fake)
"potemkin" reports/dashboards are trivial to generate
legibility "slop"


I am from the finance/politics world, so the on-the-ground perspective of how AI is influencing enterprises is something I think about a lot. 

Working on products people hate

https://matthogg.fyi/a-unified-theory-of-ego-empathy-and-humility-at-work/
in defense of ego

why people hate AI? it's the connection with art
the crypto NFT insistence that 'this is the future of art' about obvious shit
avoiding ARC Raiders because of AI use... well, almost every piece of software you use has had AI contribute, many institutions you interact with have ChatGPT assistance, etc
why do people not boycott that? is it just lack of visibility? or is it that people don't want to be put directly in contact with AI output?

5 min followup
classifier didn't work great - same problem, more or less
what if you heavily constrain sampling?
 What if we started by training a tiny model, then once the loss rate stalls, increase
  the model size and continue, etc? Would that work?

lucky seeds
explains affection for older models


oai syco: https://edition.cnn.com/2025/11/06/us/openai-chatgpt-suicide-lawsuit-invs-vis?utm_source=substack&utm_medium=email 
#keep4o twitter hashtag... man

https://newsletter.posthog.com/p/collaboration-sucks
https://news.ycombinator.com/item?id=45892394
explicitly targeting throughput-not-legibility

interface on top of agentic tooling that gives options to choose from

https://arxiv.org/pdf/2506.02153

of course there's an AI bubble. so what?

how to think clearly about technical topics
concrete
slow
don't have to be smart if you think clearly


https://news.ycombinator.com/user?id=Gigachad
"The most obvious sign of AI slop is mismatched style with the medium"
post - 10 theories of AI slop?

https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf
base rate comparison with normal IT transformations


why would optical prompt compression work?
https://news.ycombinator.com/item?id=45640594


can you improve 5 min training by training a quick classifier for TTC?
maybe?
is it cheating to generate a training set for the classifier outside of the 5 min window
I don't think so, within the rules

popular writing advice I deliberately ignore

auto ai researcher
initially just used ngrams, too quick
happy to churn away
couldn't see MPS in the sandbox, so just used CPU
`codex --sandbox danger-full-access`

promo projects

gpt-5 tone - a new kind of slopß

why are chinese AI models less sycophantic?

why I disagree with https://news.ycombinator.com/item?id=45070512 

traps for software engineers

the simplest problem models reliably struggle with

instead of you reviewing AI code the AI will review you to make sure you understand its code
dkamm/pr-quiz

the unreasonable effectiveness of prompting


The socratic method and LLMs

You should never be angry in the workplace
ß
 integrations! oxide podcast
 
 a database is a store for global variables
 
 what is inference time compute?
 
