const path = require('path')
const root = path.resolve(__dirname, './')

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'standard',
    'standard-react',
    'esnext',
  ],
  plugins: ['import', 'react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-unresolved': 0,
  },
  settings: {
    // 'import/ignore': [],
    // 'import/resolver': {
    // ['~css']: `${root}/src/css`,
    // webpack: {
    //   config: 'webpack/webpack.js',
    // },
    // },
  },
}
