
const router=require("express").Router();
const upload = require("../middlewares/multer");
const { authMiddleware } = require("../middlewares/authMiddleware");

const {favouriteController, toggleFavourite, getFavourites}=require("../controllers/favouritecontroller");

router.put("/favourite/:id",authMiddleware,toggleFavourite);
router.get("/favourites",authMiddleware,getFavourites);

module.exports=router;