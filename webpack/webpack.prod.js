const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const LodashWebpackOptimize = require('lodash-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const root = path.resolve(__dirname, '../')
const distPath = `${root}/server/dist`

module.exports = merge(common, {
	entry: {
		index: `${root}/src/js/index.tsx`
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new LodashWebpackOptimize({
			chaining: false,
			//для работы с react-css-modules
			shorthands: true,
			collections: true,
			paths: true
		}),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
		new CleanWebpackPlugin([distPath], {
			allowExternal: true
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: module => {
				return module.context && module.context.includes('node_modules')
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity
		}),
		new UglifyJSPlugin({
			// sourceMap: true,
			cache: true,
			parallel: true,
			uglifyOptions: {
				mangle: true
				// compress: false
			}
		})
		// new BundleAnalyzerPlugin()
	],

	module: {
		rules: [
			{
				test: /\.(svg)$/,
				include: `${root}/src/img`,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'img',
							publicPath: '../img/'
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				include: `${root}/src/img`,
				use: [
					{
						loader: 'image-trace-loader'
					},
					{
						loader: 'file-loader',
						options: {
							outputPath: 'img',
							publicPath: '../img/'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							svgo: {
								plugins: [{ removeTitle: true }, { convertPathData: false }],
								enabled: false
							},
							mozjpeg: {
								enabled: false, //пока не заработает с loadable-components
								progressive: true,
								quality: 65
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							optipng: {
								enabled: false
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
		filename: 'js/[name].[chunkhash].bundle.js',
		chunkFilename: 'js/[name].[chunkhash].bundle.js',
		path: distPath
	}
})
