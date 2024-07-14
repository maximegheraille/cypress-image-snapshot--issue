import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    video: true,
    trashAssetsBeforeRuns: false,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'mochawesome',
      mochawesomeReporterOptions: {
        useInlineDiffs: true,
        embeddedScreenshots: true,
        reportDir: 'cypress/reports/mocha',
        quite: true,
        overwrite: false,
        html: false,
        json: true,
      },
    },
    setupNodeEvents(on) {
      addMatchImageSnapshotPlugin(on);

      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.isHeadless) {
          if (browser.name === 'chrome') {
            launchOptions.args.push('--window-size=1920,1080');
            launchOptions.args.push('--force-device-scale-factor=1');
            launchOptions.args.push('--mute-audio');
            launchOptions.args.push('--disable-gpu');
          } else if (browser.name === 'electron') {
            launchOptions.preferences.width = 1920;
            launchOptions.preferences.height = 1080;
          } else if (browser.name === 'firefox') {
            launchOptions.args.push('--width=1920');
            launchOptions.args.push('--height=1080');
          } else if (browser.name === 'edge') {
            launchOptions.args.push('--window-size=1920,1080');
          }
        }
        return launchOptions;
      });
      on('task', {
        log(message) {
          console.log(message);

          return null;
        },
        table(message) {
          console.table(message);

          return null;
        },
      });
    },
    experimentalWebKitSupport: true,
    supportFile: 'cypress/support/index.ts',
    chromeWebSecurity: false,
    screenshotOnRunFailure: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    retries: 0,
    testIsolation: false ,
    specPattern: './cypress/integration/cmp/**/*.ts',
  },
});
