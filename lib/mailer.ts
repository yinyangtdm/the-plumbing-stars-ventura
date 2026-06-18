/**
 * Lead Email Delivery (Ventura)
 *
 * MIRROR of the Los Angeles site's lib/mailer.ts. Works with no database — the
 * booking form calls this directly. Sending is enabled the moment GMAIL_USER +
 * GMAIL_APP_PASSWORD are set in the environment; leads are delivered to
 * BOOKING_TO (falling back to the SITE email). Until then, isEmailConfigured()
 * is false and callers can react.
 *
 * Same business as LA — leads from this site are tagged "Ventura" by the
 * caller (see app/api/book/route.ts) so the operator knows the source.
 */

import nodemailer from 'nodemailer'
import { SITE } from './site'

/** True once Gmail sending credentials are present in the environment. */
export function isEmailConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)
}

/** Where lead notifications are delivered. */
export function leadRecipient(): string {
  return process.env.BOOKING_TO || SITE.email.display
}

/**
 * Send a lead notification email. Returns true if sent, false if email is not
 * configured (callers decide how to handle that). Throws only on an actual
 * send failure.
 */
export async function sendLeadEmail(subject: string, html: string): Promise<boolean> {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) return false

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  await transporter.sendMail({
    from: `"${SITE.name} — Ventura" <${user}>`,
    to: leadRecipient(),
    subject,
    html,
  })
  return true
}
