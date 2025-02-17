const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
    },
    tokenVersion: {
      // ✅ Corrected: Explicitly define data type
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // ✅ Default value
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
