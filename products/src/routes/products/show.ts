import { BadRequestError, NotFoundError } from "@aaecomm/common";
import express, { Request, Response } from "express";
import { Product } from "../../models/product";
import { resolve } from "path";

const router = express.Router();

router.get("/api/products/:id", async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id).populate({
    path: "category",
  });
  console.log("GOT", product);
  if (!product) {
    throw new NotFoundError();
  }

  res.send(product);
});

router.get("/api/images/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if(!product) {
    throw new BadRequestError("Product doesn't exist")
  }

  res.sendFile(resolve(__dirname, "../../images/", product!.image), (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error sending file");
    }
  });
});

export { router as showProductRouter };
