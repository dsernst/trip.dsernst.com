import { headers } from 'next/headers'

const GEO_HEADER_KEYS = [
  'x-vercel-ip-city',
  'x-vercel-ip-country-region',
  'x-vercel-ip-country',
] as const

/** City, region, country + IP — matches Vercel geo headers (empty locally). */
export async function formatApproxLocationForAdmin(): Promise<string> {
  const h = await headers()

  const hasGeo = GEO_HEADER_KEYS.every((key) => h.get(key))
  const location = hasGeo
    ? GEO_HEADER_KEYS.map((key) => h.get(key)!.replaceAll('%20', ' ')).join(', ')
    : ''

  const ip =
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    h.get('x-real-ip') ??
    'LOCALHOST'

  if (!location) return `(${ip})`
  return `${location} (${ip})`
}
