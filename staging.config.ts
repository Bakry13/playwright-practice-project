import { defineConfig, devices } from '@playwright/test';
import baseEnvUrl from './tests/utils/urls';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });
/**
 * See https://playwright.dev/docs/test-configuration.
 */

const RPconfig = {
  endpoint: "https://demo.reportportal.io/api/v1",
  apiKey: process.env.RP_API_KEY!,
  project: "bakry13_personal",
  launch: "test launch",
  description: "My awesome launch",
  attributes: [
    {
      key: "attributeKey",
      value: "attrbiuteValue",
    },
    {
      value: "anotherAttrbiuteValue",
    },
  ],
  mode: 'DEFAULT',
};

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  // retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 1,
  // workers: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

  reporter: [
    ['html', { open: 'never' }],
    ["allure-playwright"],
    // ['@reportportal/agent-js-playwright', RPconfig],
  ],
  // snapshotDir: './tests/utils/visual-snapshots',
  snapshotPathTemplate: './visual-snapshots/{testName}-{arg}-{projectName}-{platform}{ext}',
  expect: {
    timeout: 6000, //timeout for validation
    toMatchSnapshot: {
      maxDiffPixels: 0,
    },
    toHaveScreenshot: {
      stylePath: './tests/utils/screenshot.css',
    }
  },
  timeout: 2*60*1000, //General timeout for the test run is 1min
  globalTimeout: 3*60*60*1000, //General timeout for the total run is 3hr
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // globalSetup: require.resolve('./tests/utils/setup/globalSetup.ts'),
  // globalTeardown: require.resolve('./tests/utils/setup/globalTeardown.ts'),
  
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace:'retain-on-failure',
    screenshot: 'on',
    headless: true,
    // actionTimeout:6000, 
    // navigationTimeout:30000,
    baseURL: 'https://practice.expandtesting.com/staging',
    // storageState: 'storageState.json', 
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 920 },
        trace:'retain-on-failure',
       }
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
