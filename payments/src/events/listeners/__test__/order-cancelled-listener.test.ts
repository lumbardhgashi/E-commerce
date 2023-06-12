import { natsWrapper } from "../../../nats-wrapper";
import {
  OrderCancelledEvent,
  OrderCreatedEvent,
  OrderStatus,
} from "@aaecomm/common";
import mongoose, { set } from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/order";
import { OrderCancelledListener } from "../order-cancelled-listener";

declare const global: NodeJS.Global & typeof globalThis;

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    totalPrice: 100,
    userId: "asd",
    version: 0,
  });

  await order.save()

  const data: OrderCancelledEvent["data"] = {
    id: order._id.toHexString(),
    version: 1,
    expiresAt: new Date(),
    userId: "asddsa",
    status: OrderStatus.Created,
    orderItems: [
      {
        product: {
          id: "asddsa",
          price: 10,
        },
        quantity: 5,
      },
    ],
  };

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order };
};

describe("Order Cancelled Listener", () => {
  it("updates the status of the order", async () => {
    const { listener, data, msg, order } = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(data.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
  });

  it("acks the message", async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});
