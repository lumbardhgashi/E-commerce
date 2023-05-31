import mongoose from "mongoose";
import { Product, ProductAttrs, ProductDoc } from "../product";

describe("Product Model", () => {
  it("should create and save a new product", async () => {
    // Create a new product
    const productAttrs: ProductAttrs = {
      id: new mongoose.Types.ObjectId().toHexString(),
      name: "Test Product",
      description: "This is a test product",
      price: 9.99,
      stock: 10,
    };
    const product: ProductDoc = Product.build(productAttrs);

    // Save the product to the database
    await product.save();

    // Retrieve the saved product from the database
    const savedProduct = await Product.findById(product.id);

    // Expect the saved product to match the original attributes
    expect(savedProduct!.name).toBe(productAttrs.name);
    expect(savedProduct!.description).toBe(productAttrs.description);
    expect(savedProduct!.price).toBe(productAttrs.price);
    expect(savedProduct!.stock).toBe(productAttrs.stock);
  });
});
