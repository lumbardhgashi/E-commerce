import {
  Listener,
  Subjects,
  ExpirationCompleteEvent,
  OrderStatus,
} from "@aaecomm/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { Order } from "../../models/order";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

  queueGroupName: string = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const { orderId } = data;

    const order = await Order.findById(orderId).populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if(order.status === OrderStatus.Complete) {
      return msg.ack()
    }

    order.set({ status: OrderStatus.Cancelled });

    await order.save();

    const formattedOrderItems = order.orderItems.map((orderItem) => ({
      product: {
        id: orderItem.product._id,
        price: orderItem.product.price
      },
      quantity: orderItem.quantity,
    }));

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      expiresAt: order.expiresAt,
      status: order.status,
      orderItems: formattedOrderItems,
      version: order.version,
      userId: order.userId
    });

    msg.ack();
  }
}
