import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  // check if ENV does not exists
  if (!process.env.JWT_KEY) {
    throw Error("JWT KEY is undefined!");
  }

  try {
    await mongoose.connect(`mongodb://auth-mongo-srv:27017/auth`);
    console.log("[AUTH] MongoDB connected!");

    app.listen(5001, () => {
      console.log("[AUTH] Listening on 5001");
    });
  } catch (error) {
    console.log("[AUTH] DB connection Error!!!!!");
  }
};

start();
