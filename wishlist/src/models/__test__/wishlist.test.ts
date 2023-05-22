import mongoose from "mongoose";
import { Wishlist, WishlistAttrs } from "../wishlist"; // Assuming your wishlist file is named "wishlist.ts" and is in the same directory
import { Product } from "../products"; // Assuming your product file is named "products.ts" and is in the same directory

describe("Wishlist Model", () => {

  it("should create and save a wishlist successfully", async () => {
    const productAttrs = {
      id: "1",
      name: "Test Product",
      price: 10,
    };

    const product = Product.build(productAttrs);
    await product.save();
   
    const wishlistAttrs: WishlistAttrs = {
      id: "1" ,
      userId: "1",
      products: [product],
    };

    const wishlist = Wishlist.build(wishlistAttrs);
    await wishlist.save();

    const savedWishlist = await Wishlist.findOne({ id: wishlistAttrs.id });
    
    
    expect(savedWishlist).toBeDefined();
   
    expect(savedWishlist!.userId).toBe("1");
    expect(savedWishlist!.products).toHaveLength(1);
   
    expect(savedWishlist!.products[0].name).toBe(productAttrs.name);
    expect(savedWishlist!.products[0].price).toBe(productAttrs.price);
  });
});
