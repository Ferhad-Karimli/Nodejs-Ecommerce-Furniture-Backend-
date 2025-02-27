import type { Request, Response } from "express";
const express = require("express");
const {
  SubCategoryList,
  SubCategoryListById,
  SubCategoryAdd,
  SubCategoryUpdate,
  SubCategoryDelete,
} = require("../../controllers/product/subcategory");

const router = express.Router();

router.get("/", SubCategoryList);
router.get("/:id", SubCategoryListById);
router.post("/", SubCategoryAdd);
router.put("/:id", SubCategoryUpdate);
router.delete("/:id", SubCategoryDelete);

module.exports = router;
