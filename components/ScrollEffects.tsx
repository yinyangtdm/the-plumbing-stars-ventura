'use client'

/**
 * Page-level scroll & load motion controller.
 *
 * Renders the reading-progress rule and the back-to-top button, and wires up:
 *  - the hero load sequence (adds `loaded` to <body> on mount)
 *  - reading-progress fill
 *  - scroll-spy active nav link (IntersectionObserver over [data-spy] sections)
 *  - scroll reveals (.reveal -> .in via IntersectionObserver)
 *  - back-to-top visibility + smooth scroll
 *
 * All effects no-op gracefully under prefers-reduced-motion (the CSS already
 * neutralizes the visual motion; JS just toggles classes / scroll position).
 */

import { useEffect, useRef } from 'react'

export default function ScrollEffects() {
  const progressRef = useRef<HTMLDivElement>(null)
  const toTopRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Hero load sequence
    document.body.classList.add('loaded')

    // Scroll reveals
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            revealObserver.unobserve(e.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    revealEls.forEach((el) => revealObserver.observe(el))

    // Scroll-spy: map section id -> nav link
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-spy]'))
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-desk a'))
    const linkFor = (id: string) =>
      navLinks.find((a) => a.getAttribute('href') === `#${id}`)

    const spyObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.id
            navLinks.forEach((a) => a.classList.remove('active'))
            linkFor(id)?.classList.add('active')
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => spyObserver.observe(s))

    // Reading progress + back-to-top, rAF-throttled
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const doc = document.documentElement
        const max = doc.scrollHeight - doc.clientHeight
        const ratio = max > 0 ? doc.scrollTop / max : 0
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${ratio})`
        }
        if (toTopRef.current) {
          toTopRef.current.classList.toggle('visible', doc.scrollTop > window.innerHeight * 0.9)
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      revealObserver.disconnect()
      spyObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <>
      <div className="progress-rule" ref={progressRef} aria-hidden="true" />
      <button className="to-top" ref={toTopRef} onClick={toTop} aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  )
}
