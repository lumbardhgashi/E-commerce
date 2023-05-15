import request from "supertest";
import { app } from "../../../app";
import { Product } from "../../../models/product";

declare const global: NodeJS.Global & typeof globalThis;

describe("POST /api/products", () => {
  it("returns a 401 if the user is not authenticated", async () => {
    await request(app)
      .post("/api/products")
      .send({
        name: "Product name",
        description: "Product description",
        price: 10,
        stock: 5,
      })
      .expect(401);
  });

  it("returns a 400 if invalid name is provided", async () => {
    await request(app)
      .post("/api/products")
      .set("Cookie", global.signin())
      .send({
        description: "Product description",
        price: 10,
        stock: 5,
      })
      .expect(400);
  });

  it("returns a 400 if invalid description is provided", async () => {
    await request(app)
      .post("/api/products")
      .set("Cookie", global.signin())
      .send({
        name: "Product name",
        price: 10,
        stock: 5,
      })
      .expect(400);
  });

  it("returns a 400 if invalid price is provided", async () => {
    await request(app)
      .post("/api/products")
      .set("Cookie", global.signin())
      .send({
        name: "Product name",
        description: "Product description",
        price: -10,
        stock: 5,
      })
      .expect(400);
  });

  it("returns a 400 if invalid stock is provided", async () => {
    await request(app)
      .post("/api/products")
      .set("Cookie", global.signin())
      .send({
        name: "Product name",
        description: "Product description",
        price: 10,
        stock: -5,
      })
      .expect(400);
  });

  it("creates a product with valid inputs", async () => {
    let products = await Product.find({});
    expect(products.length).toEqual(0);

    const name = "Product name";
    const description = "Product description";
    const price = 10;
    const stock = 5;

    await request(app)
      .post("/api/products")
      .set("Cookie", global.signin())
      .send({
        name,
        description,
        price,
        stock,
      })
      .expect(201);

    products = await Product.find({});
    expect(products.length).toEqual(1);
    expect(products[0].name).toEqual(name);
    expect(products[0].description).toEqual(description);
    expect(products[0].price).toEqual(price);
    expect(products[0].stock).toEqual(stock);
  });
});