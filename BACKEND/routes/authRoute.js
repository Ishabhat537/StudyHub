const {Signup,Login,Logout}=require("../controllers/authController");
const { userVerification } = require("../middlewares/authMiddleware");
const router=require("express").Router();

router.post("/signup",Signup);
router.post("/login",Login);
router.get("/verify",userVerification);
router.post("/logout",Logout);

module.exports=router;