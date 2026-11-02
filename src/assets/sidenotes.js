// Shows footnotes as margin notes beside the text that references them on
// wide screens. On narrow screens it does nothing and the regular footnote
// list at the end of the post is shown.
;(() => {
  // Keep in sync with the media queries in global.css.
  const WIDE_QUERY = "(min-width: 640px)"
  const GAP = 12

  const section = document.querySelector(".post-body > section")
  if (!section) return

  const media = window.matchMedia(WIDE_QUERY)
  let teardown = () => {}

  // One note per footnote, positioned beside its first reference. A footnote
  // can be referenced more than once; every reference activates the note.
  function collectNotes() {
    const notes = new Map()
    section.querySelectorAll("a.footnote-ref[href^='#fn-']").forEach(ref => {
      const id = ref.getAttribute("href").slice(1)
      if (notes.has(id)) {
        notes.get(id).refs.push(ref)
        return
      }
      const item = section.querySelector(`.footnotes li[id="${id}"]`)
      if (!item) return
      const clone = item.cloneNode(true)
      clone.querySelectorAll(".footnote-backref").forEach(el => el.remove())
      notes.set(id, { id, refs: [ref], label: ref.textContent, html: clone.innerHTML })
    })
    return [...notes.values()]
  }

  function mount() {
    const notes = collectNotes()
    if (notes.length === 0) return () => {}

    const container = document.createElement("div")
    container.className = "sidenotes"
    container.setAttribute("aria-hidden", "true")
    notes.forEach(note => {
      const aside = document.createElement("aside")
      aside.className = "sidenote"
      aside.dataset.note = note.id
      aside.style.visibility = "hidden"
      aside.innerHTML = `<span class="sidenote__label"></span><div>${note.html}</div>`
      aside.firstChild.textContent = note.label
      note.aside = aside
      container.appendChild(aside)
    })
    section.after(container)

    const layout = () => {
      const origin = container.getBoundingClientRect().top
      let floor = -Infinity
      notes.forEach(note => {
        const anchorTop = note.refs[0].getBoundingClientRect().top - origin
        const top = Math.max(anchorTop, floor)
        note.aside.style.top = `${top}px`
        note.aside.style.visibility = "visible"
        floor = top + note.aside.offsetHeight + GAP
      })
    }

    let timer
    const setActive = id =>
      notes.forEach(note => {
        const active = note.id === id
        note.refs.forEach(ref => ref.classList.toggle("is-active", active))
        note.aside.classList.toggle("is-active", active)
      })

    const listeners = []
    const listen = (target, type, handler) => {
      target.addEventListener(type, handler)
      listeners.push(() => target.removeEventListener(type, handler))
    }

    notes.forEach(note => {
      const enter = () => setActive(note.id)
      const leave = () => setActive(null)
      listen(note.aside, "mouseenter", enter)
      listen(note.aside, "mouseleave", leave)
      note.refs.forEach(ref => {
        listen(ref, "mouseenter", enter)
        listen(ref, "mouseleave", leave)
        listen(ref, "click", event => {
          event.preventDefault()
          setActive(note.id)
          clearTimeout(timer)
          timer = setTimeout(() => {
            if (note.aside.classList.contains("is-active")) setActive(null)
          }, 1500)
        })
      })
    })
    listen(window, "resize", layout)
    section.querySelectorAll("img").forEach(img => listen(img, "load", layout))

    const observer =
      typeof ResizeObserver !== "undefined" && new ResizeObserver(layout)
    if (observer) observer.observe(section)

    layout()

    return () => {
      clearTimeout(timer)
      listeners.forEach(remove => remove())
      if (observer) observer.disconnect()
      setActive(null)
      container.remove()
    }
  }

  const update = () => {
    teardown()
    const wide = media.matches
    section.classList.toggle("has-sidenotes", wide)
    teardown = wide ? mount() : () => {}
  }

  update()
  media.addEventListener("change", update)
})()
