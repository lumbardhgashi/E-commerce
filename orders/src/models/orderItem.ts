import mongoose, { Schema, Types } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { ProductDoc } from "./product";
import { IOrderItem } from "@aaecomm/common";

export interface OrderItemAttrs extends Pick<IOrderItem, "quantity"> {
  product: ProductDoc;
}
export interface OrderItemDoc extends Pick<IOrderItem, "quantity" | "version">, mongoose.Document {
  product: ProductDoc;
}

interface OrderItemModel extends mongoose.Model<OrderItemDoc> {
  build(attrs: OrderItemAttrs): OrderItemDoc;
}

const orderItemSchema = new mongoose.Schema(
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

orderItemSchema.set("versionKey", "version");
orderItemSchema.plugin(updateIfCurrentPlugin);

orderItemSchema.statics.build = (attrs: OrderItemAttrs) => {
  return new OrderItem(attrs);
};

const OrderItem = mongoose.model<OrderItemDoc, OrderItemModel>(
  "OrderItem",
  orderItemSchema
);

export { OrderItem };
