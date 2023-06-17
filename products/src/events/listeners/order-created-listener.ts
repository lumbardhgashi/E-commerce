import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group.name";
import { Listener, OrderCreatedEvent, Subjects } from "@aaecomm/common";
import { Product } from "../../models/product";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { id, expiresAt, orderItems, status } = data;

    orderItems.forEach(async (orderItem) => {
      const product = await Product.findById(orderItem.product.id);

      if (!product) {
        throw new Error("Product not found");
      }

      product.stock -= orderItem.quantity

      await product.save();
    });

    msg.ack();
  }
}
