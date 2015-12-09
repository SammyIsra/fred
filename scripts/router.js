//Description
//	A router for Fred.

module.exports = function(robot){

	robot.router.post('/hello', function(req, res){
				
		var data = (req.body.payload)? JSON.parse(req.body.payload) : req.body;
		
		//Sorry! I had to...
		//robot.messageRoom("random", "Hello? Is anyone there? \nIt's... so cold here.");
		
		robot.messageRoom("random", data.message);
		res.send("OK");
	});
}
