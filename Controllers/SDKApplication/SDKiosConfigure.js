const dbQueries = require('./SDKApplicationDBQueries');
const statusCodes = require('../../Controllers/Core/StatusCodes');
const paramValidations = require('./SDKApplicationParamValidations');
const plist = require('simple-plist');

var configureIosFile = {
    configureFiles: (params, callback) => {
        const { error } = paramValidations.validateIosConfigureParameters(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            })
        }

        let checkProjectID = dbQueries.getQuery(params);
        checkProjectID.then((findID)=>{
            if(findID){
                var App_Key = "";
                var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                for (var i = 0; i < 10; i++) {
                    App_Key += possible.charAt(Math.floor(Math.random() * possible.length));
                }

                var Secret_Key = "";
                var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                for (var i = 0; i < 16; i++) {
                    Secret_Key += possible.charAt(Math.floor(Math.random() * possible.length));
                }

                var BundleId = params.Bundle_Identifier;
                var AppName = params.App_Name;
                var AppKey = App_Key;
                var SecretKey = Secret_Key;
                var AppStroreId = params.App_Store_Id;

                var xml =
                    '<?xml version="1.0" encoding="UTF-8"?>'+
                    '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">' +
                    '<plist version="1.0">' +
                    '<key>metadata</key>' +
                    '<dict>' +
                    '<key>bundle-identifier</key>' +
                    '<string>%B</string>' +
                    '<key>AppName</key>' +
                    '<string>%A</string>' +
                    '<key>AppKey</key>' +
                    '<string>%AK</string>' +
                    '<key>SecretKey</key>' +
                    '<string>%SK</string>' +
                    '<key>AppStoreId</key>' +
                    '<string>%aId</string>' +
                    '</dict>' +
                    '</plist>';

                var xml1 = xml.replace("%B", BundleId);
                var xml2 = xml1.replace("%A", AppName);
                var xml3 = xml2.replace("%AK", AppKey);
                var xml4 = xml3.replace("%SK", SecretKey);
                var xml5 = xml4.replace("%aId", AppStroreId);

                console.log(xml5);

                var data = plist.parse(xml5);

                var path = "./public/plistFiles/" + AppName + ".plist";

                plist.writeFile(path,data,function (err) {
                    if (err){throw err;}
                    console.log('file created');
                });

                let insertIosDb = dbQueries.InsertIosConfigFile(params,AppKey,SecretKey,AppName);
                insertIosDb.save((error)=>{
                    if(error){
                        return callback({
                            status : 200,
                            data :{
                                response : statusCodes.failure,
                                message : "SDK ios Configfile failed",
                                PlistFile: path
                            }
                        })
                    }else{
                        return callback({
                            status : 200,
                            data :{
                                response : statusCodes.success,
                                message : "SDK ios Configfile Success"
                            }
                        })
                    }
                })

            }else{
                return callback({
                    status : 400,
                    data :{
                        response : statusCodes.failure,
                        message :"Not found Project ID"
                    }
                })
            }
        }).catch((error)=>{
            console.log(error);
        });



    }
}

module.exports = configureIosFile;