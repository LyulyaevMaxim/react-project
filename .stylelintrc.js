/* you can run "yarn stylelint-find-rules" to find stylelint rules that are not unused, deprecated or invalid */
const path = require('path'),
  root = path.resolve(__dirname, './'),
  isLintFix = false //TODO: add activation in package.json

module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-airbnb', 'stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: [
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-no-indistinguishable-colors', //need will check
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
    'stylelint-color-format',
    'stylelint-declaration-use-variable',
    'stylelint-group-selectors', // only easy cases :(
    'stylelint-prettier' //TODO: it has conflict with stylelint-order, need run last or use webpack
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'plugin/stylelint-no-indistinguishable-colors': true,
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
    // 'order/order': [/*'custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'*/, { 'disableFix': !isLintFix }],
    'order/properties-alphabetical-order': true,
    "prettier/prettier": isLintFix,

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
