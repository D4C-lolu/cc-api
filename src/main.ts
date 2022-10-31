import * as dotenv from "dotenv";

//Load environment variables
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { connectToDB, disconnectFromDB } from "./db/config";
import { PORT } from "./constants";
import rateLimiter from "./api/middleware/rateLimiter";
import userRoute from "./api/routes/user.route";
import accountRoute from "./api/routes/account.route";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());
app.use(rateLimiter);

app.use("/accounts", accountRoute);
app.use("/users", userRoute);
//Healthcheck
app.get("/", (req, res) => {
  return res.send("Up and running bub!");
});

const port = PORT || 4000;

const server = app.listen(port, async () => {
  await connectToDB();
  console.log(`Server listening at htp://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT", "SIGQUIT"];

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    console.log("Goodbye, got signal", signal);
    server.close();

    // disconnect from the db
    await disconnectFromDB();

    console.log("My work here is done");

    process.exit(0);
  });
}

for (let signal of signals) {
  gracefulShutdown(signal);
}
