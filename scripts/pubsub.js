//Description:
//	Are Publix Chicken Tender Subs on Sale?  (via arepublixchickentendersubsonsale.com by /u/rustylikeafox)
//Commands:
//	fred pubsub

const request = require("request");
const cheerio = require("cheerio");

module.exports = function(robot){

	const yesResponses = ["They're back, baby!", "Yes they are!", "Get your butt to Publix!", "Yes.  Yes they are.", "They are, until they aren't.  Hurry!", "chickentendersub.onSale = true"];
	const noResponses = ["Sorry to disappoint.", "Not right now, unfortunately.", "Hate to be the bearer of bad news...", "Nope.", "Don't shoot the messenger bot, but no.", "Not at this time.", "Outlook seems dim.", "Maybe next week."];
	//Are they on sale?
	robot.respond(/pubsub/i, function(msg){
		request("http://www.arepublixchickentendersubsonsale.com/", function(error, response, body){
			const websiteBody = cheerio.load(body);
			msg.send(">Are Publix Chicken Tender Subs on Sale?");
			if(websiteBody.html().includes("onsale:yes")){
				msg.send(yesResponses[Math.floor(Math.random()*yesResponses.length)]);
			}
			else{
				msg.send(noResponses[Math.floor(Math.random()*noResponses.length)]);
			}
		});
	});
};
