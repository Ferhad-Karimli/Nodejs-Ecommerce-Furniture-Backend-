import type { Request, Response } from "express";
const { Error } = require("mongoose");
const {
  ComfortImages,
  comfortImagesValidate,
} = require("../../models/home/comfortImages");
const { deleteManyOldImages } = require("../../utils/deleteOldImage");
exports.ComfortImagesList = async (req: Request, res: Response) => {
  const threeImage = await ComfortImages.find();
  res.status(200).json(threeImage);
};

exports.ComfortImagesAdd = async (req: Request, res: Response) => {
  try {
    // uploded as files
    // if (req.files && Array.isArray(req.files)) {
    //   req.body.images = (req.files as Express.Multer.File[]).map(
    //     (file) => file.path
    //   );
    // }
    // uploded as files
    const { error } = comfortImagesValidate(req.body);
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

    const threeImage = new ComfortImages(req.body);
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

exports.ComfortImagesEdit = async (req: Request, res: Response) => {
  // uploded as files
  //   if (req.files && Array.isArray(req.files)) {
  //     req.body.images = (req.files as Express.Multer.File[]).map(
  //       (file) => file.path
  //     );
  //   }
  // uploded as files
  const { error } = comfortImagesValidate(req.body);
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

  const threeImage = await ComfortImages.findByIdAndUpdate(
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

exports.ComfortImagesDel = async (req: Request, res: Response) => {
  const threeImage = await ComfortImages.findByIdAndDelete(req.params.id);

  if (!threeImage) {
    return res.status(404).send("Data not found");
  } else {
    res.status(200).json(threeImage);
    deleteManyOldImages(threeImage?.images);
  }
};

exports.ComfortImagesAll = async (req: Request, res: Response) => {
  try {
    const allDocuments = await ComfortImages.find();
    const allImages = await allDocuments.flatMap(
      (doc: any) => doc.images || []
    );
    await ComfortImages.deleteMany();
    await deleteManyOldImages(allImages);
    res.status(200).json({ message: "All datas removed succesfully" });
    await deleteManyOldImages(allImages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
