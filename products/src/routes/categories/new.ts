import { requireAuth, validateRequest } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Category } from "../../models/category";

const router = express.Router();

router.post(
  "/api/categories",
  requireAuth("user"),
  [
    body("name").not().isEmpty().withMessage("Name is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const category = Category.build({
      name,
    });

    category.save()

    res.status(201).send(category);
  }
);

export { router as createCategoryRouter };
