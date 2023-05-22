import {NotFoundError, requireAuth } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { Category } from "../../models/category";

const router = express.Router();

router.delete(
  "/api/categories/:id",
  requireAuth("user"),
  async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
      throw new NotFoundError();
    }

    await category.deleteOne();

    res.status(204).send(true);
  }
);

export { router as deleteCategoryRouter };
