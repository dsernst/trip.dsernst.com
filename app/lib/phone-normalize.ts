import { parsePhoneNumberWithError } from 'libphonenumber-js'

/** Normalize to E.164. US-first default; accepts other valid international numbers. */
export function normalizePhone(input: string): string | null {
  const trimmed = input.trim()
  if (!trimmed) return null

  try {
    const us = parsePhoneNumberWithError(trimmed, 'US')
    if (us.isValid()) return us.format('E.164')
  } catch {
    /* try international */
  }

  try {
    const intl = parsePhoneNumberWithError(trimmed)
    if (intl.isValid()) return intl.format('E.164')
  } catch {
    /* invalid */
  }

  return null
}
