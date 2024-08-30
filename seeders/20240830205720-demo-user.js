"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("user", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "example@example.com",
        password: await bcrypt.hash("123456", 10),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  },
};
