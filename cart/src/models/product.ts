import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { IProduct } from "@aaecomm/common";

export interface ProductAttrs
  extends Pick<IProduct, "id" | "name" | "description" | "price" | "stock"> {
}
export interface ProductDoc extends Pick<IProduct, "name" | "description" | "price" | "stock" | "version">, mongoose.Document {}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
  findByEvent(event: {id: string, version: number}): Promise<ProductDoc | null>
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

productSchema.set("versionKey", "version");
productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.findByEvent = (event: {id: string, version: number}) => {
  return Product.findOne({
    _id: event.id,
    version: event.version - 1
  })
}

productSchema.statics.build = (attrs: ProductAttrs) => {
  const {id, ...rest} = attrs
  return new Product({
    _id: id,
    ...rest
  });
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export { Product };
