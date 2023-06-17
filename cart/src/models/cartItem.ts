import mongoose, { Schema, Types } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { ProductDoc } from "./product";
import { ICartItem } from "@aaecomm/common";

export interface CartItemAttrs extends Pick<ICartItem, "quantity"> {
  product: ProductDoc;
}
export interface CartItemDoc extends Omit<ICartItem, "id" | "product">, mongoose.Document {
  product: ProductDoc;
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
