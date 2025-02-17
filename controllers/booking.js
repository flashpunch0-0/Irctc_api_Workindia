const sequelize = require("../config/db");
const jwt = require("jsonwebtoken");
const Booking = require("../models/booking");
const Train = require("../models/train");
const responseHelper = require("../Utility/responseHelper");

const bookTicket = async (req, res) => {
  const { train_num } = req.body;
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return responseHelper.notExists(res, "No token, access denied");

  try {
    const decrypted = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decrypted) return responseHelper.notExists(res, "Invalid Token");
    const train = await Train.findOne({ where: { train_num: train_num } });

    //    check karta hai agar available seats > 0 toh book
    if (train.availableSeats > 0) {
      train.availableSeats = train.availableSeats - 1;
      await train.save();
      const booking = await Booking.create({
        train_num: train_num,
        booking_time: new Date(),
        username: decrypted.username,
      });
      res.status(201).json({
        message: "ticket booked successfully",
        ticket_details: booking,
      });
    } else {
      responseHelper.badRequest(res, "No seats");
    }
  } catch (error) {
    return responseHelper.notExists(
      res,
      " error booking ticket or token expired"
    );
  }
};

const getBookingDetail = async (req, res) => {
  const { booking_id } = req.body;
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return responseHelper.notExists(res, "No token , access denied");

  const decrypted = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decrypted) return responseHelper.notExists(res, "Invalid Token");
  const ticket = await Booking.findOne({
    where: { booking_id: booking_id },
  });
  return res.status(201).json({ message: ticket });
};

module.exports = {
  bookTicket,
  getBookingDetail,
};
