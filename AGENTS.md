# Agent instructions

## Cross-posting a blog post to X or LinkedIn

New posts are cross-posted automatically when they land on `master`. To share
an existing post (for example "post my centaur article to Twitter"), trigger
the `cross-post.yml` workflow. Don't call the X or LinkedIn APIs yourself.

1. Find the post's slug, which is its directory name under `content/blog/`.
   Match the user's description against directory names and the `title:` in
   each `index.md`'s frontmatter. If more than one post plausibly matches, ask
   the user which one they mean.
2. Choose platforms: `x` for X/Twitter, `linkedin` for LinkedIn, or
   `x,linkedin` for both. Only post to the platforms the user asked for.
3. Run the workflow and wait for it:

   ```sh
   gh workflow run cross-post.yml --ref master \
     -f slug=<slug> -f platforms=<platforms> -f dry_run=false
   sleep 5
   run_id=$(gh run list --workflow=cross-post.yml --event=workflow_dispatch \
     --limit 1 --json databaseId --jq '.[0].databaseId')
   gh run watch "$run_id" --exit-status
   gh run view "$run_id" --log | grep -E "Posted to|error"
   ```

4. Report the posted URLs from the log, or the error if it failed.

Notes:

- Every run posts again, so never rerun a successful run, and don't retry a
  platform that already succeeded. If the X link reply failed, the error
  includes the teaser's URL; tell the user rather than rerunning.
- Posting to X costs about $0.22 per blog post.
- To preview without posting, use `-f dry_run=true`, then
  `gh run download "$run_id" -n cross-post-previews` to get the text and
  screenshots.
- A LinkedIn 401 means the token has expired. Tell the user to run
  `npm run linkedin-auth -- --set-secrets` in `scripts/cross-post`.
