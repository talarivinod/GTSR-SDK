const statusCodes = require('../Core/StatusCodes');
const paramValidator = require('./Developer ParamValidations');
const dbQueries = require('./Developer DBQueries');
const bcrypt = require('bcryptjs');

var developerUpdate = {
    update: (params, callback) => {
        const { error } = paramValidator.validateLoginParams(params);
        if (error) {
            return callback({
                status: 400,
                data: {
                    response: statusCodes.failure,
                    message: error.details[0].message
                }
            });

        }
        let hashedPassword = bcrypt.hashSync(params.password);
        params.password = hashedPassword;
        let adminQuery = dbQueries.PasswordUpdateQuery(params);
        adminQuery.then((Found) => {
            if (Found) {
                callback({
                    status: 200,
                    data: {
                        response: statusCodes.success,
                        message: "SDK Developer data Update successfully"
                    }
                });
                return;
            } else {
                return callback({
                    status: 200,
                    data: {
                        response: statusCodes.failure,
                        message: "SDK Developer data Update failed"
                    }
                });

            }
        });

    }
};

module.exports = developerUpdate;