const webpack = require('webpack'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  path = require('path'),
  HappyPack = require('happypack'),
  happyThreadPool = HappyPack.ThreadPool({ size: 4 }),
  ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
  PreloadWebpackPlugin = require('preload-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin'),
  OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  LodashWebpackOptimize = require('lodash-webpack-plugin'),
  WorkboxPlugin = require('workbox-webpack-plugin')

const mode = process.env.NODE_ENV,
  isDev = mode === 'development'
console.log(`mode: ${mode}, isDev: ${isDev}`)

const root = path.resolve(__dirname, './'),
  distPath = `${root}/server/dist`,
  initialPath = isDev ? '/' : require(`${root}/src/js/constants.js`).initialPath,
  assetsPath = 'assets'

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: `${root}/node_modules/.cache-loader`,
  },
}

module.exports = (env, argv) => ({
  mode,
  target: 'web',
  devtool: isDev ? 'eval-cheap-module-source-map' : 'none',
  entry: [`${root}/src/js/index.tsx`],

  output: {
    filename: `${assetsPath}/js/[name]${isDev ? '' : '.[chunkhash]'}.js`,
    chunkFilename: `${assetsPath}/js/[name]${isDev ? '' : '.[chunkhash]'}.js`,
    path: distPath,
    publicPath: initialPath,
  },

  devServer: {
    hot: true,
    // https: true,
    open: false,
    overlay: true,
    historyApiFallback: true,
    // host: '127.0.0.1',
    // port: '8080',
    // compress: true,
    clientLogLevel: 'info',
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
      modernizr$: `${root}/.modernizrrc.js`,
      '~types': `${root}/src/js/types`,
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  plugins: [
    /* !isDev && new (require('hard-source-webpack-plugin'))(), */
    !isDev && new CleanWebpackPlugin([distPath], { allowExternal: true }),
    isDev && new webpack.HotModuleReplacementPlugin(),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [
        cacheLoader,
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            ...require(`${root}/babelrc`),
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
          loader: require.resolve('typings-for-css-modules-loader'),
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]-[hash:base64:4]',
            namedExport: true,
            sourceMap: isDev,
            // camelCase: true,
            // exportOnlyLocals: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            config: { path: `${root}/postcss.config.js` },
            sourceMap: isDev && 'inline',
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: `${assetsPath}/css/[name]${isDev ? '' : '.[hash]'}.css`,
      chunkFilename: `${assetsPath}/css/[name]${isDev ? '' : '.[hash]'}.css`,
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
    new ForkTsCheckerWebpackPlugin({
      tsconfig: `${root}/tsconfig.json`,
      tslint: `${root}/tslint.json`,
      watch: [`${root}/src/js`],
      async: false,
      checkSyntacticErrors: false,
    }),
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
    /*new (require('duplicate-package-checker-webpack-plugin'))({
      verbose: true,
      emitError: false,
    }),*/
    new webpack.WatchIgnorePlugin([/pcss\.d\.ts$/]),
    !isDev && new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin(),
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.modernizrrc.js$/,
        use: ['modernizr-loader'],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=js',
      },
      {
        test: /\.pcss$/,
        loaders: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'happypack/loader?id=PostCSS'],
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
                path: `${root}/postcss.config.js`,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2|woff)$/,
        use: [
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
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: `${assetsPath}/img`,
              publicPath: `${initialPath}${assetsPath}/img`,
            },
          },
        ].filter(Boolean),
      },
    ],
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
          new TerserPlugin({ cache: true, parallel: true, terserOptions: { mangle: true } }),
          new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true }, zindex: {} },
          }),
        ],
      }
    : {},
})
