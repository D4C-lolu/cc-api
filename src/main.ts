import * as dotenv from "dotenv";

//Load environment variables
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { connectToDB, disconnectFromDB } from "./db/config";
import logger from "./utils/logger";
import { CORS_ORIGIN, PORT } from "./constants";
import rateLimiter from "./api/middleware/rateLimiter";
import userRoute from "./api/routes/user.route";
import accountRoute from "./api/routes/account.route";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimiter);

app.use("/accounts", accountRoute);
app.use("/users", userRoute);
//Healthcheck
app.get("/", (req, res) => {
  return res.send("Up and running bub!");
});

const server = app.listen(PORT, async () => {
  await connectToDB();
  logger.info(`Server listening at htp://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT", "SIGQUIT"];

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    logger.info("Goodbye, got signal", signal);
    server.close();

    // disconnect from the db
    await disconnectFromDB();

    logger.info("My work here is done");

    process.exit(0);
  });
}

for (let signal of signals) {
  gracefulShutdown(signal);
}
