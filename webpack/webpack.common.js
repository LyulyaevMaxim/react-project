const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const root = path.resolve(__dirname, '../')
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

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
		}),
		new ExtractTextPlugin('[name].css')
	],
	output: {},
	module: {
		rules: [
			{
				test: /\.css$/,
				include: `${root}/src/css`,
				use: ExtractTextPlugin.extract({
					// 'cache-loader',
					fallback: {
						loader: 'style-loader',
						options: {
							singleton: true,
							sourceMap: isDev ? true : false
						}
					},
					use: [
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								sourceMap: isDev ? true : false
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								config: { path: `${root}/configs/postcss.config.js` },
								sourceMap: isDev ? 'inline' : false
							}
						}
					]
				})
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				include: `${root}/src/img`,
				use:
					process.env.NODE_ENV === 'development' ? ['cache-loader', 'file-loader'] : ['file-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				include: `${root}/src/fonts`,
				use:
					process.env.NODE_ENV === 'development' ? ['cache-loader', 'file-loader'] : ['file-loader']
			}
		],
		noParse: function(content) {
			return /jquery|lodash/.test(content)
		}
	}
}
