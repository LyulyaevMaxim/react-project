const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const root = path.resolve(__dirname, '../')
const isDev = process.env.NODE_ENV === 'development'

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
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				include: `${root}/src/fonts`,
				use: ['file-loader']
			}
		],
		noParse: function(content) {
			return /jquery|lodash/.test(content)
		}
	}
}
