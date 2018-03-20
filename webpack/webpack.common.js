const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const root = path.resolve(__dirname, '../')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
	resolve: {
		alias: {
			['~css']: path.resolve(__dirname, '../src/css/'),
			['~img']: path.resolve(__dirname, '../src/img/'),
			['~actions']: path.resolve(__dirname, '../src/js/actions'),
			['~utils']: path.resolve(__dirname, '../src/js/utils'),
			['~constants']: path.resolve(__dirname, '../src/js/constants.js'),
			['~modules']: path.resolve(__dirname, '../src/js/modules')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: `${root}/src/html/index.html`,
			favicon: `${path.resolve(__dirname, '../src/img/')}/favicon/favicon.ico`,
			inject: true,
			cache: true,
			minify: isDev
				? false
				: {
						minifyJS: true,
						minifyCSS: true,
						removeComments: true,
						removeAttributeQuotes: true,
						removeEmptyAttributes: true,
						removeScriptTypeAttributes: true,
						collapseWhitespace: true,
						keepClosingSlash: true,
						sortAttributes: true,
						sortClassName: true,
						collapseBooleanAttributes: true
					}
		}),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: 'defer'
		}),
		new ExtractTextPlugin({
			filename: 'css/[name].[contenthash].css',
			disable: isDev
		})
	],
	output: {},
	module: {
		rules: [
			{
				test: /\.scss$/,
				// include: `${root}/src/css`,
				use: ExtractTextPlugin.extract({
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
				test: /\.(woff2|woff)$/,
				include: `${root}/src/fonts`,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			},
			{
				test: /\.(ico)$/,
				// include: `${root}/src/img/favicon`,
				use: [
					{
						loader: 'file-loader?name=[name].[ext]'
						/*options: {
							name: '[name].[ext]',
							outputPath: 'img/?name=[name].[ext]'
						}*/
					}
				]
			}
		]
	}
}
