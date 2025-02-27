const express = require("express");
const {
  HeaderList,
  HeaderAdd,
  HeaderUpdate,
  HeaderDelete,
  HeaderDeleteAll,
} = require("../../controllers/home/header");
const upload = require("../../middlewares/uploadFile");
const router = express.Router();

router.get("/", HeaderList);
router.post("/", upload.array("images", 10), HeaderAdd);
router.put("/:id", upload.array("images", 10), HeaderUpdate);
router.delete("/:id", HeaderDelete);
router.delete("/", HeaderDeleteAll);
module.exports = router;
