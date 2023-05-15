import express, { Request, Response } from "express";
import { Product, ProductDoc } from "../../models/product";

const router = express.Router();

router.get("/api/products", async (req: Request, res: Response) => {
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;
    const name: string = String(req.query.search);

    const productsQuery = Product.where("name").regex(new RegExp(name, "i"))
      .skip((page - 1) * pageSize)
      .limit(pageSize)
  
    const productsCountQuery = Product.where("name").regex(new RegExp(name, "i")).countDocuments();
  
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
