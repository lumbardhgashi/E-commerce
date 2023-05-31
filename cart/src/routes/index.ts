import { NotFoundError, currentUser, requireAuth } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { Cart } from "../models/cart";

const router = express.Router();

router.get(
  "/api/cart",
  requireAuth("user"),
  async (req: Request, res: Response) => {

    console.log("called 7");

    const carts = await Cart.find().populate({
      path: "cartItems",
      populate: {
        path: "product",
        model: "Product",
      },
    })
    if(!carts) {
        throw new NotFoundError()
    }
    
    res.send({carts})
  }
);

export { router as indexCartRouter };
