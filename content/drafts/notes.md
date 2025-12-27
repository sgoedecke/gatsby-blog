You cannot do good software design without an intimate understanding of the specific details
Software design is (a) hard and (b) part of every task, whether you think about "design" or not
What is generic advice? It's "designing straight from the problem" - you have some (but not exhaustive) knowledge of the domain, but very little knowledge of the current codebase/system

Why it doesn't work
It's easy to give generic software design advice, for the same reason that it's easy to give generic advice of any kind
Generic software design advice can even be useful under certain circumstances (as a general guide for building brand-new things, for instance)
But generic software design advice is often unhelpful for concrete tasks, because concrete factors (what the code looks like right now) dominate:
- consistency is usually more important than "good design"
- correctness is the most important thing, and manipulating the current code in a way that is likely to be safe typically constrains your design choices down to a tiny handful of possibilities
- since you can only rewrite in chunks, you will _always_ be in some intermediate state between designs - you'll never reach the "north star" of your "good design", so the actual implementers will be forced to design their own intermediate state anyway
In a world where you could safely rewrite large complex software systems, generic advice would be useful


Good software design
In practice, the best software design happens in conversations between a small group of engineers who all have deep understanding of the system, because they're the ones working on it. These design discussions are often **really boring** to outsiders, because they revolve around arcane concrete details of the system, not around general principles that any technical person can understand and have an opinion on. It's not "DRY vs WET", it's "could we put this new behavior in subsystem A? no, because it needs information B, which isn't available to that subsystem in context C, and we can't expose that without rewriting subsystem D, but if we split up subsystem E here and here...".
The most useful contributions to these discussions are rarely deep philosophical points about design. Instead, they're usually identifying small misunderstandings of concrete points - "oh, you thought B wasn't available in context C, but we recently refactored C so now we could thread in B if we needed to".


Architecture
Why do companies often do generic software design advice? Some reasons are sensible - ensuring consistency in new systems, for instance - while others are really just causal (people get promoted away from the codebase but still want to give input).
To people who aren't directly involved in programming, it can sound very sensible to have your most senior technical people only engage in generic top-level advice. This is the _architect_ model, where your best people supposedly make the most important, highest-leverage decisions. In practice, architecture advice is often ignored by the people on the ground - for the reasons above, they simply have to ignore it, because there's no way to actually translate it into something they can do.
This is a surprisingly robust system because **architects have no skin in the game**, not being responsible for the success of individual projects. They can thus neatly take credit for successes - thank goodness their design was followed! - and avoid blame for failures - well, if only they'd implemented my design exactly. This works because generic architectural advice is impossible to follow exactly. There are always diversions from the architecture that can be blamed on the engineers who are actually implementing the project

Summary
useful design discussions are often way, way more concrete than many tech companies seem to believe - like, down to looking at individual lines of code
you cannot really engage in a useful design discussion unless you're actively working on the codebase and are therefore very familiar with it
architecture is not useless, but very high level architecture is close to useless when working on large complex codebases
IMO the role of "generic" architecture should be in helping companies (a) make very large-scale decisions, like "do we do cloud or not", and (b) setting out paved paths for brand new systems. The kind of architecture that you should do in large codebases requires a command of the concrete details that cannot really be attained in most architecture roles


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

https://news.ycombinator.com/user?id=Buttons840

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
 
