const logger = require("../config/logger");
const { sequelize, Sequelize } = require("../models/index");
const User = require("../models/user.model")(sequelize);
const userServices = require("../services/user.services");
const { logInfo } = require("../utils/logInfo");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!(email && password && firstName && lastName)) {
        logger.error(
          logInfo({
            req,
            errorMessage: "Input fields are required",
            statusCode: 400,
          })
        );
        return res.status(400).json({
          error: true,
          message: "Input fields are required",
          data: null,
        });
      } else {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          const newUser = await userServices.registerNewUser({
            firstName,
            lastName,
            email,
            password,
          });
          if (newUser) {
            logger.info(
              logInfo({
                req,
                successMessage: `${firstName} ${lastName} registered successfully, Email address is ${email}`,
                statusCode: 201,
              })
            );
            return res.status(201).json({
              error: false,
              message: "Registration is successful, Please login",
              data: null,
            });
          } else {
            logger.error(
              logInfo({
                req,
                errorMessage: "Something went wrong!",
                statusCode: 500,
              })
            );
            return res.status(500).json({
              error: true,
              message: "Something went wrong!",
              data: null,
            });
          }
        } else {
          logger.error(
            logInfo({
              req,
              errorMessage: "Email already exists",
              statusCode: 409,
            })
          );
          return res.status(409).json({
            error: true,
            message: "Email already exists",
            data: null,
          });
        }
      }
    } catch (err) {
      logger.error(
        logInfo({
          req,
          errorMessage: err.message,
          statusCode: 500,
        })
      );
      return res.status(500).json({
        error: true,
        message: err.message,
        data: null,
      });
    }
  },
};
