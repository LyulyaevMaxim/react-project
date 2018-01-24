const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
		new CleanWebpackPlugin(['dist/']),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest' // Specify the common bundle's name.
		}),
		new UglifyJSPlugin({ sourceMap: true }),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		})
	],
	output: {
		filename: '[name].[chunkhash].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
})
