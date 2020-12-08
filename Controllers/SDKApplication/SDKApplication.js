const SDKApplicationInsert = require('./SDKApplicationCreate');
const SDKApplicationConfig = require('./SDKAndroidConfigure');
const SDKApplicationdelete = require('./SDKApplicationDelete');
const SDKAndroiddelete = require('./SDKAndroidDelete');
const SDKiosConfig = require('./SDKiosConfigure');

var application ={
    insert:(params,callback)=>{
        return SDKApplicationInsert.projectCreate(params,callback)
    },
    AddApplication:(params,callback)=>{
        return SDKApplicationConfig.AddApplication(params,callback)
    },
    delete:(params,callback)=>{
        return SDKApplicationdelete.delete(params,callback)
    },
    androiddelete:(params,callback)=>{
        return SDKAndroiddelete.androiddelete(params,callback)
    },
    iosconfig:(params,callback)=>{
        return SDKiosConfig.configureFiles(params,callback)
    }

};
module.exports = application;