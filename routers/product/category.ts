import type { Request, Response } from "express";
const express = require("express");
const {
  CategoryList,
  CategoryListById,
  CategoryAdd,
  CategoryUpdate,
  CategoryDelete,
  CategoryDeleteAll,
} = require("../../controllers/product/category");
const upload = require("../../middlewares/uploadFile");

const router = express.Router();

router.get("/", CategoryList);
router.get("/:id", CategoryListById);
router.post("/", upload.single("image"), CategoryAdd);
router.put("/:id", upload.single("image"), CategoryUpdate);
router.delete("/:id", CategoryDelete);
router.delete("/", CategoryDeleteAll);
module.exports = router;
