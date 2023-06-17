import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserType {
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserType;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check JWT exists or not
  if (!req.session?.jwt) {
    return next();
  }

  // verify token
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserType;
    req.currentUser = payload;
  } catch (error) {}

  next();
};
