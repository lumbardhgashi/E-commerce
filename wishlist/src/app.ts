import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@aaecomm/common";
import createWishList from "./routes/createWishList";
import addToWishList from "./routes/addToWishList";
import removeFromWishList from "./routes/removeFromWishList";
import showWishlist from "./routes/show";


const app = express();

//  middleware and other configurations
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== "test"
}));

app.use(currentUser)

// Routes
app.use("/wishlist/create", createWishList);
app.use("/wishlist/add", addToWishList);
app.use("/wishlist/remove", removeFromWishList);
app.use("/wishlist/:wishlistId", showWishlist);

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);


export {app}