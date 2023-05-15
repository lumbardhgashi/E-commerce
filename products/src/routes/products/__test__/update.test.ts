import request from "supertest";
import { Product } from "../../../models/product";
import mongoose from "mongoose";
import { app } from "../../../app";

const buildProduct = async () => {
  const product = Product.build({
    name: "Test Product",
    description: "Test description",
    price: 10,
    stock: 20,
  });
  await product.save();
  return product;
};

declare const global: NodeJS.Global & typeof globalThis;

describe("updateTicketRouter", () => {
  it("returns a 404 if the provided id does not exist", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const user = await global.signin();
    const response = await request(app)
      .put(`/api/tickets/${id}`)
      .set("Cookie", user)
      .send({
        name: "New name",
        description: "New description",
        price: 15,
        stock: 25,
      })
      .expect(404);

    expect(response.body.errors[0].message).toEqual("Not Found");
  });

  it("returns a 401 if the user is not authorized", async () => {

    const product = await buildProduct();
    await request(app)
      .put(`/api/tickets/${product.id}`)
      .send({
        name: "New name",
        description: "New description",
        price: 15,
        stock: 25,
      })
      .expect(401);
  });

  it("returns a 400 if the user provides invalid name, description, price, or stock", async () => {
    const user = await global.signin();
    const product = await buildProduct();
    await request(app)
      .put(`/api/tickets/${product.id}`)
      .set("Cookie", user)
      .send({
        name: "",
        description: "",
        price: -10,
        stock: -20,
      })
      .expect(400);
  });

  it("updates the product with valid inputs", async () => {
    const user = await global.signin();
    const product = await buildProduct();
    const newAttributes = {
      name: "New name",
      description: "New description",
      price: 15,
      stock: 25,
    };

    await request(app)
      .put(`/api/tickets/${product.id}`)
      .set("Cookie", user)
      .send(newAttributes)
      .expect(200);

    const updatedProduct = await Product.findById(product.id);
    expect(updatedProduct!.name).toEqual(newAttributes.name);
    expect(updatedProduct!.description).toEqual(newAttributes.description);
    expect(updatedProduct!.price).toEqual(newAttributes.price);
    expect(updatedProduct!.stock).toEqual(newAttributes.stock);
  });
});
