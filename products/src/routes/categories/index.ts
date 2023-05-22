import express, { Request, Response } from "express";
import { Category, CategoryDoc } from "../../models/category";

const router = express.Router();

router.get("/api/categories", async (req: Request, res: Response) => {
  const page: number = Number(req.query.page) || 1;
  const pageSize: number = Number(req.query.pageSize) || 10;

  const categoriesQuery = Category.find({})
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    
  const categoriesCountQuery = Category.find({}).countDocuments();

  const [categories, totalCategoriesCount] = await Promise.all([
    categoriesQuery.exec() as Promise<CategoryDoc[]>,
    categoriesCountQuery.exec() as Promise<number>,
  ]);

  const totalPages = Math.ceil(totalCategoriesCount / pageSize);

  const metadata = {
    totalCategories: totalCategoriesCount,
    currentPage: page,
    pageSize: pageSize,
    totalPages: totalPages,
  };

  res.send({ categories, metadata });
});

export { router as indexCategoryRouter };
