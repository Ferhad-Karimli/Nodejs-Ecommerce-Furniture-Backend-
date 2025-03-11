const express = require("express");
const {
  BasketGet,
  BasketAdd,
  BasketDelete,
} = require("../../controllers/ubwo/basket");

const router = express.Router();

router.get("/", BasketGet);
router.post("/", BasketAdd);
router.delete("/:id", BasketDelete);

module.exports = router;
