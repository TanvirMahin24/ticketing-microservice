import express from "express";
import { json } from "body-parser";
import { currentuserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import mongoose from "mongoose";

const app = express();
app.use(json());

app.use(currentuserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.use(errorHandler);

const start = async () => {
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
