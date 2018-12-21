const path = require('path'),
  root = path.resolve(__dirname, './')

module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-airbnb', 'stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-no-indistinguishable-colors', //need will check
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
    'stylelint-color-format',
    'stylelint-declaration-use-variable',
    'stylelint-group-selectors', // only easy cases :(
    'stylelint-order',
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    "plugin/stylelint-no-indistinguishable-colors": true,
    'plugin/no-low-performance-animation-properties': [
      true,
      { ignoreProperties: ['color', 'background-color', 'border-color'] },
    ],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers: require(`${root}/package.json`).browserslist,
        severity: 'warning',
      },
    ],
    'color-format/format': {
      'format': 'hsl',
    },
    'sh-waqar/declaration-use-variable': [['/color/', 'font-size', /*"z-index"*/
      { ignoreValues: ['inherit', 'transparent', 'currentColor'] },
    ]],
    'plugin/stylelint-group-selectors': true,
    // 'order/order': ['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'],
    'order/properties-alphabetical-order': true,
    'selector-type-no-unknown': [true, { ignore: ['custom-elements'] }],
    'block-no-empty': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'max-nesting-depth': null,
    'scss/dollar-variable-pattern': null,
    'no-descending-specificity': null,
    'comment-empty-line-before': null,
    'comment-whitespace-inside': null,
  },
}
