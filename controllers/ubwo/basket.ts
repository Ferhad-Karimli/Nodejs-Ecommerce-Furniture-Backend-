import type { Request, Response } from "express";
const { Basket, basketValidate } = require("../../models/ubwo/basket");

exports.BasketGet = async (req: Request, res: Response) => {
  try {
    const wishList = await Basket.find()
      .populate({
        path: "product",
        select: "title price coverImage slug -_id ",
      })
      .populate({
        path: "user",
        select: "fullname email -_id",
      });

    res.status(200).json({
      wishList,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
exports.BasketAdd = async (req: Request, res: Response) => {
  try {
    const { error } = basketValidate(req.body);

    const { user, product } = req.body;

    const existingBasket = await Basket.findOne({ user, product });

    if (existingBasket) {
      return res
        .status(400)
        .json({ success: false, message: "Product already exisred" });
    }

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }

    const wishList = new Basket(req.body);
    await wishList.save();

    res.status(201).json({
      success: true,
      data: wishList,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.BasketDelete = async (req: Request, res: Response) => {
  try {
    const wishList = await Basket.findByIdAndDelete(req.params.id);

    if (!wishList) {
      return res.status(404).json({ message: "WHish list not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
