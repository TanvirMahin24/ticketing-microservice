import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Enter a valid email address!"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage(
        "Enter password with minimum 4 charecters and maximum of 20 charecters!"
      ),
  ],
  async (req: Request, res: Response) => {
    // Validation Result
    const errors = validationResult(req);

    // Handle error response
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    // Request body data
    const { email, password } = req.body;

    // Check user with email exists
    const userExist = await User.findOne({ email });

    // response for existing user
    if (userExist) {
      throw new BadRequestError("Email already in use!");
    }

    // If User with email does not exists
    const user = User.build({ email, password });
    await user.save();

    // Send success response
    return res.status(201).send(user);
  }
);

export { router as signupRouter };
