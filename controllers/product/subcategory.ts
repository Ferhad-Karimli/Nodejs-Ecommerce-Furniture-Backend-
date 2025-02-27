import type { Request, Response } from "express";

const {
  SubCategory,
  subCategoryValidate,
} = require("../../models/product/subcategory");

exports.SubCategoryList = async (req: Request, res: Response) => {
  try {
    const category = await SubCategory.find().populate("subCotegeries");
    res.status(200).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

exports.SubCategoryListById = async (req: Request, res: Response) => {
  try {
    const category = await SubCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

exports.SubCategoryAdd = async (req: Request, res: Response) => {
  try {
    const { error } = subCategoryValidate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const category = new SubCategory(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

exports.SubCategoryUpdate = async (req: Request, res: Response) => {
  try {
    const { error } = subCategoryValidate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

exports.SubCategoryDelete = async (req: Request, res: Response) => {
  try {
    const category = await SubCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
