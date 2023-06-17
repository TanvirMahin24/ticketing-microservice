import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import "express-async-errors";
import { currentuserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import mongoose from "mongoose";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentuserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

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
