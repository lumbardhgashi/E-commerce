import { BadRequestError, NotFoundError, requireAuth, validateRequest } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { natsWrapper } from "../../nats-wrapper";
import { ProductCreatedPublisher } from "../../events/publishers/product-created-publisher";
import { Category } from "../../models/category";
import { Product } from "../../models/product";
import { upload } from "../../util/multer";

const router = express.Router();

router.post(
  "/api/products",
  requireAuth("admin"),
  upload.single("image"),
  validateRequest,
  async (req: Request, res: Response) => {

      if(!req.file) {
        throw new BadRequestError("You need to chose an image")
      }

      const { name, description, stock, price, categoryId } = req.body;

      const category = await Category.findById(categoryId);

      if (!category) {
        throw new NotFoundError();
      }

      const product = Product.build({
        name,
        description,
        price,
        stock,
        category,
        image: req.file?.filename,
      });

      product.save();

      await new ProductCreatedPublisher(natsWrapper.client).publish({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        version: product.version,
        image: product.image!
      });

      res.status(201).send(product);
  }
);

export { router as createProductRouter };
