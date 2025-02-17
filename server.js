const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const { registerUser, loginUser } = require("./controllers/userAuth");
const { addTrain, getTrains, updateSeats } = require("./controllers/train");
const { bookTicket, getBookingDetail } = require("./controllers/booking");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("Tables syncronized");
  })
  .catch((err) => console.log("Error creating tables", err));

app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/admin/addtrain", addTrain);
app.post("/admin/gettrain", getTrains);
app.put("/admin/updateseats", updateSeats);
app.post("/bookticket", bookTicket);
app.post("/getticket", getBookingDetail);
app.listen(3010, () => {
  console.log(`Server is running on post 3010`);
});
