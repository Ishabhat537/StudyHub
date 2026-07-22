
const {Signup,Login,Logout,SendOtp,VerifyOtp}=require("../controllers/authController");
const { userVerification } = require("../middlewares/authMiddleware");
const router=require("express").Router();


router.post("/send-otp",SendOtp);
router.post("/verify-otp",VerifyOtp);
router.post("/signup",Signup);
router.post("/login",Login);
router.get("/verify",userVerification);
router.post("/logout",Logout);

module.exports=router;