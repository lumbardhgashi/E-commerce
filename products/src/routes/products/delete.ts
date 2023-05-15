import { NotFoundError, requireAuth } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { Product } from "../../models/product";
import { ProductDeletedPublisher } from "../../events/publishers/product-deleted-publisher";
import { natsWrapper } from "../../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/products/:id",
  requireAuth("user"),
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new NotFoundError();
    }

    await product.deleteOne();

    await new ProductDeletedPublisher(natsWrapper.client).publish({
      id: product.id,
      version: product.version,
    });

    res.status(204).send();
  }
);

export { router as deleteProductRouter };
