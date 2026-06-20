import Image from 'next/image'
import { SITE } from '@/lib/site'
import Header from '@/components/Header'
import BookingForm from '@/components/BookingForm'
import ScrollEffects from '@/components/ScrollEffects'
import ServiceAreaMap from '@/components/ServiceAreaMap'

const SERVICES = [
  { num: 'I.', title: 'Drain Cleaning', body: 'Kitchens, bathrooms, laundry rooms, and main lines — diagnosed by camera, cleared at a flat rate, and guaranteed for thirty days.' },
  { num: 'II.', title: 'Sewer Repair & Replacement', body: "From a hairline crack to a collapsed main line, we'll show you the footage, propose two options, and finish on time." },
  { num: 'III.', title: 'Hydro Jetting', body: 'The pressurised, no-chemical method that scours roots, grease, and scale until pipes look factory-new.' },
  { num: 'IV.', title: 'Camera Inspection', body: 'HD video down the line so you understand the problem before you understand the bill. Footage stays with you.' },
  { num: 'V.', title: 'Trenchless Replacement', body: "No-dig pipe bursting and lining — for the homeowner who'd rather not lose a driveway, lawn, or weekend." },
  { num: 'VI.', title: 'Water Heater Replacement', body: 'Tank & tankless replacement — install, haul-away, same-afternoon turnaround.' },
]

const METHOD = [
  { num: 'I.', title: 'The phone call', body: "A real human answers, day or night. We text back within five minutes, confirm what's wrong, and schedule a window that respects your day." },
  { num: 'II.', title: 'The diagnosis', body: "Our technician arrives within the window, inspects the line (usually with an HD camera scope), and shows you the footage on the truck's monitor." },
  { num: 'III.', title: 'The price, in writing', body: 'You see a single flat number — and the work that goes with it — before any tool is unpacked. We do not invoice by the hour. Ever.' },
  { num: 'IV.', title: 'The repair, photographed', body: 'Most jobs are finished the same afternoon. We send before/after photos and the warranty paperwork to your inbox before we leave the curb.' },
]

const check = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12l4 4L21 4" /></svg>
)

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <span id="top" />
      <Header />

      {/* Masthead / Hero */}
      <section className="masthead">
        <div className="container">
          <div className="issue-row">
            <div className="ornament">VOL · XXVI</div>
            <div className="vol">A different kind of plumber.</div>
            <div className="ornament">EST. 1998</div>
          </div>

          <div className="hero-grid hero">
            <div>
              <div className="hero-cred"><span className="dash" /> Ventura County&rsquo;s Sewer &amp; Drain Experts</div>
              <h1 className="hero-title">
                The <em>fix</em> shouldn&rsquo;t<br />
                feel like a <em>gamble</em>
              </h1>
              <p className="hero-deck script-line">For a generation we have answered the phones ourselves, walked the line with a camera, and quoted the work — in writing — before the wrench comes out.</p>
              <div className="hero-byline"><span className="dot" /> The Plumbing Stars Family · Ventura County, CA</div>
              <div className="hero-cta">
                <a href="#book" className="btn btn-red"><span>Schedule a Visit</span></a>
                <a href={SITE.phone.href} className="btn btn-outline">Call {SITE.phone.display}</a>
              </div>
              <div className="hero-meta">
                <div><div className="l">In Business</div><div className="n">XXVI<em>yrs</em></div></div>
                <div><div className="l">Warranty</div><div className="n">5<em>yrs</em></div></div>
                <div><div className="l">Avg. Arrival</div><div className="n">60<em>min</em></div></div>
                <div><div className="l">Trip Charges</div><div className="n">$0</div></div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="frame">
                <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="ed1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#143A6E" /><stop offset="100%" stopColor="#06183A" /></linearGradient>
                    <radialGradient id="ed2" cx="0.7" cy="0.3"><stop offset="0%" stopColor="#92B7E2" stopOpacity=".4" /><stop offset="100%" stopColor="#0B2A55" stopOpacity="0" /></radialGradient>
                  </defs>
                  <rect width="400" height="500" fill="url(#ed1)" />
                  <rect width="400" height="500" fill="url(#ed2)" />
                  <g stroke="rgba(255,255,255,.1)" strokeWidth="1" fill="none">
                    <circle cx="200" cy="250" r="80" /><circle cx="200" cy="250" r="140" /><circle cx="200" cy="250" r="200" />
                  </g>
                  <g transform="translate(200,250)" fill="none" stroke="#F4EFE4" strokeWidth="3" strokeLinecap="round">
                    <path d="M-50 -70 L-50 30 Q-50 50 -30 50 L30 50 Q50 50 50 70 L50 100" />
                    <circle cx="-50" cy="-70" r="14" fill="#B81F2A" stroke="#F4EFE4" strokeWidth="3" />
                    <path d="M-60 -80 L-40 -80 M-50 -90 L-50 -70" strokeWidth="2" />
                  </g>
                  <text x="200" y="450" textAnchor="middle" fontFamily="DM Serif Display, serif" fontStyle="italic" fontSize="14" fill="rgba(244,239,228,.5)" letterSpacing="6">— Vol. XXVI —</text>
                </svg>
                <div className="hero-mark">Est<em>1998</em>family</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="info">
        <div className="container">
          <div className="info-row">
            <div className="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              <div><div className="l">Open</div><div className="v">24 hours, 7 days</div></div>
            </div>
            <div className="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12l4 4L21 4" /></svg>
              <div><div className="l">Pricing</div><div className="v">Flat, in writing</div></div>
            </div>
            <div className="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 17l6-6 4 4 6-8" /><path d="M14 5h6v6" /></svg>
              <div><div className="l">Warranty</div><div className="v">Up to 5 years</div></div>
            </div>
            <div className="info-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.5-6.3 4.5 2.3-7.2-6-4.4h7.6z" /></svg>
              <div><div className="l">Reviews</div><div className="v"><a href={SITE.yelpReviewsUrl} target="_blank" rel="noopener noreferrer">Read on Yelp →</a></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" id="services" data-spy>
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">Section I · The Services</div>
            <h2>What we <em>do</em>.</h2>
            <p className="script-line">A short, considered list. Every line photographed; every job guaranteed in writing.</p>
          </div>
          <div className="svcs">
            {SERVICES.map((s, i) => (
              <a className={`svc reveal d${(i % 3) + 1}`} href="#book" key={s.title}>
                <div className="num">{s.num}</div>
                <div className="body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
                <span className="more">Read →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Feature / About */}
      <section className="section cream" id="about" data-spy>
        <div className="container">
          <div className="feature">
            <div className="feature-visual reveal">
              <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
                <defs><linearGradient id="fl1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#143A6E" /><stop offset="100%" stopColor="#06183A" /></linearGradient></defs>
                <rect width="400" height="500" fill="url(#fl1)" />
                <g opacity=".15" stroke="#F4EFE4" strokeWidth="1" fill="none">
                  <line x1="40" y1="40" x2="360" y2="40" /><line x1="40" y1="460" x2="360" y2="460" /><line x1="40" y1="40" x2="40" y2="460" /><line x1="360" y1="40" x2="360" y2="460" />
                </g>
                <text x="200" y="120" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="80" fill="#F4EFE4">XXVI</text>
                <text x="200" y="160" textAnchor="middle" fontFamily="DM Serif Display, serif" fontStyle="italic" fontSize="18" fill="rgba(244,239,228,.7)" letterSpacing="6">years</text>
                <g transform="translate(200,280)" fill="none" stroke="#F4EFE4" strokeWidth="2.5">
                  <circle r="60" opacity=".25" /><circle r="40" opacity=".5" />
                  <path d="M-30 -10 L-30 10 Q-30 20 -20 20 L20 20 Q30 20 30 30" strokeLinecap="round" />
                  <circle cx="-30" cy="-10" r="6" fill="#B81F2A" />
                </g>
                <text x="200" y="420" textAnchor="middle" fontFamily="DM Serif Display, serif" fontStyle="italic" fontSize="22" fill="#F4EFE4">Family-Owned</text>
                <text x="200" y="450" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="11" fill="rgba(244,239,228,.55)" letterSpacing="6">SINCE 1998</text>
              </svg>
              <div className="feature-mark"><div><small>Our</small>House Promise<small style={{ marginTop: 6 }}>Always</small></div></div>
            </div>
            <div className="feature-text reveal d1">
              <div className="eyebrow">Section II · The House</div>
              <h2>A small <em>family</em> shop — that kept getting bigger.</h2>
              <p>We started The Plumbing Stars in 1998 with a battered Ford, a press in the back, and a promise: tell the truth, charge a fair price, and stand behind the work in writing.</p>
              <p>Twenty-six years later, we have more trucks and more techs — but the same family on the phone, and the same crew on the second visit that came on the first. Half of our Ventura County business is neighbors recommending neighbors, which is exactly how we want it.</p>
              <p>If you&rsquo;ve called us before, thank you. If you haven&rsquo;t yet, we look forward to meeting you.</p>
              <div className="sig">— Yours, The Plumbing Stars Family<small>Owners · Founders</small></div>
            </div>
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="section navy">
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">Section III · The Method</div>
            <h2>Four <em>steps</em>. No surprises.</h2>
            <p>The way the work actually goes when you call us — top to bottom, in writing.</p>
          </div>
          <div className="method">
            {METHOD.map((m, i) => (
              <div className={`method-row reveal d${(i % 3) + 1}`} key={m.title}>
                <div className="num">{m.num}</div>
                <div><h4>{m.title}</h4><p>{m.body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service area map */}
      <section className="section cream" id="area" data-spy>
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">The Territory</div>
            <h2>All of <em>Ventura County</em>.</h2>
            <p>From the coast to the valleys — Ventura, Oxnard, Thousand Oaks, Camarillo, Simi Valley and everywhere between.</p>
          </div>
          <div className="reveal d1">
            <ServiceAreaMap />
          </div>
        </div>
      </section>

      {/* Reviews — links to real Yelp reviews, no fabricated ratings or quotes */}
      <section className="section" id="reviews" data-spy>
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">Section IV · Field Notes</div>
            <h2>What the <em>neighbors</em> are saying.</h2>
          </div>
          <div className="reviews-cta reveal d1">
            <p>We&rsquo;d rather you hear it from the neighbors than from us. Read our verified reviews on Yelp — every one written by a real Ventura County customer.</p>
            <a href={SITE.yelpReviewsUrl} className="btn btn-red" target="_blank" rel="noopener noreferrer">
              <span>Read Reviews on Yelp →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Appointment */}
      <section className="section cream" id="book" data-spy>
        <div className="container">
          <div className="appt">
            <div className="appt-side reveal">
              <div className="eyebrow">Section V · Schedule</div>
              <h2>Book the <em>visit</em>.</h2>
              <p>Fill the card. A real human follows up in under five minutes during business hours — and crews are dispatched twenty-four hours a day.</p>
              <ul>
                <li>{check}<div><strong>Two-hour arrival windows</strong><span>No more &ldquo;between eight and five.&rdquo; We text the morning of, and again when the crew is thirty minutes out.</span></div></li>
                <li>{check}<div><strong>Flat price, in writing</strong><span>You see one number — and what it includes — before a single tool is unpacked.</span></div></li>
                <li>{check}<div><strong>Photographed &amp; warrantied</strong><span>Before/after photos and the warranty paperwork in your inbox before we leave the curb.</span></div></li>
              </ul>
            </div>
            <div className="appt-card reveal d1">
              <h3>Request a Visit</h3>
              <div className="sub">No spam, no robocalls, no upsells.</div>
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact" data-spy>
        <div className="container">
          <div className="footer-top">
            <div>
              <div className="brand-head">
                <Image src="/logo.svg" alt="The Plumbing Stars" width={88} height={88} />
                <div className="brand-name">Plumbing<br />Stars<small>Sewer · Drain · Rooter</small></div>
              </div>
              <p className="lead">A different kind of plumber — considered, careful, and a little quieter than the competition. Family-owned since 1998, serving all of Ventura County.</p>
            </div>
            <div>
              <h4>The <em>Work</em></h4>
              {SERVICES.map((s) => <a href="#services" key={s.title}>{s.title}</a>)}
            </div>
            <div>
              <h4>The <em>House</em></h4>
              <a href="#about">About</a>
              <a href="#reviews">Reviews</a>
              <a href="#book">Service Area</a>
              <a href="#book">Schedule</a>
            </div>
            <div>
              <h4>Get in <em>touch</em></h4>
              <div className="lbl">By telephone</div>
              <div className="v"><a href={SITE.phone.href}>{SITE.phone.display}</a></div>
              <div className="lbl">By email</div>
              <a href={SITE.email.href}>{SITE.email.display}</a>
              <div className="lbl">Service area</div>
              <div className="v post">Ventura · Oxnard · Thousand Oaks<br />Camarillo · Simi Valley</div>
              <div style={{ marginTop: 18 }}><a className="btn btn-red" href="#book"><span>Schedule a Visit</span></a></div>
            </div>
          </div>
          <div className="colophon">
            <div>© 2026 The Plumbing Stars · Lic. #{SITE.license} · Serving Ventura County</div>
            <div>
              <a href="#top">Top</a>
              <a href="#services">Services</a>
              <a href="#book">Schedule</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile callbar */}
      <div className="callbar">
        <a className="call" href={SITE.phone.href}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.1.78.27 1.55.5 2.3a2 2 0 0 1-.45 2.11L7.91 9.39a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.75.23 1.52.4 2.3.5A2 2 0 0 1 22 16.92z" /></svg> Call
        </a>
        <a className="book" href="#book">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg> Schedule
        </a>
      </div>
    </>
  )
}
