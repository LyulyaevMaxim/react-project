const path = require('path'),
  root = path.resolve(__dirname, '../')

module.exports = function(config) {
  config.set({
    testRunner: "jest",
    mutator: "typescript", //'javascript'
    mutate: [
      // `${root}/src/**/*.(ts|js)x?`,
      `${root}/src/**/*.ts`, `${root}/src/**/*.tsx`, `${root}/src/**/*.js`, `${root}/src/**/*.jsx`,
      // `!${root}/src/**/*.test.(js|ts)?x`,
      // `!${root}/src/**/*.test.ts`, `!${root}/src/**/*.test.tsx`, `!${root}/src/**/*.test.js`, `!${root}/src/**/*.test.jsx`,
      // `!${root}/**/node_modules`
    ],
    tsconfigFile: `${root}/tsconfig.json`,
    reporters: [ "html" ], //"progress", "clear-text"
    htmlReporter: {
      baseDir: 'reports/mutation/html'
    },
    coverageAnalysis: "off",
    jest: {
      project: 'react',
      config: require(`./jest.config`),
      // enableFindRelatedTests: true,
    },
    /*webpack: {
      configFile: `${root}/webpack.config.js`,
      silent: true
    },
    transpilers: [
      'webpack'
    ],*/
  });
};
