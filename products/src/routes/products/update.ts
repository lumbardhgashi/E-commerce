import { requireAuth, validateRequest, NotFoundError, NotAuthorizedError, BadRequestError } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { natsWrapper } from "../../nats-wrapper";
import { Product } from "../../models/product";
import { ProductUpdatedPublisher } from "../../events/publishers/product-updated-publisher";

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
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { name,description, stock, price } = req.body;

    const product = await Product.findById(req.params.id)

    console.log("UPDATED",product);

    if(!product) {
        throw new NotFoundError()
    }


    product.set({
        name,
        description,
        stock,
        price
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
