/*
* decaffeinate suggestions:
* DS101: Remove unnecessary use of Array.from
* DS102: Remove unnecessary code created because of implicit returns
* DS205: Consider reworking code to avoid use of IIFEs
* Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
*/
// Description
//   UCF Garage Occupancy Reporter
//
// Commands:
//   garage - Displays percentage full of each garage in UCF
//	where should I park? - Responds with the most open garage
//	how full is garage <garage name> - Responds with the percent full of the queried garage
//
// Author:
//   Andrew

const axios = require("axios");
const cheerio = require("cheerio");

function garageScript(robot) {

	robot.respond(/(how full is garage)\s([a-zA-Z]+)\??/i, (msg) =>
		getGarages()
			.then(function(garages){

				const result = [];
				for (let garage of Array.from(garages)) {
					if (garage.garage.toLowerCase() === msg.match[2].toLowerCase()) {
						result.push(msg.send(`Garage ${garage.garage} is ${garage.perc}% full`));
					} else {
						result.push(undefined);
					}
				}
				return result;
			})
	);

	robot.respond(/garage/i, (msg)=>
		getGarages()
			.then(function(garages) {
				let response = garages.reduce(function(acc, garage){
					return `${acc}Garage ${garage.garage} ${garage.perc}%\n`;
				}, "");
				return msg.send(response);
			})
	);

	robot.respond(/where should I park?/i, (msg)=>
		getGarages()
			.then(function(garages) {
				//console.log({garages});

				const smallestGarage = garages.reduce((acc, garage) => {
					if (garage.perc < acc.perc)
						return garage;
					else
						return acc;
				});
				return msg.send(`The most open garage is ${smallestGarage.garage} which is ${smallestGarage.perc}% full.`);
			})
	);

}

function getGarages() {

	return new Promise(function(resolve, reject){

		axios.get("https://secure.parking.ucf.edu/GarageCount/iframe.aspx/")
			.then(function(response){

				const $ = cheerio.load(response.data);

				const garages = $(".dxgvDataRow_DevEx")
					.map(function(i, el){

						const element = $(el);
						const curGarage = {};
						//console.log({thing:element.html()});
						curGarage.perc = element
							.html()
							.replace(RegExp(" ", "g"), "")
							.split("\n")
							.find((line) => {console.log({line}); return line.startsWith("percent:");})
							.replace("percent:", "")
							.replace(",", "");

						curGarage.garage = element
							.find(".dxgv")
							.html()
							.replace("Garage ", "");

						return curGarage;
					});

				resolve(garages.toArray());
			})
			.catch(reject);
	});
}

module.exports = garageScript;
