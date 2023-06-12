import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order, OrderStatus } from "../../models/order";
import { stripe } from "../../stripe";

declare const global: NodeJS.Global & typeof globalThis;

jest.mock("../../stripe");

describe("POST /api/payments", () => {
  it("it returns 404 when order doesn't exist", async () => {
    await request(app)
      .post("/api/payments")
      .set("Cookie", global.signin())
      .send({
        token: "asddsa",
        orderId: new mongoose.Types.ObjectId().toHexString(),
      })
      .expect(404);
  });

  it("returns a 401 when purchasing an order that doesn't belong to the user", async () => {
    const order = Order.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      userId: new mongoose.Types.ObjectId().toHexString(),
      version: 0,
      totalPrice: 20,
      status: OrderStatus.Created,
    });

    await order.save();

    await request(app)
      .post("/api/payments")
      .set("Cookie", global.signin())
      .send({
        token: "asddsa",
        orderId: order.id,
      })
      .expect(401);
  });
  it("returns a 400 when purchasing a cancelled order", async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      userId,
      version: 0,
      totalPrice: 20,
      status: OrderStatus.Cancelled,
    });

    await order.save();

    await request(app)
      .post("/api/payments")
      .set("Cookie", global.signin(userId))
      .send({
        token: "asddsa",
        orderId: order.id,
      })
      .expect(400);
  });
  it("returns a 204 with valid inputs", async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      userId,
      version: 0,
      totalPrice: 20,
      status: OrderStatus.Created,
    });

    await order.save();

    await request(app)
      .post("/api/payments")
      .set("Cookie", global.signin(userId))
      .send({
        token: "tok_visa",
        orderId: order.id,
      })
      .expect(201);

    const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0]

    expect(chargeOptions.source).toEqual('tok_visa'),
    expect(chargeOptions.amount).toEqual(20 * 100),
    expect(chargeOptions.currency).toEqual('eur')
  });
});
