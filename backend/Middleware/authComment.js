const config = require('../config.json'); 
const jwt = require('jsonwebtoken');
const Comments = require('../Models/Comments');
const User = require('../Models/Users');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const idComment = req.params.id;

    const decodedToken = jwt.verify(token, config.token);

    Comments.getOneComment(idComment) 
      .then((result) => {
        if (result.length < 1) {
          res.status(400).json({ notFoundComment: true });
        } else {
          User.getOneUser(decodedToken.idUser)
            .then(data => {
              if (data[0].isAdmin == 1) {
                next();
              } else {
                if (decodedToken.idUser === result[0].idUser) {
                  next()
                } else {
                  throw "idUser invalid";
                }
              }
            })
            .catch((error) => res.status(500).json({ error: error }));
        }
      })
      .catch((error) => {
        res.status(500).json({ error: true });
      })
  } catch (error) {
    res.status(401).json({ error: error })
  }
};