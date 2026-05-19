'use client'

import { useState } from 'react'
import { submitBetaSignup } from '@/app/actions/beta-signup'
import { HoneypotInput } from './HoneypotInput'
import { HONEYPOT_FIELD_NAME } from '../lib/honeypot'
import { looksLikePhone } from '../lib/phone'

export function BetaSignup() {
  const [step, setStep] = useState<'phone' | 'name' | 'done'>('phone')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  if (step === 'done') {
    return (
      <section className="beta-section">
        <div className="beta-inner">
          <span className="label">The beta</span>
          <p className="beta-success">You&apos;re on the list — we&apos;ll be in touch.</p>
        </div>
      </section>
    )
  }

  if (step === 'name') {
    return (
      <section className="beta-section">
        <div className="beta-inner">
          <span className="label">The beta</span>
          <h2 className="beta-title">Almost there.</h2>
          <p className="beta-lead">What should we call you?</p>
          <form
            className="beta-form"
            onSubmit={async (e) => {
              e.preventDefault()
              setError('')
              setPending(true)
              const result = await submitBetaSignup(phone, name, honeypot)
              setPending(false)
              if (!result.ok) {
                setError(result.error)
                return
              }
              setStep('done')
            }}
          >
            <input
              type="text"
              name="name"
              className="beta-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              autoFocus
              required
            />
            <button type="submit" className="beta-button" disabled={pending || !name.trim()}>
              {pending ? 'Saving…' : 'Join the beta'}
            </button>
            {error && <p className="beta-error">{error}</p>}
            <button
              type="button"
              className="beta-back"
              onClick={() => {
                setStep('phone')
                setError('')
              }}
            >
              ← Change phone number
            </button>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="beta-section">
      <div className="beta-inner">
        <span className="label">The beta</span>
        <h2 className="beta-title">Join the beta.</h2>
        <p className="beta-lead">We&apos;ll text you when it&apos;s ready.</p>
        <form
          className="beta-form"
          onSubmit={(e) => {
            e.preventDefault()
            setError('')
            const fd = new FormData(e.currentTarget)
            setHoneypot(String(fd.get(HONEYPOT_FIELD_NAME) ?? ''))
            if (!looksLikePhone(phone)) {
              setError('Please enter a valid phone number.')
              return
            }
            setStep('name')
          }}
        >
          <HoneypotInput />
          <input
            type="tel"
            name="phone"
            className="beta-input"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            required
          />
          <button type="submit" className="beta-button" disabled={!phone.trim()}>
            Continue
          </button>
          {error && <p className="beta-error">{error}</p>}
          <p className="beta-consent">By continuing, you agree we may text you about the beta.</p>
        </form>
      </div>
    </section>
  )
}
