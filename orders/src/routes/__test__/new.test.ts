import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { OrderStatus } from "../../models/order";
import { Product } from "../../models/product";
import mongoose from "mongoose";

declare const global: NodeJS.Global & typeof globalThis;

const createProduct = async () => {
  const product = Product.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    description: "test",
    name: "Product",
    price: 100,
    stock: 100,
  });
  await product.save();

  return product;
};

describe("POST /api/orders", () => {
  it("returns 200 and creates a new order", async () => {
    const user = global.signin();

    const product1 = await createProduct();
    const product2 = await createProduct();


    console.log({ product1 }, { product2 });

    const cartItems = [
      { productId: product1._id, quantity: 2 },
      { productId: product2._id, quantity: 1 },
    ];
    const shippingDetails = {
      fullName: "John Doe",
      address1: "123 Street",
      city: "City",
      zip: "12345",
      country: "Country",
    };

    const response = await request(app)
      .post("/api/orders")
      .set("Cookie", user)
      .send({ cartItems, shippingDetails })
      .expect(400);

    console.log(response.body, "Response");

    const order = await Order.findById(response.body.id);

    console.log({ order }, "Order");

    expect(order).toBeDefined();
    expect(order!.status).toEqual(OrderStatus.Created);
  });

  it("returns 400 if invalid cartItems are provided", async () => {
    const user = global.signin();

    const response = await request(app)
      .post("/api/orders")
      .set("Cookie", user)
      .send({ cartItems: [{ productId: "invalid", quantity: 2 }] })
      .expect(400);

    // Assert the response contains the expected error message or structure
  });

  // Add more test cases to cover different scenarios and edge cases
});
