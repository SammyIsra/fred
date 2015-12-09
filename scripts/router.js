//Description
//	A router for Fred.

module.exports = function(robot){

	robot.router.get('/hello', function(req, res){
		
		//Sorry! I had to...
		//robot.messageRoom("random", "Hello? Is anyone there? \nIt's... so cold here.");
		
		res.send("OK");
	});
}
