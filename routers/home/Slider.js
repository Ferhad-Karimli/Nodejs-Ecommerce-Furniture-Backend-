const express = require("express");
const {
  SliderAdd,
  SliderDel,
  SliderEdit,
  SliderList,
} = require("../../controllers/home/Slider");

const router = express.Router();

router.get("/", SliderList);
router.post("/", SliderAdd);
router.put("/:id", SliderEdit);
router.delete("/:id", SliderDel);

module.exports = router;
