
const Joi = require("@hapi/joi");

var ApplicationValidations = {
    validateParams: (params) => {
        const schema = Joi.object({
            userID: Joi.string().required(),
            Project_Name: Joi.string().required()
        });
        return schema.validate(params);
    },
    validateIosConfigureParameters :(params) =>{
        const addAppSchema = Joi.object({
            Project_Id :Joi.string().required(),
            Project_Name: Joi.string().required(),
            Bundle_Identifier : Joi.string().required(),
            App_Store_Id : Joi.string().required(),
            App_Name : Joi.string().required()
        })
        return addAppSchema.validate(params);
    },
    validateDeleteParams:(params)=>{
        const schema = Joi.object({
            Project_Id: Joi.string().required()
        });
        return schema.validate(params);
    },
    validateconfigParams:(params) =>{
        const schema = Joi.object({
            Project_Id: Joi.string().required(),
            userID: Joi.string().required(),
            Project_Name: Joi.string().required(),
            App_Name:Joi.string().required(),
            Package_Name:Joi.string().required(),
            PlayStore_Link:Joi.string().required(),
            Modified_Date:Joi.string().optional().allow(''),
            Created_Date:Joi.string().optional().allow(''),
            AndroidJsonFiles:Joi.string().optional().allow('')
        });
        return schema.validate(params);
    },
    };
module.exports = ApplicationValidations;