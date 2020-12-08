const statusCodes = require('../Core/StatusCodes');
const config = require('../../app/ConfigFiles/config.json');
const paramValidations = require('./Developer ParamValidations');
const dbQueries = require('./Developer DBQueries');
const jwt = require('jsonwebtoken');

var sdkVerify = {
    verify: (params, callback) => {
        const { error } = paramValidations.validateVerifyParams(params);
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
                var attempt_time = Math.floor(Date.now() / 1000);
                let at = attempt_time;
                let t = at-user.register_time;
                if (t <= 118330.5 && t > 0) {
                    if (user.otp === params.otp) {
                        var token = jwt.sign({ id: user.emailID }, config.secretkey);
                        let updateQuery = dbQueries.prepareUpdate(params);
                        updateQuery.then((updated_record) => {
                            if (updated_record.nModified>0) {
                                user.verification_status = true;
                                callback({
                                    status: 200,
                                    data: {
                                        response: statusCodes.success,
                                        message: "SDK Account verified successfully",
                                        customerInfo: user,
                                        access_token: token
                                    }
                                });
                                return;
                            } else {
                                callback({
                                    status: 200,
                                    data: {
                                        response: statusCodes.success,
                                        message: "SDK Account verification failed"
                                    }
                                });
                                return;
                            }

                        }).catch((error) => {
                            console.log(error);
                        })
                    } else {
                        callback({
                            status: 200,
                            data: {
                                response: statusCodes.failure,
                                message: "Entered OTP is wrong"
                            }
                        });
                        return;
                    }
                } else {
                    callback({
                        status: 200,
                        data: {
                            response: statusCodes.failure,
                            message: "OTP timed out"
                        }
                    });
                    return;
                }


            } else {
                callback({
                    status: 200,
                    data: {
                        response: statusCodes.failure,
                        message: "No data found with us. Please register with us."
                    }
                });
                return;
            }
        });
    }
}

module.exports = sdkVerify;