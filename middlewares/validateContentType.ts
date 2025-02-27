import type { Request, Response, NextFunction } from "express";

export const validateContentType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "POST" || req.method === "PUT") {
    if (req.headers["content-type"] !== "application/json") {
      return res.status(400).json({
        message: "Content-Type must be application/json",
      });
    }
  }
  next();
};
