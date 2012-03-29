(function() {
  var Package, Perk, stitch, stylus;
  stitch = require('stitch');
  stylus = require('stylus');
  require('backbone');
  require('underscore');
  Package = (function() {
    function Package() {}
    Package.prototype.build = function() {
      var path;
      return path = "./build";
    };
    Package.prototype.serve = function() {
      var connect, http, server;
      connect = require('connect');
      http = require('http');
      server = connect.createServer().use('/app.js', this.packJS().createServer()).use('/app.css', this.packCSS).use(connect.static('./public'));
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
      return stitch.createPackage({
        paths: ["" + __dirname + "/interface", "" + __dirname + "/components", "./app/controllers", "./app/models", "./app/views", "./lib"]
      });
    };
    return Package;
  })();
  Perk = this.Perk = {};
  Perk.App = require("./app");
  Perk.Package = Package;
  module.exports = Perk;
}).call(this);
