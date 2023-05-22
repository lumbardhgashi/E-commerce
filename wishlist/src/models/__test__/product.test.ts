import mongoose from "mongoose";
import { Product, ProductAttrs } from "../products"; // Assuming your product file is named "product.ts" and is in the same directory

describe("Product Model", () => {
 

  it("should create and save a product successfully", async () => {
    const productAttrs: ProductAttrs = {
      id: "1",
      name: "Test Product",
      price: 10,
    };

    const product = Product.build(productAttrs);
    await product.save();

    const savedProduct = await Product.findOne({ id: "1" });

    expect(savedProduct).toBeDefined();
    expect(savedProduct!.id).toBe(productAttrs.id);
    expect(savedProduct!.name).toBe(productAttrs.name);
    expect(savedProduct!.price).toBe(productAttrs.price);
  });
});
