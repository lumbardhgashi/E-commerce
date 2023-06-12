import { Message } from "node-nats-streaming";
import { Listener, OrderCreatedEvent, Subjects } from "@aaecomm/common";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { id, expiresAt, orderItems, status, version, userId } = data;

    const totalPrice = orderItems.reduce((total, orderItem) => {
      const { product, quantity } = orderItem;
      const itemPrice = product.price * quantity;
      return total + itemPrice;
    }, 0);

    const order = Order.build({
      id,
      status,
      userId,
      version,
      totalPrice
    })

    await order.save()

    msg.ack();
  }
}
