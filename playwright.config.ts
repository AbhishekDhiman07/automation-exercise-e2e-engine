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

  // Dynamic cloud vs local toggle
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
    launchOptions: {
      args: ['--start-maximized']
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: null 
      },
    }
  ],

  outputDir: 'test-results/',
});