const { PUSHOVER_APP_TOKEN, PUSHOVER_USER_KEY } = process.env

/** Notify admin via Pushover. Returns false if the request failed. */
export async function pushover(title: string, message: string): Promise<boolean> {
  if (!PUSHOVER_APP_TOKEN || !PUSHOVER_USER_KEY) return false

  const res = await fetch('https://api.pushover.net/1/messages.json', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      message,
      token: PUSHOVER_APP_TOKEN,
      user: PUSHOVER_USER_KEY,
    }),
    cache: 'no-store',
  })

  return res.ok
}
