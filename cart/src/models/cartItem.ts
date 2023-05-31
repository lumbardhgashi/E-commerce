import mongoose, { Schema, Types } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { ProductDoc } from "./product";

export interface CartItemAttrs {
  product: ProductDoc;
  quantity: number;
}
export interface CartItemDoc extends mongoose.Document {
  product: ProductDoc;
  quantity: number;
  version: number;
}

interface CartItemModel extends mongoose.Model<CartItemDoc> {
  build(attrs: CartItemAttrs): CartItemDoc;
}

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
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

cartItemSchema.set("versionKey", "version");
cartItemSchema.plugin(updateIfCurrentPlugin);

cartItemSchema.statics.build = (attrs: CartItemAttrs) => {
  return new CartItem(attrs);
};

const CartItem = mongoose.model<CartItemDoc, CartItemModel>(
  "CartItem",
  cartItemSchema
);

export { CartItem };
