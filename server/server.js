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
				return h.file(path.join(process.cwd(), `${distPath}/index.html`))
			}
		}
	},
	{
		method: 'GET',
		path: prefix + 'fonts/{param*}',
		options: {
			handler: (request, h) => {
				return h.file(path.join(process.cwd(), distPath, request.path))
				// return h.file(path.join(process.cwd(), `${distPath}/fonts/${request.params.param}`))
			}
		}
	},
	{
		method: 'GET',
		path: prefix + 'js/{param*}',
		options: {
			handler: (request, h) => {
				return h.file(path.join(process.cwd(), `${distPath}/js/${request.params.param}`))
			}
		}
	},
	{
		method: 'GET',
		path: prefix + 'img/{param*}',
		options: {
			handler: (request, h) => {
				return h.file(path.join(process.cwd(), `${distPath}/img/${request.params.param}`))
			}
		}
	},
	{
		method: 'GET',
		path: prefix + 'css/{param*}',
		options: {
			handler: (request, h) => {
				/*let result = request.path
				const arr = result.split('/')
				if (arr.length > 3) {
					arr.splice(0, 2)
					result = '/' + arr.join('/')
				}
				return h.file(path.join(process.cwd(), distPath, result))*/
				return h.file(path.join(process.cwd(), `${distPath}/css/${request.params.param}`))
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
