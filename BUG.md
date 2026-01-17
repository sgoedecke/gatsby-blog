## Link mix-up investigation

- [x] Start investigation into mis-pointed links on `/about` page.
- Observed `/about` page (`src/pages/about.js`) renders static `<a>` tags for email (`mailto:`) and book (`/book`), so swapping isn't coming from React code directly.
- Inspected generated HTML (`public/about/index.html`) and live https://www.seangoedecke.com/about/; both ship the correct `href`s, so something must mutate the DOM after hydration for affected users.
- The only scripts running on the page are analytics: Plausible, PostHog, and Umami. Plausible/Umami just add click handlers, but PostHog's `array.js` bundles feature flags/experiments/surveys that can rewrite DOM per-user, which fits the intermittent “links swapped” reports.
- Live production HTML currently only loads Plausible + Umami (confirmed via `curl`), no PostHog, so the swapping predates that script entirely.
- Nothing in Gatsby build output touches these anchors other than static markup; suspect whatever people see is a runtime mutation outside this repo (browser extension, corporate proxy, CDN edge function, etc.).
- Next step idea: instrument `gatsby-browser.js` to compare `document.querySelector('a[href="/book"]')` and the mailto anchor after hydration and emit an analytics event if they differ, so we can correlate the issue with specific user agents/network paths.
- Support forums are full of “mailto opens the wrong thing” complaints that ended up being local OS/email-client defaults (example: Tek-Tips thread “Mailto link in email opening wrong email”), so at least some of these reports might stem from misconfigured Outlook/Gmail handlers rather than our site.
- There are widely used extensions that deliberately rewrite links/requests in-browser (e.g. Requestly’s feature list explicitly advertises URL redirection & rewriting: https://extensionsurfer.com/extension/requestly/), so anyone running those could unknowingly swap `/book` vs `mailto` without us touching the DOM.
