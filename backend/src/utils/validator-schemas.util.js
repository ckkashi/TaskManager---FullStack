import Joi from "joi";

export const registerAuthSchema = Joi.object({
    displayName : Joi.string().min(3).max(30).required(),
    email : Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),  
});

export const loginAuthSchema = Joi.object({
    email : Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),  
});