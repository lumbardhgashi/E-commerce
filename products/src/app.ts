import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";

import { resolve } from "path";
import { errorHandler, NotFoundError, currentUser } from "@aaecomm/common";

import { createProductRouter } from "./routes/products/new";
import { indexProductRouter } from "./routes/products";
import { showProductRouter } from "./routes/products/show";
import { updateProductRouter } from "./routes/products/update";
import { deleteProductRouter } from "./routes/products/delete";

import { showCategoryRouter } from "./routes/categories/show";
import { indexCategoryRouter } from "./routes/categories";
import { createCategoryRouter } from "./routes/categories/new";
import { updateCategoryRouter } from "./routes/categories/update";
import { deleteCategoryRouter } from "./routes/categories/delete";
import { showSpecializimiRouter } from "./routes/specializmi/show";
import { indexSpecializimiRouter } from "./routes/specializmi";
import { newSpecializimiRouter } from "./routes/specializmi/new";
import { updateSpecializimiRouter } from "./routes/specializmi/update";
import { deleteSpecializimiRouter } from "./routes/specializmi/delete";
import { showSemundjaRouter } from "./routes/semundja/show";
import { indexSemundjaRouter } from "./routes/semundja";
import { newSemundjaRouter } from "./routes/semundja/new";
import { updateSemundjaRouter } from "./routes/semundja/update";
import { deleteSemundjaRouter } from "./routes/semundja/delete";



const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.set("trust proxy", true);

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(express.static(resolve(__dirname, "images")))

app.use(currentUser);

app.use(showProductRouter);
app.use(indexProductRouter);
app.use(createProductRouter);
app.use(updateProductRouter);
app.use(deleteProductRouter);

app.use(showCategoryRouter);
app.use(indexCategoryRouter);
app.use(createCategoryRouter);
app.use(updateCategoryRouter);
app.use(deleteCategoryRouter);

app.use(showSpecializimiRouter);
app.use(indexSpecializimiRouter);
app.use(newSpecializimiRouter);
app.use(updateSpecializimiRouter);
app.use(deleteSpecializimiRouter);

app.use(showSemundjaRouter);
app.use(indexSemundjaRouter);
app.use(newSemundjaRouter);
app.use(updateSemundjaRouter);
app.use(deleteSemundjaRouter);



app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
