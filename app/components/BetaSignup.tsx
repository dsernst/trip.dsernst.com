'use client'

import { useState } from 'react'
import PhoneInput from 'react-phone-number-input/input'
import { isValidPhoneNumber, type Value } from 'react-phone-number-input'
import { submitBetaSignup } from '@/app/actions/beta-signup'
import { honeypotFromFormData } from '@/app/lib/honeypot'
import { HoneypotInput } from './HoneypotInput'

export function BetaSignup() {
  const [step, setStep] = useState<'phone' | 'name' | 'done'>('phone')
  const [phone, setPhone] = useState<Value>()
  const [name, setName] = useState('')
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

  return (
    <section className="beta-section">
      <div className="beta-inner">
        <span className="label">The beta</span>
        {step === 'phone' ? (
          <>
            <h2 className="beta-title">Join the beta.</h2>
            <p className="beta-lead">We&apos;ll text you when it&apos;s ready.</p>
          </>
        ) : (
          <>
            <h2 className="beta-title">Almost there.</h2>
            <p className="beta-lead">What should we call you?</p>
          </>
        )}
        <form
          className="beta-form"
          onSubmit={async (e) => {
            e.preventDefault()
            setError('')
            // When submitting phone num...
            if (step === 'phone') {
              if (!phone || !isValidPhoneNumber(phone))
                return setError('Please enter a valid phone number.')

              return setStep('name')
            }

            // Or when submitting name...
            if (!phone) return setStep('phone')

            setPending(true)
            const result = await submitBetaSignup(
              phone,
              name,
              honeypotFromFormData(new FormData(e.currentTarget)),
            ).finally(() => setPending(false))
            if (!result.ok) return setError(result.error)

            setStep('done')
          }}
        >
          <HoneypotInput />
          {step === 'phone' ? (
            <>
              <PhoneInput
                defaultCountry="US"
                className="beta-input"
                placeholder="Phone number"
                value={phone}
                onChange={setPhone}
                autoComplete="tel"
              />
              <button type="submit" className="beta-button" disabled={!phone}>
                Continue
              </button>
              {error && <p className="beta-error">{error}</p>}
              <p className="beta-consent">
                By continuing, you agree we may text you about the beta.
              </p>
            </>
          ) : (
            <>
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
                  setPhone(undefined)
                  setError('')
                }}
              >
                ← Change phone number
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
