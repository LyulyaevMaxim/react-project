const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
// const StyleLintPlugin = require('stylelint-webpack-plugin')
const root = path.resolve(__dirname, '../')
const initialPath = require('../src/js/constants.json').initialPath

module.exports = merge(common, {
	entry: {
		hot: 'react-hot-loader/patch',
		index: `${root}/src/js/index.tsx`
	},
	devtool: 'eval', //'eval-source-map', 'source-map'
	devServer: {
		hot: true,
		clientLogLevel: 'info',
		https: true,
		noInfo: true,
		open: false,
		contentBase: `${root}/dist`,
		// publicPath: `/${initialPath}`,
		openPage: `${initialPath}?token=123&extraToken=a8gh92`,
		overlay: true,
		host: '0.0.0.0',
		historyApiFallback: true
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
				test: /\.(png|jpg|gif)$/,
				include: `${root}/src/img`,
				use: [
					{
						loader: 'image-trace-loader'
					},
					{
						loader: 'file-loader'
					}
				]
			},
			{
				test: /\.(svg)$/,
				include: `${root}/src/img`,
				use: [
					{
						loader: 'file-loader'
					}
				]
			},
			//sourcemap каждогого полученного js файла будет повторно обработан «source-map-loader»
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
		]
	},
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].[chunkhash].bundle.js',
		path: `${root}/dist`,
		publicPath: `/`
	}
})
