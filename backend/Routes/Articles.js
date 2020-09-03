const express = require("express");
const router = express.Router();

const articleCtrl = require("../Controllers/Article");

const authArticle = require('../Middleware/authArticle');
const authArticleSecondary = require('../Middleware/authArticleSecondary');
const authUser = require('../Middleware/authUser');
const authComment = require('../Middleware/authComment');

const commentValidator = require('../Middleware/validatorComment');
const articleValidator = require('../Middleware/validatorArticle');

router.delete("/:id", authUser, authArticle, articleCtrl.delete);
router.delete("/comments/:id", authComment, articleCtrl.deleteComment);

router.get("/", authUser, articleCtrl.getAll);
router.get("/:id", authUser, articleCtrl.get);
router.get("/:id/comments", authUser, articleCtrl.getAllComment);
router.get("/comments/:id", authUser, articleCtrl.getOneComment);

router.post("/", authUser, authArticleSecondary, articleValidator, articleCtrl.add);
router.post("/:id/comments", authUser, authArticleSecondary, commentValidator, articleCtrl.addComment);

router.put("/:id", authArticle, articleValidator, articleCtrl.update);
router.put("/comments/:id", authUser, authComment, commentValidator, articleCtrl.updateComment);

module.exports = router; 
