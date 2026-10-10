Hello! This is the repository for my personal website, hosted at www.seangoedecke.com.

You should probably read the content via the website, but if for whatever reason you prefer to consume it as markdown, you're welcome to read it here.

Note that files in drafts/ are often very rough and do not represent my considered opinions.

Why Gatsby? Because ~7 years ago when I created this repository I was using Gatsby to rebuild https://developer.zendesk.com/documentation/, and I thought this would be a good way to learn it. I would choose something dramatically simpler if I were setting up my blog today.

I do not check notifications on this repository. If you'd like me to look at your issue or merge your PR, you're better off emailing me.

Post lists and individual post headers show optional Hacker News, Lobsters,
YouTube, and Reddit discussion icons after the tags. The source of truth is each
service's `urls` list in the post's `popularity` frontmatter. The first URL for each
service is used for its icon; scores and comment counts alone do not produce
icons. For example:

```yaml
popularity:
  hackerNews:
    urls:
      - https://news.ycombinator.com/item?id=12345
  lobsters:
    urls:
      - https://lobste.rs/s/abc123/example
  youtube:
    urls:
      - https://www.youtube.com/watch?v=example
  reddit:
    urls:
      - https://www.reddit.com/r/programming/comments/abc123/example/
```

`npm run update-popularity` fills in missing URL lists from the opening sentences
of existing edit/update or discussion paragraphs, then uses the stored Hacker
News and Lobsters URLs to refresh their metrics. Existing URL lists are preserved,
including an explicit `urls: []`; edit those lists directly to add or remove links.
The site build never extracts links from article prose.

Normal updates set `popular: true` when recorded Hacker News or Lobsters metrics
include at least one verified thread. This also repairs missing or false flags on
posts older than 60 days, even though their existing metrics are not refreshed.
Discussion URLs or manual scores alone do not mark a post popular.

Use `npm run update-popularity -- --backfill-urls` to fill in missing URLs without
network requests or changes to scores, counts, or `popular` flags, including for
older posts normally skipped by the metrics updater. Add `--dry-run` to preview
the update without writing files.

## Git hooks

After installing dependencies, run `npm run hooks:install` once per clone to
enable the tracked `.githooks` directory (this replaces any existing
`core.hooksPath` setting). The pre-commit hook renumbers footnotes in staged
`.md` and `.markdown` files starting at 1, in order of first reference, and
updates their matching definitions. Repeated references share a number;
unreferenced definitions receive numbers after the referenced footnotes.
Consecutive groups of top-level definitions are sorted into numeric order,
keeping multiline content intact without moving definitions across other prose.
Other Markdown formatting is preserved.
Code examples, escaped markers, HTML blocks, and YAML frontmatter are left alone.

Renumbered files are updated and re-staged automatically. If a file needs
renumbering but also has unstaged changes, the commit stops without modifying
any files; stage or stash those changes before retrying. Files with no staged
changes, deleted files, and symlinks are not rewritten.

A second pre-commit step runs `node update-popularity.js --files ...` only for
posts that introduce a new Hacker News story, Lobsters story, or YouTube video
URL compared with the committed version. Moving or removing an existing link
does not trigger it. Updates are re-staged automatically; unstaged edits in an
affected post block the commit, and network/API failures abort it.
The updater's existing URL-list and stale-post rules still apply.

You can also run `npm run update-popularity -- --files content/blog/slug/index.md`
to update selected posts manually. Put `--files` and its paths last.

## Cross-posting to X and LinkedIn

`.github/workflows/cross-post.yml` runs on pushes to `master`. When a push adds a
new `content/blog/<slug>/index.md`, it waits (up to 20 minutes) for the Netlify
deploy to make the post live, then:

- posts the first few sentences and two mobile screenshots of the opening
  paragraphs to X, then replies to that post with the link
- posts a longer excerpt with a link card to LinkedIn

Edits to existing posts don't trigger it, and pushes that add more than three
posts are skipped as bulk changes. The code lives in `scripts/cross-post`.

To preview a post without posting, run `npm ci && npx playwright install chromium`
in `scripts/cross-post`, then `npm run preview -- --slug <slug>`. The text and
screenshots are written to `scripts/cross-post/out/<slug>/`. You can also run the
workflow manually from the Actions tab. It defaults to a dry run, and the
previews are uploaded as artifacts. Use the `platforms` input to retry one
platform without posting twice to the other. If the X teaser posts but the
link reply fails, the error includes the teaser's URL so you can reply by hand.

To share an older post, you can also ask a coding agent (e.g. "post my centaur
article to Twitter"). `AGENTS.md` tells it how to find the slug and run the
workflow.

### Setup

X (pay-per-use, about $0.22 per blog post: $0.015 for the teaser and $0.20
for the reply, because it contains a link):

1. In the [X Developer Console](https://console.x.com), create an app, buy some
   credits, and set its user authentication permissions to "Read and write".
2. Generate the access token and secret *after* setting the permissions.
3. Add repository secrets `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, and
   `X_ACCESS_TOKEN_SECRET`.

LinkedIn (free):

1. Create an app at <https://www.linkedin.com/developers/apps> (LinkedIn
   requires associating it with a company page). Add the "Share on LinkedIn"
   and "Sign In with LinkedIn using OpenID Connect" products, and add
   `http://localhost:8976/callback` as an authorized redirect URL.
2. In `scripts/cross-post`, run
   `LINKEDIN_CLIENT_ID=... LINKEDIN_CLIENT_SECRET=... npm run linkedin-auth -- --set-secrets`.
   This stores `LINKEDIN_ACCESS_TOKEN` and `LINKEDIN_PERSON_URN` as secrets and
   `LINKEDIN_TOKEN_EXPIRES_AT` as a variable using the `gh` CLI.
3. Turn off Buttondown's LinkedIn auto-posting so posts aren't shared twice.

LinkedIn tokens expire after 60 days and can't be refreshed automatically, so
rerun step 2 when the workflow warns that the token is about to expire. A
platform with missing secrets is skipped with a warning. LinkedIn retires each
API version after about a year; if posting starts failing with a version error,
bump `DEFAULT_LINKEDIN_API_VERSION` in `scripts/cross-post/linkedin.mjs`.
