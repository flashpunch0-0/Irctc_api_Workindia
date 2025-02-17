require("dotenv").config();
const apiKeyMiddleware = async (req, res, next) => {
  const apikey = req.header("x-api-key");
  const validapikey = process.env.ADMIN_API_KEY;
  if (!apikey || apikey !== validapikey) {
    return res.status(400).json({ message: "Invalid api key" });
  }
  console.log("api key verifed");
  next();
};
module.exports = apiKeyMiddleware;
