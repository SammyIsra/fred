//Description:
//	Ask fred to Analyze some text
//Commands:
//	fred analyze [text]

var Watson = require("./modules/Watson");


module.exports = function(robot){

	robot.respond(/(?:analyze\s(?:me)?)(.+)/i, function(msg){
		
		//console.log(msg)
		
		msg.send(`Gotchu. Will analize the text "${msg.match[1].trim()}"`);
		
		Watson.analyzeText(msg.match[1].trim())
		.then((data)=>{
			//console.log(data);
			var message = "\n*The message that you asked me to analyze has the following scores:*";
			data.document_tone.tone_categories.forEach((category) => {
				message += `\n\n*For the ${category.category_name}*`;
				category.tones.forEach((tone)=>{
					message += `\n${tone.tone_name}: ${tone.score*100}%`;
				});
			});
			
			//Respond to caller
			msg.reply(msg.envelope.user.name + message);
		})
		.catch((err)=>{
			//console.log(msg.envelope.user.name + " Error happened! " + err);
			msg.reply(err);
		});
		//(need to set Watson keys and new project)
		//Make call to Watson
		//Respond to caller
		//msg.respond  
	});

}
