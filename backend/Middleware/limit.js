const limit = require("express-rate-limit");

module.exports = limit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Vous avez fait trop de requete"
});