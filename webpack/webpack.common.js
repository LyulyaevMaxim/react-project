const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	entry: {
		polyfills: '../src/polyfills.js',
		index: '../src/index.js',
		vendor: ['lodash']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: '../src/index.html',
			excludeChunks: ['polyfills']
		})
	],
	output: {},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			}
		]
	}
}
