const Joi = require("@hapi/joi");

var SDKValidations = {
    validateregisterParams: (params) => {
        const schema = Joi.object({
            username: Joi.string().required(),
            emailID: Joi.string().required(),
            password: Joi.string().required(),
            verification_status: Joi.string().optional().allow(''),
            company_name: Joi.string().required(),
            phone_number: Joi.string().required()
        });
        return schema.validate(params);
    },
    validateVerifyParams:(params) => {
        const schema = Joi.object({
            emailID: Joi.string().required(),
            otp: Joi.string().required(),
        })
        return schema.validate(params);
    },
    validateLoginParams: (params) => {
        const loginSchema = Joi.object({
            emailID: Joi.string().required(),
            password: Joi.string().min(8).required()
        });
        return loginSchema.validate(params);
    },
    validateFetchParams:(params) =>{
        const schema = Joi.object({
            emailID: Joi.string().required()
        });
        return schema.validate(params);
    },
    validateChangePasswordParams: (params) => {
        const Changeschema = Joi.object({
            emailID: Joi.string().required(),
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required()
        });
        return Changeschema.validate(params);
    },
};
module.exports = SDKValidations;