import express, { Request, Response } from "express";
import { Wishlist, WishlistAttrs } from "../models/wishlist";
import { randomBytes } from "crypto";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    // Generate a unique id for the wishlist using randomBytes
    const wishlistId = randomBytes(4).toString("hex");

    // Create a new wishlist
    const wishlistData: WishlistAttrs = {
      id: wishlistId,
      userId,
      products: [],
    };
    const wishlist = Wishlist.build(wishlistData);
    await wishlist.save();

    res.status(201).json({ message: "Wishlist created", wishlistId: wishlist.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
