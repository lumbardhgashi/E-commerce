import { Message } from "node-nats-streaming";
import { Listener, OrderCancelledEvent, OrderStatus, Subjects } from "@aaecomm/common";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;

  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const { id, expiresAt, orderItems, status, version, userId  } = data;

    const order = await Order.findOne({
      _id: id,
    })

    if(!order) {
      throw new Error("Order not found")
    }

    order.set({
      status: OrderStatus.Cancelled
    })

    await order.save()

    msg.ack();
  }
}
