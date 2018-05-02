//Descripton:
//	Tell you if Fred is drunk
//Commands:
//	fred are you drunk?

module.exports = function(robot) {

	robot.respond(/are you drunk(\?)?/i, function(msg){
		var drunk = [
			"Yes",
			"Of course",
			"Just like Mannello... sometimes",
			"I had no intentions of staying sober",
			"Now I am the drunk people!",
			"Your face is so... logical",
			"But take a shot with me tho",
			"If I were Camilo, I'd be talking in Spanish right now",
			"You a floozy!",
			"I could kiss both of you right now!",
			"WHERE IS FIRETRUCK!?"
		];
		msg.send(drunk[Math.floor(Math.random()*drunk.length)]);
	});
};
