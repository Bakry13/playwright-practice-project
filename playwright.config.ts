import { defineConfig, devices } from '@playwright/test';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
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
  // workers: process.env.CI ? 1 : undefined,
  workers: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    ["allure-playwright"]
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
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    // storageState: 'storageState.json', 
  },

  /* Configure projects for major browsers */
  projects: [

    // {
    //   name: 'api',
    //   grep: /@api/,
    //   use: {
    //     baseURL: 'https://jsonplaceholder.typicode.com',
    //     trace:'on'
    //    },
    // },

    // {
    //   name: 'ui',
    //   grep: /@ui/,
    //   grepInvert: /@smoke/,
    //   use: { ...devices['Desktop Chrome'],
    //     baseURL: 'https://opensource-demo.orangehrmlive.com',
    //     trace:'retain-on-failure',
    //    },
    // },

    // {
    //   name: 'splitting tests',
    //   testMatch: /.*secondScript.spec.ts/,
    //   testIgnore: /.*firstScript.spec.ts/,
    //   use: {
    //     trace:'retain-on-failure',
    //    },
    // },

    // {
    //   name: 'setup',
    //   testMatch: /.*setup.ts/,
    //   teardown: 'reset',
    //   use: { ...devices['Desktop Chrome'],
    //     baseURL: 'https://opensource-demo.orangehrmlive.com',
    //     trace:'retain-on-failure'
    //    },
    // },

    // {
    //   name: 'reset',
    //   testMatch: /.*teardown.ts/,
    //   use: { ...devices['Desktop Chrome'],
    //     baseURL: 'https://opensource-demo.orangehrmlive.com',
    //     trace:'retain-on-failure'
    //    },
    // },

    // {
    //   name: 'dependenciesExample',
    //   dependencies: ['setup'],
    //   use: { 
    //     baseURL: 'https://opensource-demo.orangehrmlive.com',
    //     trace:'retain-on-failure',
    //    }
    // },

    // {
    //   name: 'browserContext',
    //   use: { 
    //     trace:'retain-on-failure',
    //    }
    // },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 920 },
        trace:'retain-on-failure',
       }
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'],
    //     video: 'retain-on-failure',
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
