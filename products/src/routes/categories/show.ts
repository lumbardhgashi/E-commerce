import { NotFoundError } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { Category } from "../../models/category";

const router = express.Router();

router.get("/api/categories/:id", async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new NotFoundError();
  }

  res.send(category);
});

export { router as showCategoryRouter };
