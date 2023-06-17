import { app } from "./app";
import { sequelize } from "./sequelize";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_Key not defined");
  }

  if (!process.env.POSTGRESQL_URI) {
    throw new Error("POSTGRESQL_URI not defined");
  }

  try {
    await sequelize.authenticate();
    console.log("Connected");
  } catch (err) {
    console.error({ err });
  }
  app.listen(3000, () => {
    console.log(new Date());
    console.log("Listening on 3000");
  });
};

start();
