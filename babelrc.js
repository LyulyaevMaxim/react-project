const path = require('path'),
  root = path.resolve(__dirname, './'),
  webpackConfig = require(`${root}/webpack.config.js`)(),
  isDev = process.env.NODE_ENV === 'development',
  isTest = process.env.NODE_ENV === 'test'

const presets = [
  [
    '@babel/preset-env',
    !isTest
      ? {
        targets: { browsers: require(`${root}/package.json`).browserslist },
        modules: false,
        loose: true,
        spec: true,
        useBuiltIns: 'usage',
        forceAllTransforms: true,
        debug: false,
      }
      : {},
  ],
  '@babel/preset-react',
  //@babel/preset-typescript
].filter(Boolean)

let plugins = [
  // Stage 0
  'module:@babel/plugin-proposal-function-bind',

  // Stage 1
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-logical-assignment-operators',
  ['@babel/plugin-proposal-optional-chaining', { loose: false }],
  ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
  ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],

  // Stage 2
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-throw-expressions',

  // Stage 3
  '@babel/plugin-syntax-dynamic-import',
  ['@babel/plugin-proposal-class-properties', { loose: true }],

  // Other
  [
    'react-css-modules',
    {
      webpackHotModuleReloading: isDev,
      handleMissingStyleName: 'warn',
      generateScopedName: '[local]-[hash:base64:4]',
      filetypes: { '.pcss': { syntax: 'postcss-scss' } },
      exclude: `${root}/node_modules`,
    },
  ],
  [
    'module-resolver', //for react-css-modules and jest
    {
      alias: webpackConfig.resolve.alias,
    },
  ],
]

if (isDev) {
  plugins = [...plugins, `${root}/src/node_modules/react-hot-loader/babel`]
} else {
  plugins = [
    ...plugins,
    'closure-elimination',
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-transform-react-inline-elements',
    'lodash',
    'minify-dead-code-elimination',
  ]
}

module.exports = { presets, plugins }
