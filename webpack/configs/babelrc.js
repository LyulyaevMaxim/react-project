const path = require('path')
const root = path.resolve(__dirname, '../../')
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: require(`${root}/package.json`).browserslist,
      },
      modules: isTest && 'commonjs',
      loose: true,
      spec: true,
      useBuiltIns: 'usage',
      forceAllTransforms: true,
      debug: false,
    },
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
  '@babel/plugin-proposal-do-expressions',

  // Stage 2
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  '@babel/plugin-proposal-function-sent',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-numeric-separator',
  '@babel/plugin-proposal-throw-expressions',

  // Stage 3
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-syntax-import-meta',
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  '@babel/plugin-proposal-json-strings',

  // Other
  [
    'module-resolver',
    {
      root: [`${root}/src`],
      alias: {
        '~css': '../src/css',
      },
    },
  ],
  'babel-plugin-dual-import',
  '@babel/plugin-proposal-object-rest-spread',
  [
    'react-css-modules',
    {
      webpackHotModuleReloading: isDev,
      handleMissingStyleName: 'warn',
      generateScopedName: '[local]-[hash:base64:4]',
      filetypes: {
        '.scss': { syntax: 'postcss-scss' },
      },
      exclude: `${root}/node_modules`,
    },
  ],
]

if (isDev) {
  plugins = [...plugins, 'react-hot-loader/babel']
} else {
  plugins = [
    ...plugins,
    'closure-elimination',
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-transform-react-inline-elements',
    'lodash',
  ]
}

module.exports = { presets, plugins }
