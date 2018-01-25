const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const root = path.resolve(__dirname, '../')

module.exports = merge(common, {
	// devtool: 'inline-source-map',
	devServer: {
		contentBase: `${root}/dist`,
		hot: true
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
		path: `${root}/dist`
	}
})
