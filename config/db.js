const { Sequelize } = require("sequelize");
require("dotenv").config();
// establis a connection with postress
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  "DB_PASSWORD",
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);
module.exports = sequelize;
