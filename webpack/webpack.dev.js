const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
// const StyleLintPlugin = require('stylelint-webpack-plugin')
const root = path.resolve(__dirname, '../')

module.exports = merge(common, {
	// devtool: 'eval-source-map',
	devtool: 'eval',
	devServer: {
		contentBase: './dist',
		hot: true,
		clientLogLevel: 'info',
		// https: true,
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
			}
		]
	},
	output: {
		filename: '[name].bundle.js',
		path: `${root}/dist`
	}
})
