---
title: Software is slow because of bad design, not slow languages
description: 
order: 258
date: '2026-10-23'
popularity:
  lobsters:
    urls:
      - 'https://lobste.rs/s/hd72yt/software_is_slow_because_bad_design_not'
    points: 29
    comments: 32
    threads: 1
  score: 247
  hackerNews:
    urls: []
    points: 0
    comments: 0
    threads: 0
  manual: 0
popular: true
tags: ["software design"]
crossPosts:
  x: "https://x.com/i/status/2113379160307487125"
  linkedin: "https://www.linkedin.com/feed/update/urn:li:share:7519144853570674688/"
---

Many people [are saying](https://rustify.rs/articles/rails-world-2026-keynote-dhh-hey-rust-ai-agents) that AI will make software faster by rewriting it in faster languages, but this isn't generally true. Most programs cannot be meaningfully sped up by rewriting them in C or Rust.

How can this be true? Some languages are orders-of-magnitude faster than others: for instance, C can be fifty times [faster](https://news.ycombinator.com/item?id=9753366) than Python. Won't rewriting my Python program in C thus make it fifty times faster? No, it won't. Software performance is usually dominated by I/O, not the speed of the language. Where language speed matters, most slow languages already have popular libraries that allow them to unlock C-like speed. In general, performance is a matter of _design_, not of language choice.

### Most real programs are I/O-bound

Consider a simple CRUD website with a database. For any given request, 50% of the request time[^1] might be spent querying the database: to fetch the current user, the record being asked for, any relevant user memberships or settings, and so on. Rewriting that website in C can only speed up that other 50%, which puts a hard ceiling on the improvements you can make[^2]. At best, you'll make requests twice as fast (probably closer to 1.5x in practice). That's not bad, but it's nowhere near an order-of-magnitude speedup.

In other words, most real programs are "I/O-bound": they spend most of their time waiting for data to be input or output somewhere, as opposed to "CPU-bound" programs that spend most of their time actively doing things. I/O-bound programs don't just have to rely on a database. Often programs have to wait on some third-party API, or on writing or reading data to disk. You could speed the code in `curl` up by 100x and you probably wouldn't even notice, because `curl` spends all of its time waiting on the network.

### Slow languages already delegate work to fast languages

What about work that is obviously not I/O-bound? For instance, wikis have to turn stored markdown into renderable HTML[^3]. Wouldn't rewriting that in a faster language cause a massive speedup? It would! That's why applications that do that use libraries like [cmark-gfm](https://github.com/github/cmark-gfm) that call out to fast languages for markdown rendering. In general, most slow languages can write very fast programs by invoking this kind of library. Python is famously a slow language, but it's a competitive choice for CPU-bound workloads like machine learning and mathematics, because it has a [healthy](https://pytorch.org/) [set](https://www.tensorflow.org/) of libraries that let it offload these workloads to fast C code. If a Python program spends 80% of its time doing matrix multiplications on a GPU, you are very unlikely to be able to speed it up by rewriting it in C, because those matrix multiplications are already happening in tightly-optimized C or assembly code.

Of course, some programs do in fact do a lot of CPU-bound work in slow languages. If a program has not had much engineering attention, there will probably be a lot of [low-hanging fruit](/low-hanging-fruit/). But these programs are often unimportant: if they were important, someone would have gone in and optimized them already, before AI made it (relatively) easy. That doesn't mean it's impossible to find a useful program to rewrite. Actual Computer recently [rewrote](https://github.com/actual-computer/toks) tiktoken in assembly, providing a significant[^4] speedup. However, you're not going to revolutionize some field of computing like this. Even fast tokenization is only useful on the margins, because time spent in tokenization is a fraction of the time spent in inference.

### Speeding up software typically involves a redesign

Despite all this, I think most software is far slower than it could be. I'm optimistic about the potential (with or without AI) to significantly speed up commonly-used software. But I think most of these speedups will come from redesigning the program, not rewriting it in a faster language.

In a 2018 [post](https://bcantrill.dtrace.org/2018/09/18/falling-in-love-with-rust/), Bryan Cantrill described trying to rewrite a C program into Rust. It was difficult because the carefully-optimized design of the C program did not play well with the Rust borrow checker. Giving up, he simply wrote the program in Rust in the naive way, expecting a 20% slowdown or worse. Instead, it was 30% _faster_. The [reasons](https://bcantrill.dtrace.org/2018/09/28/the-relative-performance-of-c-and-rust/) boil down to Rust's internal preference for a B-tree over a binary search tree, which happens to be a more cache-efficient data structure. So even in a largely CPU-bound workload, in the hands of someone very skilled at writing fast C, performance is dominated by design, not by language speed.

This matches my own experience in higher-level languages. When I think of the significant speedups I've managed, they're almost exclusively redesigns of the software to do less work:

- Caching a slow operation (typically an external API call)
- Performing slow operations asynchronously, either in a background job or out of the request/response lifecycle
- Performing operations in parallel instead of sequentially (sometimes [breaking up](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests) large operations in order to do this)
- Replacing a set of SQL queries with a single SQL query (fixing [N+1](https://planetscale.com/blog/what-is-n-1-query-problem-and-how-to-solve-it) problems)
- Replacing a slow SQL query with a fast SQL query
- Skipping unnecessary slow operations (e.g. in a paginated view, only fetch ancillary data from entities that are on the current page)

All of these strategies are completely unrelated to how fast the language is. In fact, writing in a slow higher-level language can make it much easier to optimize the code, because you can see at a glance what the program is doing. If (for some reason) I had first rewritten the web server in assembly, I would have a much harder time noticing the N+1 query, or the fact that we could move an API call into a job, and so on.

### Conclusion

Right now everyone is asking their AI agents to rewrite programs in Rust or C or assembly. This is fun, but it's not a serious attempt at optimization. The set of programs that can be meaningfully sped up by this kind of rewrite is very narrow.

If you want to make everything faster with AI - and you should! - you ought instead to be asking your agent to profile programs, identify hotspots, and suggest ways to redesign what the program does. Occasionally you may run into a hotspot that is truly CPU-bound and cannot be refactored to do less work. In these rare cases, rewriting that section in a faster language will help. But simply rewriting from the start will be far less successful than most people imagine.

There are many good reasons to rewrite software in a different language: portability, efficiency, maintainability, and so on. But in terms of raw _speed_, you're better off focusing on the program's design.


edit: this post got some excellent comments on [lobste.rs](https://lobste.rs/s/hd72yt/software_is_slow_because_bad_design_not). Many commenters [disagree](https://lobste.rs/c/wcyo4k) that CRUD software is IO-bound, because database queries take ~5ms but responses take ~500ms. I don't know about that. It's not uncommon for a single request to make many tens of queries, or to rely on large queries or internal API calls that are a lot slower than 5ms (at least in my experience looking at flamegraphs). While I have profiled a _lot_ of Rails endpoints in my career, it's only been at a couple of companies. Maybe other monoliths are different.

The top [commenter](https://lobste.rs/c/mhuwnq) says that there are many non-IO-bound programs, such as browser layout engines, 3d renderers, word processors, and neural networks. I agree that those examples are CPU-bound, but I think most engineers are not working on tasks like that. My sense is that the number of browser layout engines, 3d renderers and neural network programs in the world, all summed together, might make up about five percent of the number of CRUD programs (though they make up >50% of public _discussion_ about programming, because they're more interesting problems). Maybe I'm wrong!

Other [commenters](https://lobste.rs/c/vcnyyd) [point](https://lobste.rs/c/n031ad) [out](https://lobste.rs/c/s5dkdu) that languages come with ecosystems that make performance harder or easier. I agree with that, but to me that falls under _design_: in some languages, fast designs are more natural than slow designs. If changing languages makes it easier to change designs, then sure, changing languages might speed up your program.


[^1]: This might seem ridiculously high (if you typically work with slow languages or CPU-bound workloads), or ridiculously low (if you don't). In my experience it's at least in the ballpark for interpreted languages.

[^2]: This is formally called [Amdahl's law](https://en.wikipedia.org/wiki/Amdahl%27s_law).

[^3]: Why not just store the HTML? You can, but sometimes the content of the HTML differs per-user (and even if you store the HTML you have to convert it at least once).

[^4]: They claim 4-23x faster than tiktoken and it was indeed ~5x faster on my laptop - though arguably this speedup comes from a redesign to avoid the dependency on regex, not on any intrinsic slowness of Rust with Python bindings.
