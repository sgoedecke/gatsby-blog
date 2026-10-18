import React, { useCallback, useEffect, useLayoutEffect, useState } from "react"

// Keep in sync with the media query in global.css.
const WIDE_QUERY = "(min-width: 1400px)"
const GAP = 12

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect

function collectNotes(section) {
  const seen = new Set()
  const notes = []
  section.querySelectorAll("a.footnote-ref[href^='#fn-']").forEach(ref => {
    const id = ref.getAttribute("href").slice(1)
    if (seen.has(id)) return
    const item = section.querySelector(`.footnotes li[id="${id}"]`)
    if (!item) return
    seen.add(id)
    const clone = item.cloneNode(true)
    clone.querySelectorAll(".footnote-backref").forEach(el => el.remove())
    notes.push({ id, ref, label: ref.textContent, html: clone.innerHTML })
  })
  return notes
}

// Renders footnotes as margin notes beside the text that references them on
// wide screens. On narrow screens it renders nothing and the regular footnote
// list at the end of the post is shown.
const Sidenotes = ({ sectionRef, html }) => {
  const [notes, setNotes] = useState([])
  const [tops, setTops] = useState({})
  const [active, setActive] = useState(null)
  const containerRef = React.useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof window === "undefined") return
    const media = window.matchMedia(WIDE_QUERY)
    const update = () => {
      const wide = media.matches
      section.classList.toggle("has-sidenotes", wide)
      setNotes(wide ? collectNotes(section) : [])
    }
    update()
    media.addListener(update)
    return () => {
      media.removeListener(update)
      section.classList.remove("has-sidenotes")
    }
  }, [sectionRef, html])

  const layout = useCallback(() => {
    const container = containerRef.current
    if (!container || notes.length === 0) return
    const origin = container.getBoundingClientRect().top
    const next = {}
    let floor = -Infinity
    notes.forEach(note => {
      const el = container.querySelector(`[data-note="${note.id}"]`)
      if (!el) return
      const anchorTop = note.ref.getBoundingClientRect().top - origin
      const top = Math.max(anchorTop, floor)
      next[note.id] = top
      floor = top + el.offsetHeight + GAP
    })
    setTops(next)
  }, [notes])

  useIsomorphicLayoutEffect(() => {
    layout()
  }, [layout])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || notes.length === 0) return
    window.addEventListener("resize", layout)
    let observer
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => layout())
      observer.observe(section)
    }
    const images = section.querySelectorAll("img")
    images.forEach(img => img.addEventListener("load", layout))

    const handlers = notes.map(note => {
      const enter = () => setActive(note.id)
      const leave = () => setActive(null)
      const click = event => {
        event.preventDefault()
        setActive(note.id)
        setTimeout(() => setActive(current => (current === note.id ? null : current)), 1500)
      }
      note.ref.addEventListener("mouseenter", enter)
      note.ref.addEventListener("mouseleave", leave)
      note.ref.addEventListener("click", click)
      return () => {
        note.ref.removeEventListener("mouseenter", enter)
        note.ref.removeEventListener("mouseleave", leave)
        note.ref.removeEventListener("click", click)
      }
    })

    return () => {
      window.removeEventListener("resize", layout)
      if (observer) observer.disconnect()
      images.forEach(img => img.removeEventListener("load", layout))
      handlers.forEach(remove => remove())
    }
  }, [notes, layout, sectionRef])

  useEffect(() => {
    notes.forEach(note =>
      note.ref.classList.toggle("is-active", note.id === active)
    )
  }, [notes, active])

  if (notes.length === 0) return null

  return (
    <div className="sidenotes" ref={containerRef} aria-hidden="true">
      {notes.map(note => (
        <aside
          key={note.id}
          data-note={note.id}
          className={`sidenote${active === note.id ? " is-active" : ""}`}
          style={{
            top: tops[note.id] || 0,
            visibility: note.id in tops ? "visible" : "hidden",
          }}
          onMouseEnter={() => setActive(note.id)}
          onMouseLeave={() => setActive(null)}
        >
          <span className="sidenote__label">{note.label}</span>
          <div dangerouslySetInnerHTML={{ __html: note.html }} />
        </aside>
      ))}
    </div>
  )
}

export default Sidenotes
