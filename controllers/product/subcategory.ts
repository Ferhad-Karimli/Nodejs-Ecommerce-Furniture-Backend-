import type { Request, Response } from "express";
const { Category } = require("../../models/product/category");

const {
  SubCategory,
  subCategoryValidate,
} = require("../../models/product/subcategory");

exports.SubCategoryList = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const subCategories = await SubCategory.find()
      .populate({
        path: "category",
        select: "name -_id",
        populate: {
          path: "products",
          select: "-_id",
        },
      })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await SubCategory.countDocuments();

    res.status(200).json({
      subCategories,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalSubCategories: total,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

exports.SubCategoryListBySlug = async (req: Request, res: Response) => {
  try {
    const lang = (req.query.lang as string) || "en";
    const { slug } = req.params;
    const subCotegory = await SubCategory.findOne({ slug });
    console.log(subCotegory, "subCOtegory");
    if (!subCotegory) {
      return res.status(404).json({ error: "SubCotegry not found" });
    }

    const localizedCategory = {
      ...subCotegory.toObject(),
      name: subCotegory.name[lang],
    };

    res.status(200).json(localizedCategory);
  } catch (error: any) {
    console.log("thiss catch");
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
    } else {
    }
    const subCotegary = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!subCotegary) {
      return res.status(404).json({ error: "Subcotegory not found" });
    }

    res.status(200).json(subCotegary);
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
