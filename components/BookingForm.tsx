'use client'

import { useState } from 'react'
import { SITE } from '@/lib/site'

const SERVICES = [
  'Clogged drain',
  'Sewer line',
  'Hydro jetting',
  'Camera inspection',
  'Water heater',
  'Trenchless replacement',
  'Something else',
]

export default function BookingForm() {
  const [form, setForm] = useState({ name: '', phone: '', address: '', service: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [errMsg, setErrMsg] = useState('')

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('ok')
      } else {
        setErrMsg(data.error || 'Something went wrong.')
        setStatus('err')
      }
    } catch {
      setErrMsg('Network error — please call us directly.')
      setStatus('err')
    }
  }

  if (status === 'ok') {
    return (
      <div className="form-success">
        <div className="star">★</div>
        <h3>Request received</h3>
        <p>A real human follows up within the hour during business hours. For an emergency, call us now.</p>
        <a href={SITE.phone.href} className="btn btn-red">Call {SITE.phone.display}</a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="bf-name">Name</label>
      <input
        id="bf-name"
        type="text"
        placeholder="Jordan Smith"
        value={form.name}
        onChange={(e) => set('name', e.target.value)}
        required
      />

      <label htmlFor="bf-phone">Mobile</label>
      <input
        id="bf-phone"
        type="tel"
        placeholder="(805) 123-4567"
        value={form.phone}
        onChange={(e) => set('phone', e.target.value)}
        required
      />

      <label htmlFor="bf-address">Address or ZIP</label>
      <input
        id="bf-address"
        type="text"
        placeholder="123 Main St, Ventura"
        value={form.address}
        onChange={(e) => set('address', e.target.value)}
        required
      />

      <label htmlFor="bf-service">Concerning</label>
      <select
        id="bf-service"
        value={form.service}
        onChange={(e) => set('service', e.target.value)}
        required
      >
        <option value="">Choose a service</option>
        {SERVICES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      {status === 'err' && <div className="form-msg error">{errMsg}</div>}

      <button className="btn btn-red" type="submit" disabled={status === 'sending'}>
        <span>{status === 'sending' ? 'Sending…' : 'Request Appointment'}</span>
      </button>
    </form>
  )
}
