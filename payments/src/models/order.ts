import { IOrder, OrderStatus } from "@aaecomm/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export { OrderStatus };

interface OrderAttrs
  extends Pick<IOrder, "id" | "userId" | "status" | "version"> {
  totalPrice: number;
}

interface OrderDoc
  extends Pick<IOrder, "userId" | "status" | "version">,
    mongoose.Document {
  totalPrice: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
      require: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id;
      },
    },
  }
);

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  const { id, ...rest } = attrs;
  return new Order({
    _id: id,
    ...rest,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
