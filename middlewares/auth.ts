import type { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    role: string;
  };
}

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("You do not have authority");
  }

  try {
    const decodedToken = jwt.verify(token, "jwtPrivateKey");
    req.user = decodedToken;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token"); // Fixed: status code is a number, message is a string
  }
};
