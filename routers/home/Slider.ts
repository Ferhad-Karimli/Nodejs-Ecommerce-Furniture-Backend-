const validateContentType = require("../../middlewares/validateContentType");

const express = require("express");
const {
  SliderAdd,
  SliderDel,
  SliderEdit,
  SliderList,
} = require("../../controllers/home/slider");

const router = express.Router();

router.get("/", SliderList);
router.post("/", validateContentType.validateContentType, SliderAdd);
router.put("/:id", validateContentType.validateContentType, SliderEdit);
router.delete("/:id", SliderDel);

module.exports = router;
