const webpack = require('webpack'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  path = require('path'),
  HappyPack = require('happypack'),
  happyThreadPool = HappyPack.ThreadPool({ size: 4 }),
  history = require('connect-history-api-fallback'),
  convert = require('koa-connect')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin'),
  ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
  PreloadWebpackPlugin = require('preload-webpack-plugin')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
  OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  LodashWebpackOptimize = require('lodash-webpack-plugin'),
  WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = (env, argv) => {
  const mode = process.env.NODE_ENV // typeof env !== 'undefined' ? env : argv.mode
  const isDev = mode === 'development'
  console.log(`mode: ${mode}, isDev: ${isDev}`)

  const root = path.resolve(__dirname, '../')
  const distPath = `${root}/server/dist`
  const initialPath = isDev ? '/' : require(`${root}/src/js/constants.js`).initialPath
  const assetsPath = 'assets'

  const cacheLoader = {
    loader: 'cache-loader',
    options: {
      cacheDirectory: `${path.resolve(__dirname)}/node_modules/.cache-loader`,
    },
  }

  return {
    mode,
    devtool: isDev ? 'eval-cheap-module-source-map' : 'none',
    entry: isDev
      ? {
        index: `${root}/src/js/index.jsx`,
        hot: 'react-hot-loader/patch',
      }
      : { index: `${root}/src/js/index.jsx` },

    output: {
      filename: `${assetsPath}/js/[name]${isDev ? '' : '.[chunkhash]'}.js`,
      chunkFilename: `${assetsPath}/js/[name]${isDev ? '' : '.[chunkhash]'}.js`,
      path: distPath,
      publicPath: initialPath,
    },

    resolve: {
      alias: {
        '~css': `${root}/src/css`,
        '~img': `${root}/src/img`,
        '~store': `${root}/src/js/store`,
        '~utils': `${root}/src/js/utils`,
        '~constants': `${root}/src/js/constants.js`,
        '~modules': `${root}/src/js/modules`,
        '~components': `${root}/src/js/components`,
      },
      extensions: ['.jsx', '.js', '.json'],
    },

    plugins: [
      !isDev && new (require('hard-source-webpack-plugin'))(),
      !isDev &&
        new CleanWebpackPlugin([distPath], {
          allowExternal: true,
        }),
      new HappyPack({
        id: 'js',
        threadPool: happyThreadPool,
        loaders: [
          cacheLoader,
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              ...require('./configs/babelrc'),
            },
          },
        ],
      }),
      new HappyPack({
        id: 'PostCSS',
        threadPool: happyThreadPool,
        loaders: [
          cacheLoader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]-[hash:base64:4]',
              sourceMap: isDev,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: {
                path: `configs/postcss.config.js`,
              },
              sourceMap: isDev ? 'inline' : false,
            },
          },
        ],
      }),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: `${assetsPath}/css/[name]${isDev ? '' : '.[hash]'}.css`,
          chunkFilename: `${assetsPath}/css/[name]${isDev ? '' : '.[hash]'}.css`,
          ignoreOrder: true,
        }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: `${root}/src/html/index.html`,
        favicon: `${root}/src/img/favicon/favicon.ico`,
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
          collapseBooleanAttributes: true,
        },
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
        preload: /\.js$/,
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: 'allAssets',
        fileWhitelist: [/\museo-sans-regular.woff2/],
        as(entry) {
          if (/\.woff2$/.test(entry)) return 'font'
        },
      }),
      /*new (require('autodll-webpack-plugin'))({
        inject: true,
        filename: '[name].dll.js',
        path: `${assetsPath}/js/`,
        context: root,
        entry: {
          vendor: [
            'react',
            'react-dom',
            'lodash-es',
            'moment',
            'autosize',
            'axios'
            //...Object.keys(require(`${root}/package.json`).dependencies)
          ],
        },
      }),*/
      !isDev && new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
      !isDev &&
        new LodashWebpackOptimize({
          chaining: false,
          shorthands: true,
          collections: true,
          paths: true,
        }),
      !isDev &&
        new WorkboxPlugin.GenerateSW({
          cacheId: 'service-worker',
          swDest: `${distPath}/assets/js/sw.js`,
          precacheManifestFilename: `${distPath}/assets/js/precache-manifest.[manifestHash].js`,
          navigateFallback: `${distPath}/index.html`,
          clientsClaim: true,
          skipWaiting: true,
        }),
      new (require('duplicate-package-checker-webpack-plugin'))({
        verbose: true,
        emitError: false,
      }),
      !isDev && new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin(),
    ].filter(Boolean),

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'happypack/loader?id=js',
        },
        {
          test: /\.scss$/,
          loaders: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'happypack/loader?id=PostCSS',
          ],
        },
        {
          test: /\.css$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: `configs/postcss.config.js`,
                },
              },
            },
          ],
        },
        {
          test: /\.(woff2|woff)$/,
          include: `${root}/src/fonts`,
          use: [
            cacheLoader,
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: `${assetsPath}/fonts/`,
                publicPath: `${initialPath}${assetsPath}/fonts`,
              },
            },
          ],
        },
        {
          test: /\.(svg|jpg|png)$/,
          include: `${root}/src/img`,
          use: [
            cacheLoader,
            {
              loader: 'file-loader',
              options: {
                outputPath: `${assetsPath}/img`,
                publicPath: `${initialPath}${assetsPath}/img`,
              },
            },
            /*! isDev && {
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
									speed: 4,
									enabled: false //пока не заработает с loadable-components
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
            } */
          ].filter(Boolean),
        },
      ],
    },

    serve: {
      host: '127.0.0.1', //вместо '0.0.0.0' пока не подключу https для корректной работы с SW локально
      port: '8080',
      clipboard: false,
      dev: { publicPath: `/${initialPath}` },
      hot: true,
      // http2: true, //Node v9 or greater
      logLevel: 'info',
      open: false,
      add: (app, middleware, options) => app.use(convert(history({}))),
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
              priority: -10,
            },
          },
        },
        minimizer: [
          new UglifyJSPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              mangle: true,
              /* compress: false, */
            },
          }),
          new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true }, zindex: {} },
          }),
        ],
      }
      : {},
  }
}
