import type { Request, Response } from "express";
const express = require("express");
const {
  ProductAdd,
  ProductDel,
  ProductEdit,
  ProductList,
  ProdcutListById,
} = require("../../controllers/product/product");
const upload = require("../../middlewares/uploadFile");

const router = express.Router();

router.get("/", ProductList);
router.get("/:id", ProdcutListById);
router.post("/", upload.array("images", 10), ProductAdd);
router.put("/:id", upload.array("images", 10), ProductEdit);
router.delete("/:id", ProductDel);

module.exports = router;
