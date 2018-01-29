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
		// parser: file.extname === '.sss' ? 'sugarss' : false,
		// map: isDev ? true : false,
		// from: '/path/to/src.sss',
		// to: '/path/to/dest.css',
		// 	from: ctx.from,
		// 	to: ctx.to,
		// exec: true,
		plugins: {
			'postcss-import': {},
			precss: {},
			'postcss-cssnext': {},
			'css-mqpacker': { sort: true },
			cssnano: isProd ? cssnano : false
		}
	}
}
