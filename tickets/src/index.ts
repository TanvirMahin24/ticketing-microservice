import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  // check if ENV does not exists
  if (!process.env.JWT_KEY) {
    throw Error("JWT KEY is undefined!");
  }
  if (!process.env.MONGO_URI) {
    throw Error("MONGO_URI must be undefined!");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[TICKETS] MongoDB connected!");

    app.listen(5001, () => {
      console.log("[TICKETS] Listening on 5001");
    });
  } catch (error) {
    console.log("[TICKETS] DB connection Error!!!!!");
  }
};

start();
