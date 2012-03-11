(function() {
  var App, Package, Perk, path, stitch, stylus;
  require('backbone');
  require('underscore');
  path = require('path');
  stitch = require('stitch');
  stylus = require('stylus');
  App = (function() {
    function App() {}
    return App;
  })();
  Package = (function() {
    function Package() {}
    Package.prototype.serve = function() {
      var connect, http, server;
      connect = require('connect');
      http = require('http');
      server = connect.createServer().use('/app.js', this.packJS()).use('/app.css', this.packCSS).use(connect.static('./public'));
      console.log("Serving Perk Application. Port 9000");
      return http.createServer(server).listen(9000);
    };
    Package.prototype.packCSS = function(req, resp, next) {
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
    Package.prototype.packJS = function() {
      var jspack;
      return jspack = stitch.createPackage({
        paths: ['./app/controllers', './app/models', './app/views', './lib']
      }).createServer();
    };
    return Package;
  })();
  Perk = {};
  Perk.App = App;
  Perk.Package = Package;
  module.exports = Perk;
}).call(this);
