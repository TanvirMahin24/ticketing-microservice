import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Enter a valid email address!"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage(
        "Enter password with minimum 4 charecters and maximum of 20 charecters!"
      ),
  ],
  (req: Request, res: Response) => {
    // Validation Result
    const errors = validationResult(req);

    // Handle error response
    if (!errors.isEmpty()) {
      console.log(errors.array());
      throw new RequestValidationError(errors.array());
    }

    // Request body data
    const { email, password } = req.body;

    res.send("Signin");
  }
);

export { router as signinRouter };
