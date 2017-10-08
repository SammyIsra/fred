const aws = require('aws-sdk');
const q = require('q');
  
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
});
const s3 = new aws.S3();

function getGrievances(){
    
    const qPromise = q.defer();
    
    s3.getObject({
        Bucket: "freddatastorage", Key: "grievances/data.json" },
        function (error, data) {
            if (error) 
                qPromise.reject(error);
            else 
                qPromise.resolve(JSON.parse(data.Body.toString('utf8')).list);
        }
    );
    
    return qPromise.promise;
}

module.exports = {
    getGrievances: getGrievances
}