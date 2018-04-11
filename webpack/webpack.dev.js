const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const { TsConfigPathsPlugin } = require('awesome-typescript-loader')
// const StyleLintPlugin = require('stylelint-webpack-plugin')
const root = path.resolve(__dirname, '../')
const initialPath = require('../src/js/constants.json').initialPath

module.exports = merge(common, {
	entry: {
		hot: 'react-hot-loader/patch',
		// index: `${root}/src/js/index.js`
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
		// new TsConfigPathsPlugin(/* { configFileName, compiler } */)
		// new StyleLintPlugin({ configFile: `${root}/configs/.stylelintrc` })
	],

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json']
	},

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
			{
				test: /\.tsx?$/,
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
						babelOptions: {
							// babelrc: false,
							presets: [
								[
									'@babel/preset-env',
									{
										targets: {
											browsers: ['last 1 versions']
										},
										modules: false,
										loose: true,
										spec: true,
										useBuiltIns: 'usage',
										forceAllTransforms: true
										// debug: true
									}
								],
								'@babel/preset-react',
								'@babel/preset-stage-0'
							],
							plugins: [
								[
									'module-resolver',
									{
										root: [path.resolve(__dirname, '../')],
										alias: {
											'~css': '../src/css'
										}
									}
								],
								'babel-plugin-dual-import',
								'@babel/plugin-proposal-object-rest-spread',
								'@babel/plugin-syntax-dynamic-import',
								'@babel/plugin-proposal-class-properties',
								[
									'react-css-modules',
									{
										webpackHotModuleReloading: true,
										handleMissingStyleName: 'warn',
										generateScopedName: '[local]-[hash:base64:4]',
										filetypes: {
											'.scss': { syntax: 'postcss-scss' }
										},
										// attributeNames: { activeStyleName: 'activeClassName' },
										exclude: 'node_modules'
									}
								],
								'react-hot-loader/babel'
							]
						}
					}
				}
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
