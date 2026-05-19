/** Hidden field name — bots often fill inputs named like a URL field. */
export const HONEYPOT_FIELD_NAME = 'company_website'

export function isHoneypotFilled(value: string | undefined | null): boolean {
  return Boolean(value?.trim())
}

export function honeypotFromFormData(fd: FormData): string {
  return String(fd.get(HONEYPOT_FIELD_NAME) ?? '')
}
