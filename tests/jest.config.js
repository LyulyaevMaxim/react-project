const path = require('path'),
  root = path.resolve(__dirname, '../'),
  isProd = process.env.NODE_ENV === 'production'

module.exports = {
  bail: true,
  verbose: true,
  notify: false,
  testEnvironment: 'node',
  // testURL: => location.href
  runner: 'jest-runner',
  roots: [`${root}/src/js`],
  // "projects": [`${root}/pr1`, `${root}/pr2`]
  // moduleFileExtensions: ['js', 'jsx', 'json],
  moduleDirectories: [`${root}/node_modules`, `${root}/src/node_modules`],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^lodash-es$': 'lodash'
  },
  resetModules: false,
  transform: {
    '^.+\\.(ts|js)x?$': `${root}/tests/jestPreprocess.js`,
  },
  // transformIgnorePatterns: [`${root}/node_modules`],
  collectCoverage: isProd,
  coverageDirectory: `./coverage/`,
  coverageReporters: ['json', 'lcov', 'text'],
  collectCoverageFrom: [`${root}/src/js/*.{js,jsx}`, `!${root}/**/node_modules`],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
    // "./src/reducers/**/*.js": {
    // "branches": 40,
    //   "statements": 40,
    // },
  },
  errorOnDeprecated: true,
  prettierPath: `${root}/node_modules/prettier`,
  // automock: false,
  // clearMocks: false,
  // resetMocks: false,
  // restoreMocks: false,
  setupFilesAfterEnv: [`./setupEnzyme.js`],
  // testPathIgnorePatterns: [],
  // resolver: `${root}/__tests__/resolver.js`,
}
