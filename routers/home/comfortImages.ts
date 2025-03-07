const express = require("express");
const {
  ComfortImagesList,
  ComfortImagesAdd,
  ComfortImagesEdit,
  ComfortImagesDel,
  ComfortImagesAll,
} = require("../../controllers/home/comfortImages");
const upload = require("../../middlewares/uploadFile");
const router = express.Router();

router.get("/", ComfortImagesList);
router.post("/", upload.array("images", 10), ComfortImagesAdd);
router.put("/:id", upload.array("images", 10), ComfortImagesEdit);
router.delete("/:id", ComfortImagesDel);
router.delete("/", ComfortImagesAll);
module.exports = router;
