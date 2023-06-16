import { Listener, OrderCreatedEvent, Subjects } from "@aaecomm/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {

    const {id, expiresAt} = data

    const delay = new Date(expiresAt).getTime() - new Date().getTime()
    console.log(delay);

    await expirationQueue.add(
      {
        orderId: id,
      },
      { delay}
    );

    msg.ack();
  }
}
