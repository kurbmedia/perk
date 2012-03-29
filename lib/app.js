(function() {
  var App;
  require('./interface/stage');
  App = (function() {
    function App() {
      this.stage = new Perk.Stage();
      this.initialize();
    }
    App.prototype.initialize = function() {};
    return App;
  })();
}).call(this);
