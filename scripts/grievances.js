//Description:
//	Add a grievance to the official list of grievances
//Commands:
//	fred +grievance ...

module.exports = function(robot){
	const grief = require("./modules/GrievancesS3");

	//To listen to commands (fred x)
	robot.respond(/\+grievances\s(.+)/i, function(msg){

		const newGriev = msg.match[1].trim();

		if(newGriev.length < 2){
			msg.send("Cmon, that's not a proper grievance!");
			return;
		}

		msg.send(`Adding grievance: ${newGriev}`); //No mention
		grief.postNewGrievance(newGriev)
			.then((x) => {
				console.log("Success!", x);
			})
			.catch((e) => {
				msg.send("Uh oh, there was an error (pinging @sammy)");
				console.error(e);
			});
	});


	robot.respond(/\+grievances\s?$/i, function(msg){
		grief.getGrievances()
			.then((data) => {
				const list = data.map((x) => `\n-${x}`);
				msg.send("Grievances:\n" + list);
			})
			.catch((err) => {
				msg.send("Uh oh, there was an error (pinging @sammy)");
				console.error(err);
			});
	});
};
