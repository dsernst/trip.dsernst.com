'use server'

import { isValidPhoneNumber } from 'libphonenumber-js/min'
import { formatApproxLocationForAdmin } from '../lib/approx-location'
import { isHoneypotFilled } from '../lib/honeypot'
import { pushover } from '../lib/pushover'

export type BetaSignupResult = { ok: true } | { ok: false; error: string }

export async function submitBetaSignup(
  phoneE164: string,
  name: string,
  honeypot: string,
): Promise<BetaSignupResult> {
  if (isHoneypotFilled(honeypot)) return { ok: true }

  if (!isValidPhoneNumber(phoneE164)) return { ok: false, error: 'Please enter a valid phone number.' }

  const trimmedName = name.trim()
  if (!trimmedName) return { ok: false, error: 'Please enter your name.' }

  const location = await formatApproxLocationForAdmin()

  const saved = await pushover(
    'trip.dsernst.com signup',
    `${trimmedName}
${phoneE164}

${location}`,
  )
  if (!saved) return { ok: false, error: 'Error saving' }

  return { ok: true }
}
