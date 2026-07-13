
const router=require("express").Router();
const upload = require("../middlewares/multer");
const { authMiddleware } = require("../middlewares/authMiddleware");

const {favouriteController, toggleFavourite}=require("../controllers/favouritecontroller");

router.put("/favourite/:id",authMiddleware,toggleFavourite);

module.exports=router;