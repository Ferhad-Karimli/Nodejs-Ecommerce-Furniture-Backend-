import type { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    role: string;
  };
}

module.exports = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).send("You do not have access permission");
    return;
  }
  next();
};
