const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const root = path.resolve(__dirname, '../')

module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
		new CleanWebpackPlugin([`${root}/dist`], {
			allowExternal: true
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		}),
		new UglifyJSPlugin({ sourceMap: true })
	],
	output: {
		filename: '[name].[chunkhash].bundle.js',
		path: `${root}/dist`
	}
})
