/**
 * gatsby-remark-em-dashes
 *
 * Turns a space-surrounded hyphen ("word - word") into an em-dash.
 *
 * SmartyPants already converts `--` and `---`, but it deliberately leaves a
 * lone spaced hyphen alone. This plugin fills that gap.
 *
 * It walks the Markdown AST and only rewrites `text` nodes, so hyphens inside
 * inline code (`foo - bar`), fenced code blocks, link URLs, and raw HTML are
 * left untouched. Frontmatter isn't part of the AST, so it's safe too.
 *
 * Options (all optional):
 *   spaced:      true  -> "word \u2014 word" (default). false -> tight "word\u2014word".
 *   nonBreaking: false -> when spaced, use a normal space before the dash.
 *                true  -> use a non-breaking space before the dash so it never
 *                         wraps to the start of a line.
 */

const EM_DASH = "\u2014"; // —
const NBSP = "\u00A0";

// A hyphen with whitespace immediately before AND after. The capture groups
// preserve whatever whitespace was there (space, tab, or newline).
const SPACED_HYPHEN = /(\s)-(\s)/g;

module.exports = ({ markdownAST }, pluginOptions = {}) => {
  const { spaced = true, nonBreaking = false } = pluginOptions;

  const replace = value =>
    value.replace(SPACED_HYPHEN, (_match, lead, trail) => {
      if (!spaced) return EM_DASH; // drop the surrounding spaces -> tight em-dash
      return (nonBreaking ? NBSP : lead) + EM_DASH + trail;
    });

  const walk = node => {
    if (node.type === "text" && typeof node.value === "string") {
      node.value = replace(node.value);
    }
    if (node.children) {
      node.children.forEach(walk);
    }
  };

  walk(markdownAST);
  return markdownAST;
};
