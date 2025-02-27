import type { Request, Response, NextFunction } from "express";

export const languageMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get language from header or query parameter
  const lang = (req.headers["accept-language"] || req.query.lang || "en")
    .toString()
    .toLowerCase();

  // Only allow 'en' or 'az'
  req.language = ["en", "az"].includes(lang) ? lang : "en";

  next();
};

// Add types to Express Request
declare global {
  namespace Express {
    interface Request {
      language: string;
    }
  }
}
