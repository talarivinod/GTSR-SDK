const SDKDeveloperDb = require("../../app/Models/SDKDeveloper");

var SDKDbQueries = {
    findQuery: (params) => {
        return SDKDeveloperDb.findOne(
                {
                    emailID: new RegExp("^" + params.emailID + "$", "i"),
                },
                { _id: 0, __v: 0 }
            )
            .exec();
    },
    insertQuery:(params,otp) =>{

        var register_time = Math.floor(Date.now() / 1000);
        var data = new SDKDeveloperDb({
            username: params.username,
            emailID:params.emailID,
            otp:otp,
            password: params.password,
            register_time: register_time,
            verification_status: "false",
            company_name:params.company_name,
            phone_number:params.phone_number
        });
        return data;

    },
    updateQuery:(params,otp) =>{
        var register_time = Math.floor(Date.now() / 1000);
       return SDKDeveloperDb.updateOne({emailID: new RegExp(params.emailID, 'i')}, {
            $set: {
                password: params.password,
                otp: otp,
                register_time: register_time,
                verification_status: false,
                username: params.username,
                company_name:params.company_name,
                phone_number:params.phone_number
            }
    })
},
    prepareUpdate:(params) =>{
        var register_time = Math.floor(Date.now() / 1000);
        return SDKDeveloperDb.updateOne({emailID: new RegExp(params.emailID, 'i')}, {
            $set: {
                verification_status: true,

            }
        })
    },
    PasswordUpdateQuery:(params) =>{

        return SDKDeveloperDb.updateOne({
                emailID: new RegExp(params.emailID, 'i')
            },
            {
                $set: {
                    password: params.password,
                }
            }).exec()
    },
    ResetPasswordUpdateQuery:(params,hashedPassword) =>{

        return SDKDeveloperDb.updateOne({
                emailID: new RegExp(params.emailID, 'i')
            },
            {
                $set: {
                    password: hashedPassword,
                }
            }).exec()
    },
    deleteQuery:(params) =>{
        return SDKDeveloperDb.deleteOne({emailID: new RegExp('^' + params.emailID + '$')}).exec();
    },
    prepareForgotPasswordOTPUpdate:(params,otp) =>{
        return SDKDeveloperDb.updateOne({emailID: new RegExp(params.emailID, 'i')},
            {
                $set: {
                    otp: otp,
                }
            }).exec()
    }

}
module.exports=SDKDbQueries;