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
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "coverImage", maxCount: 1 },
  ]),
  ProductAdd
);
router.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "coverImage", maxCount: 1 },
  ]),
  ProductEdit
);
router.delete("/:id", ProductDel);

module.exports = router;
