import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
import { initialize } from "./initializer";


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
    await mongoose.connect(process.env.MONGO_URI);

    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    console.log("Connected");
    initialize()
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Listening on 3000");
  });
};

start();
