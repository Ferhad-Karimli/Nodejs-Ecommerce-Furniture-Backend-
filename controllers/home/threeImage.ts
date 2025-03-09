import type { Request, Response } from "express";
const { Error } = require("mongoose");
const {
  ThreeImage,
  threeImageValidate,
} = require("../../models/home/threeImage");
const { deleteSingleOldImage } = require("../../utils/deleteOldImage");
exports.ThreeImageList = async (req: Request, res: Response) => {
  const threeImage = await ThreeImage.find();
  res.status(200).json(threeImage);
};

exports.ThreeImageAdd = async (req: Request, res: Response) => {
  try {
    const { error } = threeImageValidate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    if (!req.body.title.az || !req.body.title?.en) {
      return res.status(400).json({
        success: false,
        error:
          "Both English and Azerbaijani translations are required for title and description",
      });
    }

    const threeImage = new ThreeImage(req.body);
    const savedThreeImage = await threeImage.save();

    res.status(201).json({
      success: true,
      data: savedThreeImage,
    });
  } catch (error) {
    console.error("Error details:", error);

    // Type guard to check if error is an Error instance
    if (!(error instanceof Error)) {
      return res.status(500).json({
        success: false,
        error: "An unexpected error occurred",
        details: "Unknown error",
      });
    }

    // Now TypeScript knows error is an Error instance
    const err = error as Error & { name?: string };

    if (err.name) {
      // Handle validation error
      if (err.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: err.message,
        });
      }

      // Handle database error
      if (err.name === "MongoError" || err.name === "MongoServerError") {
        return res.status(400).json({
          success: false,
          error: "Database error occurred",
          details: err.message,
        });
      }
    }
  }
};

exports.ThreeImageEdit = async (req: Request, res: Response) => {
  const { error } = threeImageValidate(req.body);
  if (error) {
    res.status(400).send(error.messages);
  } else {
    if (!req.body.title?.az || !req.body.title.en) {
      return res.status(400).json({
        success: false,
        error:
          "Both English and Azerbaijani translations are required for title and description",
      });
    }
  }

  const threeImage = await ThreeImage.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (!threeImage) {
    return res.status(404).json({ error: "Data Not Found" });
  }
  res.status(200).json(threeImage);
};

exports.ThreeImageDel = async (req: Request, res: Response) => {
  const threeImage = await ThreeImage.findByIdAndDelete(req.params.id);

  if (!threeImage) {
    return res.status(404).send("Data not found");
  } else {
    res.status(200).json(threeImage);
  }
};

exports.ThreeImageDeleteAll = async (req: Request, res: Response) => {
  try {
    await ThreeImage.deleteMany();
    res.status(200).json({ message: "All datas removed succesfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
