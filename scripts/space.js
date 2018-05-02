//Description
//  Get information about people in space
//Commands
//  fred who is in space?

const axios = require("axios");
const PeopleInSpaceUrl = "http://api.open-notify.org/astros.json";
//const ISSLocationUrl = "http://api.open-notify.org/iss-now.json";

module.exports = function(robot){

	robot.respond( /(who is in space\??)/i, function(msg){

		msg.send("Getting that for you, one second...");

		GetPeopleInSpace(PeopleInSpaceUrl)
			.then( (data) => {

				if(data === null)
					return msg.send("Uh oh, there was an error with the response");

				let message = `There are currently ${data.number} people in space! These people are:`;

				for(let person of data.people)
					message += `\n-${person.name}, aboard the ${person.craft}`;

				msg.send(message);
			})
			.catch( (err) => msg.send(`Uh oh, there was an error with the call...\n${err.message}`));
	});

};

function GetPeopleInSpace(url){
	return new Promise( (resolve, reject) => {
		axios.get(url)
			.then( (resp) => resp.data )
			.then( (data) => {
				return resolve(data.message === "success" ? data : null);
			})
			.catch( (err) => reject(err));
	});
}
