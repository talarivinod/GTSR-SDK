var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SDKAndroidAppSchema = new Schema({

    Project_Id : {
        type : String,
        required : true,
        unique : true
    } ,

    App_Name : {
        type : String,
        required : true
    } ,

    Package_Name : {
        type : String,
        required : true
    } ,

    PlayStore_Link : {
        type : String,
        required : true
    } ,

    App_Key : {
        type : String,
        required : true ,
        unique : true
    } ,

    Secret_Key : {
        type : String,
        required : true,
        unique : true
    } ,

    AndroidJsonFiles: {
        type : String,
        required : false
    } ,

    Created_Date : {
        type : String,
        required : false
    } ,

    Modified_Date : {
        type : String,
        required : false
    }

});

module.exports = mongoose.model("SDKAndroidApp",SDKAndroidAppSchema);