const Hapi = require('hapi')
const Inert = require('inert')
const path = require('path')
const prefix = '/'
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
				return h.file(path.join(process.cwd(), distPath, 'index.html'))
			}
		}
	},
	{
		method: 'GET',
		path: prefix + 'fonts/{param*}',
		options: {
			handler: (request, h) => {
				return h.file(path.join(process.cwd(), distPath, request.path))
			}
		}
	},
	{
		method: 'GET',
		path: prefix + 'js/{param*}',
		options: {
			handler: (request, h) => {
				let result = request.path
				if (result.indexOf('vendor') >= 0 && result.indexOf('.map') < 0) {
					// result += '.gz'
				}
				return h.file(path.join(process.cwd(), distPath, result))
			}
		}
	},
	{
		method: 'GET',
		path: prefix + 'img/{param*}',
		options: {
			handler: (request, h) => {
				return h.file(path.join(process.cwd(), distPath, request.path))
			}
		}
	},
	{
		method: 'GET',
		path: prefix + 'css/{param*}',
		options: {
			handler: (request, h) => {
				let result = request.path
				const arr = result.split('/')
				if (arr.length > 3) {
					arr.splice(0, 2)
					result = '/' + arr.join('/')
				}
				return h.file(path.join(process.cwd(), distPath, result))
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
