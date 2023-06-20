import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from "@aaecomm/common";
import { User } from "../models/user";

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
      body('role').optional().isIn(['admin', 'user']),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    let { email, password, username, role = "user" } = req.body;

    if(role === "admin") {
      role = ["user", "admin"]
    } else {
      role = ["user"]
    }

    const existingEmail = await User.findOne({ where: { email } });

    if (existingEmail) {
      throw new BadRequestError("Email in use");
    }
    const existingUsername = await User.findOne({ where: { username } });

    if (existingUsername) {
      throw new BadRequestError("Username in use");
    }

    const user = await User.create({
      username,
      email,
      password,
      role
    });

    const userJwt = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
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
