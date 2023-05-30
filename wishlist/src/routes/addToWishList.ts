import express, { Request, Response } from "express";
import { Wishlist } from "../models/wishlist";
import { Product } from "../models/products";

const router = express.Router();

router.post("/api/wishlist", async (req: Request, res: Response) => {
  try {
    const { wishlistId, productId } = req.body;

    // Find the wishlist
    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Add the product to the wishlist
    wishlist.products.push(product);
    await wishlist.save();

    res.status(200).json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
