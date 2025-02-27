import type { Request, Response } from "express";
const { Error } = require("mongoose");
const { Header, headerValidate } = require("../../models/home/header");

exports.HeaderList = async (req: Request, res: Response) => {
  const header = await Header.find();
  res.status(200).json(header);
};

exports.HeaderAdd = async (req: Request, res: Response) => {
  try {
    const { error } = headerValidate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const header = new Header(req.body);
    await header.save();
    res.status(201).json(header);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

exports.HeaderUpdate = async (req: Request, res: Response) => {
  try {
    const { error } = headerValidate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const header = await Header.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!header) {
      return res.status(404).json({ message: "Header not found" });
    }
    res.status(200).json(header);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

exports.HeaderDelete = async (req: Request, res: Response) => {
  try {
    const header = await Header.findByIdAndDelete(req.params.id);
    if (!header) {
      return res.status(404).json({ message: "Header not found" });
    }
    res.status(200).json({ message: "Header deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
exports.HeaderDeleteAll = async (req: Request, res: Response) => {
  try {
    await Header.deleteMany();
    res.status(200).json({ message: "All headers deleted succesfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
