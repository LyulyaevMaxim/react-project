module.exports = ({ file, options, env }) => {
	const isProd = env === 'production'
	const cssnano = {
		preset: [
			'default',
			{
				discardComments: {
					removeAll: true
				}
			}
		]
	}
	return {
		parser: 'postcss-scss',
		plugins: {
			'postcss-import': {},
			'postcss-nested': { preserveEmpty: true },
			'postcss-advanced-variables': {},
			'postcss-custom-media': {},
			'postcss-color-function': {},
			'postcss-selector-not': {},
			'postcss-selector-matches': {},
			'css-mqpacker': { sort: true },
			'postcss-preset-env': {},
			'postcss-flexbugs-fixes': {},
			autoprefixer: {
				browsers: ['last 2 versions', 'IE >= 11'],
				grid: true,
				flexbox: 'no-2009',
				remove: true
			},
			'postcss-zindex': isProd ? {} : false,
			cssnano: isProd ? cssnano : false
		}
	}
}
