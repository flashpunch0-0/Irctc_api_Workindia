const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.listen(3010, () => {
  console.log(`Server is running on post 3010`);
});
