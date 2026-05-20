import { expect, test } from '@playwright/test'
import { prepareVisualPage } from './visual-helpers'

/** Page order — ids become snapshot filenames (e.g. `1-hero`). */
const sections: { id: string; selector: string; mask?: string }[] = [
  { id: '1-hero', selector: '[data-section="hero"]' },
  { id: '2-how', selector: '[data-section="how"]' },
  { id: '3-budget', selector: '[data-section="budget"]' },
  { id: '4-opt', selector: 'section.opt-section', mask: '.trip-date' },
  { id: '5-reviews', selector: 'section.reviews-section' },
]

test.describe('landing page sections', () => {
  for (const { id, selector, mask } of sections) {
    test(id, async ({ page }) => {
      await prepareVisualPage(page)
      const section = page.locator(selector)
      await section.scrollIntoViewIfNeeded()
      await expect(section).toHaveScreenshot(`${id}.png`, {
        mask: mask ? [page.locator(`${selector} ${mask}`)] : undefined,
      })
    })
  }
})

test.describe('beta signup', () => {
  test('6-beta-phone', async ({ page }) => {
    await prepareVisualPage(page)
    const section = page.locator('section.beta-section')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toHaveScreenshot('6-beta-phone.png')
  })

  test('7-beta-name', async ({ page }) => {
    await prepareVisualPage(page)
    const tel = page.locator('#beta-tel')
    await tel.click()
    await tel.pressSequentially('2025551234', { delay: 30 })
    await expect(page.locator('#beta-name')).toBeVisible()
    const section = page.locator('section.beta-section')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toHaveScreenshot('7-beta-name.png')
  })
})

test('8-footer', async ({ page }) => {
  await prepareVisualPage(page)
  const section = page.locator('footer')
  await section.scrollIntoViewIfNeeded()
  await expect(section).toHaveScreenshot('8-footer.png')
})
