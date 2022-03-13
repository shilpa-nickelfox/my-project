var { successCode, authCode, errorCode } = require('./statuscode');

var successMsg = {
    "status": true,
    "statusCode": successCode,
    "message": "All News!",
    "data": {
        // "token": "",
        "result": {},
        "results": []
       }
    }

var failedMsg = {
    "status": false,
    "statusCode": errorCode,
    "message": "",
    "data": {
        // "token": "",
        "result": {},
        "results": []
        }
    }
    
    var missingAuth = {
        "status": false,
        "statusCode": authCode,
        "message": "Please provide  auth token!",
        "data": {
            // "token": "",
            "result": {},
            "results": []
        }
    }

    var failedAuth = {
        "status": false,
        "statusCode": authCode,
        "message": "Please provide valid auth token!",
        "data": {
            // "token": "",
            "result": {},
            "results": []
        }
    };

    var crashed = {
        "status": false,
        "statusCode": errorCode,
        "message": "Something went wrong!",
        "data": {
            // "token": "",
            "result": {},
            "results": []
        }
    };


module.exports.successMsg = successMsg;
module.exports.failedMsg = failedMsg;
module.exports.missingAuth = missingAuth;
module.exports.failedAuth = failedAuth;
module.exports.crashed = crashed;