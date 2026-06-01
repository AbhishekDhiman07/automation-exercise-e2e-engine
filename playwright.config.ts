import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests/playwright',
  fullyParallel: false, 
  retries: 0,
  reporter: [['html', { open: 'never' }]],
  timeout: 120000,      
  globalTimeout: 300000, 
  use: {
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',
    
    // ?? UPGRADED SCREENSHOT RULES
    screenshot: {
      mode: 'on',
      fullPage: true,           // Forces Playwright to take a top-to-bottom long screenshot
    },
    video: 'off',              
    trace: 'retain-on-failure',   
    
    // ??? FORCE FULL HD DESKTOP VIEWPORT
    viewport: { width: 1920, height: 1080 },
    
    headless: false,    
    launchOptions: {
      slowMo: 0,
      args: ['--start-maximized'] // Opens Chrome completely maximized on your monitor
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        // Bypasses the default small squished emulator settings
        viewport: { width: 1920, height: 1080 } 
      },
    },
  ],
});
