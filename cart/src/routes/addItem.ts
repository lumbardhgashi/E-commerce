import {
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@aaecomm/common";
import express, { Request, Response } from "express";
import { Cart } from "../models/cart";
import { Product } from "../models/product";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/cart/add",
  requireAuth("user"),
  [
    body("productId")
      .not()
      .isEmpty()
      .withMessage("Product ID must be provided"),
    body("quantity")
      .optional()
      .isFloat({ gt: 0 })
      .withMessage("Quantity must be a number greater than 1"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const user = req.currentUser;

    const { productId, quantity = 1 } = req.body;
    
    let cart = await Cart.findOrCreate(user!.id);
    
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError();
    }

    await cart.addItemsToCart(product, quantity);
    
    res.status(200).send({ cart });
  }
);

export { router as addItemToCartRoute };
