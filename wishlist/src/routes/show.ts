import express, { Request, Response } from "express";
import { Wishlist } from "../models/wishlist";

const router = express.Router();

router.get("/api/wishlist/:wishlistId", async (req: Request, res: Response) => {
  try {
    const { wishlistId } = req.params;

    // Find the wishlist
    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    res.status(200).json({ products: wishlist.products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
