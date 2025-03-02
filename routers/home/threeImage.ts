const express = require("express");
const {
  ThreeImageList,
  ThreeImageAdd,
  ThreeImageEdit,
  ThreeImageDel,
  ThreeImageDeleteAll,
} = require("../../controllers/home/threeImage");
const upload = require("../../middlewares/uploadFile");
const router = express.Router();
const validateContentType = require("../../middlewares/validateContentType");

router.get("/", ThreeImageList);
router.post(
  "/",
  upload.single("image"),
  validateContentType.validateContentType,
  ThreeImageAdd
);
router.put(
  "/:id",
  upload.single("image"),
  validateContentType.validateContentType,
  ThreeImageEdit
);
router.delete("/:id", ThreeImageDel);
router.delete("/", ThreeImageDeleteAll);
module.exports = router;
