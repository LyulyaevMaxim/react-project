const path = require('path')
const root = path.resolve(__dirname, '../')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  verbose: true,
  notify: false,
  // testEnvironment: "jsdom" || "node"
  // testURL: => location.href
  // runner: "jest-runner" "jest-runner-eslint" "jest-runner-prettier"
  roots: [`${root}/src/js`],
  // "projects": [`${root}/pr1`, `${root}/pr2`]
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['./node_modules', `${root}/node_modules`, `${root}/webpack/node_modules`],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  // modulePaths: [`${root}/src/js/utils`],
  // resetModules: false,
  transform: {
    /*'^.+\\.js$': './jestPreprocess.js'*/
  },
  collectCoverage: false, //!isDev,
  coverageDirectory: `./coverage/`,
  coverageReporters: ['json', 'lcov', 'text'],
  collectCoverageFrom: [`${root}/src/js/*.{js,jsx}`, `!${root}/**/node_modules/**`],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  //   "./src/components/": {
  //     "branches": 40,
  //     "statements": 40
  //   },
  //   "./src/reducers/**/*.js": {
  //     "statements": 90,
  //   },
  // },
  errorOnDeprecated: true,
  // automock: false,
  // clearMocks: false,
  // resetMocks: false,
  // restoreMocks: false,
  globals: {
    // 'babel-jest': {
    //   babelrcFile: `${root}/webpack/configs/babelrc.js`,
    // },
    // __DEV__: isDev,
  },
  setupTestFrameworkScriptFile: `${root}/__tests__/setup/setupEnzyme.js`,
  testPathIgnorePatterns: [`${root}/__tests__/setup/`],
}
