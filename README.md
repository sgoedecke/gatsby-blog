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
Definitions stay in place, and other Markdown formatting is preserved.
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
