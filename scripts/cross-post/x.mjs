import crypto from "node:crypto"

const API_BASE = "https://api.x.com"

function percentEncode(value) {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    char => `%${char.charCodeAt(0).toString(16).toUpperCase()}`
  )
}

// OAuth 1.0a HMAC-SHA1 signature. JSON request bodies are not part of the
// signature base string, so only oauth_* and query parameters are signed.
export function oauthSignature({
  method,
  url,
  params,
  consumerSecret,
  tokenSecret,
}) {
  const parameterString = Object.entries(params)
    .map(([key, value]) => [percentEncode(key), percentEncode(value)])
    .sort(([a, aValue], [b, bValue]) =>
      a === b ? (aValue < bValue ? -1 : 1) : a < b ? -1 : 1
    )
    .map(([key, value]) => `${key}=${value}`)
    .join("&")
  const baseString = [
    method.toUpperCase(),
    percentEncode(url),
    percentEncode(parameterString),
  ].join("&")
  const signingKey = `${percentEncode(consumerSecret)}&${percentEncode(
    tokenSecret
  )}`
  return crypto
    .createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64")
}

export function oauthHeader({
  method,
  url,
  credentials,
  nonce = crypto.randomBytes(16).toString("hex"),
  timestamp = Math.floor(Date.now() / 1000).toString(),
}) {
  const parsed = new URL(url)
  const baseUrl = `${parsed.origin}${parsed.pathname}`
  const oauthParams = {
    oauth_consumer_key: credentials.apiKey,
    oauth_nonce: nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: timestamp,
    oauth_token: credentials.accessToken,
    oauth_version: "1.0",
  }
  const signature = oauthSignature({
    method,
    url: baseUrl,
    params: { ...Object.fromEntries(parsed.searchParams), ...oauthParams },
    consumerSecret: credentials.apiSecret,
    tokenSecret: credentials.accessTokenSecret,
  })
  const header = Object.entries({ ...oauthParams, oauth_signature: signature })
    .map(([key, value]) => `${percentEncode(key)}="${percentEncode(value)}"`)
    .join(", ")
  return `OAuth ${header}`
}

export function xCredentialsFromEnv(env = process.env) {
  const credentials = {
    apiKey: env.X_API_KEY,
    apiSecret: env.X_API_SECRET,
    accessToken: env.X_ACCESS_TOKEN,
    accessTokenSecret: env.X_ACCESS_TOKEN_SECRET,
  }
  return Object.values(credentials).every(Boolean) ? credentials : null
}

async function request(credentials, path, body) {
  const url = `${API_BASE}${path}`
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: oauthHeader({ method: "POST", url, credentials }),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  const text = await response.text()
  let json
  try {
    json = JSON.parse(text)
  } catch {
    json = null
  }
  if (!response.ok || json?.errors?.length) {
    throw new Error(`X API ${path} failed (${response.status}): ${text}`)
  }
  return json
}

async function uploadImage(credentials, { buffer, altText }) {
  const upload = await request(credentials, "/2/media/upload", {
    media: buffer.toString("base64"),
    media_category: "tweet_image",
  })
  const mediaId = upload.data.id
  if (altText) {
    await request(credentials, "/2/media/metadata", {
      id: mediaId,
      metadata: { alt_text: { text: altText.slice(0, 1000) } },
    })
  }
  return mediaId
}

const tweetUrl = id => `https://x.com/i/status/${id}`

// Posts the teaser with its images, then replies to it with the link.
export async function postThread(credentials, { text, images, replyText }) {
  const mediaIds = []
  for (const image of images) {
    mediaIds.push(await uploadImage(credentials, image))
  }
  const body = { text }
  if (mediaIds.length) body.media = { media_ids: mediaIds }
  const teaser = await request(credentials, "/2/tweets", body)
  const teaserId = teaser.data.id

  try {
    await request(credentials, "/2/tweets", {
      text: replyText,
      reply: { in_reply_to_tweet_id: teaserId },
    })
  } catch (error) {
    throw new Error(
      `Posted the teaser (${tweetUrl(
        teaserId
      )}) but the link reply failed, so reply to it by hand rather than rerunning. ${
        error.message
      }`
    )
  }
  return tweetUrl(teaserId)
}
