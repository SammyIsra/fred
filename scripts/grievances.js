//Description:
//	Add a grievance to the official list of grievances
//Commands:
//	fred +grievance ...

module.exports = function(robot){

  //To listen to commands (fred x)
  robot.respond(/\+grievances\s (.+)/i, function(msg){
    msg.send(`Grievance: ${msg.match[1]}`); //No mention
  });

}
