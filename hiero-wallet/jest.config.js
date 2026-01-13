// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('./jest-helpers/jest.config-base')

const getTestRegexForPath = (path) => `(${path}/__tests__/.*(\\.|/)(test|spec))\\.[jt]sx?$`

module.exports = {
  projects: [
    {
      ...baseConfig,
      displayName: 'dsr-ssi-wallet',
      testRegex: getTestRegexForPath('app'),
    },
    {
      ...baseConfig,
      displayName: '@hiero-wallet/shared',
      testRegex: getTestRegexForPath('packages/shared'),
    },
    {
      ...baseConfig,
      displayName: '@hiero-wallet/keplr',
      testRegex: getTestRegexForPath('packages/keplr'),
    },
  ],
}
