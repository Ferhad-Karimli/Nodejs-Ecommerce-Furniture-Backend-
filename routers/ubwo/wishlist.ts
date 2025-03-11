const express = require("express");
const {
  WishListAdd,
  WishListGet,
  WishListDelete,
} = require("../../controllers/ubwo/wishList");

const router = express.Router();

router.get("/", WishListGet);
router.post("/", WishListAdd);
router.delete("/:id", WishListDelete);

module.exports = router;
