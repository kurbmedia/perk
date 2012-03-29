_ ?= require 'underscore'
Backbone ?= require 'backbone'
Perk = {}

class Perk.App
	constructor: -> 
		@stage = new Perk.Stage()
		@initialize()
	
	initialize: ->

class Perk.Panel extends Backbone.View
	tagName: 'div'
	className: 'panel'
	transitions:
		in: 'none'
		out: 'none'

	# Adds an element or component to the panel	
	add: (node)-> @$el.append($(node))

class Perk.Stage extends Backbone.View
	el: '#stage'

module.exports = Perk