const router = require("express").Router();

const upload = require("../middlewares/multer");
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  uploadMaterial,
  getAllMaterials,
  deleteMaterials,
  updateMaterial,
  getSingleMaterial,
  filterMaterials,
  downloadMaterial,
} = require("../controllers/materialController");

router.post("/upload", authMiddleware, upload.single("file"), uploadMaterial);
//router.get("/materials", getAllMaterials);
router.get("/materials",filterMaterials);
router.get("/materials/:id", getSingleMaterial);
router.delete("/materials/:id", authMiddleware, deleteMaterials);
router.put(
  "/materials/:id",
  authMiddleware,
  upload.single("file"),
  updateMaterial,
);
router.get("/download/:id",downloadMaterial);

module.exports = router;
