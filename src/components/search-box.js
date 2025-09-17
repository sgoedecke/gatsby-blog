import React, { useEffect, useRef } from "react"

const GCSE_SCRIPT_ID = "gcse-script"
const SEARCH_ELEMENT_ID = "gcse-search-box"
const CX = "d4b88b15d417f483e"

const SearchBox = () => {
  const readyRef = useRef(false)

  useEffect(() => {
    if (readyRef.current) return
    readyRef.current = true

    if (typeof window === "undefined") return

    // Google CSE expects a global script and an explicit render in SPA contexts.
    const renderSearch = () => {
      if (
        window.google &&
        window.google.search &&
        window.google.search.cse &&
        document.getElementById(SEARCH_ELEMENT_ID)
      ) {
        window.google.search.cse.element.render({
          div: SEARCH_ELEMENT_ID,
          tag: "search",
        })
      }
    }

    const ensureScript = () => {
      const script = document.getElementById(GCSE_SCRIPT_ID)
      if (!script) {
        window.__gcse = window.__gcse || {}
        window.__gcse.parsetags = "explicit"

        const newScript = document.createElement("script")
        newScript.id = GCSE_SCRIPT_ID
        newScript.src = `https://cse.google.com/cse.js?cx=${CX}`
        newScript.async = true
        newScript.addEventListener("load", renderSearch)
        document.body.appendChild(newScript)
      } else if (
        window.google &&
        window.google.search &&
        window.google.search.cse
      ) {
        renderSearch()
      } else {
        script.addEventListener("load", renderSearch)
      }
    }

    ensureScript()

    return () => {
      const script = document.getElementById(GCSE_SCRIPT_ID)
      if (script) {
        script.removeEventListener("load", renderSearch)
      }
    }
  }, [])

  return <div className="gcse-search" id={SEARCH_ELEMENT_ID} />
}

export default SearchBox
