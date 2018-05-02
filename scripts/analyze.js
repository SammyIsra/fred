//Description:
//	Ask fred to Analyze some text
//Commands:
//	fred analyze [text]

var axios = require("axios");

var Watson = require("./modules/Watson");


module.exports = function(robot){

	robot.respond(/(?:analyze\s(?:me)?)(.+)/i, function(msg){

		//console.log(msg)

		msg.send(`Gotchu. Will analize the text "${msg.match[1].trim()}"`);

		Watson.analyzeText(msg.match[1].trim())
			.then((data)=>{
			//console.log(data);

			//report for the db
				var report = {
					text: msg.match[1].trim(),
					analyzedBy: "Watson",
					analysis: data
				};

				axios.post("http://fred-analyze.us-east-1.elasticbeanstalk.com/api/sentiment/", report)
					.then(function(data){
						msg.send(`Want a more detailed report? Check out http://fredanalyze.surge.sh/report/${data.data.id}`);
					})
					.catch(function(err){
						console.log(err);
					});

				var message = "\n*The message that you asked me to analyze has the following scores:*";
				data.document_tone.tone_categories.forEach((category) => {
					message += `\n\n*For the ${category.category_name}*`;
					category.tones.forEach((tone)=>{
						message += `\n${tone.tone_name}: ${tone.score*100}%`;
					});
				});

				//Respond to caller
				msg.reply(message);
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

};
