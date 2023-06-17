import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validation Result
  const errors = validationResult(req);

  // Handle error response
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
