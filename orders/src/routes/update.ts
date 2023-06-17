import {
  BadRequestError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@aaecomm/common";
import express, { Request, Response } from "express";
import { Order, OrderStatus } from "../models/order";
import { OrderPaidPublisher } from "../events/publishers/order-paid-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();


router.put(
  "/api/orders/:id",
  requireAuth("user"),
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      throw new NotFoundError();
    }
    console.log({order}, {id}, "FOUND ORDER");
    order.set({
      status: OrderStatus.Complete,
    });

    await order.save();

    console.log({order}, "ORDER AFTER UPDATE");

    new OrderPaidPublisher(natsWrapper.client).publish({
      id: order.id,
      userId: order.userId
    })
    res.status(200).send(order);
  }
);

export { router as updateOrderRouter };
