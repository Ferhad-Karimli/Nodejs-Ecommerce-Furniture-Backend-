import type { Request, Response } from "express";

const { Category, categoryValidate } = require("../../models/product/category");

exports.CategoryList = async (req: Request, res: Response) => {
  try {
    const category = await Category.find().populate("subCategories");
    res.status(200).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

exports.CategoryListById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

exports.CategoryAdd = async (req: Request, res: Response) => {
  try {
    const { error } = categoryValidate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const category = await new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

exports.CategoryUpdate = async (req: Request, res: Response) => {
  try {
    const { error } = categoryValidate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const catgeory = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!catgeory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(catgeory);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

exports.CategoryDelete = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

exports.CategoryDeleteAll = async (req: Request, res: Response) => {
  try {
    await Category.deleteMany();
    res.status(200).json({ message: "All categories deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
