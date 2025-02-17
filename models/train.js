const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Train = sequelize.define(
  "Trains",
  {
    train_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Train;
