import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";
import { Product } from "@aaecomm/common";

declare const global: NodeJS.Global & typeof globalThis;

describe("DELETE /api/products/:id", () => {
  it("returns 401 if the user is not authenticated", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app).delete(`/api/products/${id}`).expect(401);
  });

  it("returns 404 if the product is not found", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .delete(`/api/products/${id}`)
      .set("Cookie", global.signin())
      .expect(404);
  });

  it("deletes the product if it exists", async () => {
    const product = await Product.build({
      name: "Product 1",
      description: "Description for Product 1",
      price: 10.99,
      stock: 100,
    }).save();

    await request(app)
      .delete(`/api/products/${product.id}`)
      .set("Cookie", global.signin())
      .expect(204);

    const deletedProduct = await Product.findById(product.id);
    expect(deletedProduct).toBeNull();
  });
});
