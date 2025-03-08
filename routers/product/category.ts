import type { Request, Response } from "express";
const express = require("express");
const {
  CategoryList,
  CategoryListBySlug,
  CategoryAdd,
  CategoryUpdate,
  CategoryDelete,
  CategoryDeleteAll,
} = require("../../controllers/product/category");
const upload = require("../../middlewares/uploadFile");

const router = express.Router();

router.get("/", CategoryList);
router.get("/:slug", CategoryListBySlug);
router.post("/", upload.single("image"), CategoryAdd);
router.put("/:id", upload.single("image"), CategoryUpdate);
router.delete("/:id", CategoryDelete);
router.delete("/", CategoryDeleteAll);
module.exports = router;
