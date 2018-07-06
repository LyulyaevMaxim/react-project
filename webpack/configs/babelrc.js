const path = require('path')
const root = path.resolve(__dirname, '../../')
const isDev = process.env.NODE_ENV === 'development'

let presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: ['> 1%', 'last 2 versions'],
      },
      modules: false,
      loose: true,
      spec: true,
      useBuiltIns: 'usage',
      forceAllTransforms: true,
      debug: false,
    },
  ],
  '@babel/preset-react',
  ['@babel/preset-stage-0', { decoratorsLegacy: true }],
]

let plugins = [
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
  '@babel/plugin-syntax-dynamic-import',
  ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
  ['@babel/plugin-proposal-optional-chaining', { loose: false }],
  ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
  // ['@babel/plugin-proposal-decorators', { legacy: true }],
  '@babel/plugin-proposal-class-properties',
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
  ]
}

module.exports = { presets, plugins }
