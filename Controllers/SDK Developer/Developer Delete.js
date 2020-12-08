const statusCodes = require('../Core/StatusCodes');
const paramValidator = require('./Developer ParamValidations');
const dbQueries = require('./Developer DBQueries');

var developerDelete = {

    delete: (params, callback) => {
        const { error } = paramValidator.validateFetchParams(params);
        if (error) {
            callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            })
            return
        }
        let get_Query = dbQueries.findQuery(params);
        get_Query.then((found) => {
            console.log("found",found);
            if(found){

                const deleteQuery = dbQueries.deleteQuery(params);
                deleteQuery.then((deleted) => {
                    if (deleted) {
                        return callback({
                            status: 200,
                            data: {
                                response: statusCodes.success,
                                message: "SDK Developer data has been delete successfully"
                            }
                        });
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: statusCodes.failure,
                                message: "SDK Developer data delete has been failed"
                            }
                        });
                    }
                })

            }else{
                return callback({
                    status: 200,
                    data: {
                        response: statusCodes.failure,
                        message: "No  found data"
                    }
                });
            }
        })
    }
};

module.exports = developerDelete;