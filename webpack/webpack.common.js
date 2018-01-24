const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const root = path.resolve(__dirname, '../')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
	entry: {
		polyfills: `${root}/src/polyfills.js`,
		index: `${root}/src/index.js`,
		vendor: ['lodash']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `${root}/src/index.html`,
			excludeChunks: ['polyfills']
		})
	],
	output: {},
	module: {
		rules: [
			{
				test: /\.css$/,
				include: `${root}/src/css`,
				use: ['cache-loader', 'style-loader', 'css-loader']
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				include: `${root}/src/img`,
				use: isDev ? ['cache-loader', 'file-loader'] : ['file-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				include: `${root}/src/fonts`,
				use: isDev ? ['cache-loader', 'file-loader'] : ['file-loader']
			}
		]
	}
}
