const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
	entry: {
		index: './src/index.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true
	},
	plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js', // определяет имя файлов, не входящих в chunk
		path: path.resolve(__dirname, 'dist')
	}
})
