import type { Request, Response } from "express";
const { Order, orderValidate } = require("../../models/ubwo/order");

exports.OrderAdd = async (req: Request, res: Response) => {
  try {
    const { error } = orderValidate(req.body);

    const { user, product } = req.body;

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
    }

    const orderList = new Order(req.body);
    await orderList.save();

    res.status(201).json({
      success: true,
      data: orderList,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
