import {signupSchema,loginSchema,materialSchema} from "../joiSchema"
// Signup validation middleware
const validateSignup = (req, res, next) => {
    const { error } = signupSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};

// Login validation middleware
const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};
const validateMaterial=(req,res,next)=>{
    const {error}=materialSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            success:false,
            message:error.details[0].message
        })
    }
    next();
};

module.exports = {
    validateSignup,
    validateLogin,
    validateMaterial,
};