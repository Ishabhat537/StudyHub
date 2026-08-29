const Joi = require("joi");

// Signup validation schema
const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required()
});

// Login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const materialSchema=Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    subject: Joi.string().required(),
    semester: Joi.number().required(),
    course: Joi.string().required(),
    type: Joi.string().required(),
    year: Joi.number().required()

});