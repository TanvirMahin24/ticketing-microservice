import mongoose from "mongoose";
import { app } from "./app";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  // check if ENV does not exists
  if (!process.env.JWT_KEY) {
    throw Error("[PAYMENTS] JWT KEY is undefined!");
  }
  if (!process.env.MONGO_URI) {
    throw Error("[PAYMENTS] MONGO_URI must be defined!");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("[PAYMENTS] NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("[PAYMENTS] NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("[PAYMENTS] NATS_CLUSTER_ID must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    // When NATS client closed
    natsWrapper.client.on("close", () => {
      console.log("[PAYMENTS] NATS Client closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    // EVENT listeners
    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("[PAYMENTS] MongoDB connected!");

    app.listen(5001, () => {
      console.log("[PAYMENTS] Listening on 5001");
    });
  } catch (error) {
    console.log("[PAYMENTS] DB connection Error!!!!!");
  }
};

start();
