import React, { useState } from "react"

const SearchBox = () => {
  const [query, setQuery] = useState("")

  const handleSubmit = event => {
    event.preventDefault()

    const trimmed = query.trim()
    const siteQuery = trimmed
      ? `inurl:seangoedecke.com ${trimmed}`
      : "inurl:seangoedecke.com"
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      siteQuery
    )}`

    window.open(searchUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <form className="site-search" onSubmit={handleSubmit}>
      <label htmlFor="site-search-input" className="sr-only">
        Search seangoedecke.com
      </label>
      <input
        id="site-search-input"
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="Search posts"
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBox
