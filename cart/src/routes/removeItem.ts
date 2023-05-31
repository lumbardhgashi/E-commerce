import {
  BadRequestError,
  NotFoundError,
  currentUser,
  requireAuth,
  validateRequest,
} from "@aaecomm/common";
import express, { Request, Response } from "express";
import { Cart } from "../models/cart";
import { Product } from "../models/product";
import { body } from "express-validator";
import mongoose from "mongoose";

const router = express.Router();

router.post(
  "/api/cart/remove",
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
    try {
      const user = req.currentUser;

      const { productId, quantity = 1 } = req.body;

      let cart = await Cart.findOne({
        userId: user?.id,
      });
      if (!cart) {
        throw new NotFoundError();
      }

      const product = await Product.findById(productId);
      if (!product) {
        throw new NotFoundError();
      }

      await cart.removeItemsFromCart(product, quantity);

      res.status(200).send({ cart });
    } catch (err) {
      console.log({ err });
      res.status(400).send({ err });
    }
  }
);

export { router as removeItemToCartRoute };
