import mongoose from "mongoose";
import { Product, ProductAttrs, ProductDoc } from "../product";
import { CartItem, CartItemAttrs, CartItemDoc } from "../cartItem";
import { Cart, CartAttrs, CartDoc } from "../cart";
import { BadRequestError } from "@aaecomm/common";


describe("Cart Model", () => {

  it("should find an existing cart", async () => {
    const userId = "user123";

    // Create a cart for the user
    const cartAttrs: CartAttrs = {
      userId,
      cartItems: [],
    };
    const cart: CartDoc = Cart.build(cartAttrs);
    await cart.save();

    // Call the findOrCreate method
    const foundCart = await Cart.findOrCreate(userId);

    // Expect the foundCart to match the existing cart
    expect(foundCart.id).toEqual(cart.id);
    expect(foundCart.userId).toEqual(userId);
  });

  it("should create a new cart when none exists", async () => {
    const userId = "user123";

    // Call the findOrCreate method
    const createdCart = await Cart.findOrCreate(userId);

    // Expect a new cart to be created
    expect(createdCart.userId).toEqual(userId);
    expect(createdCart.cartItems).toHaveLength(0);
  });


});
