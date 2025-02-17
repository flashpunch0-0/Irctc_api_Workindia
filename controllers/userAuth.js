const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sequelize = require("../config/db");
const User = require("../models/user");
const responseHelper = require("../Utility/responseHelper");

const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    tokenVersion: user.tokenVersion,
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

const registerUser = async (req, res) => {
  const { username, email, password, role, tokenVersion } = req.body;
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
    tokenVersion,
  });
  responseHelper.created(res, `${username} created successfully`);
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const loggedInUser = await User.findOne({
    where: { username },
  });
  if (loggedInUser === null) {
    return responseHelper.notExists(res, "User does not exist");
  }

  const isValidPassword = await bcrypt.compare(password, loggedInUser.password);
  if (!isValidPassword) responseHelper.notExists("Wrong Password");
  else {
    //  generate token
    const token = generateToken(loggedInUser);
    return res
      .status(200)
      .json({ message: "User Login Success", token: token });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
