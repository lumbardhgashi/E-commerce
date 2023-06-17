import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group.name";
import { Listener, OrderCancelledEvent, Subjects } from "@aaecomm/common";
import { Product } from "../../models/product";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;

  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const { id, expiresAt, orderItems, status } = data;

    orderItems.forEach(async (orderItem) => {
      const product = await Product.findById(orderItem.product.id);

      if (!product) {
        throw new Error("Product not found");
      }

      product.stock += orderItem.quantity

      await product.save();
    });

    msg.ack();
  }
}
