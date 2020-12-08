const statusCodes = require('../Core/StatusCodes');
const paramValidations = require('./Developer ParamValidations');
const dbQueries = require('./Developer DBQueries');
const bcrypt = require('bcryptjs');

var resetDeveloperPassword = {
    restpassword: (params, callback) => {
        const { error } = paramValidations.validateLoginParams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            });
        }

        let resetQuery = dbQueries.findQuery(params);
        resetQuery.then((user) => {
            if(user){
                var oldPasswordMatch = bcrypt.compareSync(params.password, user.password);
                if (!oldPasswordMatch) {
                    let hashedPassword = bcrypt.hashSync(params.password);
                    let updateQuery = dbQueries.ResetPasswordUpdateQuery(params, hashedPassword);
                    updateQuery.then((updated_record) => {
                        if (updated_record.ok == 1) {
                            return callback({
                                status: 200,
                                data: {
                                    response: statusCodes.success,
                                    message: "Reset password successfully"
                                }
                            });
                        }
                        return callback({
                            status: 200,
                            data: {
                                response: statusCodes.failure,
                                message: "Reset password failed"
                            }
                        });
                    })
                }else{
                    return callback({
                        status: 200,
                        data: {
                            response: statusCodes.failure,
                            message: "New password taken before"
                        }
                    });
                }
            }else{
                callback({ status: 200, data: { response: statusCodes.failure, message: "No data found. Please register with us." } });
                return;
            }
        })
    }
}

module.exports = resetDeveloperPassword;