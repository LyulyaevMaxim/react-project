const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const root = path.resolve(__dirname, '../')

module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
		new CleanWebpackPlugin([`${root}/dist`], {
			allowExternal: true
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: module => {
				if (/babel-polyfill|whatwg-fetch|core-js|object-assign/.test(module.resource)) return false
				return typeof module.context === 'string'
					? module.context.indexOf('node_modules') !== -1
					: false
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest'
		}),
		new UglifyJSPlugin({ sourceMap: true }),
		new BundleAnalyzerPlugin()
	],
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|gif)$/,
				include: `${root}/src/img`,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'img/'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							svgo: {
								plugins: [{ removeTitle: true }, { convertPathData: false }]
							},
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							optipng: {
								enabled: false //disable optiPNG
							},
							gifsicle: {
								enabled: false
							},
							webp: {
								enabled: false
							}
						}
					}
				]
			}
		]
	},
	output: {
		filename: '[name].[chunkhash].bundle.js',
		path: `${root}/dist`
	}
})
