const { sequelize, Sequelize } = require("../models/index");
const User = require("../models/user.model")(sequelize);
const userServices = require("../services/user.services");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!(email && password && firstName && lastName)) {
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
            return res.status(201).json({
              error: false,
              message: "Registration is successful, Please login",
              data: null,
            });
          } else {
            return res.status(500).json({
              error: true,
              message: "Something went wrong!",
              data: null,
            });
          }
        } else {
          return res.status(409).json({
            error: true,
            message: "Email already exists",
            data: null,
          });
        }
      }
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: err.message,
        data: null,
      });
    }
  },
};
