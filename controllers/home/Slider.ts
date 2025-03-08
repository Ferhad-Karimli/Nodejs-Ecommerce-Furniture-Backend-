import type { Request, Response } from "express";
const { Error } = require("mongoose");
const { Slider, sliderValidate } = require("../../models/home/slider");
const { deleteSingleOldImage } = require("../../utils/deleteOldImage");

exports.SliderList = async (req: Request, res: Response) => {
  const slider = await Slider.find();
  res.status(200).json(slider);
};

exports.SliderAdd = async (req: Request, res: Response) => {
  try {
    // uploded as file
    // if (!req.file) {
    //   return res.status(400).json({ error: "No image uploaded" });
    // }
    // req.body.image = req.file.path.replace(/\\/g, "/");
    // uploded as file

    const { error } = sliderValidate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Ensure title and description have both languages
    if (
      !req.body.title?.en ||
      !req.body.title?.az ||
      !req.body.description?.en ||
      !req.body.description?.az
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Both English and Azerbaijani translations are required for title and description",
      });
    }

    const slider = new Slider(req.body);
    const savedSlider = await slider.save();

    res.status(201).json({
      success: true,
      data: savedSlider,
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

    // Generic error handler
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred while creating the slider",
      details: err.message,
    });
  }
};

exports.SliderEdit = async (req: Request, res: Response) => {
  const { error } = sliderValidate(req.body);

  if (error) {
    res.status(400).send(error.messages);
  } else {
    // Ensure title and description have both languages when updating
    if (
      !req.body.title?.en ||
      !req.body.title?.az ||
      !req.body.description?.en ||
      !req.body.description?.az
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Both English and Azerbaijani translations are required for title and description",
      });
    }

    const category = await Slider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ error: "Slider not found" });
    }
    res.status(200).json(category);
  }
};

exports.SliderDel = async (req: Request, res: Response) => {
  const slider = await Slider.findByIdAndDelete(req.params.id);
  if (!slider) {
    return res.status(404).send("Slider not found");
  } else {
    res.status(200).json(slider);
    console.log(slider);
    deleteSingleOldImage(slider.image);
  }
};
