module.exports = function(robot) {

	robot.respond(/are you drunk/i, function(msg){
		msg.reply("Yes");
	});
}
