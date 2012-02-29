require('backbone')
require('underscore')
stitch = require('stitch')


class App

class Package
	root: ''
	
	constructor: (options)->
		@root = options.root
		
	serve: ->
		connect = require('connect')
		http		= require('http')		
		server = connect()
		.use('/app.js', @packJS())
		.use('/app.css', @packCSS())
		.use(connect.static(@root + '/public'))
		http.createServer(app).listen(9000)
	
	packCSS: ()->
		stylus.middleware(
			src:  @root + "/app/styles"
			dest: @root + "/public/app.css"
			compile: (str, path, fn)->
				return stylus(str)
					.set('filename', path)
					.set('compress', true)
					.render(fn)
		)
		
	packJS: ()->
		jspack	= stitch.createPackage(
			paths: [@root + '/app/controllers', @root + '/app/models', @root + '/app/views', @root + '/lib']
		).createServer()


Perk 					 = {}
Perk.App 			 = App
Perk.Package	 = Package
module.exports = Perk
	
	