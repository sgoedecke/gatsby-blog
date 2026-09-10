import React from "react"
import { Link } from "gatsby"

const platforms = {
  hn: {
    label: "Hacker News",
    icon: (
      <path
        fillRule="evenodd"
        d="M2 2h20v20H2V2zm4 4 5 8v5h2v-5l5-8h-2.5L12 12 8.5 6H6z"
      />
    ),
  },
  lobsters: {
    label: "Lobsters",
    icon: (
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      >
        <path d="M5 3 3 6l3 3 3-3-2-3M6 9v3l4 3m9-12 2 3-3 3-3-3 2-3m1 6v3l-4 3M10 8l2 3 2-3M9 14l-3 2m3 1-3 2m9-5 3 2m-3 1 3 2" />
        <path d="M12 11c-4 0-4 9 0 10 4-1 4-10 0-10zm-2 4h4m-4 3h4m-2 3-3 1m3-1 3 1" />
      </g>
    ),
  },
  youtube: {
    label: "YouTube",
    icon: (
      <path
        fillRule="evenodd"
        d="M5 4h14a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4zm5 4v8l7-4-7-4z"
      />
    ),
  },
  reddit: {
    label: "Reddit",
    icon: (
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <g fill="none">
          <path d="m12 9 2-6 5 1M5 11c-4-4-6 3-2 4m16-4c4-4 6 3 2 4" />
          <circle cx="20" cy="4" r="2" />
          <ellipse cx="12" cy="15" rx="9" ry="6" />
          <path d="M8 18c2 1.5 6 1.5 8 0" />
        </g>
        <circle cx="8" cy="14" r="1" />
        <circle cx="16" cy="14" r="1" />
      </g>
    ),
  },
}

const PostMeta = ({ frontmatter, discussionLinks = [] }) => (
  <div className="post-meta">
    <span>
      {frontmatter.date}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <>
          {"\u00a0\u2502 "}
          {frontmatter.tags.map((tag, index) => (
            <React.Fragment key={tag}>
              <Link to={`/tags/${tag.toLowerCase()}/`}>{tag}</Link>
              {index < frontmatter.tags.length - 1 && ", "}
            </React.Fragment>
          ))}
        </>
      )}
    </span>
    {discussionLinks.length > 0 && (
      <ul
        className="discussion-links"
        aria-label="Post discussions"
        role="list"
      >
        {discussionLinks.map(({ platform, url }) => {
          const { label, icon } = platforms[platform]
          return (
            <li key={platform}>
              <a
                href={url}
                title={`${label} discussion`}
                aria-label={`${label} discussion of ${frontmatter.title}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  {icon}
                </svg>
              </a>
            </li>
          )
        })}
      </ul>
    )}
  </div>
)

export default PostMeta
