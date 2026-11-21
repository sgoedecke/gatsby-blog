---
name: blog-review
description: Review a draft blog post for Sean's blog. Gets independent reviews from Opus 5.5, Gemini 4 Neon and GPT-6.2 Astra, then merges them into one severity-ranked report covering factual accuracy, structure and consistency with the published posts. Use when the user asks to review, check, critique or give feedback on a draft or post, or asks for "another pass" after editing one.
---

# Blog review

## Hard rules

- **Read-only.** Never edit the draft. Never reword a sentence or write replacement prose, not even as a suggestion. Say what is wrong and what kind of change might help (cut, move, cite, hedge, merge, clarify). It's fine to point out a typo by quoting it.
- Subagents are bound by the same rules. Put them in every reviewer prompt.

## Process

1. **Find the draft.** Drafts live in `content/drafts/<slug>/index.md`. Raw notes for drafts are bullet lists in `content/drafts/notes.md`; find the section for this post. If the user has edited and pushed, `git fetch` and read the version on `origin/master`.
2. **Launch three reviewers in parallel**, as background `general-purpose` tasks with these models:
   - `claude-opus-5.5`
   - `gemini-4-neon`
   - `gpt-6.2-astra`

   Give each the same prompt (see below). Wait for all three before reporting.
3. **Merge the results into one report** (format below). Remove duplicates, rank by severity, and show which reviewers raised each point and where they disagree. Before passing a point on, apply the calibration rules: drop or downgrade anything they rule out.
4. **Answer pushback directly.** If the user questions a point, check it yourself and say plainly if the reviewers were wrong or too pedantic. Don't defend a point just because a reviewer raised it.

### Reviewer prompt (include all of this)

- The rules above (read-only; no reworded or replacement prose; say what to change, not how).
- The paths to the draft, the notes section, and `content/blog/*/index.md` for comparison. Ask them to read several published posts on related topics and to grep titles, `###` headings and tags across the corpus. Any claim about Sean's usual practice must be checked against the corpus, not assumed.
- Focus areas in priority order:
  1. **Factual accuracy**, especially technical claims. Check each one on its own merits.
  2. **Structure:** does the argument flow? Is any point in the notes missing from the draft? Do sections contradict each other?
  3. **Consistency with the published posts:** title, headings and frontmatter.
  4. **Mechanical errors:** typos, doubled words, grammar.
- The calibration rules below.
- Output format: sections for Factual accuracy, Structure, Style & title and Mechanical issues. Each item gives its location (heading or footnote number plus a short quote), its severity (high/med/low) and what kind of change would help.

## Calibration

This is an opinionated, conversational blog, not a paper. Reviewers tend to apply academic standards; don't.

- **Titles** state the thesis and may be stronger than the body's hedges ("doesn't work" can mean "isn't worth doing"). Don't flag a mismatch between the title and a hedged body.
- **Endings:** don't push for a conclusion or summary section. A post can end when the argument is done, and ending on a footnote joke is fine.
- **Illustrative numbers** that are signalled as such ("they might be 5x more expensive…") don't need a source.
- **Read the author's framing charitably.** If he uses a term in his own sense, the problem is at most "readers might misread X", not "X is wrong".
- **Wrong vs imprecise:** flag real errors. A "broadly speaking" simplification, especially in a footnote, is usually fine; mention it as low severity or not at all.
- **Hedges in footnotes:** Sean often answers an objection with a hedging footnote rather than by restructuring. That's an acceptable fix. Only flag footnote density when an essential point is hidden in one.
- Don't infer house style from a single post. Post length and structure vary a lot.

## Repo conventions to check

- **`order`:** must be one more than the current maximum across `content/blog/*/index.md`. Drafts often start with frontmatter copied from the previous post, so check this.
- **`tags`:** must come from the existing tag list and fit the post. Check for tags left over from copied frontmatter.
- **`description:`:** leaving it empty is normal.
- **`crossPostText`:** generated from the intro by the pre-commit hook. Only mention it if the intro changed and the text looks stale, or if `x:` is over 280 characters.
- Titles and `###` headings are in sentence case.

## Report format

Keep it skimmable:

- **Factual accuracy**, **Structure**, **Style & title** and **Mechanical issues**, each a list with severity and which reviewers raised the point.
- Include each item's location and a short quote, but no rewritten text.

### Second and later passes

When the user has edited the draft and asks for another pass, diff the new version against the one you last reviewed and report:

- **Fixed:** points that are now resolved.
- **New problems from this edit:** including typos the edit introduced.
- **Still open:** unresolved points from earlier passes, *excluding anything the user has rejected*. Never raise rejected points again.

For a small diff you can do this pass yourself. Run the three reviewers again only if the user asks or the post has been substantially rewritten.
