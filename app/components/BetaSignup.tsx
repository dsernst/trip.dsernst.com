'use client'

import { useState } from 'react'
import { submitBetaSignup } from '@/app/actions/beta-signup'
import { honeypotFromFormData } from '@/app/lib/honeypot'
import { formatE164ForDisplay, formatPhoneOnEdit, parsePhoneToE164 } from '@/app/lib/phone'
import { HoneypotInput } from './HoneypotInput'

const sectionClass = 'bg-forest px-6 py-[100px]'
const innerClass = 'mx-auto max-w-[420px] text-center'
const labelClass =
  'mb-3.5 block text-[11px]/[14px] font-medium tracking-[0.18em] text-sage uppercase'
const titleClass = 'mb-3 font-serif text-[clamp(28px,4vw,44px)] leading-[1.1] font-bold text-cream'
const leadClass = 'mb-7 text-[16px] leading-[1.65] text-[rgba(242,232,213,0.65)]'
const inputClass =
  'w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] px-[18px] py-3.5 font-sans text-[16px] leading-[normal] text-cream outline-none placeholder:text-[rgba(242,232,213,0.35)] focus:border-amber focus:bg-[rgba(255,255,255,0.1)]'
const buttonClass =
  'cursor-pointer rounded-full border-0 bg-amber px-6 py-3.5 font-sans text-[15px] leading-[normal] font-medium text-ink hover:enabled:brightness-105 disabled:cursor-not-allowed disabled:opacity-50'
const formClass = 'flex flex-col items-stretch gap-3'

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
      <section data-section="beta" className={sectionClass}>
        <div className={innerClass}>
          <span className={labelClass}>The beta</span>
          <p className="mt-2 font-serif text-[22px] leading-[normal] font-bold text-cream">
            You&apos;re on the list — we&apos;ll be in touch.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section data-section="beta" className={sectionClass}>
      <div className={innerClass}>
        <span className={labelClass}>The beta</span>
        {step === 'phone' ? (
          <>
            <h2 className={titleClass}>Join the beta.</h2>
            <p className={leadClass}>We&apos;ll text you when it&apos;s ready.</p>
            <form
              className={formClass}
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
                className={inputClass}
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
                className={buttonClass}
                disabled={!parsePhoneToE164(phoneDisplay)}
              >
                Continue
              </button>
              {error && <p className="m-0 text-sm text-[#e8a090]">{error}</p>}
              <p className="mt-1 text-xs leading-normal text-[rgba(242,232,213,0.35)]">
                By continuing, you agree we may text you about the beta.
              </p>
            </form>
          </>
        ) : (
          <>
            <h2 className={titleClass}>Almost there.</h2>
            <p className={leadClass}>What should we call you?</p>
            <p className="-mt-4 mb-6 text-[15px] leading-[normal] text-[rgba(242,232,213,0.45)]">
              {formatE164ForDisplay(phoneE164)}
            </p>
            <form
              className={formClass}
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
                className={inputClass}
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                autoFocus
                required
              />
              <button type="submit" className={buttonClass} disabled={pending || !name.trim()}>
                {pending ? 'Saving…' : 'Join the beta'}
              </button>
              {error && <p className="m-0 text-sm text-[#e8a090]">{error}</p>}
              <button
                type="button"
                className="mt-2 cursor-pointer border-0 bg-transparent p-1 font-sans text-[13px] leading-[normal] text-[rgba(242,232,213,0.45)] hover:text-[rgba(242,232,213,0.7)]"
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
