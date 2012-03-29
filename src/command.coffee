fs			= require('fs')
stylus  = require('stylus')
path    = require('path')
cscript = require('coffee-script')
stitch  = require('stitch')

serve = ->
		connect = require('connect')
		http		= require('http')		
		server = connect.createServer()
		.use('/app.css', packCSS)
		.use('/app.js', packJS)
		.use(connect.static('./public'))
		
		console.log("Serving Perk Application. Port 9000")
		http.createServer(server).listen(9000)
	
packCSS = (req, resp, next)->
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
	resp.writeHead(200, { "Content-Type": "text/css" })
	resp.end(response)
		
packJS = (req, resp, next)-> 
	package = stitch.createPackage(
  	paths: ['./lib', './app', './vendor']
	)
	
	perklib  = "\nrequire.define({'perk': function(exports, require, module) {\n#{fs.readFileSync("#{__dirname}/perk.js", 'utf8')}\n}});\n" 
	package.compile((err, source)->
		resp.writeHead(200, { "Content-Type": "text/javascript" })
		resp.end([source, perklib].join("\n"))
	)
	
compileDep = (name)->
	fs.readFileSync(require.resolve(name), 'utf8')
	
require.extensions['.coffee'] = (module, filename) -> 
	cscript.compile(fs.readFileSync(path, 'utf8'), filename: path)
	module._compile "module.exports = #{source}", filename
	
module.exports = serve