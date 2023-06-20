import { requireAuth } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/orders",
  requireAuth("admin"),
  async (req: Request, res: Response) => {
    const orders = await Order.find({}).populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    res.status(200).send(orders);
  }
);

export { router as indexOrderRouter };
