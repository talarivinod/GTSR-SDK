const  paramValidator = require('./Developer ParamValidations');
const dbQueries = require('./Developer DBQueries');
const  statusCodes = require('../Core/StatusCodes');
const bcrypt = require('bcryptjs');
const config = require('../../app/ConfigFiles/config.json');
const jwt=require('jsonwebtoken');


var developerLogin = {
    login: (params, callback) => {
        const {error} = paramValidator.validateLoginParams(params);
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
            console.log("Find User" + user);
            if (user) {
                var token = jwt.sign({ id: user.emailID }, config.secretkey);
                var passwordIsValid = bcrypt.compareSync(params.password, user.password);
                console.log("password", bcrypt.compareSync(params.password, user.password));
                if (passwordIsValid) {
                    return callback({
                        status: 200,
                        data: {
                            response: statusCodes.success,
                            message: "SDK Developer Login success",
                            access_token: token,
                            userInfo: user
                        }
                    });
                } else {
                    return callback({
                        status: 200,
                        data: {
                            response: statusCodes.failure,
                            message: "SDK Developer_invalid_credentials"
                        }
                    });

                }
            } else {
                callback({
                    status: 200,
                    data: {response: statusCodes.failure, message: "No data found with us. Please register with us"}
                });
                return
            }

        });
    }


}

module.exports = developerLogin;