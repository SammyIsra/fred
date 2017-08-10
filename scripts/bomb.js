//Description:
//	Ask fred to drop a bomb (not the same as cute. Cute is cuter)
//Commands:
//	fred x bomb N:[1-10]

var bombs = require('./misc/bombs.json');

module.exports = function(robot){
    
    //I know this will be needed sometime soon... I just know it!
    robot.respond(/(.+)(?:bomb(?:\s)?)(\d+)?/i, function(msg){
        //yeah placeholder for now, bc we will want more bombs I just know it
        
        //if number is less than one or greater than 10, we mad
        if(msg.match[1] && (msg.match[1] > 10 || msg.match[1] < 1)){
            msg.send("Hey how about you choose a less annoying number instead? [1-10]");
        } else {
            msg.send("Coming soon...tm");
        }
    });
    
    //Very special match ///(?:luigi time(?:!)?(?:\s))(\d+)?/i
    robot.respond(/(?:luigi time(?:!)?(?:\s)?)(\d+)?/i, function(msg){
        
        //if number is less than one or greater than 10, we mad
        if(msg.match[1] && (parseInt(msg.match[1]) > 10 || parseInt(msg.match[1]) < 1)){
            msg.send("Hey how about you choose a less annoying number instead? [1-10]");
        }else{
            //If there was not one, then let it be 5
            var numberToReturn = parseInt(msg.match[1]) || 5;
            
            //Message to be sent
            var reply = "";
            
            //If there are two of the same in the same reply then TOO BAD, LUCAS
            for(var i = 0 ; i < numberToReturn ; i++){
                var index = Math.floor(Math.random()*bombs.luigi.length);
                reply += `${bombs.luigi[index]}\n`;
            }
            
            //Send the message
            msg.send(reply);
        }
    });
}