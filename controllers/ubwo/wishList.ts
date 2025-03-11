import type { Request, Response } from "express";
const { WishList, wishListValidate } = require("../../models/ubwo/wishList");

exports.WishListGet = async (req: Request, res: Response) => {
  try {
    const wishList = await WishList.find()
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
exports.WishListAdd = async (req: Request, res: Response) => {
  try {
    const { error } = wishListValidate(req.body);

    const { user, product } = req.body;

    const existingWish = await WishList.findOne({ user, product });

    if (existingWish) {
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

    const wishList = new WishList(req.body);
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

exports.WishListDelete = async (req: Request, res: Response) => {
  try {
    const wishList = await WishList.findByIdAndDelete(req.params.id);

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
