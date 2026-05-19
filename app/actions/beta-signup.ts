'use server'

import { isHoneypotFilled } from '../lib/honeypot'
import { normalizePhone } from '../lib/phone-normalize'
import { pushover } from '../lib/pushover'

export type BetaSignupResult = { ok: true } | { ok: false; error: string }

export async function submitBetaSignup(
  phone: string,
  name: string,
  honeypot: string,
): Promise<BetaSignupResult> {
  if (isHoneypotFilled(honeypot)) return { ok: true }

  const phoneE164 = normalizePhone(phone)
  if (!phoneE164) return { ok: false, error: 'Please enter a valid phone number.' }

  const trimmedName = name.trim()
  if (!trimmedName) return { ok: false, error: 'Please enter your name.' }

  const saved = await pushover('trip.dsernst.com signup', `${trimmedName}\n${phoneE164}`)
  if (!saved) return { ok: false, error: 'Error saving' }

  return { ok: true }
}
