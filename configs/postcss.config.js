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
			'postcss-flexbugs-fixes': {},
			precss: {},
			'postcss-cssnext': {
				features: {
					customProperties: false
				}
			},
			'css-mqpacker': { sort: true },
			'postcss-zindex': isProd ? {} : false,
			cssnano: isProd ? cssnano : false
		}
	}
}
