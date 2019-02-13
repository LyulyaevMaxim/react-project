const path = require('path'),
  projectRoot = path.resolve(__dirname, '../'),
  root = path.resolve(__dirname, './'),
  webpackConfig = require(`${projectRoot}/webpack.config.js`)(),
  isDev = process.env.NODE_ENV === 'development'

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules[0] = {
    test: /\.(ts|js)x?$/,
    exclude: /node_modules/,
    loaders: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          ...require(`${projectRoot}/babelrc`),
        },
      },
    ],
  }

  defaultConfig.module.rules.push({
    test: /\.pcss$/,
    loaders: [
      'style-loader',
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
            path: `${projectRoot}/postcss.config.js`,
          },
          sourceMap: isDev && 'inline',
        },
      },
    ],
  })

  defaultConfig.resolve.modules.push(`${projectRoot}/src/node_modules`)
  defaultConfig.resolve.alias = {
    ...defaultConfig.resolve.alias,
    ...webpackConfig.resolve.alias,
    '~storybook-store': `${root}/store`,
  }

  return defaultConfig
}
