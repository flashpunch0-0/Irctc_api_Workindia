const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

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

app.listen(3010, () => {
  console.log(`Server is running on post 3010`);
});
