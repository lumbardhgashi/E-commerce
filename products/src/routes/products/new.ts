import { NotFoundError, requireAuth, validateRequest } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { natsWrapper } from "../../nats-wrapper";
import { ProductCreatedPublisher } from "../../events/publishers/product-created-publisher";
import mongoose from "mongoose";
import { Category } from "../../models/category";
import { Product } from "../../models/product";

// const upload: Multer = multer({ dest: "uploads/" });
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
    body("stock").isInt({ gt: 0 }).withMessage("Stock must be greater than 0"),
    body("categoryId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input)) // assumes that the ticket service uses MongoDB
      .withMessage("TickedId must be provided"),
  ],
  // upload.single("file"),
  validateRequest,
  async (req: Request, res: Response) => {

    // if (!req.file) {
    //   throw new Error("Ska file");
    // }

    const { name, description, stock, price, categoryId } = req.body;

    const category = await Category.findById(categoryId);

    if (!category) {
      throw new NotFoundError();
    }

    const product = Product.build({
      name,
      description,
      price,
      stock,
      category,
    });

    product.save();

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
