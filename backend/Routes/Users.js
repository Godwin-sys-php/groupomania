const express = require("express");
const router = express.Router();

const userCtrl = require("../Controllers/User");

const validator = require('../Middleware/validator');
const validatorSecondary = require('../Middleware/validatorSecondary');

const uploader = require('../Middleware/upload');
const authUser = require('../Middleware/authUser');
const authUserMostSecure = require('../Middleware/authUserMostSecure');

router.post("/auth/signup", validator, userCtrl.signup);
router.post("/auth/login", userCtrl.login);

router.put("/users/:id", authUserMostSecure, validatorSecondary, uploader, userCtrl.update);

router.get("/users/:id", authUser, userCtrl.get);
router.get("/users/:id/articles", authUser, userCtrl.getArticles);

router.delete("/users/:id", authUserMostSecure, userCtrl.delete);

module.exports = router;