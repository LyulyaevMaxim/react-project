const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const LodashWebpackOptimize = require('lodash-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const root = path.resolve(__dirname, '../')
const distPath = `${root}/server/dist`

module.exports = (env, argv) => {
	const mode = typeof env !== 'undefined' ? env : argv.mode
	const isDev = mode === 'development'
	console.log(`mode: ${mode}, isDev: ${isDev}`)

	return {
		mode,
		entry: isDev
			? {
					index: `${root}/src/js/index.tsx`,
					hot: 'react-hot-loader/patch'
			  }
			: { index: `${root}/src/js/index.tsx` },

		output: {
			filename: `js/[name]${isDev ? '' : '.[chunkhash]'}.bundle.js`,
			chunkFilename: `js/[name]${isDev ? '' : '.[chunkhash]'}.bundle.js`,
			path: distPath,
			publicPath: `./`
		},

		resolve: {
			alias: {
				['~css']: path.resolve(__dirname, '../src/css/'),
				['~img']: path.resolve(__dirname, '../src/img/'),
				['~actions']: path.resolve(__dirname, '../src/js/actions'),
				['~utils']: path.resolve(__dirname, '../src/js/utils'),
				['~constants']: path.resolve(__dirname, '../src/js/constants.json'),
				['~modules']: path.resolve(__dirname, '../src/js/modules'),
				['~components']: path.resolve(__dirname, '../src/js/components')
			},
			extensions: ['.tsx', '.ts', '.js', '.json']
		},

		optimization: !isDev
			? {
					runtimeChunk: false,
					namedModules: true,
					noEmitOnErrors: true,
					concatenateModules: true,
					minimize: true,
					splitChunks: {
						automaticNameDelimiter: '-',
						chunks: 'all',
						cacheGroups: {
							vendor: {
								name: 'vendor',
								chunks: 'all',
								test: /[\\/]node_modules[\\/]/,
								priority: -10
							}
						}
					},
					minimizer: [
						new UglifyJSPlugin({
							cache: true,
							parallel: true,
							uglifyOptions: {
								mangle: true
								// compress: false
							}
						}),
						new OptimizeCSSAssetsPlugin({
							cssProcessor: require('cssnano'),
							cssProcessorOptions: { discardComments: { removeAll: true }, zindex: {} }
						})
					]
			  }
			: {},

		plugins: [
			new CleanWebpackPlugin([distPath], {
				allowExternal: true
			}),
			new MiniCssExtractPlugin({
				filename: `css/[name]${isDev ? '' : '.[hash]'}.css`,
				chunkFilename: `css/[name]${isDev ? '' : '.[hash]'}.css`,
				ignoreOrder: true
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: `${root}/src/html/index.html`,
				favicon: `${path.resolve(__dirname, '../src/img/')}/favicon/favicon.ico`,
				inject: true,
				cache: true,
				[!isDev && 'minify']: {
					minifyJS: true,
					minifyCSS: true,
					removeComments: true,
					removeAttributeQuotes: true,
					removeEmptyAttributes: true,
					removeScriptTypeAttributes: true,
					collapseWhitespace: true,
					keepClosingSlash: true,
					sortAttributes: true,
					sortClassName: true,
					collapseBooleanAttributes: true
				}
			}),
			new ScriptExtHtmlWebpackPlugin({
				defaultAttribute: 'defer',
				preload: /\.js$/
			}),
			/*new PreloadWebpackPlugin({
			rel: 'preload',
			include: 'allAssets',
			fileWhitelist: [/\.woff2/],
			as(entry) {
				if (/\.woff2$/.test(entry)) return 'font'
			}
			})*/
			isDev && new webpack.HotModuleReplacementPlugin(),
			new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
			!isDev &&
				new LodashWebpackOptimize({
					chaining: false,
					shorthands: true,
					collections: true,
					paths: true
				})
			// !isDev && new BundleAnalyzerPlugin()
		].filter(Boolean),

		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'awesome-typescript-loader',
						options: {
							configFileName: `${root}/configs/tsconfig.json`,
							reportFiles: [`${root}/src/js/**/*.{ts,tsx}`],
							useCache: true,
							//usePrecompiledFiles: true, //использовать js файлы
							//errorsAsWarnings: true, //вместо ошибок TS даёт предупреждения,
							forceIsolatedModules: true,
							//useTranspileModule: true, //режим быстрой генерации
							useBabel: true,
							babelCore: '@babel/core',
							babelOptions: require('./babelrc')
						}
					}
				},
				{
					test: /\.scss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader
						},
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								modules: true,
								localIdentName: '[local]-[hash:base64:4]',
								sourceMap: isDev ? true : false
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								config: {
									path: `${root}/configs/postcss.config.js`
								},
								sourceMap: isDev ? 'inline' : false
							}
						},
						{
							loader: 'stylefmt-loader',
							options: {
								//config: `${root}/configs/.stylelintrc`
							}
						}
					]
					/*fallback: {
							loader: 'style-loader',
							options: {
								singleton: true,
								sourceMap: isDev ? true : false
							}
						},
						use: [
						]*/
				},
				/*{
				test: /\.css$/,
				use: ExtractCssChunks.extract({
					fallback: {
						loader: 'style-loader',
						options: {
							singleton: true,
							sourceMap: isDev ? true : false
						}
					},
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: isDev ? true : false
							}
						}
					]
				})
			},*/
				{
					test: /\.(woff2|woff)$/,
					include: `${root}/src/fonts`,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'fonts/'
							}
						}
					]
				},
				{
					test: /\.(svg)$/,
					include: `${root}/src/img`,
					use: [
						{
							loader: 'file-loader',
							options: isDev
								? {}
								: {
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
							options: isDev
								? {}
								: {
										outputPath: 'img',
										publicPath: '../img/'
								  }
						},
						{
							loader: 'image-webpack-loader',
							options: isDev
								? {}
								: {
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
		}
	}
}
