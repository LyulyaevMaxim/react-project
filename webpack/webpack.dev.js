const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
// const StyleLintPlugin = require('stylelint-webpack-plugin')
const root = path.resolve(__dirname, '../')

module.exports = merge(common, {
	entry: {
		hot: 'react-hot-loader/patch',
		index: `${root}/src/js/index.js`
	},
	devtool: 'eval', //'eval-source-map'
	devServer: {
		hot: true,
		clientLogLevel: 'info',
		https: false,
		noInfo: true,
		open: false,
		openPage: '?token=123',
		overlay: true
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
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
						presets: [
							[
								'@babel/preset-env',
								{
									targets: {
										browsers: ['last 2 versions', 'IE >= 11']
									}
								}
							],
							'@babel/preset-react',
							'@babel/preset-stage-0'
						],
						plugins: [
							[
								'@babel/plugin-transform-runtime',
								{
									helpers: false,
									polyfill: false,
									regenerator: true,
									moduleName: '@babel/runtime'
								}
							],
							'@babel/plugin-proposal-object-rest-spread',
							'@babel/plugin-syntax-dynamic-import',
							'@babel/plugin-proposal-class-properties',
							'react-hot-loader/babel'
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
