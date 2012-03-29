(function() {
  var compileDep, cscript, fs, packCSS, packJS, path, serve, stitch, stylus;
  fs = require('fs');
  stylus = require('stylus');
  path = require('path');
  cscript = require('coffee-script');
  stitch = require('stitch');
  serve = function() {
    var connect, http, server;
    connect = require('connect');
    http = require('http');
    server = connect.createServer().use('/app.css', packCSS).use('/app.js', packJS).use(connect.static('./public'));
    console.log("Serving Perk Application. Port 9000");
    return http.createServer(server).listen(9000);
  };
  packCSS = function(req, resp, next) {
    var content, engine, nib, response;
    content = require('fs').readFileSync("./app/styles/app.styl", 'utf8');
    response = "";
    nib = (function() {
      try {
        return require('nib');
      } catch (e) {
        return function() {
          return function() {};
        };
      }
    })();
    engine = stylus(content);
    engine.include('./app/styles').use(nib()).set('filename', 'app.css');
    engine.render(function(err, css) {
      if (err) {
        throw err;
      }
      return response = css;
    });
    resp.writeHead(200, {
      "Content-Type": "text/css"
    });
    return resp.end(response);
  };
  packJS = function(req, resp, next) {
    var package, perklib;
    package = stitch.createPackage({
      paths: ['./lib', './app', './vendor']
    });
    perklib = "\nrequire.define({'perk': function(exports, require, module) {\n" + (fs.readFileSync("" + __dirname + "/perk.js", 'utf8')) + "\n}});\n";
    return package.compile(function(err, source) {
      resp.writeHead(200, {
        "Content-Type": "text/javascript"
      });
      return resp.end([source, perklib].join("\n"));
    });
  };
  compileDep = function(name) {
    return fs.readFileSync(require.resolve(name), 'utf8');
  };
  require.extensions['.coffee'] = function(module, filename) {
    cscript.compile(fs.readFileSync(path, 'utf8'), {
      filename: path
    });
    return module._compile("module.exports = " + source, filename);
  };
  module.exports = serve;
}).call(this);
