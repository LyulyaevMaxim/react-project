const webpack = require('webpack'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  path = require('path'),
  ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
  PreloadWebpackPlugin = require('preload-webpack-plugin'),
  FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
  ImageminWebpackPlugin = require('imagemin-webpack-plugin').default,
  ImageminWebP = require('imagemin-webp'),
  CopyWebpackPlugin = require('copy-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin'),
  OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  LodashWebpackOptimize = require('lodash-webpack-plugin'),
  WorkboxPlugin = require('workbox-webpack-plugin')

const mode = process.env.NODE_ENV,
  isDev = mode === 'development',
  isProd = mode === 'production'
console.log(`mode: ${mode}`)

const root = path.resolve(__dirname, './'),
  distPath = `${root}/server/dist`,
  initialPath = isDev ? '/' : require(`${root}/src/js/constants.js`).initialPath,
  assetsPath = 'assets'

const loaders = {
  js: () => ({
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      ...require(`${root}/babelrc`),
    },
  }),
  files: ({ outputDirectory } = {}) => ({
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: `${assetsPath}/${outputDirectory}/`,
      publicPath: `${initialPath}${assetsPath}/${outputDirectory}`,
    },
  }),
}

/*const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: `${root}/node_modules/.cache-loader`,
  },
}*/

module.exports = (env, argv) => ({
  mode,
  target: 'web',
  devtool: isDev ? 'eval-cheap-module-source-map' : 'none',
  entry: [isDev && 'react-devtools', `${root}/src/js/index.tsx`].filter(Boolean),

  output: {
    filename: `${assetsPath}/js/[name]${isProd ? '.[chunkhash]' : ''}.js`,
    chunkFilename: `${assetsPath}/js/[name]${isProd ? '.[chunkhash]' : ''}.js`,
    path: distPath,
    publicPath: initialPath,
  },

  devServer: {
    hot: true,
    // https: true,
    open: false,
    overlay: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: '3000',
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
      '~backend': `${root}/backend`,
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  /*node: {
    __dirname: true
  },*/

  plugins: [
    /* !isDev && new (require('hard-source-webpack-plugin'))(), */
    isProd && new CleanWebpackPlugin(),
    // new webpack.WatchIgnorePlugin([/pcss\.d\.ts$/]),
    isDev && new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: `${assetsPath}/css/[name]${isProd ? '.[hash]' : ''}.css`,
      chunkFilename: `${assetsPath}/css/[name]${isProd ? '.[hash]' : ''}.css`,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${root}/src/html/index.html`,
      inject: true,
      cache: true,
      [isProd && 'minify']: {
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
    new FaviconsWebpackPlugin({
      logo: `${root}/src/img/favicon/favicon.png`,
      title: 'React Project',
      prefix: `${assetsPath}/img/favicon-[hash]/`,
      emitStats: false,
      persistentCache: true,
      inject: true,
      icons: {
        favicons: true,
        android: true,
        appleIcon: true,
        appleStartup: true,
        windows: true,
        firefox: true,
        yandex: false,
        coast: false,
        opengraph: false,
        twitter: false,
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: ['runtime'], //webpack manifest
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
    /*new ForkTsCheckerWebpackPlugin({
      tsconfig: `${root}/tsconfig.json`,
      tslint: `${root}/linters/tslint.json`,
      watch: [`${root}/src/js`],
      // async: false,
      // checkSyntacticErrors: false,
    }),*/
    isProd && new webpack.ContextReplacementPlugin(/[\/\\]locale(s)?$/, /en|ru/),
    isProd &&
      new LodashWebpackOptimize({
        chaining: false,
        shorthands: true,
        collections: true,
        paths: true,
      }),
    isProd &&
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

    isProd &&
      new CopyWebpackPlugin([
        {
          from: `${root}/src/img/**.png`,
          to: `${assetsPath}/img/[name].webp`,
        },
      ]),
    isProd &&
      new ImageminWebpackPlugin({
        plugins: [
          ImageminWebP({
            quality: 90,
          }),
        ],
      }),
    // isProd && new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin(),
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
        use: loaders.js(),
      },
      {
        test: /\.pcss$/,
        exclude: /node_modules/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          // cacheLoader,
          /* {
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
          },*/
          {
            loader: 'postcss-loader',
            options: {
              config: { path: `${root}/postcss.config.js` },
              sourceMap: isDev && 'inline',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
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
        use: loaders.files({ outputDirectory: 'fonts' })
      },
      {
        test: /.svg$/,
        use: [loaders.js(), '@svgr/webpack', 'url-loader'],
        issuer: {
          test: /\.(ts|js)x?$/,
        },
      },
      {
        test: /\.svg$/,
        include: `${root}/src/img`,
        use: loaders.files({ outputDirectory: 'img' })
      },
      {
        test: /\.(jpg|png)$/,
        include: `${root}/src/img`,
        use: [
          {
            loader: 'sqip-loader',
            options: {
              numberOfPrimitives: 20,
            },
          },
          loaders.files({ outputDirectory: 'img' })
        ],
      },
    ],
  },

  optimization: isProd
    ? {
        runtimeChunk: true,
        namedModules: true,
        noEmitOnErrors: true,
        concatenateModules: true,
        minimize: true,
        splitChunks: {
          automaticNameDelimiter: '-',
          chunks: 'all',
          cacheGroups: {
            commons: {
              chunks: 'initial',
              minChunks: 2,
            },
            vendor: {
              name: 'vendor',
              chunks: 'initial',
              test: /node_modules/,
              priority: 10,
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
