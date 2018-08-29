const path = require('path')
const root = path.resolve(__dirname, '../../')
const { presets } = require(`${root}/webpack/configs/babelrc.js`)

module.exports = require('babel-jest').createTransformer({ presets })
