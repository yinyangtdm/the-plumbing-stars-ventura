/**
 * Site Configuration — Single Source of Truth (Ventura)
 *
 * MIRROR of the Los Angeles site's lib/site.ts. Same business — one operator
 * covering two counties with two sites. Keep phone / email / license / ratings
 * in sync across both repos when the business details change.
 *
 * As with LA: never hardcode a phone number, email, or license number in a
 * component — import it from here so there is exactly one place to update.
 */

const PHONE_DIGITS = '7474631853'

export const SITE = {
  /** Company name as displayed throughout the site */
  name: 'The Plumbing Stars',

  /** Primary contact phone, in display and tel:-href formats */
  phone: {
    display: '(747) 463-1853',
    href: `tel:+1${PHONE_DIGITS}`,
  },

  /** Contact email, in display and mailto:-href formats */
  email: {
    display: 'info@theplumbingstars.com',
    href: 'mailto:info@theplumbingstars.com',
  },

  /** California contractor license number */
  license: '998456',

  /** Operating hours summary */
  hours: '24 / 7 · 365 Days a Year',

  /** Social proof metrics (kept in one place for consistency) */
  yearsInBusiness: '25+',

  /**
   * Link to the business's real Yelp reviews. The reviews section sends
   * visitors here instead of showing fabricated ratings, counts, or quotes
   * (doing so risks a Google/Yelp ban).
   */
  yelpReviewsUrl: 'https://www.yelp.com/biz/the-plumbing-stars-west-hills',
} as const
