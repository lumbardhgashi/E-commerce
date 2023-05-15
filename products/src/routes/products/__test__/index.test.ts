import request from "supertest";
import mongoose from "mongoose";
import { Product } from "../../../models/product";
import { app } from "../../../app";

const buildProduct = async () => {
  const product = Product.build({
    name: "Product",
    description: "Product description",
    price: 50,
    stock: 10,
  });
  await product.save();

  return product;
};

describe("GET /api/products", () => {

  it("returns all products", async () => {
    await buildProduct();
  
    const response = await request(app)
      .get(`/api/products`)
      .send()
      .expect(200);
    expect(response.body.length).toEqual(1)
  
  });
  
}) 
