require('./interface/stage')

class App
	
	constructor: -> 
		@stage = new Perk.Stage()
		@initialize()
	
	initialize: ->