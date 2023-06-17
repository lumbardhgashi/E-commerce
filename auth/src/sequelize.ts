import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.POSTGRESQL_URI!
); // Example for postgres
