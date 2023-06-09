import { requireAuth } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/orders/users/:userId",
  requireAuth("user"),
  async (req: Request, res: Response) => {
    const orders = await Order.find({ userId: req.params.userId }).populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    res.status(200).send(orders);
  }
);

export { router as getUserOrdersRouter };
