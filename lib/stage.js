(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  if (typeof Perk === "undefined" || Perk === null) {
    Perk = require('./perk');
  }
  if (typeof Backbone === "undefined" || Backbone === null) {
    Backbone = require('backbone');
  }
  Perk.Stage = (function() {
    __extends(Stage, Backbone.View);
    function Stage() {
      Stage.__super__.constructor.apply(this, arguments);
    }
    return Stage;
  })();
}).call(this);
