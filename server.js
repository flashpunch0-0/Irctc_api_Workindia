const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const { registerUser, loginUser } = require("./controllers/userAuth");

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
app.listen(3010, () => {
  console.log(`Server is running on post 3010`);
});
