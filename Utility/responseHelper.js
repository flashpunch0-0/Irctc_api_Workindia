// responseHelper.js
const responseHelper = {
  badRequest: (res, message) => {
    return res.status(400).json({ error: message });
  },
  created: (res, message) => {
    return res.status(201).json({ message });
  },
  notExists: (res, message) => {
    return res.status(401).json({ message });
  },
};

module.exports = responseHelper;
