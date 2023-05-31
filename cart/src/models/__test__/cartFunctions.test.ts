import mongoose from "mongoose";
import { Product, ProductAttrs, ProductDoc } from "../product";
import { CartItem, CartItemAttrs, CartItemDoc } from "../cartItem";
import { Cart, CartAttrs, CartDoc } from "../cart";
import { BadRequestError } from "@aaecomm/common";

const createCart = () => {};

describe("Cart Model", () => {
  describe("test", () => {
    it("should add items to the cart when the product is not already in the cart", async () => {
      let cart = Cart.build({
        userId: "user-id",
        cartItems: [],
      });

      await cart.save();

      let product = Product.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        name: "Product 1",
        description: "Product 1 Description",
        price: 10,
        stock: 5,
      });
      await product.save();

      await cart.addItemsToCart(product, 1);

      expect(cart.cartItems.length).toBe(1);
      expect(cart.cartItems[0].product).toEqual(product);
      expect(cart.cartItems[0].quantity).toBe(1);
    });
    it("should increase quantity when the product is already in the cart", async () => {
      let cart = Cart.build({
        userId: "user-id",
        cartItems: [],
      });

      await cart.save();

      let product = Product.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        name: "Product 1",
        description: "Product 1 Description",
        price: 10,
        stock: 5,
      });
      await product.save();

      await cart.addItemsToCart(product, 1);
      await cart.addItemsToCart(product, 1);

      expect(cart.cartItems.length).toBe(1);
      expect(cart.cartItems[0].product).toEqual(product);
      expect(cart.cartItems[0].quantity).toBe(2);
    });
    // it("should throw an error when trying to remove non-existing items from the cart", async () => {
    //   // Create a product
    //   const productAttrs: ProductAttrs = {
    //     id: new mongoose.Types.ObjectId().toHexString(),
    //     name: "Test Product",
    //     description: "This is a test product",
    //     price: 9.99,
    //     stock: 10,
    //   };
    //   const product: ProductDoc = Product.build(productAttrs);
    //   await product.save();

    //   const userId = "user123";
    //   const cartAttrs: CartAttrs = {
    //     userId,
    //     cartItems: [],
    //   };
    //   const cart: CartDoc = Cart.build(cartAttrs);
    //   await cart.save();

    //   // Try to remove the non-existing product from the cart
    //   await expect(cart.removeItemsFromCart(product, 1)).rejects.toThrow(
    //     BadRequestError
    //   );
    // });
    // it("should remove items from cart", async () => {
    //   let cart = Cart.build({
    //     userId: "user-id",
    //     cartItems: [],
    //   });

    //   await cart.save();

    //   let product = Product.build({
    //     id: new mongoose.Types.ObjectId().toHexString(),
    //     name: "Product 1",
    //     description: "Product 1 Description",
    //     price: 10,
    //     stock: 5,
    //   });
    //   await product.save();

    //   await cart.addItemsToCart(product, 2);

    //   await cart.removeItemsFromCart(product, 1);

    //   const cartItems = await CartItem.find({});

    //   expect(cart.cartItems.length).toBe(1);
    //   expect(cart.cartItems[0].quantity).toBe(1);
    // });
    // it("should remove items from cart if quantity is 0 or lower", async () => {
    //   let cart = Cart.build({
    //     userId: "user-id",
    //     cartItems: [],
    //   });

    //   await cart.save();

    //   let product = Product.build({
    //     id: new mongoose.Types.ObjectId().toHexString(),
    //     name: "Product 1",
    //     description: "Product 1 Description",
    //     price: 10,
    //     stock: 5,
    //   });
    //   await product.save();

    //   await cart.addItemsToCart(product, 1);

    //   await cart.removeItemsFromCart(product, 1);

    //   const cartItems = await CartItem.find({});

    //   expect(cart.cartItems.length).toBe(0);
    // });
  });
});
