const bcrypt = require("bcryptjs");
const { sequelize } = require("../models");
const User = require("../models/user.model")(sequelize);

module.exports = {
  registerNewUser: async ({ firstName, lastName, email, password }) => {
    try {
      const encryptedUserPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: encryptedUserPassword,
      });
      delete newUser.password;
      return newUser;
    } catch (e) {
      console.log("ERROR: ", e);
    }
  },
};
