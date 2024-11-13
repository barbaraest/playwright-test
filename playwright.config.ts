import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    // Outras configurações
  },
};

export default config;