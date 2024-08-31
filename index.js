const express = require("express");
const { db } = require("./database");
const limiter = require("./middlewares/rateLimiter");
const userRouter = require("./routes/user.routes");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/user", limiter, userRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
  try {
    await db.authenticate();
    console.log("Connection to database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
