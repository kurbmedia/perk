Perk 		 ?= require('../perk')
Backbone ?= require('backbone')

class Perk.Panel extends Backbone.View
	tagName: 'div'
	className: 'panel'
	transitions:
		in: 'none'
		out: 'none'
		
	# Adds an element or component to the panel	
	add: (node)-> @$el.append($(node))