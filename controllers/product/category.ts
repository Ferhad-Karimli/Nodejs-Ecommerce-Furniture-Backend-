import type { Request, Response } from "express";

const { Category, categoryValidate } = require("../../models/product/category");

exports.CategoryList = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const lang = (req.query.lang as string) || "en";

    const categories = await Category.find()
      .populate({
        path: "subCategories",
        select: "name , products -_id",
        populate: {
          path: "products",
          options: { limit: 10 },
        },
      })
      .populate({ path: "products" })
      .skip((page - 1) * limit)
      .limit(limit);

    const localizedCategories = categories.map((category: any) => ({
      ...category.toObject(),
      name: category.name[lang],
    }));

    const total = await Category.countDocuments();

    res.status(200).json({
      categories: localizedCategories,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalCategories: total,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

exports.CategoryListBySlug = async (req: Request, res: Response) => {
  try {
    const lang = (req.query.lang as string) || "en";
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const localizedCategory = {
      ...category.toObject(),
      name: category.name[lang],
    };
    res.status(200).json(localizedCategory);
  } catch (error: any) {
    console.log("this catch");
    res.status(500).json({ error: error.message });
  }
};

exports.CategoryAdd = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    req.body.image = req.file.path;
    const { error } = categoryValidate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }

    const category = new Category(req.body);
    await category.save();

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.CategoryUpdate = async (req: Request, res: Response) => {
  try {
    const { error } = categoryValidate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Ensure name and description have both languages if they are being updated
    if (
      (req.body.name && (!req.body.name.en || !req.body.name.az)) ||
      (req.body.description &&
        (!req.body.description.en || !req.body.description.az))
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Both English and Azerbaijani translations are required for name and description",
      });
    }

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
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
