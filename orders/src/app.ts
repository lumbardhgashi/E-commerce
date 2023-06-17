import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@aaecomm/common";

import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";
import { getUserOrdersRouter } from "./routes/getUserOrders";
import { updateOrderRouter } from "./routes/update";


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== "test"
}));

app.use(currentUser)

app.use(newOrderRouter)
app.use(showOrderRouter)
app.use(indexOrderRouter)
app.use(deleteOrderRouter)
app.use(getUserOrdersRouter)
app.use(updateOrderRouter)



app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);


export {app}