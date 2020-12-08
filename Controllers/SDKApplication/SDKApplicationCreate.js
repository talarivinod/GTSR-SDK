const dbQueries = require('./SDKApplicationDBQueries');
const statusCodes = require('../../Controllers/Core/StatusCodes');
const paramValidations = require('./SDKApplicationParamValidations');
const generateID = require('../../Controllers/Core/IDGenerate');

var GTSRproject = {
    projectCreate : (params, callback) => {
        const { error } = paramValidations.validateParams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            })
        }
        var ProjectID = "Proje"+generateID.makeId();
        let checkQuery = dbQueries.finddeveloperQuery(params);
        checkQuery.then((found)=>{
            if(found){
                let projectDB=dbQueries.insertQuery(params,ProjectID);
                projectDB.then((insertedData) =>{
                    if(insertedData.upserted){
                        return callback({
                            status:200,
                            data:{
                                response: statusCodes.success,
                                message: "project created successfully ...... "
                            }
                        })
                    }
                    else{
                        return callback({
                            status: 200,
                            data: {
                                response: statusCodes.success,
                                message: "project not created sucessfully"
                            }
                        });
                    }
                })
            }else{
                return callback({
                    status:400,
                    data :{
                        response:statusCodes.failure,
                        message : "Email ID not found in DB"
                    }
                })
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
}

module.exports = GTSRproject;