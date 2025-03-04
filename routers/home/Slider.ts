const validateContentType = require("../../middlewares/validateContentType");

const express = require("express");
const {
  SliderAdd,
  SliderDel,
  SliderEdit,
  SliderList,
} = require("../../controllers/home/slider");
const upload = require("../../middlewares/uploadFile");

const router = express.Router();

router.get("/", SliderList);
router.post("/", upload.single("image"), SliderAdd);
router.put("/:id", upload.single("image"), SliderEdit);
router.delete("/:id", SliderDel);

module.exports = router;
