//Description:
//	Ask fred to Analyze some text
//Commands:
//	fred analyze [text]


module.exports = function(robot){

	robot.respond(/(?:analyze\s(?:me)?)(.+)/i, function(msg){
		
		msg.send(`Gotchu. Will analize the text "${msg.match[1].trim()}"`);
		
		//(need to set Watson keys and new project)
		//Make call to Watson
		//Respond to caller
		//msg.respond
	});

}
