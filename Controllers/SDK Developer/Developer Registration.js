const dbQueries =  require('./Developer DBQueries');
const statusCodes = require('../Core/StatusCodes');
const paramValidations = require('./Developer ParamValidations');
const GenerateOTP = require('../Core/GenerateOTP');
const Mailer = require('../Core/Mailer');
const bcrypt = require('bcryptjs');


var developerregistration = {
    registration: (params,callback) => {
        const {error} = paramValidations.validateregisterParams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            });
        }
        let findQuery = dbQueries.findQuery(params);
        findQuery.then((found) => {
            let otp = GenerateOTP.generateOTP();
            let hashedPassword = bcrypt.hashSync(params.password);
            params.password = hashedPassword;
            console.log("found", found)
            if (found) {
                if(found.verification_status === true){
                    return callback({
                        response: statusCodes.success,
                        message: 'You already have an account with us.'
                    });
                }else {
                    let SDKQuery = dbQueries.updateQuery(params,otp);
                    SDKQuery.then((Found) => {
                        Mailer.registerOTP('Registration - OTP', params.emailID, otp);
                        return callback({
                            status: 200,
                            data: {
                                response: statusCodes.success,
                                message: "SDK Registration successfully"
                            }
                        });
                    });
                }

            } else {
                let founddata = dbQueries.insertQuery(params,otp);
                founddata.save((countdata) => {
                    Mailer.registerOTP('Registration - OTP', params.emailID, otp);

                    return callback({
                        status: 200,
                        data: {
                            response: statusCodes.success,
                            message: "SDK Registration successfully",
                            otp:otp
                        }
                    });
                });
            }
        });
    }
};

module.exports = developerregistration;

