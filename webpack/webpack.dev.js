const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const root = path.resolve(__dirname, '../')

module.exports = merge(common, {
	// devtool: 'inline-source-map',
	devServer: {
		contentBase: `${root}/dist`,
		hot: true
	},
	plugins: [
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
		chunkFilename: '[name].bundle.js',
		path: `${root}/dist`
	}
})
