import {
  Listener,
  OrderStatus,
  PaymentCreatedEvent,
  Subjects,
} from "@aaecomm/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderPaidPublisher } from "../publishers/order-paid-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

  queueGroupName: string = queueGroupName;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const { orderId, id, stripeId } = data;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order doesn't exist");
    }

    order.set({
      status: OrderStatus.Complete,
    });

    await order.save();

    new OrderPaidPublisher(natsWrapper.client).publish({
      id: order.id,
      userId: order.userId
    })

    msg.ack();
  }
} 
