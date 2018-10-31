const path = require('path')
const projectRoot = path.resolve(__dirname, '../../')
const root = path.resolve(__dirname, './')
const isDev = process.env.NODE_ENV === 'development'
const webpackConfig = require('../webpack')()

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules[0] = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loaders: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          ...require('../configs/babelrc'),
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
            path: `${projectRoot}/webpack/configs/postcss.config.js`,
          },
          sourceMap: isDev && 'inline',
        },
      },
    ],
  })

  defaultConfig.resolve.modules.push(`${projectRoot}/node_modules`)
  defaultConfig.resolve.alias = {
    ...defaultConfig.resolve.alias,
    ...webpackConfig.resolve.alias,
    '~storybook-store': `${root}/store`,
  }

  return defaultConfig
}
