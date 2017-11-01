//Description:
//	Cute bomb is the cutest script
//Commands:
//	fred cute me
//	fred cute bomb N

module.exports = function(robot){
	
	robot.respond(/cute me/i, function(msg){
		msg.http("https://www.reddit.com/r/aww/top/.json?sort=top&t=day").get()(function(err, res, body){
			if(err)
			{
				msg.send("Whoopsy, broken!  No cute for you :<");
				return;
			}
			
			var json = JSON.parse(body).data.children;
			
			msg.send( json[random].data.url);
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
			
			var json = JSON.parse(body).data.children;
			
			
			for(var i = 0; i < count; i++){
				var random = Math.floor(Math.random()*json.length);
				msg.send( json[random].data.url);
				if(json.length > 1){
					json.splice(random, 1);
				}
			}
		});
	});
}