//Description
//  Get weather information for a given city
//Commands:
//  fred weather [city]

const axios = require("axios");

const key = process.env.WEATHERAPI_KEY;

module.exports = function(robot){
    
    robot.respond(/(?:weather)\s?(.+)?/i, function(msg){
        
        if(!key){
            console.log("warning: no weather API key present");
            return msg.send("Sorry, I can't do that. I have no valid OpenWeatherMap API key");
        }
            
        
        const city = (msg.match[1] || "Orlando,us").replace(/\s/g, "");
        //console.log(msg.match);
        
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
        
        axios.get(url)
        .then((resp) => {
            //console.log(resp.data); 
            const description = resp.data.weather[0].description;
            const temp = resp.data.main.temp;
            const humidity = resp.data.main.humidity;
            const city = resp.data.name;
            const fredResponse = `The current weather in ${city} is ${description}`
                + `\nwith a temperature of ${temp} F, `
                + `and ${humidity}% humidity`;
            
            msg.send(fredResponse);
        })
        .catch((err) => {
            msg.send("Uh oh, there was an error (pinging @sammy)");
            console.error(err);
        });
    });
	
	robot.respond(/(?:tomorrow's weather)\s?(.+)?/i, function(msg){
        
        if(!key){
            console.log("warning: no weather API key present");
            return msg.send("Sorry, I can't do that. I have no valid OpenWeatherMap API key");
        }
            
        
        const city = (msg.match[1] || "Orlando,us").replace(/\s/g, "");
        //console.log(msg.match);
        
        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;
        
        axios.get(url)
        .then((resp) => {
            //console.log(resp.data); 
            const description = resp.data.list[8].weather[0].description;
            const temp = resp.data.list[8].main.temp;
            const humidity = resp.data.list[8].main.humidity;
            const city = resp.data.city.name;
            const fredResponse = `Tomorrow's weather in ${city} is ${description}`
                + `\nwith a temperature of ${temp} F, `
                + `and ${humidity}% humidity`;
            
            
            msg.send(fredResponse);
        })
        .catch((err) => {
            msg.send("Uh oh, there was an error (pinging @sammy)");
            console.error(err);
        });
    });
	
}