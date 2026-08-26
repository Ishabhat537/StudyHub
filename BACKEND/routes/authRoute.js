
const {Login,Logout,Signup}=require("../controllers/authController");
const { userVerification } = require("../middlewares/authMiddleware");
const {
    validateSignup,
    validateLogin
} = require("../middlewares/validationMiddleware");
const router=require("express").Router();



router.post("/signup",validateSignup,Signup);
router.post("/login",validateLogin,Login);
router.get("/verify",userVerification);
router.post("/logout",Logout);

module.exports=router;