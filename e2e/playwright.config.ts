import path from 'path'
import { defineConfig, devices } from '@playwright/test'

const root = path.join(__dirname, '..')

export default defineConfig({
  testDir: '.',
  outputDir: 'cache/test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never', outputFolder: 'cache/report' }], ['list']],
  use: {
    baseURL: 'http://127.0.0.1:3456',
  },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 900 },
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 390, height: 844 },
      },
    },
  ],
  webServer: {
    command: 'npm run build && npm run start -- -p 3456',
    url: 'http://127.0.0.1:3456',
    cwd: root,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  snapshotDir: 'snapshots',
  snapshotPathTemplate: '{snapshotDir}/{platform}/{projectName}/{arg}{ext}',
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.002,
    },
  },
})
