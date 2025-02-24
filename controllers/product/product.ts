import type { Request, Response } from "express";

const { Product, productValidate } = require("../../models/product/product");

exports.ProductList = async (req: Request, res: Response) => {
  const product = await Product.find();
  res.status(200).json(product);
};
exports.ProdcutListById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  return res.status(200).json(product);
};

exports.ProductAdd = async (req: Request, res: Response) => {
  try {
    const { error } = productValidate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json({
      success: true,
      data: savedProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.ProductEdit = async (req: Request, res: Response) => {
  try {
    // Handle uploaded files
    if (req.files && Array.isArray(req.files)) {
      req.body.images = (req.files as Express.Multer.File[]).map(
        (file) => file.path
      );
    }

    const { error } = productValidate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        error: "Error updating product",
        details: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Unknown error occurred",
      });
    }
  }
};

exports.ProductDel = async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).send("Product not found");
  } else {
    res.status(200).json(product);
  }
};
