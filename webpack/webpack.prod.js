const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const common = require("./webpack.common.js")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin
const root = path.resolve(__dirname, "../")

module.exports = merge(common, {
	entry: {
		index: `${root}/src/js/index.js`
	},
	devtool: "source-map",
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
		new CleanWebpackPlugin([`${root}/dist`], {
			allowExternal: true
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: module => {
				return module.context && module.context.includes("node_modules");
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "manifest",
			minChunks: Infinity
		}),
		new UglifyJSPlugin({ sourceMap: true }),
		// new CompressionPlugin({
		// 	asset: '[path].gz[query]',
		// 	algorithm: 'gzip',
		// 	test: /\.js$|\.html$/,
		// 	threshold: 10240,
		// 	minRatio: 0.8
		// })
		// new BundleAnalyzerPlugin()
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
						presets: [
							[
								"@babel/preset-env",
								{
									targets: {
										browsers: ["last 2 versions", "IE >= 11"]
									}
								}
							],
							"@babel/preset-react"
						],
						plugins: [
							"@babel/plugin-proposal-object-rest-spread",
							"@babel/plugin-syntax-dynamic-import",
							"@babel/plugin-proposal-class-properties"
							//- оптимизации
							"transform-react-remove-prop-types",
							"closure-elimination",
							"@babel/plugin-transform-react-constant-elements",
							"@babel/plugin-transform-react-inline-elements"
						]
					}
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				include: `${root}/src/img`,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: "img/"
						}
					},
					{
						loader: "image-webpack-loader",
						options: {
							svgo: {
								plugins: [{ removeTitle: true }, { convertPathData: false }]
							},
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							pngquant: {
								quality: "65-90",
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
		filename: "[name].[chunkhash].bundle.js",
		path: `${root}/dist`
	}
})
