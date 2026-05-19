import { AsYouType, parsePhoneNumber } from 'libphonenumber-js/min'

const DEFAULT_COUNTRY = 'US'

function formatDigits(digits: string): string {
  if (!digits) return ''
  return new AsYouType(DEFAULT_COUNTRY).input(digits) || digits
}

/** Format while typing; handles backspace through punctuation (see react-phone-number-input InputBasic). */
export function formatPhoneOnEdit(previousDisplay: string, rawInput: string): string {
  const prevDigits = previousDisplay.replace(/\D/g, '')
  let digits = rawInput.replace(/\D/g, '')
  if (digits === prevDigits && rawInput.length < previousDisplay.length)
    digits = prevDigits.slice(0, -1)
  return formatDigits(digits)
}

export function formatE164ForDisplay(e164: string): string {
  if (!e164) return ''
  try {
    const parsed = parsePhoneNumber(e164)
    return parsed?.formatNational() ?? e164
  } catch {
    return e164
  }
}

export function parsePhoneToE164(raw: string): string | undefined {
  if (!raw.replace(/\D/g, '')) return undefined
  try {
    const parsed = parsePhoneNumber(raw, DEFAULT_COUNTRY)
    if (!parsed?.isValid()) return undefined
    return parsed.number
  } catch {
    return undefined
  }
}
