'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SITE } from '@/lib/site'

const NAV = [
  { href: '#services', num: '01', label: 'Services' },
  { href: '#about', num: '02', label: 'House' },
  { href: '#reviews', num: '03', label: 'Notes' },
  { href: '#book', num: '04', label: 'Schedule' },
  { href: '#contact', num: '05', label: 'Contact' },
]

const DRAWER = [
  { href: '#top', num: 'i.', label: 'Home' },
  { href: '#services', num: 'ii.', label: 'Services' },
  { href: '#about', num: 'iii.', label: 'The House' },
  { href: '#reviews', num: 'iv.', label: 'Field Notes' },
  { href: '#book', num: 'v.', label: 'Schedule' },
  { href: '#contact', num: 'vi.', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav">
            <div>
              <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
              </button>
              <a className="brand-left" href="#top">
                <Image src="/logo.svg" alt="The Plumbing Stars" width={128} height={128} priority />
                <span className="emblem-city">Ventura</span>
              </a>
            </div>
            <div className="nav-mid">
              <a className="brand" href="#top">
                <Image src="/logo.svg" alt="The Plumbing Stars" width={110} height={110} priority />
                <span className="emblem-city">Ventura</span>
              </a>
            </div>
            <nav className="nav-desk">
              {NAV.map((n) => (
                <a key={n.href} href={n.href}><span className="num">{n.num}</span>{n.label}</a>
              ))}
            </nav>
            <div className="nav-right">
              <a className="call-btn" href={SITE.phone.href} aria-label="Call us">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.1.78.27 1.55.5 2.3a2 2 0 0 1-.45 2.11L7.91 9.39a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.75.23 1.52.4 2.3.5A2 2 0 0 1 22 16.92z" /></svg>
              </a>
              <div className="nav-cta">
                <div className="phone"><span>Open 24 / 7</span>{SITE.phone.display}</div>
                <a className="btn btn-navy" href="#book"><span>Schedule</span></a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer */}
      <div
        className={`drawer${open ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
      >
        <div className="panel">
          <button className="close" onClick={() => setOpen(false)} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <div className="logo-row"><Image src="/logo.svg" alt="The Plumbing Stars" width={78} height={78} /></div>
          {DRAWER.map((d) => (
            <a key={d.label} className="item" href={d.href} onClick={() => setOpen(false)}>
              {d.label} <span className="num">{d.num}</span>
            </a>
          ))}
          <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
            <a href={SITE.phone.href} className="btn btn-outline">Call {SITE.phone.display}</a>
            <a href="#book" className="btn btn-red" onClick={() => setOpen(false)}><span>Schedule a Visit</span></a>
          </div>
        </div>
      </div>
    </>
  )
}
