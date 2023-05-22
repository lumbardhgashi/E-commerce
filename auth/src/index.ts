import mongoose from "mongoose";
import { app } from "./app";


const start = async () => {

  if(!process.env.JWT_KEY) {
    throw new Error('JWT_Key not defined')
  }
  if(!process.env.MONGO_URI) {
    throw new Error('MONGO_URI not defined')
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log(new Date());
    console.log("Listening on 3000");
  });
};

start();
