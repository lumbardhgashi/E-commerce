import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@aaecomm/common";
import express, { Request, Response } from "express";
import { Order, OrderStatus } from "../models/order";
import { natsWrapper } from "../nats-wrapper";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";

const router = express.Router();

router.delete(
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

    order.status = OrderStatus.Cancelled;

    await order.save();

    const formattedOrderItems = order.orderItems.map((orderItem) => ({
      product: {
        id: orderItem.product._id,
        price: orderItem.product.price
      },
      quantity: orderItem.quantity,
    }));
    
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order._id,
      expiresAt: order.expiresAt,
      status: order.status,
      orderItems: formattedOrderItems,
      version: order.version,
      userId: order.userId
    })

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
