import { requireAuth, validateRequest, NotFoundError, BadRequestError } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { natsWrapper } from "../../nats-wrapper";
import { ProductUpdatedPublisher } from "../../events/publishers/product-updated-publisher";
import mongoose from "mongoose";
import { Category } from "../../models/category";
import { Product } from "../../models/product";
import { upload } from "../../util/multer";

const router = express.Router();

router.put(
  "/api/products/:id",
  requireAuth("admin"),
  validateRequest,
  upload.single("image"),
  async (req: Request, res: Response) => {

    if(!req.file) {
      throw new BadRequestError("You need to chose an image")
    }

    const { name, description, stock, price, categoryId } = req.body;

    const category = await Category.findById(categoryId);

    if (!category) {
      throw new NotFoundError();
    }

    const product = await Product.findById(req.params.id);

    console.log("UPDATED", product);

    if (!product) {
      throw new NotFoundError();
    }

    product.set({
      name,
      description,
      stock,
      price,
      category,
      image: req.file.filename,
    });

    await product.save();

    await new ProductUpdatedPublisher(natsWrapper.client).publish({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      version: product.version,
      image: product.image!
    });

    res.send(product);
  }
);

export { router as updateProductRouter };
