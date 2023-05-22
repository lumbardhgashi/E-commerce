import { requireAuth, validateRequest } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";


// const upload: Multer = multer({ dest: "uploads/" });
const router = express.Router();

router.get(
  "/api/wishlist",
  requireAuth("user"),
  [
   
    
  ],
  // upload.single("file"),
  validateRequest,
  async (req: Request, res: Response) => {

    
  }
);

export { router as createProductRouter };
