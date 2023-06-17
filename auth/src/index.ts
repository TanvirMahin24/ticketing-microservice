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

    app.listen(3000, () => {
      console.log("[AUTH] Listening on 3000");
    });
  } catch (error) {
    console.log("[AUTH] DB connection Error!!!!!");
  }
};

start();
