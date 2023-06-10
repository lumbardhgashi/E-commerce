import { IPayment } from "@aaecomm/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface PaymentAttrs extends Pick<IPayment, "orderId" | "stripeId"> {}

interface PaymentDoc extends mongoose.Document, Omit<IPayment, "id"> {}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      require: true,
      type: String,
    },
    stripeId: {
      require: true,
      type: String,
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

paymentSchema.set("versionKey", "version");
paymentSchema.plugin(updateIfCurrentPlugin);

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "Payment",
  paymentSchema
);

export { Payment };
