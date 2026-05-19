/** Lightweight check for the phone step (client-safe). */
export function looksLikePhone(input: string): boolean {
  const digits = input.replace(/\D/g, '')
  if (digits.length === 10) return true
  if (digits.length === 11 && digits.startsWith('1')) return true
  if (digits.length >= 10 && digits.length <= 15) return true
  return false
}
