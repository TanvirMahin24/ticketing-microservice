import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  // check if ENV does not exists
  if (!process.env.JWT_KEY) {
    throw Error("[ORDERS] JWT KEY is undefined!");
  }
  if (!process.env.MONGO_URI) {
    throw Error("[ORDERS] MONGO_URI must be defined!");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("[ORDERS] NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("[ORDERS] NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("[ORDERS] NATS_CLUSTER_ID must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    // When NATS client closed
    natsWrapper.client.on("close", () => {
      console.log("[ORDERS] NATS Client closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[ORDERS] MongoDB connected!");

    app.listen(5001, () => {
      console.log("[ORDERS] Listening on 5001");
    });
  } catch (error) {
    console.log("[ORDERS] DB connection Error!!!!!");
  }
};

start();
