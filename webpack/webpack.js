const webpack = require('webpack')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')

const CssChunksHtmlWebpackPlugin = require('css-chunks-html-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const LodashWebpackOptimize = require('lodash-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const root = path.resolve(__dirname, '../')
const isDev = process.env.NODE_ENV === 'development'
const initialPath = require('../src/js/constants.json').initialPath
const distPath = `${root}/server/dist`

module.exports = {
	entry: {
		index: `${root}/src/js/index.tsx`,
		[isDev && 'hot']: 'react-hot-loader/patch'
	},

	output: {
		filename: `js/[name]${!isDev ? '.[chunkhash]' : ''}.bundle.js`,
		chunkFilename: 'js/[name].[chunkhash].bundle.js',
		path: distPath,
		publicPath: isDev ? `/` : `./`
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

	devtool: isDev && 'eval', //'eval-source-map', 'source-map'

	devServer: isDev
		? {
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
		  }
		: {},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production')
		}),
		new ExtractCssChunks({
			filename: 'css/[name].[contenthash].css',
			ignoreOrder: true, //для css-modules
			disable: isDev
		}),
		new CssChunksHtmlWebpackPlugin({ inject: 'head' }),
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
		new PreloadWebpackPlugin({
			rel: 'preload',
			include: 'allAssets',
			fileWhitelist: [/\.woff2/],
			as(entry) {
				if (/\.woff2$/.test(entry)) return 'font'
			}
		}),
		isDev
			? (new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin())
			: (new CleanWebpackPlugin([distPath], {
					allowExternal: true
			  }),
			  new LodashWebpackOptimize({
					chaining: false,
					//для работы с react-css-modules
					shorthands: true,
					collections: true,
					paths: true
			  }),
			  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
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
			  }) /*,new BundleAnalyzerPlugin()*/)
	],

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
			// 		//sourcemap каждогого полученного js файла будет повторно обработан «source-map-loader»
			// 		{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
			{
				test: /\.scss$/,
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
				})
			},
			{
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
			},
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
					/*{
						loader: 'image-trace-loader'
					},*/
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
