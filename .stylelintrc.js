const path = require('path')
const root = path.resolve(__dirname, './')

module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-recommended-scss'],
  plugins: ['stylelint-no-unsupported-browser-features'],
  rules: {
    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers: require(`${root}/package.json`).browserslist,
        severity: 'warning',
      },
    ],
    'selector-type-no-unknown': [true, { ignore: ['custom-elements'] }],
    'block-no-empty': null,
  },
}
