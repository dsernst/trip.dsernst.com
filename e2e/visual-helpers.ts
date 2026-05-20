import type { Page } from '@playwright/test'

export async function prepareVisualPage(page: Page) {
  await page.clock.install({ time: new Date('2026-05-19T12:00:00Z') })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.addStyleTag({
    content: `*, *::before, *::after { animation: none !important; transition: none !important; }`,
  })
}
