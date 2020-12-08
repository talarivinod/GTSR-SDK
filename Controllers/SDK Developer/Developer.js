var SDKDeveloper = require('./Developer Registration');
var SDKDeveloperverify = require('./Developer AccountVerification');
var SDKDeveloperLogin = require('./Developer Login');
var SDKDeveloperFetch = require('./Developer Fetch');
var SDKDeveloperUpdate = require('./Developer Update');
var SDKDeveloperDelete = require('./Developer Delete');
var SDKDeveloperForgotPassword = require('./Developer ForgotPassword');
var SDKDeveloperResetPassword = require('./Developer ResetPassword');
var SDKDeveloperChangePassword = require ('./DeveloperChangePassword');





var sdkdeveloper = {
    registration: (params, callback) => {
        return SDKDeveloper.registration(params, callback);
    },
    verify: (params, callback) => {
        return SDKDeveloperverify.verify(params, callback);
    },
    login:(params,callback)=>{
        return SDKDeveloperLogin.login(params,callback);
    },
    fetch:(params,callback) =>{
        return SDKDeveloperFetch.fetch(params,callback);
    },
    update:(params,callback) =>{
        return SDKDeveloperUpdate.update(params,callback)
    },
    delete:(params,callback)=>{
        return SDKDeveloperDelete.delete(params,callback)
    },
    forgotpassword:(params,callback) =>{
        return SDKDeveloperForgotPassword.forgotpassword(params,callback)
    },
    resetpassword:(params,callback)=>{
        return SDKDeveloperResetPassword.restpassword(params,callback)
    },
    changePassword:(params,callback)=>{
        return SDKDeveloperChangePassword.changePassword(params,callback)
    }
}
    module.exports=sdkdeveloper;
    