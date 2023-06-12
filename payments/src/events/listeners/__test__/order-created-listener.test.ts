import { OrderCreatedListener } from "../order-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedEvent, OrderStatus } from "@aaecomm/common";
import mongoose, { set } from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/order";

declare const global: NodeJS.Global & typeof globalThis;

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
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

  return { listener, data, msg };
};

describe("Order Created Listener", () => {
  it("replicates order info", async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const order = await Order.findById(data.id);

    expect(order!._id.toHexString()).toEqual(data.id);
    expect(order!.status).toEqual(data.status);
  });

  it("acks the message", async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});
