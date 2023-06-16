import {
  Listener,
  OrderStatus,
  PaymentCreatedEvent,
  Subjects,
} from "@aaecomm/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

  queueGroupName: string = queueGroupName;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const { orderId, id, stripeId } = data;

    
    msg.ack();
  }
}
