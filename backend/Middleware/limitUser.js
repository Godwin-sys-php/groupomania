const limit = require("express-rate-limit");

module.exports = limit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,
  message: { message: "Vous avez fait trop de requete" },
});
