// force timezone to UTC to allow tests to work regardless of local timezone
// generally used by snapshots, but can affect specific tests
process.env.TZ = 'UTC';
const { nodeModulesToTransform, grafanaESModules } = require('./.config/jest/utils');
module.exports = {
  // Jest configuration provided by Grafana scaffolding
  ...require('./.config/jest.config'),
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  transformIgnorePatterns: [nodeModulesToTransform([...grafanaESModules, 'sinon'])],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};