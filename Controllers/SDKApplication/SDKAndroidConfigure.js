const jsonfile = require('jsonfile');
const IDGenerate = require('../Core/IDGenerate');
const dbQueries = require('./SDKApplicationDBQueries');
const statusCodes = require('../Core/StatusCodes');
const paramValidator = require('./SDKApplicationParamValidations');
const Busboy = require('busboy');
const path = require('path');

var Application = {
    AddApplication: (params, callback) => {

        const {error} = paramValidator.validateconfigParams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            });

        }

        let checkProjectID = dbQueries.getQuery(params);
        checkProjectID.then((findID) => {
            if (findID) {
                var Created_Date = Math.floor(Date.now() / 1000);

                var Modified_Date = Math.floor(Date.now() / 1000);


                var App_Key1 = "";
                var possible1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

                for (var i = 0; i < 10; i++) {
                    App_Key1 += possible1.charAt(Math.floor(Math.random() * possible1.length));
                }

                var Secret_Key1 = "";
                var possible11 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

                for (var i = 0; i < 16; i++) {
                    Secret_Key1 += possible11.charAt(Math.floor(Math.random() * possible11.length));
                }
                const obj = {

                    Package_Name:params.Package_Name,
                    App_Name:params.App_Name,
                    App_Key:App_Key1,
                    Secret_Key:Secret_Key1,
                    PlayStore_Link:params.PlayStore_Link

                }
                const file = "./ConfiguredFiles/" + params.App_Name + ".json";
                jsonfile.writeFile(file,obj,function (err) {
                    if (err){throw err;}
                    console.log('file created');
                });

                let ConfigQuery = dbQueries.InsertAndroidConfigFile(params, App_Key1, Secret_Key1);
                ConfigQuery.save((error) => {
                    if (!error) {
                        callback({
                            status: 200,
                            data: {
                                response: statusCodes.success,
                                message: "SDK Android Configfile Success",
                                AndroidJsonFiles:file
                            }
                        });
                        return
                    } else {
                        callback({
                            status: 200,
                            data: {
                                response: statusCodes.success,
                                message: "SDK Android Configfile failed"
                            }
                        });
                        return
                    }
                });
            }
    else {

        callback({response: '0', message: " Invalid Developer. "});

}

});

}
}
module.exports = Application;