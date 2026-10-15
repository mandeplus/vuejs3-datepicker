import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    browserName: 'chromium',
    // Set PLAYWRIGHT_CHANNEL=chrome to use an installed Google Chrome instead of the bundled Chromium
    channel: process.env.PLAYWRIGHT_CHANNEL,
  },
  webServer: {
    command: 'npx vite preview',
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
});
