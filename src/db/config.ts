import { Sequelize } from "sequelize";
import { accountModel, userModel } from "./models";

import { DB_USER, DB_NAME, DB_PASSWORD, HOST } from "../constants";

export const sequelizeConnection = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: HOST,
    dialect: "mysql",
  }
);

export const Account = accountModel(sequelizeConnection);
export const User = userModel(sequelizeConnection);

export async function connectToDB() {
  try {
    await sequelizeConnection.authenticate();
    await sequelizeConnection.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export async function disconnectFromDB() {
  await sequelizeConnection.close();

  console.log("Disconnect from database");

  return;
}
