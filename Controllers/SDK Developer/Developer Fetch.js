const statusCodes = require('../Core/StatusCodes');
const paramValidator = require('./Developer ParamValidations');
const dbQueries = require('./Developer DBQueries');

var developerFecthData = {

    fetch : (params,callback) =>{
        const {error} = paramValidator.validateFetchParams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            });
        }
        let fetchQuery = dbQueries.findQuery(params);
        fetchQuery.then((found)=>{
            if(found){
                return callback({
                    status: 200,
                    data: {
                        response: statusCodes.success,
                        message: "SDK Developer details fetched successfully",
                        developerinfo : found
                    }
                });
            }else{
                return callback({
                    status: 200,
                    data: {
                        response: statusCodes.failure,
                        message: "No data found with this id"
                    }
                });
            }
        })
    }
}

module.exports = developerFecthData;