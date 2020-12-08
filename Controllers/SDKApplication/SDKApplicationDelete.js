const statusCodes = require('../Core/StatusCodes');
const paramValidator = require('./SDKApplicationParamValidations');
const dbQueries = require('./SDKApplicationDBQueries');

var projecctDelete = {

    delete: (params, callback) => {
        const { error } = paramValidator.validateDeleteParams(params);
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
        let get_Query = dbQueries.getQuery(params);
        get_Query.then((found) => {
            console.log("found",found);
            if(found){

                const deleteQuery = dbQueries.deleteprojectQuery(params);
                deleteQuery.then((deleted) => {
                    if (deleted) {
                        return callback({
                            status: 200,
                            data: {
                                response: statusCodes.success,
                                message: "SDK Project data has been delete successfully"
                            }
                        });
                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: statusCodes.failure,
                                message: "SDK Project data delete has been failed"
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

module.exports = projecctDelete;