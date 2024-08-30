const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    dialectOptions: {
      ssl: false,
    },
    logging: false, // Optional: disable logging
  }
);

module.exports = { db };
