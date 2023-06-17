import express, { Request, Response } from "express";
import { Product, ProductDoc } from "../../models/product";
import { Category } from "../../models/category";

const router = express.Router();

router.get("/api/products", async (req: Request, res: Response) => {
  const page: number = Number(req.query.page) || 1;
  const pageSize: number = Number(req.query.pageSize) || 16;
  const name: string = String(req.query.search) || "";
  const categoryId: string = String(req.query.category) || "";
  const sortBy: string = String(req.query.sortBy) || "";

  const filters: any = {};

  if (name) {
    filters.name = { $regex: name, $options: "i" }; // Case-insensitive name search
  }

  if (categoryId) {
    const category = await Category.findById(categoryId);

    if (category) {
      filters.category = category;
    }
  }

  const productsQuery = Product.find(filters).populate({
    path: "category",
  });

  if (sortBy) {
    productsQuery.sort({ price: sortBy === "asc" ? 1 : -1 }); // Sort in ascending order by price
  }

  // Pagination
  productsQuery.skip((page - 1) * pageSize).limit(pageSize);

  const productsCountQuery = productsQuery.model
    .find(productsQuery.getQuery())
    .countDocuments();

  const [products, totalProductsCount] = await Promise.all([
    productsQuery.exec() as Promise<ProductDoc[]>,
    productsCountQuery.exec() as Promise<number>,
  ]);

  const totalPages = Math.ceil(totalProductsCount / pageSize);

  const metadata = {
    totalProducts: totalProductsCount,
    currentPage: page,
    pageSize: pageSize,
    totalPages: totalPages,
  };

  res.send({ products, metadata });
});
export { router as indexProductRouter };
