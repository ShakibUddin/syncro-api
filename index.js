const express = require("express");
const { db } = require("./database");
const limiter = require("./middlewares/rateLimiter");
const userRouter = require("./routes/user.routes");
const logger = require("./config/logger");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/user", limiter, userRouter);

app.listen(process.env.PORT, async () => {
  logger.info(`Example app listening on port ${process.env.PORT}`);
  try {
    await db.authenticate();
    logger.info(`Connection to database has been established successfully.`);
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
});
