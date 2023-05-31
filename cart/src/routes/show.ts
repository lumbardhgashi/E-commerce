import { NotFoundError, currentUser, requireAuth } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { Cart } from "../models/cart";

const router = express.Router();

router.get(
  "/api/cart/get",
  requireAuth("user"),
  async (req: Request, res: Response) => {
    const user = req.currentUser;

    const cart = await (await Cart.findOrCreate(user!.id)).populate({
      path: 'cartItems',
      populate: {
        path: 'product',
        model: 'Product',
      },
    });
    if(!cart) {
        throw new NotFoundError()
    }
    
    res.send({cart})
  }
);

export { router as showCartRouter };
