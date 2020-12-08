const statusCodes = require('../Core/StatusCodes');
const paramValidator = require('./Developer ParamValidations');
const dbQueries = require('./Developer DBQueries');
const bcrypt = require('bcryptjs');
const Mailer = require('../Core/Mailer');
var config = require('../../app/ConfigFiles/config.json');
const GenerateOTP = require('../Core/GenerateOTP');



var developerForgotPassword = {
    forgotpassword: (params, callback) => {
        const { error } = paramValidator.validateFetchParams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            });

        }
        let query = dbQueries.findQuery(params);
        query.then((user) => {
            if (user) {
                let otp = GenerateOTP.generateOTP();
                let updateQuery = dbQueries.prepareForgotPasswordOTPUpdate(params.emailID, otp);
                updateQuery.then((updated_record) => {
                    if (updated_record) {
                        Mailer.forgotpassword("Forgot Password - OTP Verify", params.emailID, otp);
                        callback({ status: 200, data: { response: statusCodes.success, message: "OTP sent to registered mail" } });
                        return;
                    } else {
                        callback({ status: 200, data: { response: statusCodes.failure, message: "OTP sending failed" } });
                        return;
                    }
                }).catch((error) => {
                    console.log(error);
                })
            } else {
                        return callback({
                            status: 200,
                            data: {
                                response: statusCodes.failure,
                                message: "SDK Developer no data found"
                            }
                        });

                    }
                });
            }
    }

module.exports = developerForgotPassword;