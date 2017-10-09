const aws = require('aws-sdk');
const q = require('q');
  
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
});



const bucketName = "freddatastorage";
const keyName = "grievances/data.json";

const s3 = new aws.S3();

function getGrievances(){
    
    const qPromise = q.defer();
    
    s3.getObject({
        Bucket: bucketName, 
        Key: keyName
    },
        function (error, data) {
            if (error) 
                qPromise.reject(error);
            else 
                qPromise.resolve(JSON.parse(data.Body.toString('utf8')).list);
        }
    );
    
    return qPromise.promise;
}

function postNewGrievance(str){
    
    const qPromise = q.defer();
    
    getGrievances()
    .then( x => {
        const newData = {
            list: x.concat(str)
        }
        s3.putObject({
            Body: JSON.stringify(newData),
            Bucket: bucketName,
            Key: keyName
        }, function(err, data){
            if(err)
                qPromise.reject(err);
            else
                qPromise.resolve(data.ETag);
        });
    })
    .catch(e => {
        q.reject(e);
    });
    
    return qPromise.promise;
}

module.exports = {
    getGrievances: getGrievances,
    postNewGrievance: postNewGrievance
}