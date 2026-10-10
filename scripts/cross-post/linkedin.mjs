import { escapeLittleText } from "./compose.mjs"

// LinkedIn sunsets each monthly API version after about a year. If posting
// starts failing with a version error, bump this (or set LINKEDIN_API_VERSION).
export const DEFAULT_LINKEDIN_API_VERSION = "202609"

export function linkedInCredentialsFromEnv(env = process.env) {
  if (!env.LINKEDIN_ACCESS_TOKEN || !env.LINKEDIN_PERSON_URN) return null
  return {
    accessToken: env.LINKEDIN_ACCESS_TOKEN,
    personUrn: env.LINKEDIN_PERSON_URN,
    apiVersion: env.LINKEDIN_API_VERSION || DEFAULT_LINKEDIN_API_VERSION,
  }
}

export function buildLinkedInPost({
  personUrn,
  commentary,
  url,
  title,
  description,
}) {
  const article = { source: url, title }
  if (description) article.description = description
  return {
    author: personUrn,
    commentary: escapeLittleText(commentary),
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    content: { article },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  }
}

export async function postToLinkedIn(credentials, post) {
  const response = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${credentials.accessToken}`,
      "Content-Type": "application/json",
      "Linkedin-Version": credentials.apiVersion,
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(
      buildLinkedInPost({ personUrn: credentials.personUrn, ...post })
    ),
  })
  if (!response.ok) {
    const text = await response.text()
    const hint =
      response.status === 401
        ? " The access token has probably expired (they last 60 days); run `npm run linkedin-auth -- --set-secrets` in scripts/cross-post."
        : ""
    throw new Error(`LinkedIn post failed (${response.status}): ${text}${hint}`)
  }
  const postUrn = response.headers.get("x-restli-id")
  return postUrn
    ? `https://www.linkedin.com/feed/update/${postUrn}/`
    : "https://www.linkedin.com/in/me/recent-activity/all/"
}
