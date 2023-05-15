import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/users";
import { BadRequestError, validateRequest } from "@aaecomm/common";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("username")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Username must contain only letters, numbers, and underscores"
    ),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 char"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new BadRequestError("Email in use");
    }
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      throw new BadRequestError("Username in use");
    }

    const user = User.build({
      username,
      email,
      password,
    });

    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
