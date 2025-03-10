import type { Request, Response } from "express";
const express = require("express");
const {
  ProductAdd,
  ProductDel,
  ProductEdit,
  ProductList,
  ProdcutListBySlug,
} = require("../../controllers/product/product");
const upload = require("../../middlewares/uploadFile");

const router = express.Router();

router.get("/", ProductList);
router.get("/:slug", ProdcutListBySlug);
router.post("/", upload.array("logo", 10), ProductAdd);
router.put("/:id", upload.array("logo", 10), ProductEdit);
router.delete("/:id", ProductDel);

module.exports = router;
