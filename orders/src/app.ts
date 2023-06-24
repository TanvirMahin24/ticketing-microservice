import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import "express-async-errors";
import { currentUser, errorHandler, NotFoundError } from "@inovit-bd/ms-common";
import { indexOrdersRouter } from "./routes";
import { newOrdersRouter } from "./routes/new";
import { showOrdersRouter } from "./routes/show";
import { deleteOrdersRouter } from "./routes/delete";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(newOrdersRouter);
app.use(showOrdersRouter);
app.use(deleteOrdersRouter);
app.use(indexOrdersRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };