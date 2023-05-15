import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";

declare const global: NodeJS.Global & typeof globalThis;

describe("GET /api/Products/:id", () => {
  it("returns a 404 if product not found", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/products/${id}`).send().expect(404);
  });
  it("returns product if product found", async () => {
    const cookie = await global.signin();
    const name = "Product";
    const description = "Product description";
    const price = 50;
    const stock = 10;

    const response = await request(app)
      .post("/api/products")
      .set("Cookie", cookie)
      .send({
        name: "Product",
        description: "Product description",
        price: 50,
        stock: 10,
      })
      .expect(201);

    const product = await request(app)
      .get(`/api/products/${response.body.id}`)
      .send()
      .expect(200);

    expect(product.body.name).toEqual(name);
    expect(product.body.description).toEqual(description);
    expect(product.body.price).toEqual(price);
    expect(product.body.stock).toEqual(stock);
  });
});
