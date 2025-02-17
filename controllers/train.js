const Train = require("../models/train");
const jwt = require("jsonwebtoken");
const responseHelper = require("../Utility/responseHelper");

const addTrain = async (req, res) => {
  const { train_num, source, destination, availableSeats } = req.body;
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    responseHelper.notExists(res, " No token provided, access is denied");

  const decrypted = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decrypted) responseHelper.notExists(res, "Invalid Token");

  const train = await Train.create({
    train_num: train_num,
    src: source,
    dest: destination,
    avl_seats: availableSeats,
  }).then((train) => {
    responseHelper.badRequest(res, "error adding train");
  });
};
module.exports = {
  addTrain,
};
