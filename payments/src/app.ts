import express from "express";
import "express-async-errors";
import { json, urlencoded } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@aaecomm/common";
import { createChargeRouter } from "./routes/new";

const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser)

app.use(createChargeRouter)

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);


export {app}