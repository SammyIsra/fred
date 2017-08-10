const watson = require('watson-developer-cloud');
const q = require('q');


function analyzeText(text){
    
    const qPromise = q.defer();
    
    if(!process.env.WATSON_PASSWORD || !process.env.WATSON_USERNAME){
        qPromise.reject("Watson credentials are not set!");
    }else {
        //Credentials and stuff
        var tone_analyzer = watson.tone_analyzer({
          password: process.env.WATSON_PASSWORD,
          username: process.env.WATSON_USERNAME,
          version: 'v3',
          version_date: '2016-05-19'
        });
        
        console.log("Analyzing: " + text);
        
        tone_analyzer.tone({
            text: text
        }, function(err, data){
            
            if(err){
                console.log("There was an error! " + err);
                qPromise.reject(err.error);
            }else{
                qPromise.resolve(data);    
            }
        });
    }
    
    
    
    return qPromise.promise;
}

module.exports = {
    analyzeText: analyzeText
}