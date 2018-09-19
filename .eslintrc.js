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
    'airbnb',
    // 'eslint:recommended',
    'prettier',
    'prettier/react',
    // 'esnext',
    'plugin:import/errors',
    'plugin:import/warnings',
    // 'plugin:prettier/recommended',
    'plugin:react/recommended',
    'standard',
    'standard-react',
    'plugin:jest/recommended',
    'jest-enzyme',
  ],
  plugins: ['import', 'react', 'prettier', 'jest'],
  rules: {
    // 'prettier/prettier': 'error',
    'import/no-unresolved': 0,
    'import/no-namespace': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-dynamic-require': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
    'prefer-rest-params': 0,
    'consistent-return': 0,
    'no-underscore-dangle': 1,
    'no-shadow': 1,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'no-trailing-spaces': 0,
    'no-multiple-empty-lines': 0,
    'no-useless-escape': 0,
    'no-tabs': 0,
    'no-unused-vars': 1,
    'spaced-comment': 0,
    'one-var': 0,
    'no-return-await': 0,
    'no-multi-spaces': 0,
    'no-extra-boolean-cast': 0,
    'global-require': 0,
    'standard/object-curly-even-spacing': 0,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: `${root}/webpack/webpack.js`,
      },
    },
  },
}
