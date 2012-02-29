(function() {
  var App, Package, Perk, stitch;
  require('backbone');
  require('underscore');
  stitch = require('stitch');
  App = (function() {
    function App() {}
    return App;
  })();
  Package = (function() {
    Package.prototype.root = '';
    function Package(options) {
      this.root = options.root;
    }
    Package.prototype.serve = function() {
      var connect, http, server;
      connect = require('connect');
      http = require('http');
      server = connect().use('/app.js', this.packJS()).use('/app.css', this.packCSS()).use(connect.static(this.root + '/public'));
      return http.createServer(app).listen(9000);
    };
    Package.prototype.packCSS = function() {
      return stylus.middleware({
        src: this.root + "/app/styles",
        dest: this.root + "/public/app.css",
        compile: function(str, path, fn) {
          return stylus(str).set('filename', path).set('compress', true).render(fn);
        }
      });
    };
    Package.prototype.packJS = function() {
      var jspack;
      return jspack = stitch.createPackage({
        paths: [this.root + '/app/controllers', this.root + '/app/models', this.root + '/app/views', this.root + '/lib']
      }).createServer();
    };
    return Package;
  })();
  Perk = {};
  Perk.App = App;
  Perk.Package = Package;
  module.exports = Perk;
}).call(this);
