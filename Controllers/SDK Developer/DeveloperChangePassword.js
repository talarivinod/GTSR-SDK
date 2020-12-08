const statusCodes = require('../Core/statusCodes');
const bcrypt = require('bcryptjs');
const dbQueries = require('./Developer DBQueries');
const paramValidator = require('./Developer ParamValidations');
const Mailer = require('../Core/Mailer');

var developerChangePassword = {
    changePassword: (params, callback) => {
        const { error } = paramValidator.validateChangePasswordParams(params);
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
                var oldPasswordMatch = bcrypt.compareSync(params.oldPassword, user.password);
                if (oldPasswordMatch) {
                    var newPasswordMatch = bcrypt.compareSync(params.newPassword, user.password);
                    if (!newPasswordMatch) {
                        let hashedPassword = bcrypt.hashSync(params.newPassword, 8);
                        let updateQuery = dbQueries.ResetPasswordUpdateQuery(user.emailID, hashedPassword);
                        let email = params.emailID;
                      //  Mailer.forgotpassword("Forgot Password - OTP Verify", params.emailID, otp);
                        Mailer.passwordChangeSuccess("SDK Developer  - Change Password", email);                        updateQuery.then((updated_record) => {
                            if (updated_record.ok == 1) {
                                return callback({
                                    status: 200,
                                    data: {
                                        response: statusCodes.success,
                                        message: "Developer has been changed password successfully"
                                    }
                                });
                            }
                            return callback({
                                status: 200,
                                data: {
                                    response: statusCodes.failure,
                                    message: "Developer password changing failed"
                                }
                            });
                        });

                    } else {
                        return callback({
                            status: 200,
                            data: {
                                response: statusCodes.failure,
                                message: "Developer new password already taken before"
                            }
                        });
                    }
                } else {
                    return callback({
                        status: 200,
                        data: {
                            response: statusCodes.failure,
                            message: "Developer provided old password wrong"
                        }
                    });
                }
            }
            else {
                return callback({
                    status: 200,
                    data: {
                        response: statusCodes.failure,
                        message: "No data found. Please register with us"
                    }
                });
            }
        });
    }

}
module.exports = developerChangePassword;