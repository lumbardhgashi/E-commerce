import mongoose from "mongoose";
import { CartItem, CartItemAttrs, CartItemDoc } from "../cartItem";
import { Product, ProductAttrs, ProductDoc } from "../product";

describe("CartItem Model", () => {
  it("should create and save a new cart item", async () => {
    // Create a new product
    const productAttrs: ProductAttrs = {
      id: new mongoose.Types.ObjectId().toHexString(),
      name: "Test Product",
      description: "This is a test product",
      price: 9.99,
      stock: 10,
    };
    const product: ProductDoc = Product.build(productAttrs);
    await product.save();

    // Create a new cart item
    const cartItemAttrs: CartItemAttrs = {
      product: product.id,
      quantity: 2,
    };
    const cartItem: CartItemDoc = CartItem.build(cartItemAttrs);

    // Save the cart item to the database
    await cartItem.save();

    // Retrieve the saved cart item from the database
    const savedCartItem = await CartItem.findById(cartItem.id).populate("product");

    // Expect the saved cart item to match the original attributes
    expect(savedCartItem!.product._id.toString()).toBe(product.id);
    expect(savedCartItem!.quantity).toBe(cartItemAttrs.quantity);
  });
});
