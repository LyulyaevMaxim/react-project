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
		plugins: {
			'postcss-import': {},
			precss: {},
			'postcss-cssnext': {},
			'css-mqpacker': { sort: true },
			cssnano: isProd ? cssnano : false
		}
	}
}
