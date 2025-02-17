const Train = require("../models/train");
const jwt = require("jsonwebtoken");
const responseHelper = require("../Utility/responseHelper");
const { Op } = require("sequelize");

const addTrain = async (req, res) => {
  const { train_num, source, destination, availableSeats } = req.body;
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    return responseHelper.notExists(
      res,
      " No token provided, access is denied"
    );

  try {
    const decrypted = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decrypted) return responseHelper.notExists(res, "Invalid Token");
    if (decrypted.role !== "admin")
      return responseHelper.badRequest(res, "Only admin can make changes");

    const train = await Train.create({
      train_num: train_num,
      src: source,
      dest: destination,
      availableSeats: availableSeats,
    });
    return res
      .status(201)
      .json({ message: `${train.train_num} created successfully` });
  } catch (error) {
    return responseHelper.badRequest(res, "Error adding train");
  }
};

const getTrains = async (req, res) => {
  const { source, destination } = req.body;
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return responseHelper.notExists(res, "No token , acess denied");
  try {
    const decrypted = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decrypted) return responseHelper.notExists(res, "Invalid token");

    const trains = await Train.findAll({
      where: {
        src: source,
        dest: destination,
        availableSeats: { [Op.gt]: 0 },
      },
    });

    if (trains.length < 1)
      return responseHelper.badRequest(res, "No trains available");

    return res.status(200).json({ trains });
  } catch (err) {
    return responseHelper.badRequest(res, "Error fetching trains");
  }
};

const updateSeats = async (req, res) => {
  const { train_num, availableSeats } = req.body;
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return responseHelper.badRequest(res, "No token provided; access denied");
  try {
    const decrypted = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decrypted) return res.status(401).json({ message: "Invalid Token" });
    if (decrypted.role !== "admin")
      return responseHelper.badRequest(res, "Only admin can make changes");
    const train = await Train.findOne({ where: { train_num: train_num } });
    if (!train) {
      return responseHelper.notExists(
        res,
        `Train with number ${train_num} not found`
      );
    }
    //  update the seats
    train.availableSeats = availableSeats;
    await train.save();
    res.status(200).json({ message: "Seats updates successfully" });
  } catch (error) {
    return responseHelper.badRequest(res, "Error updating seats");
  }
};

module.exports = {
  addTrain,
  getTrains,
  updateSeats,
};
