const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const root = path.resolve(__dirname, '../')

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
				use: [
					// 'cache-loader',
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
							// minimize: isDev ? false : true //cssnano
							/* sourceMap: true, */
							// modules: true,
							// localIdentName: '[path][name]__[local]--[hash:base64:5]'
						}
					},
					{
						loader: 'postcss-loader',
						options: { config: { path: `${root}/configs/postcss.config.js` } }
					}
				]
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
