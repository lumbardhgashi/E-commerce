import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@aaecomm/common";
import { showCartRouter } from "./routes/show";
import { addItemToCartRoute } from "./routes/addItem";
import { removeItemToCartRoute } from "./routes/removeItem";
import { indexCartRouter } from "./routes";
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

app.use(indexCartRouter)
app.use(showCartRouter)
app.use(addItemToCartRoute)
app.use(removeItemToCartRoute)





app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);


export {app}