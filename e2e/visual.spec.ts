import { expect, test } from '@playwright/test'
import { prepareVisualPage } from './visual-helpers'

const sections: { name: string; selector: string; mask?: string }[] = [
  { name: 'hero', selector: 'section.hero' },
  { name: 'how', selector: 'section.how-section' },
  { name: 'budget', selector: 'section.budget-section' },
  { name: 'opt', selector: 'section.opt-section', mask: '.trip-date' },
  { name: 'reviews', selector: 'section.reviews-section' },
  { name: 'footer', selector: 'footer' },
]

test.describe('landing page sections', () => {
  for (const { name, selector, mask } of sections) {
    test(name, async ({ page }) => {
      await prepareVisualPage(page)
      const section = page.locator(selector)
      await section.scrollIntoViewIfNeeded()
      await expect(section).toHaveScreenshot(`${name}.png`, {
        mask: mask ? [page.locator(`${selector} ${mask}`)] : undefined,
      })
    })
  }
})

test.describe('beta signup', () => {
  test('phone step', async ({ page }) => {
    await prepareVisualPage(page)
    const section = page.locator('section.beta-section')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toHaveScreenshot('beta-phone.png')
  })

  test('name step', async ({ page }) => {
    await prepareVisualPage(page)
    const tel = page.locator('#beta-tel')
    await tel.click()
    await tel.pressSequentially('2025551234', { delay: 30 })
    await expect(page.locator('#beta-name')).toBeVisible()
    const section = page.locator('section.beta-section')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toHaveScreenshot('beta-name.png')
  })
})
