import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { ProductCreatedListener } from "./events/listeners/product-created-listener";
import { ProductUpdatedListener } from "./events/listeners/product-updated-listener";
import { ProductDeletedListener } from "./events/listeners/product-deleted-listener";
import { ExpirationCompleteListener } from "./events/listeners/expiration-complete-listener";
import { PaymentCreatedListener } from "./events/listeners/payment-created-listener";


const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_Key not defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI not defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID not defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL not defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID not defined");
  }

  try {
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new ProductCreatedListener(natsWrapper.client).listen();
    new ProductUpdatedListener(natsWrapper.client).listen();
    new ProductDeletedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();



    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Listening on 3000");
  });
};

start();
