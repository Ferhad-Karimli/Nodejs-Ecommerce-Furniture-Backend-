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

const router = express.Router();

router.get("/", CategoryList);
router.get("/:id", CategoryListById);
router.post("/", CategoryAdd);
router.put("/:id", CategoryUpdate);
router.delete("/:id", CategoryDelete);
router.delete("/", CategoryDeleteAll);
module.exports = router;
