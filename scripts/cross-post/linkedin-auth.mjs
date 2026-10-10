#!/usr/bin/env node
// Gets a LinkedIn access token for posting as yourself. LinkedIn only issues
// refresh tokens to approved partners, so rerun this every ~60 days.
//
//   LINKEDIN_CLIENT_ID=... LINKEDIN_CLIENT_SECRET=... npm run linkedin-auth -- --set-secrets
import { execFileSync } from "node:child_process"
import crypto from "node:crypto"
import http from "node:http"
import { parseArgs } from "node:util"

const PORT = 8976
const REDIRECT_URI = `http://localhost:${PORT}/callback`
const SCOPES = ["openid", "profile", "w_member_social"]

const { values } = parseArgs({
  options: { "set-secrets": { type: "boolean", default: false } },
})
const clientId = process.env.LINKEDIN_CLIENT_ID
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET
if (!clientId || !clientSecret) {
  console.error("Set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET first.")
  process.exit(1)
}

const state = crypto.randomBytes(16).toString("hex")
const authUrl = new URL("https://www.linkedin.com/oauth/v2/authorization")
authUrl.search = new URLSearchParams({
  response_type: "code",
  client_id: clientId,
  redirect_uri: REDIRECT_URI,
  state,
  scope: SCOPES.join(" "),
}).toString()

async function exchange(code) {
  const response = await fetch(
    "https://www.linkedin.com/oauth/v2/accessToken",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    }
  )
  if (!response.ok) {
    throw new Error(
      `Token exchange failed (${response.status}): ${await response.text()}`
    )
  }
  const token = await response.json()
  const userinfo = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${token.access_token}` },
  })
  if (!userinfo.ok) {
    throw new Error(
      `userinfo failed (${userinfo.status}): ${await userinfo.text()}`
    )
  }
  const { sub } = await userinfo.json()
  return {
    accessToken: token.access_token,
    personUrn: `urn:li:person:${sub}`,
    expiresAt: new Date(Date.now() + token.expires_in * 1000).toISOString(),
  }
}

function save({ accessToken, personUrn, expiresAt }) {
  if (!values["set-secrets"]) {
    console.log(`\nLINKEDIN_ACCESS_TOKEN=${accessToken}`)
    console.log(`LINKEDIN_PERSON_URN=${personUrn}`)
    console.log(`Expires: ${expiresAt}`)
    console.log(
      "\nRerun with --set-secrets to store these in GitHub with the gh CLI."
    )
    return
  }
  const gh = (args, input) =>
    execFileSync("gh", args, { input, stdio: ["pipe", "inherit", "inherit"] })
  gh(["secret", "set", "LINKEDIN_ACCESS_TOKEN"], accessToken)
  gh(["secret", "set", "LINKEDIN_PERSON_URN"], personUrn)
  gh(["variable", "set", "LINKEDIN_TOKEN_EXPIRES_AT", "--body", expiresAt])
  console.log(`\nSaved to GitHub. The token expires ${expiresAt}.`)
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, REDIRECT_URI)
  if (url.pathname !== "/callback") {
    response.writeHead(404).end()
    return
  }
  try {
    if (url.searchParams.get("state") !== state)
      throw new Error("State mismatch")
    if (url.searchParams.get("error")) {
      throw new Error(
        url.searchParams.get("error_description") ||
          url.searchParams.get("error")
      )
    }
    save(await exchange(url.searchParams.get("code")))
    response.end("Done. You can close this tab.")
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
    response.end(`Failed: ${error.message}`)
  } finally {
    server.close()
  }
})

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Open this URL to authorize:\n\n${authUrl}\n`)
  if (process.platform === "darwin") {
    try {
      execFileSync("open", [authUrl.toString()])
    } catch {}
  }
})
