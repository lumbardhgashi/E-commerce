import express, { Request, Response } from "express";
import { Wishlist } from "../models/wishlist";
import { Product } from "../models/products";

const router = express.Router();

router.delete("/api/wishlist/:id", async (req: Request, res: Response) => {
  try {
    const { wishlistId, productId } = req.body;

    // Find the wishlist
    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    // Find the product index in the wishlist
    const productIndex = wishlist.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in wishlist" });
    }

    // Remove the product from the wishlist
    wishlist.products.splice(productIndex, 1);
    await wishlist.save();

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
