import {
  requireAuth,
  validateRequest,
  NotFoundError,
} from "@aaecomm/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Category } from "../../models/category";

const router = express.Router();

router.put(
  "/api/categories/:id",
  requireAuth("user"),
  [body("name").not().isEmpty().withMessage("Name is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      throw new NotFoundError();
    }

    category.set({
      name,
    });

    await category.save();

    res.send(category);
  }
);

export { router as updateCategoryRouter };
