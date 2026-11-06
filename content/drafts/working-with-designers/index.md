---
title: Working with designers
description: 
order: 268
date: '2026-11-07'
tags: ["tech companies", "working with"]
---

I love working with designers. Managers and product managers can talk a good game, but you really have to wait and see if they can get things done. Designers demonstrate their value immediately.

It usually goes like this. While working on some feature, I'll put together some placeholder UI that I'm reasonably happy with. I then show it to a designer, who strokes their chin and says "hmm, I have some ideas here". They then go away and produce a mockup UI that is not just clearly better, but better in ways I could not have imagined. There aren't any other roles at a tech company where you can see the value at a glance.

### Design is a strange role

Designers are an unusual role in other ways, too. Engineering managers, product managers, and engineers all come from broadly the same stock: technical, detail-oriented planners. We are people of the spreadsheet. In fact, many managers and product managers were once engineers: it's a natural transition. Not so for designers. I'm sure they exist, but I've never met any designers who started out as engineers.

Because of this, designers are culturally distant from engineers. In my experience, this is a big positive. I've complained [before](/working-with-product-managers/#technical-product-managers) that product managers who were once engineers tend to be worse, not better. Once you start trying to make your own secret technical assessments instead of finding a way to trust your engineering team, you're doomed: you won't be able to do it well enough, and the fact that you're trying will make it impossible to build the trust you need. Designers don't have this problem at all[^1].

### One designer at a time

So far I have made designers sound like the elves of Middle-earth: mysterious creatures who glide around tech companies dispensing magic. In fact, they are more like the Slavic household spirits, or [Domovoy](https://en.wikipedia.org/wiki/Domovoy). If you have one Domovoy in a household, it will protect your home against misfortune. If you ever have more than one, they will [fight bitterly](https://en.wikisource.org/wiki/Page%3AThe_Mythology_of_All_Races_Vol_3_(Celtic_and_Slavic).djvu/367): "making all sorts of noises, injuring the cattle, turning the master out of his bed, choking people while asleep, etc". Likewise, a designer can turn your scrappy product into something really beautiful - but you had better have only one designer, otherwise you're asking for trouble.

The worst experience I have ever had working with designers was on a product where we had three of them: initially just one, who then rotated off the project and was replaced by two very senior designers. As far as I could tell, the first design was pretty good. Unfortunately, the new designers didn't feel the same way. The very first thing they did was completely redesign the product, which meant I had to rewrite most of the frontend styles. Then they began disagreeing with each other. I think we went back on each page of the product three or four times: one designer would tell me to change X, then the other would change it back, and so on. In the meantime, I was desperately trying to get the product to work.

I knew what I was supposed to do in theory: get everyone in a room talking to each other and hash out a decision. Maybe this would have worked on a different product where the requirements were more stable, but it didn't work here. The differences in taste, while imperceptible to me, were just too deep. It seemed like everything Designer A produced was slightly wrong in Designer B's eyes, and vice versa. In the end we just powered through by implementing[^2] each new iteration until about a week before the deadline, at which point I called in two layers of management as air cover[^3] to freeze the design in its current state.

These were really good designers! They were far, far better than me at design, and were very nice people who I'd happily work with again. I just think it's inherently bad to work with more than one designer at a time. I've had this experience over and over on different teams and companies. I can only guess[^4] as to why, but I suspect it's something to do with the way design is a purely aesthetic assessment: engineers disagree, but at the end of the day you can point to concrete measures of quality like latency, bugs, lines of code, and so on, while designers must rely only on taste.

### Flexibility and design systems

One way companies try to scale design work is to produce a "design system": a library of frontend components that are all design-compliant, that can in theory be assembled like Legos into a page that looks consistent with the rest of the company. I hate design systems. However, [like democracy](https://winstonchurchill.org/resources/quotes/the-worst-form-of-government/), they're better than any other way I've seen to enforce a consistent design.

The first problem with design systems is one of incentives. The engineering team that owns the design system is incentivized to produce elegant components that will look beautiful all the time. The engineering teams that _use_ the design system are incentivized to produce systems that meet inelegant or ugly customer requirements. So you have this permanent battle where a product team demands something - say, the ability to embed arbitrary images into the dropdown component - and the design team pushes back because they're worried it will look bad.

The dynamic I described above (where designers tend to disagree with each other) makes this much worse. Often an embedded designer on the engineering team will push for some design that is slightly different from the design system, which (a) makes the design system owners very unhappy, and (b) makes the engineers unhappy, because the component must be tortured into a very slightly different appearance.

The result of this problem is that engineering teams are perpetually hacking their way around the design system: reimplementing their own versions of components, reaching in with CSS to tweak the styles of existing components (which then get broken in each component update), and so on. 

This leads into the second problem: compatibility. Design systems are typically written in the latest and greatest frontend framework, but the actual frontend code at a company is always a hodge-podge of various technologies and versions that are too expensive and risky to update. For instance, you often have a design system in React that is being used to plan changes to a frontend in pure HTML and CSS[^5]. I have spent _years_ of my life wrestling with this exact problem: either you spend ages trying to reimplement some percentage of the React component, or you try and use the outdated pure-CSS design system (if one exists), or you give up and just embed a React component directly into the HTML. All of these are very unpleasant for different reasons.

One common situation is that the version of the design system available to _you_ (i.e. the pure-CSS version, or the React 16 version) looks subtly different from the design system available to _your designer_, and so when you plug your Legos together you don't quite get what they were visualizing. This leads to a very tedious conversation where you have to explain that no, it's not actually trivial to bump the entire app to the latest React version[^6]. When you're actually implementing the app, you have to constantly run a kind of translation in your head: "okay, the designer wants dropdown feature A, but the dropdowns in my version of the design system only offer features B and C, so I guess C is close enough..."

I still think design systems are better than the alternatives. When you're up-to-date and don't have a designer who wants anything weird, they work _great_. Ensuring that a thousand engineers across a giant application all produce consistent UI is a very hard problem and I don't know any other way to solve it. I just wish that the designers I worked with were more considerate of the fact that design systems often make the immediate work of engineering more difficult.

### Do you actually need designers?

The classic [three-legged stool](https://medium.com/@susankatherinerits/the-3-legged-stool-of-product-development-a00ab50a0ac) of product development is made up of engineering, product management, and design. Design is definitely the shorter leg. Almost every team I've worked on has had some kind of embedded product management, but only about half the teams I've worked on[^7] have had some access to design (and even fewer have had an embedded designer on the team). Why is that?

Partially it's because there are products that don't require design, or at least not in the visual sense that designers provide. Some of the teams I've worked on have owned systems with no real visual component: APIs, billing and reconciliation, markdown or pdf rendering[^8]. I have seen companies put designers on these teams anyway, out of some sense that "design thinking" can improve the structure of an API. This is nonsense. Good API design is [very important](/good-api-design/), but it's a _technical_ job, not an aesthetic one. Designers on these teams typically just sit around or tunnel-vision on some unimportant piece of UI that the team does own (e.g. some internal admin component that no customer will ever see).

It's also because badly designed products still work. I don't think Netlify Analytics is well-designed: it's awkward to use and does not show me information it definitely has. But I still pay for it, because I want server-side analytics for my blog. I don't think many people have complimented the aesthetics of the Microsoft Azure admin portal, but Azure [broke](https://insight.tmcnet.com/insight/microsoft-pushes-azure-past-100-billion-as-cloud-growth-accelerates-mv1ku93a) $100B of revenue this year. There are very few software products where design is truly business-critical.

As an engineer, I selfishly wish I could work with a designer all the time. I want to work on beautiful products, and I can't make them beautiful myself.



[^1]: This is partly structural. Because they're not responsible for delivery, they just aren't under the same pressure as product managers and managers.

[^2]: In fairness, it helped that both designers were technical enough to write their own frontend PRs, though these usually needed some polishing and deploying.

[^3]: This didn't really work. While there were no major redesigns after that point, we were shipping design changes until the day before launch.

[^4]: Incidentally, if you're a designer reading this, please email me! I'd love to know if this sounds right to you, and if so whether you have theories as to why.

[^5]: Or in Angular, or in a different version of React.

[^6]: Sometimes because it'd break all the little hacks to the design system that your designer has strong-armed you into doing in the past.

[^7]: I did some very loose vibe research which estimated that Microsoft/Google/Amazon has 3/10/7 designers per 100 engineers, compared to 7/7/9 product managers.

[^8]: This sounds like it'd have a visual component but it's not the kind that requires _design_: sandboxing a pdf or turning markdown into HTML is a technical operation that happens pre-design. The team that owns the page where that pdf or HTML is rendered is the team that makes design decisions about how it should look.