//Descripton:
//	Tell you if Fred is drunk
//Commands:
//	fred are you drunk?

module.exports = function(robot) {

	robot.respond(/are you drunk(\?)?/i, function(msg){
		console.log(msg);
		msg.send("Yes");
	});
}
