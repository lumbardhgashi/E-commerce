import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@aaecomm/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth("user"),
  async (req: Request, res: Response) => {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId).populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    if (!order) {
      throw new NotFoundError();
    }

    res.status(200).send(order);
  }
);

export { router as showOrderRouter };
