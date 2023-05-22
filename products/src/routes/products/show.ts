import { NotFoundError } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { Product } from "../../models/product";

const router = express.Router();

router.get("/api/products/:id", async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id).populate({
    path: "category",
    select: "id name",
  });
  console.log("GOT", product);
  if (!product) {
    throw new NotFoundError();
  }

  res.send(product);
});

export { router as showProductRouter };
