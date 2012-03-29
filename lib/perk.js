(function() {
  var Perk;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  if (typeof _ === "undefined" || _ === null) {
    _ = require('underscore');
  }
  if (typeof Backbone === "undefined" || Backbone === null) {
    Backbone = require('backbone');
  }
  Perk = {};
  Perk.App = (function() {
    function App() {
      this.stage = new Perk.Stage();
      this.initialize();
    }
    App.prototype.initialize = function() {};
    return App;
  })();
  Perk.Panel = (function() {
    __extends(Panel, Backbone.View);
    function Panel() {
      Panel.__super__.constructor.apply(this, arguments);
    }
    Panel.prototype.tagName = 'div';
    Panel.prototype.className = 'panel';
    Panel.prototype.transitions = {
      "in": 'none',
      out: 'none'
    };
    Panel.prototype.add = function(node) {
      return this.$el.append($(node));
    };
    return Panel;
  })();
  Perk.Stage = (function() {
    __extends(Stage, Backbone.View);
    function Stage() {
      Stage.__super__.constructor.apply(this, arguments);
    }
    Stage.prototype.el = '#stage';
    return Stage;
  })();
  module.exports = Perk;
}).call(this);
