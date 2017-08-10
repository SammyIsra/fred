//Description:
//	Are Publix Chicken Tender Subs on Sale?  (via arepublixchickentendersubsonsale.com by /u/rustylikeafox)
//Commands:
//	fred pubsub

module.exports = function(robot){
	request = require('request')
	cheerio = require('cheerio')
	
	yesResponses = ["They're back, baby!", "Yes they are!", "Get your butt to Publix!", "Yes.  Yes they are.", "They are, until they aren't.  Hurry!", "chickentendersub.onSale = true"]
	noResponses = ["Sorry to disappoint.", "Not right now, unfortunately.", "Hate to be the bearer of bad news...", "Nope.", "Don't shoot the messenger bot, but no.", "Not at this time.", "Outlook seems dim.", "Maybe next week."]
	//Are they on sale?
	robot.respond(/pubsub/i, function(msg){
		r = request('http://www.arepublixchickentendersubsonsale.com/', function(error, response, body){
			$ = cheerio.load(body);
			msg.send(">Are Publix Chicken Tender Subs on Sale?")
			if($.html().includes("onsale:yes")){
				msg.send(yesResponses[Math.floor(Math.random()*yesResponses.length)]);
			}
			else{
				msg.send(noResponses[Math.floor(Math.random()*noResponses.length)]);
			}
		});
	});
}