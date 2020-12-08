const mongoose = require("mongoose");
const db = require("./DBConnection");
let schema = mongoose.Schema;
var SDKDeveloperSchema = new schema({

    username: {
        type:String,
        required:true
    },
    emailID: {
        type : String,
        required : true,
        index : true,
        unique : true
    },
    password:{
        type:String,
        required:true
    },
    otp: {
        type: String,
        required: true
    },
    verification_status:{
        type:Boolean,
        default:false,
        required:true
    },
    company_name: {
        type:String,
        required:true
    },
    register_time:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    }
});
db.connectToDB();
module.exports = mongoose.model('SDKDeveloper',SDKDeveloperSchema);