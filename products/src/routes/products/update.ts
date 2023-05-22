import { requireAuth, validateRequest, NotFoundError} from "@aaecomm/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { natsWrapper } from "../../nats-wrapper";
import { ProductUpdatedPublisher } from "../../events/publishers/product-updated-publisher";
import mongoose from "mongoose";
import { Category } from "../../models/category";
import { Product } from "../../models/product";

const router = express.Router();

router.put(
  "/api/products/:id",
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
    body("categoryId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input)) // assumes that the ticket service uses MongoDB
      .withMessage("TickedId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { name,description, stock, price, categoryId } = req.body;

    const category = await Category.findById(categoryId)

    if(!category) {
      throw new NotFoundError()
    }

    const product = await Product.findById(req.params.id)

    console.log("UPDATED",product);

    if(!product) {
        throw new NotFoundError()
    }


    product.set({
        name,
        description,
        stock,
        price,
        category
    })

    await product.save();

    await new ProductUpdatedPublisher(natsWrapper.client).publish({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      version: product.version,
    });

    res.send(product)
    
  }
);

export { router as updateProductRouter };
