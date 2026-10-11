# Agent instructions

## Cross-posting a blog post to X or LinkedIn

New posts are cross-posted automatically when they land on `master`. To share
an existing post (for example "post my centaur article to Twitter"), trigger
the `cross-post.yml` workflow. Don't call the X or LinkedIn APIs yourself.

1. Find the post's slug, which is its directory name under `content/blog/`.
   Match the user's description against directory names and the `title:` in
   each `index.md`'s frontmatter. If more than one post plausibly matches, ask
   the user which one they mean.
2. Check the post's frontmatter for a `crossPosts:` block. It records the URL
   of everything already posted, e.g. `x: "https://x.com/i/status/…"`. If the
   post is already on the platform the user asked for, tell them and give
   them the link instead of posting.
3. Choose platforms: `x` for X/Twitter, `linkedin` for LinkedIn, or
   `x,linkedin` for both. Only post to the platforms the user asked for.
4. Run the workflow and wait for it:

   ```sh
   gh workflow run cross-post.yml --ref master \
     -f slug=<slug> -f platforms=<platforms> -f dry_run=false
   sleep 5
   run_id=$(gh run list --workflow=cross-post.yml --event=workflow_dispatch \
     --limit 1 --json databaseId --jq '.[0].databaseId')
   gh run watch "$run_id" --exit-status
   gh run view "$run_id" --log | grep -E "Posted to|error"
   ```

5. Report the posted URLs from the log, or the error if it failed. The
   workflow commits the URLs to the post's `crossPosts` frontmatter itself, so
   run `git pull` before editing that post.

Notes:

- A daily scheduled run already shares one older post on X and LinkedIn,
  working down the /popular list. To share "the next one" now, run the workflow with an empty
  slug: `-f slug= -f dry_run=false`.

- The workflow skips platforms already recorded in `crossPosts`, so rerunning
  a partly failed run only retries what failed. Only add `-f force=true` if
  the user explicitly asks to post the same article again.
- If the X link reply failed, the error includes the teaser's URL (and the
  teaser is recorded, so a rerun won't fix it). Tell the user to reply by hand.
- Posting to X costs about $0.22 per blog post.
- To preview without posting, use `-f dry_run=true`, then
  `gh run download "$run_id" -n cross-post-previews` to get the text and
  screenshots.
- A LinkedIn 401 means the token has expired. Tell the user to run
  `npm run linkedin-auth -- --set-secrets` in `scripts/cross-post`.
