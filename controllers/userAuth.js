const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sequelize = require("../config/db");
const User = require("../models/user");
const responseHelper = require("../Utility/responseHelper");

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({ error: "Role Does Not Match" });
  }
  if (!username || !email || !password) {
    return responseHelper.badRequest(res, "All fields are required");
  }

  const checkUserNameExist = await User.findOne({
    where: { username },
  });
  if (checkUserNameExist) {
    return responseHelper.badRequest(res, " Username already exists");
  }

  const checkEmail = await User.findOne({
    where: { email },
  });
  if (checkEmail) return responseHelper.badRequest(res, "Email already exists");

  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);

  User.create({
    username: username,
    email: email,
    password: hashedPassword,
    role: role,
  });
};
