//Description
//	A router for Fred.

module.exports = function(robot){

	robot.router.post("/hello", function(req, res){

		//Because sometimes is a payload and sometimes not.. i dont fucking know
		var data = (req.body.payload)? JSON.parse(req.body.payload) : req.body;

		robot.messageRoom(data.room || "random", data.message);
		res.send("OK");
	});
};
