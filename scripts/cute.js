//Description:
//	Cute bomb is the cutest script
//Commands:
//	fred cute me
//	fred cute bomb
//	fred cute bomb N

module.exports = function(robot){
	
	robot.respond(/cute me/i, function(msg){
		msg.http("https://www.reddit.com/r/aww/top/.json?sort=top&t=day").get()(function(err, res, body){
			if(err)
			{
				msg.send("Whoopsy, broken!  No cute for you :<");
				return;
			}
			
			msg.send( (JSON.parse(body).data.children)[Math.floor(Math.random()*(JSON.parse(body).data.children).length)].data.url);
		});
	
	});
	
	
	robot.respond(/cute bomb( (\d+))?/i, function(msg){
		//why reinvent the cute wheel
		count = msg.match[2] || 5;
		msg.http("https://www.reddit.com/r/aww/top/.json?sort=top&t=day").get()(function(err, res, body){
			if(err)
			{
				msg.send("Whoopsy, broken!  No cute for you :<");
				return;
			}
			
			for(var i = 0; i < count; i++){
				msg.send( (JSON.parse(body).data.children)[Math.floor(Math.random()*(JSON.parse(body).data.children).length)].data.url);
			}
		});
	});
}