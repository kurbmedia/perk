stitch = require('stitch')
stylus = require('stylus')

require('backbone')
require('underscore')

class Package
	
	build: ->
		path = "./build"
		
	serve: ->
		connect = require('connect')
		http		= require('http')		
		server = connect.createServer()
		.use('/app.js', @packJS().createServer())
		.use('/app.css', @packCSS)
		.use(connect.static('./public'))
		
		console.log("Serving Perk Application. Port 9000")
		http.createServer(server).listen(9000)
	
	packCSS: (req, resp, next)->
		content  = require('fs').readFileSync("./app/styles/app.styl", 'utf8')
		response = ""
		nib    = try require('nib') catch e then (-> ->)
		engine = stylus(content)
		engine
		.include('./app/styles')
		.use(nib())
		.set('filename', 'app.css')
			
		engine.render((err, css) ->
			throw err if err
			response = css
		)
		resp.writeHead(200, {"Content-Type": "text/css"});
		resp.end(response)
		
	packJS: ()-> 
		stitch.createPackage( 
			paths:[
				"#{__dirname}/interface",
				"#{__dirname}/components",
				"./app/controllers", 
				"./app/models", 
				"./app/views", 
				"./lib"
			])


Perk 					  = @Perk = {}
Perk.App				= require("./app")
Perk.Package	  = Package

module.exports  = Perk