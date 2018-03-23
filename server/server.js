const Hapi = require('hapi')
const Inert = require('inert')
const path = require('path')
const prefix = `/${require('../src/js/constants.json').initialPath}`
const distPath = './dist'

const server = new Hapi.Server({
	port: process.env.PORT || 5000,
	routes: {
		cors: true
	}
})

server.route([
	{
		method: 'GET',
		path: '/{param*}',
		options: {
			handler: (request, h) => {
				let extension = request.params.param.substr(-2)
				if (extension === 'js') {
					let fileName = request.params.param.split('/').pop()
					return h.file(path.join(process.cwd(), `${distPath}/js/${fileName}`))
				}

				extension = request.params.param.substr(-3)
				if (extension === 'css') {
					let fileName = request.params.param.split('/').pop()
					return h.file(path.join(process.cwd(), `${distPath}/css/${fileName}`))
				}

				if (extension === 'svg' || extension === 'jpg' || extension === 'png') {
					let fileName = request.params.param.split('/').pop()
					return h.file(path.join(process.cwd(), `${distPath}/img/${fileName}`))
				}

				if (
					request.params.param.substr(5) === 'woff2' ||
					request.params.param.substr(4) === 'woff'
				) {
					let fileName = request.params.param.split('/').pop()
					return h.file(path.join(process.cwd(), `${distPath}/fonts/${fileName}`))
				}

				return h.file(path.join(process.cwd(), `${distPath}/index.html`))
			}
		}
	}
])

server
	.register([
		{
			plugin: Inert
		}
	])
	.then(() => server.start())
	.then(() => console.log(`Server running at: ${server.info.uri}`))
