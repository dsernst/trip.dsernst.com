import { HONEYPOT_FIELD_NAME } from '../lib/honeypot'

/** Visually hidden; leave empty. Import once per form. */
export function HoneypotInput() {
  return (
    <input
      type="text"
      name={HONEYPOT_FIELD_NAME}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="pointer-events-none absolute left-[-9999px] h-px w-px opacity-0"
    />
  )
}
