//Description:
//	Ask fred to roll some dice
//Commands:
//	fred roll [1-2000]d[2-2000]


module.exports = function(robot){

	robot.respond(/(?:roll (\d{1,4})+d(\d{1,4})+)/i, function(msg){
		
		if(msg.match[1] < 1 || msg.match[1] > 2000 || msg.match[2] < 2 || msg.match[2] > 2000){
			msg.reply("Sorry, I cannot calculate that"); 
		}else{
			var roll = 0;
			for(var i = 0 ; i < msg.match[1] ; i++){
				roll += Math.floor((Math.random() * msg.match[2]) + 1);
			}
			msg.reply("You rolled a: " + roll); 
		}

	});
}
