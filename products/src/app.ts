import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@aaecomm/common";

import { createProductRouter } from "./routes/products/new";
import { indexProductRouter } from "./routes/products";
import { showProductRouter } from "./routes/products/show";
import { updateProductRouter } from "./routes/products/update";
import { deleteProductRouter } from "./routes/products/delete";


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== "test"
}));

app.use(currentUser)

app.use(showProductRouter)
app.use(indexProductRouter)
app.use(createProductRouter)
app.use(updateProductRouter)
app.use(deleteProductRouter)

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);


export {app}