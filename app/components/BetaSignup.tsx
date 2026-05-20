'use client'

import { useState } from 'react'
import { submitBetaSignup } from '@/app/actions/beta-signup'
import { honeypotFromFormData } from '@/app/lib/honeypot'
import { formatE164ForDisplay, formatPhoneOnEdit, parsePhoneToE164 } from '@/app/lib/phone'
import { HoneypotInput } from './HoneypotInput'

export function BetaSignup() {
  const [step, setStep] = useState<'phone' | 'name' | 'done'>('phone')
  const [phoneDisplay, setPhoneDisplay] = useState('')
  const [phoneE164, setPhoneE164] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const advanceToName = (display: string) => {
    const e164 = parsePhoneToE164(display)
    if (!e164) return false
    setPhoneE164(e164)
    setStep('name')
    setError('')
    return true
  }

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

  return (
    <section className="beta-section">
      <div className="beta-inner">
        <span className="label">The beta</span>
        {step === 'phone' ? (
          <>
            <h2 className="beta-title">Join the beta.</h2>
            <p className="beta-lead">We&apos;ll text you when it&apos;s ready.</p>
            <form
              className="beta-form"
              onSubmit={(e) => {
                e.preventDefault()
                setError('')
                if (advanceToName(phoneDisplay)) return
                setError('Please enter a valid phone number.')
              }}
            >
              <HoneypotInput />
              <input
                type="tel"
                name="tel"
                id="beta-tel"
                className="beta-input"
                placeholder="Phone number"
                value={phoneDisplay}
                onChange={(e) => {
                  const next = formatPhoneOnEdit(phoneDisplay, e.target.value)
                  setPhoneDisplay((prev) => (next === prev ? prev : next))
                  advanceToName(next)
                }}
                autoComplete="tel-national"
                inputMode="tel"
              />
              <button
                type="submit"
                className="beta-button"
                disabled={!parsePhoneToE164(phoneDisplay)}
              >
                Continue
              </button>
              {error && <p className="beta-error">{error}</p>}
              <p className="beta-consent">
                By continuing, you agree we may text you about the beta.
              </p>
            </form>
          </>
        ) : (
          <>
            <h2 className="beta-title">Almost there.</h2>
            <p className="beta-lead">What should we call you?</p>
            <p className="beta-phone">{formatE164ForDisplay(phoneE164)}</p>
            <form
              className="beta-form"
              onSubmit={async (e) => {
                e.preventDefault()
                setError('')
                if (!phoneE164) return setStep('phone')

                setPending(true)
                const result = await submitBetaSignup(
                  phoneE164,
                  name,
                  honeypotFromFormData(new FormData(e.currentTarget)),
                ).finally(() => setPending(false))
                if (!result.ok) return setError(result.error)

                setStep('done')
              }}
            >
              <HoneypotInput />
              <input
                type="text"
                name="name"
                id="beta-name"
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
                  setPhoneDisplay(formatE164ForDisplay(phoneE164))
                  setError('')
                }}
              >
                ← Change phone number
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  )
}
