# Where is all the new good software? An evidence-based answer (Oct 2026)

*Consolidated AI write-up of all research in this folder, as of 2026-10-16. ref: Nate Meyvis, ["Where is all the new good software?"](https://www.natemeyvis.com/where-is-all-the-new-good-software/) (12 Oct 2026). Each claim points to a detailed report (`reports/NN-…`) or a per-ecosystem `REPORT.md` with data and scripts.*

---

## TL;DR

1. **Much more software is being published: 2–20× more, depending on the registry.** That includes app stores, browser extensions, plugin directories, game stores, Show HN and package managers.
2. **New *big hits* have not increased in any of the 16 ecosystems where we measured usage**, except AI tooling itself. This is the most robust finding.
3. **New software with *modest* real usage (hundreds to a few thousand users) *has* increased, roughly 1.5–10×, in consumer and hobbyist ecosystems where listing is easy.** Examples: NVDA screen-reader add-ons, Home Assistant integrations, Obsidian plugins, Firefox and Chrome extensions, and Steam games (in proportion to supply). It has **not** increased in professional/B2B markets (Atlassian, WordPress, CRAN), on declining platforms (OctoPrint), or in heavily gatekept registries (Flathub, Google Play, Decky).
4. **Human gatekeepers are absorbing much of the surge.** Submissions are up 3–12× wherever humans review them, while listings rise far less.
5. **Companies: more code, not much more delivered product.** PR volume is up a lot; feature-level delivery is up perhaps 0–27%; AWS feature announcements are flat.
6. **Games: studios are flat; hobbyists have exploded.** Unofficial ports, decompilations and recompilations are up ~10–20×, and long-stuck projects (e.g. Brawlback's rollback netcode) are suddenly getting finished.
7. **Reliability and hard-problem progress: flat or worse.** This covers status-page incidents, old-bug closure, compatibility "progress meters", accessibility errors, and survival of AI-built projects.

**One-sentence answer:** the new good software mostly exists as many small tools used by a few hundred people each, in niche registries few people browse. It is not more big hits, not more reliable software, and not more studio output.

---

## 1. The question and how we approached it

Nate lists possible reasons we don't *see* a flood of new good software: fewer bugs rather than more features, non-coding bottlenecks, private or bespoke software, more rather than better software, gains taken as leisure, and so on. We wanted measurements rather than speculation. We split the question into:

- **(a)** Are tech companies shipping more features?
- **(b)** Are games getting more hard technical work (ports, remasters, patches)?
- **(c)** Is software more reliable?
- **(d)** Are niche communities building more software, and is anyone *using* it?

**Method principles**

- **Separate supply from usage.** Counting new repos or listings is easy and misleading. For every ecosystem where we could, we built **cohorts by listing date** and counted how many cleared **low, modest and high usage bars**.
- **Measure at equal age where possible**, e.g. installs or reviews in the first 60/90/180 days, from historical stats, git history of stats files, or Wayback snapshots.
  - Where only *current* usage was available, recent cohorts are disadvantaged. A recent cohort *beating* older ones is strong evidence; one *trailing* them is weak evidence.
- **Correct for platform growth** where possible (Steam audience, Flathub installs, Obsidian downloads, the Home Assistant analytics base).
- **Baseline 2022–24**, compared with 2025H2–2026.
- **AI coding timeline:**
  - Claude Code early/mid 2025; agentic coding mainstream H2 2025; Opus 4.5 Nov 2025; Opus 5 Jul 2026.
  - The newest frontier models are only weeks old, so this measures roughly the first 12–18 months of the agentic era.

**Provenance warning.** Much of the data collection was done by AI research agents, then spot-checked by the orchestrating agent. Several agent conclusions were overturned on checking:

- **Steam.** A sampled high-bar estimate overstated big hits by ~35%; it was replaced with a full count.
- **Homebrew.** An apparent "above trend" rise turned out to be packaging work.
- **Obsidian.** The agent missed a policy change.
- **External report.** A cited +30% app-release figure was misattributed.

Treat the numbers as good-faith estimates with stated caveats, not peer-reviewed results.

---

## 2. Supply is up a lot

| Ecosystem | Supply change | Source |
|---|---|---|
| Show HN posts (Jan–Sep 2025→26) | +91% | HN Algolia API (`reports/06`) |
| F-Droid | admissions ~3×; "new app" merge requests ~12× | F-Droid index + fdroiddata GitLab (`reports/06`) |
| Modrinth (Minecraft mods) | 2.1× (pre-trend 1.5–2.5×/yr) | Modrinth API (`reports/06`) |
| iOS App Store | ~600k new apps in 2025; ~560k in H1 2026 alone. 42matters: 52.6k/mo (Sep 2025) → 144.6k/mo (Sep 2026) | Sensor Tower via NYT/9to5Mac; 42matters (`reports/05`) |
| Steam games | 2.6× 2021→2026H1; +56% vs 2024H1; 26–29% of 2026 releases disclose AI use | Steam store search crawl, 86k games (`market-usage/steam`) |
| Chrome Web Store extensions | 12.7k (2024H1) → 76.8k (2026H1), **6×** | Chrome-Stats (`market-usage/chrome`) |
| Firefox add-ons (AMO) | 4.8× | AMO API (`niche-usage/amo`) |
| WordPress plugins | 1,390/HY → 7,533 (2026H1) | WordPress.org API (`niche-usage/wordpress`) |
| NVDA add-ons (screen reader) | ~6/mo → ~27/mo (~4×) | nvaccess/addon-datastore git (`reports/01`, `08`) |
| Home Assistant HACS integrations | ~6× | hacs/default git (`reports/01`, `08`) |
| Obsidian plugins | ~20× after a May 2026 review-policy change | obsidian-releases git (`niche-usage/obsidian`) |
| Atlassian Marketplace (Cloud) | ~3× | Marketplace REST API (`market-usage/atlassian`) |
| Raycast extensions | ~2× | raycast/extensions git (`niche-usage/raycast`) |
| CRAN (R packages) | ~2× in 2026H1 | CRAN metadata (`niche-usage/cran`) |
| Blender extensions | ~1.6× | extensions.blender.org API (`niche-usage/blender`) |
| Nexus Mods (code/tool mods, 5 games) | 1.6× | Nexus GraphQL (`niche-usage/nexus`) |
| Flathub | submissions 3–5×, listings +30% | Flathub API + GitHub PRs (`niche-usage/flathub`) |
| Google Play | back to 2022 levels after a 2024–25 dip (no AI-era surge) | AppBrain (`market-usage/googleplay`) |
| OctoPrint plugins | **down** | plugins.octoprint.org (`niche-usage/octoprint`) |

Repo-level signals point the same way:

- NVDA-related GitHub repos: 56 → 632.
- Amateur-radio repos: 103 → 592.
- Game recompilation repos: 41 → 617/mo.

So the supply side of "more software" is not in doubt. Note that 2–20× is the range, not 100×.

---

## 3. Big hits have not increased anywhere (except AI tooling)

| Measure | Result |
|---|---|
| Show HN posts with ≥100 points | +4% (vs +91% for all posts) |
| Steam: new games with ≥1k reviews in first 90 days (full count, all candidates) | 146/HY (2022–23) → 207 (2024) → 251 (2026H1): +20% vs 2024, against ~10% audience growth |
| Steam: ≥2k and ≥5k reviews in 90 days | **flat since 2024** (≈127 and ≈64 per half-year) |
| Steam, Zukowski Q1 2024→Q1 2026 | ≤50-review games +48%; 1,000+ review games 88 → 96 |
| Homebrew: new formulae with ≥1k user-requested installs | 22 (2025), 29 (2026) vs 13–34 (2020–24). Most new ones are AI/agent tools; ~9 genuinely new non-AI tools |
| VS Code: new extensions with ≥10k installs (current, age-confounded) | 157 → 81 → 60 per cohort, down |
| NVDA add-ons ≥10k downloads; HACS ≥1k installs | flat |
| Firefox add-ons ≥10k daily users | ~17/HY → 4–9 (current usage, age-confounded) |
| Chrome extensions ≥100k users | 97 (2024H1) vs 39 (2026H1) so far (current, age-confounded); top new items are AI/agent extensions |
| WordPress ≥10k active installs; Atlassian ≥1k installs; Nexus ≥10k | down |
| iOS (Demirer et al.) | new apps up, total usage flat |
| Subscription apps (RevenueCat 2026) | apps launched 2025+ earn ~3% of revenue |
| Obsidian ≥30k downloads in 60 days | 0–2/qtr → 2–4; mostly AI-agent plugins (Claudian, Agent Client, Claude sidebar) |

Where new software *does* reach high usage, it is overwhelmingly **AI tooling itself**:

- agent integrations for Obsidian, Jira (Claude Agent for Jira, Cursor, Copilot) and Chrome;
- LLM desktop apps on Flathub (LM Studio, Jan, OpenCode);
- AI CLIs on Homebrew.

---

## 4. Modestly used new software is up, but only in some kinds of ecosystem

Usage across all 16 ecosystems we measured:

| Ecosystem | Modestly used new items | Measure | Verdict |
|---|---|---|---|
| **NVDA add-ons** | ≥1k downloads in 180d: 18–34/HY → **78** (2026H1) | equal-age | **Yes** |
| **HACS (Home Assistant)** | ~≥100 installs: ~19 → ~45/qtr, scaled for user-base growth | equal-age | **Yes** |
| **Obsidian plugins** | ≥3k downloads in 60d (≈1k before ecosystem growth): 4–14/qtr → **102** (2026Q2). ~80% of 2026 hits are repos created in 2026 | equal-age, growth-scaled | **Yes, strongly, but confounded** by the end of manual review |
| **Firefox add-ons** | ≥10 daily users 2.5×; ≥100 users 1.7× | current | **Yes** |
| **Chrome extensions** | ≥100 users 2×; ≥1k users already equal to 2024H1 at ~¼ the age | current | **Likely yes** |
| **Steam games** | ≥100 reviews in 90d ~+60% vs 2024H1; hit rate flat at ~12% | equal-age | **Yes, in proportion to supply.** AI-disclosed games clear the bar at about half the rate of others |
| **Nexus code mods** | ≥100 downloads +23% | current | Weak yes |
| **Blender extensions** | ≥1k downloads: 196 (2026H1) vs 151–194, with less time | current | Weak yes |
| **Flathub** | ≥1k installs in 90d +50%, but flat once normalised for ecosystem growth | equal-age | No (beyond platform growth) |
| **Raycast** | current usage only; recent cohorts trail | current | Inconclusive |
| **Google Play** | ≥5k downloads at 23 weeks tracks supply | equal-age (aggregate) | No AI-era surge |
| **Decky Loader** (Steam Deck) | ≥20k downloads: 5 vs 2–13 | current | No |
| **WordPress** | ≥100 active installs flat (~380/HY) | current | No |
| **Atlassian (Cloud)** | ≥100 installs ~70 → ~30/HY | current | No |
| **CRAN** | ≥2k downloads (equal-age) down | equal-age | No |
| **OctoPrint** | down at every bar; platform declining | current | No |

**The pattern (interpretation, not proven):**

- **Up** where the builder is typically also a user, the audience is consumers or hobbyists, and listing is cheap. Examples: accessibility add-ons, smart-home integrations, note-taking plugins, browser extensions, game mods, indie games.
  - NVDA is the cleanest example: blind users building their own screen-reader tools.
- **Not up** in:
  - professional/B2B or saturated markets (WordPress, Atlassian), where new entrants compete with incumbents;
  - academic ecosystems with slow adoption cycles (CRAN);
  - shrinking platforms (OctoPrint, losing users to Klipper/Bambu);
  - registries where reviewers filter heavily (Flathub, Google Play).
- **Hit rates fall almost everywhere** (Chrome, Firefox, WordPress): far more items, a similar or slightly larger number of successes. Steam is the exception, with a flat hit rate.

---

## 5. Gatekeepers are absorbing the surge

| Registry | Submissions | Listings |
|---|---|---|
| F-Droid | "new app" MRs ~12× | admissions ~3× |
| Flathub | ~340–490/HY → 1,211 (2026H1), 1,173 (2026H2 so far) | +30% |
| HACS | 6.4× merged PRs | ~2,000-PR open backlog |
| Decky Loader | 68 addition PRs in 2026H1 | 23 merged; 0 merged in 2026H2 so far |
| Raycast | rising | 236 PRs queued, nearly all from the last two quarters |
| Blender | approval queue ~725 (Apr 2025) → ~2,170 (Oct 2026) | AI/MCP add-ons mostly declined |
| Google Play | the closed-testing rule for new developer accounts (Nov 2023) suppressed supply | — |
| Apple App Store | submissions reviewed 7.77M (2024) → 9.10M (2025); copycat/spam rejections 371k | — |
| **Obsidian** | ended manual review on 2026-05-15 | listings **~20×**, plus the biggest jump in modestly used plugins |

This supports Nate's "non-coding bottlenecks" hypothesis in a concrete form: **reviewer capacity, not building capacity, now limits many registries.** Where reviewers filter hard (Flathub), what gets through looks like the pre-AI mix. Filtering seems to remove mostly low-use submissions rather than hiding a layer of good software, though Obsidian shows that removing the gate surfaces some genuinely used tools.

---

## 6. Companies: more code, modestly more delivery

**Our own data** (`reports/01`):

- Merged human PRs (Sep 1–14) in big company-run OSS repos rose **1.4–2×** from 2024 to 2026: VS Code 389 → 703, Sentry 517 → 770, Supabase 113 → 255, Kibana 425 → 636; Grafana flat.
  - Most of the growth is *more contributors*. PRs per author are up only 10–40%.
- AI co-author trailers in commits rose sharply, e.g. VS Code ~6% → ~63%.
- **AWS "What's New" announcements are flat:** 2,345 (2024), 2,328 (2025), ~2,400 annualised (2026).

**Literature and telemetry** (`reports/05`):

- **CircleCI 2026:** median team feature-branch throughput +15%, main-branch (production) −7%; Q2 2026 main branch flat.
- **DX** (400+ companies): median PR throughput +7.8%; realistic gain "5–15%"; time spent on new features flat.
- **Jellyfish** (1,000+ companies): full AI adoption ≈ 2× merged PRs but only **+27% feature-level ("epic") throughput**.
- **Faros AI:** +98% PRs merged, review time +91%, no company-level change in DORA metrics.
- **LinearB:** AI PRs wait 4.6× longer for review; acceptance 32.7% vs 84.4%.
- **Answer.AI:** release cadence of non-AI PyPI packages unchanged.
- **Macro data** (FRED/BEA real software investment): +11–14% YoY, on the 2019–22 trend with no break.
- **Daniotti et al.:** AI writes ~29% of US Python functions; quarterly output +3.6%.
- **Humlum & Vestergaard (NBER):** precise null effects on earnings and hours.

---

## 7. Games: studios flat, hobbyists exploding

**Studios** (`reports/01`, `04`):

- Share of popular pre-2018 Steam games posting patch notes: 25.7% (2021) → 18.9% (2026), flat since 2024.
- Revivals of games dormant for 2+ years: flat.
- Gematsu port headlines excluding Switch 2: 420 (2021) → 304 (2026, Jan–Sep), **down**. Remaster headlines flat at ~5% of posts.
- GOG old-game additions: noisy (117 in 2026 vs 60–110 before).
- Anecdotes such as *Diablo II: Resurrected*'s surprise "Reign of the Warlock" DLC (Feb 2026) and *Witcher 3 Remastered* (~5 weeks from announcement to release) are not a trend.

**Hobbyists** (`reports/02`, `03`):

- DSOGaming articles about unofficial ports: 0–2/mo → 21–22/mo.
- Recompilation repos: 41 → 617/mo. decomp.dev projects: 38 → 145.
- Kotaku (Oct 2026): "hundreds of vibe-coded, AI-decompiled emulators and games"; browser ports of Halo CE, GTA VC and others.
- momo5502's agent decompilation of an MW2-like FPS: 99% of functions, 83% byte-exact.
- First native PC ports of Switch games (*Mario Wonder*, *Odyssey*).
- Xbox's Oct 13 memo explicitly acknowledges games being "rapidly decompiled and rebuilt".
- **Brawlback** (Super Smash Bros. Brawl rollback netcode, in development since ~2021):
  - It had "Current ETA: NONE" in Apr 2026.
  - On Oct 7 2026 it merged ~12k lines of AI-agent-built snapshot code from Crunch's *Orca* project ("Has existing code from Orca, but will work to remove over time") and had working rollback within days.
  - This came amid community backlash, including Hungrybox: "AI has no place in the world of gaming".
- **Pushback:**
  - Bethesda and Activision takedowns; GTA V browser port pulled within hours.
  - Dolphin, N64Recomp and the Zelda/Banjo Recompiled teams refuse AI work ("slopcomp").

Why hobbyists show the effect first: their results are **mechanically checkable** (byte-matching, "does it boot"), they ship in days rather than years, and they don't need legal sign-off.

---

## 8. Reliability and hard-problem progress: flat or worse

**Status pages** (~30 Atlassian Statuspage histories, Jan–Sep incidents indexed to 2022–24):

- Non-AI median 1.00 (all incidents), 1.09 (major/critical).
- AI-traffic-hit services are much worse: GitHub 2–4×, Claude ~7×.

**Mozilla Bugzilla:**

- Bugs filed +40%; regressions +37%.
- Security-high/critical bugs ~5×, likely AI-assisted bug *finding*.
- Old-bug fixes are down as a share of all fixes.

**Other industry measures:**

- **Uptime Institute 2026:** outage rates still falling, continuing the pre-AI trend.
- **Mobile crash-free sessions:** flat at 99.95%.
- **CircleCI:** main-branch success rate 70.8%, a 5-year low.
- **CVEs:** 39,962 (2024) → 48,185 (2025).

**Stalled projects** (`stalled-projects/`):

- Old-issue closures in 15 big repos are on their 2022–24 trend.
- On a pre-registered list of 36 famous stuck projects: major milestones **4 in 2025–26 vs 10 in 2023–24**.

**Progress meters** (`progress-meters/`):

- ProtonDB "works" share is growing *slower*; Wine bug fixes are flat; WPT Interop is noisy.
- **WebAIM accessibility errors are worsening faster** (slope ×1.7; WCAG failure rate reversed from improving to worsening).

**Survival of AI-built projects** (`followup-audit/`):

- Show HN projects that mention AI building: **82% alive vs 84%** for contemporaneous controls.
- Only 7–11% are still maintained after 6–12 months.

---

## 9. Scoring Nate's hypotheses

| # | Nate's hypothesis | Verdict |
|---|---|---|
| 1 | Fewer bugs / better performance | **Against.** Reliability is flat or worse. |
| 2 | More features in existing products | **Weak.** Delivery +0–27%; AWS announcements flat. |
| 3 | People don't adopt new software | **Partly supported.** Big-hit counts are flat everywhere, and hit rates are falling. |
| 4 | Non-coding bottlenecks | **Supported.** Review queues in registries (§5) and in companies (review time +91%; AI PRs wait 4.6× longer). |
| 5 | More ephemeral software | Only indirect evidence: AI-built Show HN projects survive at the same rate, but few are maintained. |
| 6 | Private/bespoke software | **Partly supported, with a twist.** Much "personal" software *is* public, just in long-tail registries with a few hundred users each. |
| 7 | More software, not better software | **Strongly supported.** |
| 8 | Gains taken as leisure | Untested. Per-author output is up only 10–40%, which is consistent with it. |
| 9 | Less software use overall | Untested. |

Two additions:

- **Legal and organisational friction redirects AI-enabled work** into hobbyist and grey-area spaces (decomps, ports), which publishers then take down.
- **Communities actively resist AI-made work** (emulators, recomp projects, Codeberg, Smash players).

---

## 10. Caveats and what would change the picture

- **It's early.** The agentic era is ~12–18 months old, and the newest models are weeks old. Big hits take years to emerge; Chrome-Stats data suggest most extensions reaching 1k users take up to 24 months. **Re-check in Q2 2027.** Big-hit counts are the key number to watch.
- **Current-usage measures** (AMO, Chrome, WordPress, Nexus, Atlassian, Raycast, Blender, Decky) favour older cohorts.
- **Downloads ≠ users.** Update downloads, bots and CI inflate counts (Obsidian, NVDA, Nexus, crates.io).
- **Survivorship.** Most registries drop removed items, which flatters older cohorts.
- **Policy confounders** are everywhere:
  - Obsidian's review change (May 2026); Google Play's testing rule (2023); Atlassian's Server EOL and the Connect→Forge migration;
  - Firefox and Chrome's MV3 transitions; Steam's AI disclosure rule (Jan 2024); Switch 2 launch effects.
- **Platform growth** (Steam, Flathub, Obsidian, Home Assistant) was corrected for only roughly.
- **Unmeasured areas:**
  - private in-house software;
  - web apps, which have no registry;
  - enterprise internal tools;
  - non-English ecosystems (e.g. WeChat mini-programs);
  - software built by non-programmers on no-code/vibe-coding platforms (Lovable, Replit galleries).
- **Literature sources:** much of the industry literature is vendor telemetry (CircleCI, DX, Jellyfish, Faros, LinearB).
- **Single-run measurements:** each ecosystem was measured once, so treat individual numbers as ±20–30% and look at the cross-ecosystem pattern.

---

## Appendix A: Our own datasets (endpoint → location)

| Topic | Endpoint / source | Folder |
|---|---|---|
| Company PRs, AI co-authors | GitHub search API (`gh`) | `data/authors.tsv`, `data/pr_*.tsv`, `scripts/authors.py` |
| AWS announcements | AWS "What's New" post counts per year (collected ad hoc in round 1; no saved script) | `reports/01` |
| Steam patching of old games | SteamSpy top 3,000 + Steam news API | `data/steam_news.tgz`, `scripts/steam.py` |
| Status pages | ~30 Atlassian Statuspage `history.json` feeds | `data/statuspages.json`, `scripts/sp.py` |
| Firefox bugs | bugzilla.mozilla.org REST | `data/bz.tsv` |
| Official ports and remasters | Gematsu (all titles 2021–26), Steam store search, GOG catalogue API, Wikidata SPARQL | `data/gematsu_titles.tgz`, `data/steam_remasters.json`, `data/gog_all.json`, `data/wd_dates.csv` |
| Show HN | `hn.algolia.com/api/v1/search` | `data/hn_show_monthly.tsv`, `scripts/hn.py` |
| F-Droid | `f-droid.org/repo/index-v1.jar`; fdroiddata GitLab MRs | `data/fdroid_*.tsv`, `scripts/fdroid.py` |
| Modrinth | `api.modrinth.com/v2/search` | `data/modrinth_cohorts.tsv`, `scripts/modrinth.py` |
| Homebrew | `formulae.brew.sh/api/analytics/install-on-request/…`; homebrew-core git | `usage-cohorts/` |
| VS Code, crates.io | Marketplace API; crates.io API | `usage-cohorts/` |
| Survival audit | Show HN sample + HTTP probes + Wayback CDX | `followup-audit/` |
| Stalled projects | GitHub issues API, Bugzilla, pre-registered list | `stalled-projects/` |
| Progress meters | ProtonDB dumps, WPT Interop, Wine release notes, WebAIM Million | `progress-meters/` |
| NVDA | nvaccess/addon-datastore git + GitHub release download counts | `niche-usage/data/`, `reports/08` |
| HACS | hacs/default git; data-v2.hacs.xyz; analytics.home-assistant.io (+ Wayback) | `niche-usage/data/`, `reports/08` |
| Obsidian | obsidianmd/obsidian-releases git (plugin list + daily stats history) | `niche-usage/obsidian/` |
| Firefox add-ons | addons.mozilla.org API v5 (`average_daily_users`) | `niche-usage/amo/` |
| CRAN | CRAN package DB + cranlogs (mirror-normalised) | `niche-usage/cran/` |
| WordPress | api.wordpress.org/plugins/info/1.2 (+ Wayback sample) | `niche-usage/wordpress/` |
| OctoPrint | plugins.octoprint.org repo + data.octoprint.org stats | `niche-usage/octoprint/` |
| Nexus Mods | api.nexusmods.com GraphQL v2 | `niche-usage/nexus/` |
| Flathub | flathub.org/api/v2 (search, stats); flathub.org/stats daily JSON; flathub/flathub PRs | `niche-usage/flathub/` |
| Decky Loader | plugins.deckbrew.xyz API; decky-plugin-database git/PRs; Wayback | `niche-usage/decky/` |
| Raycast | raycast/extensions git; "new extension" PRs; raycast.com store | `niche-usage/raycast/` |
| Blender | extensions.blender.org API + approval queue; GitHub topic search | `niche-usage/blender/` |
| Steam cohorts | Steam store search crawl (86k games); `appreviewhistogram`; store pages (AI disclosure) | `market-usage/steam/` |
| Google Play | AppBrain stats pages (+ Wayback); google-play-scraper sample | `market-usage/googleplay/` |
| Chrome Web Store | Chrome-Stats advanced-search API; CWS sitemap | `market-usage/chrome/` |
| Atlassian | marketplace.atlassian.com/rest/2 | `market-usage/atlassian/` |

## Appendix B: External sources cited

**Prompt and earlier takes**

- Nate Meyvis, [Where is all the new good software?](https://www.natemeyvis.com/where-is-all-the-new-good-software/) (2026-10-12)
- Mike Judge, [Where's the shovelware?](https://mikelovesrobots.substack.com/p/wheres-the-shovelware-why-ai-coding) and [One month later](https://mikelovesrobots.substack.com/p/the-ai-shovelware-question-one-month)
- Answer.AI, [So where are all the AI apps?](https://www.answer.ai/posts/2026-03-12-so-where-are-all-the-ai-apps.html) (2026-03-12)

**App stores and markets**

- Demirer, Musolff & Yang, [Writing vs shipping code](https://www.mertdemirer.com/Papers/Demirer_Writing_vs_shipping_code.pdf)
  - Note: its +30% release figure is associated with autocomplete/sync tools, not agents; usage flat.
- Gizmodo/The Information, [App Store surge](https://gizmodo.com/apple-app-store-experiences-surge-in-new-apps-amid-vibe-coding-boom-2000742653) (2026-04-06)
- TechCrunch/Appfigures, [The App Store is booming again](https://techcrunch.com/2026/04/18/the-app-store-is-booming-again-and-ai-may-be-why/) (2026-04-18)
- 42matters, [iOS statistics](https://42matters.com/ios-apple-app-store-statistics-and-trends)
- Apple, [App Store Transparency Report 2025](https://www.apple.com/legal/app-store/transparency/2025/)
- TechCrunch, [Apple may remove apps that don't attract users](https://techcrunch.com/2026/06/09/apple-says-it-may-remove-apps-from-the-app-store-if-they-dont-attract-users/)
- RevenueCat, [State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps)
- Chris Zukowski, [2026 Q1 games](https://howtomarketagame.com/2026/05/14/2026-q1-games/) and [What happened in 2025](https://howtomarketagame.com/2026/01/27/what-the-hell-happened-in-2025/)
- Sulka Haro, [Three years of AI on Steam](https://fragwyz.substack.com/p/three-years-of-ai-on-steam) (2026-07-13)
- F-Droid, [F-Droid in 2025](https://f-droid.org/en/2026/01/23/fdroid-in-2025-strengthening-our-foundations-in-a-changing-mobile-landscape.html)
- Modrinth, [AI policy and disclosures](https://modrinth.com/news/article/ai-policy-and-disclosures/)
- Obsidian, [Future of plugins](https://obsidian.md/blog/future-of-plugins/)
- FRED, [real software investment](https://fred.stlouisfed.org/data/B985RX1Q020SBEA)
- PyPI, [2025 in review](https://blog.pypi.org/posts/2025-12-31-pypi-2025-in-review/)
- GitHub, [Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)

**Engineering productivity**

- CircleCI, [Q2 2026 Pulse](https://circleci.com/blog/five-takeaways-2026-q2-pulse/) (and the 2026 State of Software Delivery)
- DX, [longitudinal study](https://getdx.com/report/ai-and-engineering-velocity-a-longitudinal-analysis/) and [Q2 2026](https://getdx.com/blog/the-state-of-ai-impact-in-engineering-q2-2026/)
- Jellyfish, [Why the real ROI from AI isn't showing up yet](https://jellyfish.co/blog/why-the-real-roi-from-ai-isnt-showing-up-yet/)
- Faros AI, [AI Productivity Paradox](https://www.faros.ai/blog/ai-software-engineering)
- LinearB, [2026 benchmarks](https://linearb.io/resources/software-engineering-benchmarks-report)
- Google, [DORA 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
- METR, [uplift update](https://metr.org/blog/2026-02-24-uplift-update/)
- Anthropic, [How AI is transforming work at Anthropic](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic)
- Papers:
  - He et al. (arXiv 2511.04427)
  - Daniotti et al. (arXiv 2506.08945)
  - Humlum & Vestergaard (NBER w33777)
  - NBER w34836
  - Google RCT (arXiv 2410.12944)

**Reliability**

- Uptime Institute Outage Analysis 2026
- StatusGator, [2025 the year of the global cloud outage](https://statusgator.com/blog/2025-the-year-of-the-global-cloud-outage/)
- Jerry Gamblin, [2025 CVE data review](https://jerrygamblin.com/2026/01/01/2025-cve-data-review/)
- Mozilla, [Hardening Firefox](https://hacks.mozilla.org/2026/05/behind-the-scenes-hardening-firefox/)
- Anthropic, [coordinated vulnerability disclosure](https://red.anthropic.com/2026/cvd/)
- Instabug/Luciq mobile crash benchmarks

**Games (hobbyist and studio)**

- Xbox, [Introducing Xbox Labs](https://news.xbox.com/en-us/2026/10/13/introducing-xbox-labs/) (2026-10-13)
- Kotaku:
  - [AI-decompiled emulators and games](https://kotaku.com/we-might-be-cooked-as-these-vibe-coded-web-browser-ports-of-halo-the-simpsons-hit-and-run-and-gta-vice-city-seem-to-work-perfectly-2000743300)
  - [Activision/Bethesda crackdown](https://kotaku.com/activision-and-bethesda-crackdown-on-genai-mw2-and-fallout-projects-2000739580/)
  - [Zelda/Banjo Recompiled vs "slopcomps"](https://kotaku.com/zelda-and-banjo-recompiled-devs-go-to-war-with-ai-vibe-coded-slopcomps-2000739936)
  - [CESA survey of Japanese developers](https://kotaku.com/over-85-percent-of-japanese-game-developers-are-using-ai-2000736041)
- momo5502, [Game decompilation](https://momo5502.com/posts/2026-10-09-game-decompilation/)
- banteg, [Crimsonland](https://banteg.xyz/posts/crimsonland/)
- Chris Lewis, [One-shot decompilation with Claude](https://blog.chrislewis.au/the-unexpected-effectiveness-of-one-shot-decompilation-with-claude/)
- DSOGaming, [Mario Wonder native PC port](https://www.dsogaming.com/news/super-mario-bros-wonder-is-getting-an-unofficial-pc-native-port/)
- Mashable, [PS5 jailbreaks](https://mashable.com/tech/ps5-jailbreaks-flooding-in-thanks-to-ai)
- Ars Technica, [Epic's Disney project](https://arstechnica.com/gaming/2026/10/report-epic-games-goes-all-in-on-ai-for-disney-collaboration/)
- TechTimes, [Witcher 3 Remastered](https://www.techtimes.com/articles/325602/20260826/)
- TweakTown, [D2R item changes](https://www.tweaktown.com/news/113518/)
- GDC, [State of the Industry 2026](https://gdconf.com/article/gdc-2026-state-of-the-game-industry-reveals-impact-of-layoffs-generative-ai-and-more/)
- Brawlback:
  - [Progress report #1](https://medium.com/@whitetpoison72/brawlback-progress-report-1-fd7965a581f9) and [#4](https://medium.com/@whitetpoison72/brawlback-progress-report-4-3008e0272901)
  - Brawlback [ETA: NONE](https://x.com/BrawlbackTeam/status/2046775326974304317) and [statement](https://x.com/BrawlbackTeam/status/2107385182684873090)
  - Hungrybox, [statement](https://x.com/LiquidHbox/status/2107362457580695653)
  - Crunch, [on decompiling binaries](https://x.com/CrunchBuilds/status/2097554464886473140) and [hindsight post](https://x.com/CrunchBuilds/status/2107636082594472411)
  - Brawlback PR #5 (Oct 7 2026)

**Niche communities**

- IEEE Spectrum, [Reviving teletext for ham radio](https://spectrum.ieee.org/reviving-teletext-for-ham-radio)
- MeshCore, [The split](https://blog.meshcore.io/2026/04/23/the-split)
- Double Tap podcast episode counts (`reports/01`, `05`)

## Appendix C: Detailed reports

- `reports/00-summary.md`: running scorecard
- `01`: round-1 data
- `02`: hobbyist games catalogue
- `03`: Brawlback
- `04`: official ports
- `05`: literature review (raw)
- `06`: critique of an external AI research report, plus Show HN/F-Droid/Modrinth
- `07`: survival, stalled projects, progress meters, Homebrew/VS Code usage
- `08`: NVDA/HACS usage
- `09`: Obsidian, AMO, CRAN, WordPress, OctoPrint, Nexus, Flathub, Decky, Raycast, Blender
- `10`: Steam, Google Play, Chrome, Atlassian
