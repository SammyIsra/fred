//Description
//	Fuck Zach
//Commands
//	Savage, Brutal

module.exports = function(robot){

	robot.hear(/savage/i, function(msg){

		var m = "";

		for(var i=0 ; i<100 ; i++)
			m += `\n ${msg.envelope.user.name} said SAVAGE...`;
		msg.send(m);
	});

	robot.hear(/brutal/i, function(msg){

		var m = "";

		for(var i=0 ; i<100 ; i++)
			m += `\n ${msg.envelope.user.name} said BRUTAL...`;

		msg.send(m);   
	});
};
