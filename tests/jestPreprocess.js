const path = require('path')
const root = path.resolve(__dirname, '../')

module.exports = require('babel-jest').createTransformer(require(`${root}/babelrc.js`))
