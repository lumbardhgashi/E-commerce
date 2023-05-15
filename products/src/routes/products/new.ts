import { requireAuth, validateRequest } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Product } from "../../models/product";
import { natsWrapper } from "../../nats-wrapper";
import { ProductCreatedPublisher } from "../../events/publishers/product-created-publisher";

const router = express.Router();

router.post(
  "/api/products",
  requireAuth("user"),
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("description").not().isEmpty().withMessage("Description is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
    body("stock")
      .isInt({ gt: 0 })
      .withMessage("Stock must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name,description, stock, price } = req.body;

    const product = Product.build({
      name,
      description,
      price,
      stock,
    });

    product.save()

    await new ProductCreatedPublisher(natsWrapper.client).publish({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      version: product.version,
    });

    res.status(201).send(product);
  }
);

export { router as createProductRouter };
