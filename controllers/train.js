const Train = require("../models/train");
const jwt = require("jsonwebtoken");
const responseHelper = require("../Utility/responseHelper");
const { Op } = require("sequelize");

const addTrain = async (req, res) => {
  const { train_num, source, destination, availableSeats } = req.body;
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    responseHelper.notExists(res, " No token provided, access is denied");

  const decrypted = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decrypted) responseHelper.notExists(res, "Invalid Token");
  if (decrypted.role !== "admin")
    responseHelper.badRequest("Only admin can make changes");

  const train = await Train.create({
    train_num: train_num,
    src: source,
    dest: destination,
    avl_seats: availableSeats,
  })
    .then((train) => {
      res
        .status(201)
        .json({ message: `${train.train_num} created successfully` });
    })
    .catch((err) => {
      responseHelper.badRequest(res, "Error adding train");
    });
};

const getTrains = async (req, res) => {
  const { source, destination } = req.body;
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) responseHelper.notExists(res, "No token , acess denied");
  const decrypted = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decrypted) return responseHelper.notExists(res, "Invalid token");
  const trains = await Train.findAll({
    where: {
      src: source,
      dest: destination,
      avl_seats: {
        [Op.gt]: 0,
      },
    },
  });
  if (trains.length < 1) {
    return responseHelper.badRequest(res, "No trains available");
  }
  res.status(200).json({ message: trains });
};

module.exports = {
  addTrain,
};
