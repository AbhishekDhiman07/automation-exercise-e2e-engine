import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests/playwright',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  // Dynamic cloud environment execution router
  headless: process.env.CI ? true : false,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],

  use: {
    baseUrl: process.env.BASE_URL || 'https://automationexercise.com',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'retain-on-failure',
  },

  /* Configure target execution browser matrices */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // 💡 THE FIX: Explicitly enforce standard crisp HD viewport dimensions 
        // to comply with internal device emulation rules on Linux systems
        viewport: { width: 1280, height: 720 }
      },
    }
  ],

  outputDir: 'test-results/',
});