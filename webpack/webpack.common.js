const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const root = path.resolve(__dirname, '../')
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	entry: {
		polyfills: `${root}/src/js/polyfills.js`,
		index: `${root}/src/js/index.js`,
		vendor: ['lodash']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `${root}/src/html/index.html`,
			excludeChunks: ['polyfills']
		}),
		new ExtractTextPlugin('[name].css')
	],
	output: {},
	module: {
		rules: [
			{
				test: /\.scss$/,
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
						},
						{
							loader: 'stylefmt-loader',
							options: {
								//config: `${root}/configs/.stylelintrc`
							}
						}
					]
				})
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				include: `${root}/src/img`,
				use: ['file-loader']
				// process.env.NODE_ENV === 'development' ? ['cache-loader', 'file-loader'] : ['file-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				include: `${root}/src/fonts`,
				use: ['file-loader']
				// process.env.NODE_ENV === 'development' ? ['cache-loader', 'file-loader'] : ['file-loader']
			}
		],
		noParse: function(content) {
			return /jquery|lodash/.test(content)
		}
	}
}
