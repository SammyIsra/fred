# Description
#   UCF Garage Occupancy Reporter
#
# Commands:
#   garage - Displays percentage full of each garage in UCF
#	where should I park? - Responds with the most open garage
#	how full is garage <garage name> - Responds with the percent full of the queried garage
#	
# Author:
#   Andrew



module.exports = (robot) ->
	request = require('request')
	cheerio = require('cheerio')


	robot.respond /(how full is garage)\s([a-zA-Z]+)\??/i, (msg) ->
		getGarages (garages) ->
			for garage in garages
				if garage.garage.toLowerCase() is msg.match[2].toLowerCase()
					msg.send("Garage " + garage.garage + " is " + garage.perc + "% full")

	robot.respond /garage/i, (msg)->
		getGarages (garages) ->
			response = ""
			for garage in garages
				response += "Garage #{garage.garage} #{garage.perc}%\n"
			msg.send(response)
	
	robot.respond /where should I park?/i, (msg)->		
		getGarages (garages) ->
			smallestGarage = {garage: "THEY'RE ALL FULL", perc: 100};
			for garage in garages
				if garage.perc < smallestGarage.perc
					smallestGarage.garage = garage.garage
					smallestGarage.perc = garage.perc
			msg.send("The most open garage is " + smallestGarage.garage + " which is " + smallestGarage.perc + "% full.")

	getGarages = (callback) ->
		r = request 'https://secure.parking.ucf.edu/GarageCount/iframe.aspx/', (error, response, body) ->	
			garages = []
			$ = cheerio.load(body);
			$('.dxgvDataRow_DevEx').each (i, obj) ->
				thisGarage = {};
				html = $(obj).html().replace(RegExp(' ', 'g'), '').split '\n'
				for line in html
					if line.startsWith("percent:")
						percent = parseInt(line.replace("percent:", ''))
						thisGarage.perc = percent
				thisGarage.garage = ($(obj).find('.dxgv').html()).replace("Garage ", '')
				garages[i] = thisGarage
			callback garages
		return null


