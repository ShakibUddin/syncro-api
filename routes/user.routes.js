const express = require("express");
const { createUser } = require("../controllers/user.controller");
const validateRegistration = require("../middlewares/validation/validateRegistration");

const userRouter = express.Router();

userRouter.post("/register", validateRegistration, createUser);

module.exports = userRouter;
