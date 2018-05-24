const path = require('path')
const root = path.resolve(__dirname, '../')
const {initialPath} = require(`${root}/src/js/constants.json`)

const config = {
	host: '0.0.0.0',
	port: '8080',
	content: `${root}/server/dist`,
	clipboard: false,
	dev: { publicPath: `/${initialPath}` },
	hot: true,
	// http2: true,
	// https: {}
	logLevel: 'info' /*'trace', 'debug', 'info', 'warn', 'error' */,
	open: false,
	// openPage: `${initialPath}?token=123&extraToken=a8gh92`,
	// overlay: true,
	historyApiFallback: true
}

module.exports = config
