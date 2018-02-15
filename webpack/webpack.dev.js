const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
// const StyleLintPlugin = require('stylelint-webpack-plugin')
const root = path.resolve(__dirname, '../')

module.exports = merge(common, {
	entry: {
		polyfills: `${root}/src/js/polyfills.js`,
		hot: 'react-hot-loader/patch',
		index: `${root}/src/js/index.js`
	},
	devtool: 'eval', //'eval-source-map'
	devServer: {
		hot: true,
		clientLogLevel: 'info',
		https: true,
		noInfo: true,
		open: true,
		openPage: '?token=123',
		overlay: true
	},
	plugins: [
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
		// new StyleLintPlugin({ configFile: `${root}/configs/.stylelintrc` })
	],
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|gif)$/,
				include: `${root}/src/img`,
				use: ['file-loader']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: [
							'@babel/plugin-proposal-object-rest-spread',
							'@babel/plugin-syntax-dynamic-import',
							'@babel/plugin-proposal-class-properties',
							'react-hot-loader/babel'
							/*, 'transform-runtime'*/
						]
					}
				}
			}
		]
	},
	output: {
		filename: '[name].bundle.js',
		path: `${root}/dist`
	}
})
