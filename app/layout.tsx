import type { Metadata } from 'next'
import { DM_Serif_Display, Manrope } from 'next/font/google'
import localFont from 'next/font/local'
import { SITE } from '@/lib/site'
import './globals.css'

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

/**
 * OPTISport-Script — self-hosted brand script, echoing the logo's lettering.
 * Used only on signature accent words (see the `.script` class), never for body
 * or full headings, to keep it legible and tasteful.
 */
const script = localFont({
  src: './fonts/OPTISport-Script.otf',
  variable: '--font-script',
  display: 'swap',
})

/** Canonical base URL for the Ventura domain (set in env for production). */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://theplumbingstarsventura.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'The Plumbing Stars — Sewer & Drain Specialists | Ventura County',
  description:
    'Licensed sewer and drain specialists serving Ventura County — Ventura, ' +
    'Oxnard, Thousand Oaks, Camarillo, and Simi Valley. 24/7 service, flat ' +
    'pricing in writing, and a written guarantee on every job.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'The Plumbing Stars — Ventura County',
    description:
      'A different kind of plumber. Considered, careful sewer & drain work ' +
      'across Ventura County. Flat pricing in writing, 24/7.',
    url: SITE_URL,
    siteName: 'The Plumbing Stars — Ventura',
    locale: 'en_US',
    type: 'website',
  },
}

/** LocalBusiness structured data — the high-value local-SEO signal. */
function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: `${SITE.name} — Ventura County`,
    telephone: SITE.phone.display,
    email: SITE.email.display,
    url: SITE_URL,
    image: `${SITE_URL}/logo.svg`,
    priceRange: '$$',
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Ventura County' },
      { '@type': 'City', name: 'Ventura' },
      { '@type': 'City', name: 'Oxnard' },
      { '@type': 'City', name: 'Thousand Oaks' },
      { '@type': 'City', name: 'Camarillo' },
      { '@type': 'City', name: 'Simi Valley' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      </head>
      <body className={`${dmSerif.variable} ${manrope.variable} ${script.variable}`}>
        {children}
      </body>
    </html>
  )
}
