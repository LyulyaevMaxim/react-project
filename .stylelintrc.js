const path = require('path')
const root = path.resolve(__dirname, './')

module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-recommended-scss'],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
    // 'stylelint-order',
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'plugin/no-low-performance-animation-properties': [
      true,
      { ignoreProperties: ['color', 'background-color'] },
    ],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers: require(`${root}/package.json`).browserslist,
        severity: 'warning',
      },
    ],
    // 'order/order': ['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'],
    // 'order/properties-alphabetical-order': true,
    'selector-type-no-unknown': [true, { ignore: ['custom-elements'] }],
    'block-no-empty': null,
    'no-descending-specificity': null,
  },
}
