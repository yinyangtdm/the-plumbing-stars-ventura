import { NextResponse } from 'next/server'
import { sendLeadEmail, isEmailConfigured } from '@/lib/mailer'

/**
 * Ventura booking handler. Mirrors the LA book route, but email-only (no
 * database) and tagged "Ventura" so the operator knows which site a lead came
 * from. Same graceful degradation: if email isn't configured, the lead is
 * logged rather than lost, and the visitor never sees a hard failure.
 */
export async function POST(request: Request) {
  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 })
  }

  const { name, phone, address, service, message } = body

  if (!name?.trim() || !phone?.trim() || !address?.trim() || !service?.trim()) {
    return NextResponse.json(
      { success: false, error: 'Please fill in all required fields.' },
      { status: 400 },
    )
  }

  const subject = `New Booking Request (Ventura) — ${name} (${service})`
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0B2A55;padding:24px 30px;border-radius:6px 6px 0 0">
        <h2 style="color:#fff;margin:0;font-size:22px">New Booking Request</h2>
        <p style="color:#92B7E2;margin:6px 0 0;font-size:14px">The Plumbing Stars — Ventura County</p>
      </div>
      <div style="background:#fff;padding:30px;border:1px solid #dde4f0;border-top:none;border-radius:0 0 6px 6px">
        <table style="width:100%;border-collapse:collapse">
          ${[
            ['Name', name],
            ['Phone', phone],
            ['Address', address],
            ['Service', service],
          ].map(([label, value]) => `
            <tr>
              <td style="padding:10px 0;font-size:13px;font-weight:bold;color:#7e94b6;text-transform:uppercase;letter-spacing:.06em;width:120px;border-bottom:1px solid #eef0f6">${label}</td>
              <td style="padding:10px 0;font-size:15px;color:#0a1530;border-bottom:1px solid #eef0f6">${value}</td>
            </tr>
          `).join('')}
        </table>
        ${message ? `<div style="margin-top:20px;padding:16px;background:#f5f7fb;border-radius:4px;border-left:4px solid #0B2A55"><p style="margin:0;font-size:14px;color:#3e4a66"><strong>Message:</strong><br/>${message}</p></div>` : ''}
        <div style="margin-top:24px;padding:16px;background:#B81F2A;border-radius:4px;text-align:center">
          <p style="margin:0;color:#fff;font-size:15px;font-weight:bold">Reply to this Ventura customer promptly to confirm their appointment.</p>
        </div>
      </div>
    </div>
  `

  if (!isEmailConfigured()) {
    // Email not set up yet (e.g. before launch). Don't lose the lead silently.
    console.warn('[book:ventura] Email not configured — lead not delivered:', {
      name, phone, address, service, message,
    })
    return NextResponse.json({ success: true })
  }

  try {
    await sendLeadEmail(subject, html)
  } catch (err) {
    console.error('[book:ventura] Email error:', err)
    return NextResponse.json(
      { success: false, error: 'Could not send your request. Please call us directly.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ success: true })
}
