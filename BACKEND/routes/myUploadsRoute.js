const router=require("express").Router();

const {
  authMiddleware
} = require("../middlewares/authMiddleware");

const {getMyUploads}=require("../controllers/myUploadsController");

router.get("/myuploads",authMiddleware,getMyUploads);

module.exports=router;