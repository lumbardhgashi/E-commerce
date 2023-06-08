import { IOrder, OrderStatus } from "@aaecomm/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderItemDoc } from "./orderItem";

export {OrderStatus}


interface OrderAttrs extends Pick<IOrder, "userId" | "status" | "expiresAt" | "shippingDetails"> {
  orderItems: OrderItemDoc[];
}

interface OrderDoc extends Omit<IOrder, "id" | "createdAt" | "updatedAt" | "orderItems">, mongoose.Document {
  orderItems: OrderItemDoc[];
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created
  },
  expiresAt: {
    type: mongoose.Schema.Types.Date,
  },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
    },
  ],
  shippingDetails: {
    type: {
      fullName: { type: String, required: true },
      address1: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    require: true
  }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id,
            delete ret._id
        }
    },
    timestamps: true
});

orderSchema.set('versionKey', 'version')
orderSchema.plugin(updateIfCurrentPlugin)

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema)

export {Order}
