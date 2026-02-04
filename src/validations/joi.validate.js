import Joi  from "joi"

export const emailSchema = Joi.string().email().required().messages({
    "string.email" : "Please enter a valid email." ,
    "string.base" : "Email should be string.",
    "any.required" : "Email is required" ,
    "string.empty" : "Email can't be empty"
})


export const passwordSchema = Joi.string().min(8).message({
    "string.min" : "Password must be atleast of 8 characters"
})