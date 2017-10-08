//Description:
//	Add a grievance to the official list of grievances
//Commands:
//	fred +grievance ...

module.exports = function(robot){
  const grief = require("./modules/GrievancesS3");

  //To listen to commands (fred x)
  robot.respond(/\+grievances\s(.+)/i, function(msg){
    msg.send(`Grievance: ${msg.match[1]}`); //No mention
  });
  
  robot.respond(/\+grievances/i, function(msg){
    grief.getGrievances()
    .then(data => {
      const list = data.map(x => `\n-${x}`);
      msg.send("Grievances:\n" + list);
    })
    .catch((err) => {
      console.log("Oh no!", err);
    })
  })

}
