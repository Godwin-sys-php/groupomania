const config = require('../config.json'); 
const jwt = require('jsonwebtoken');
const User = require('../Models/Users');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const idUser = req.params.id;

    const decodedToken = jwt.verify(token, config.token);

    if (idUser && idUser == decodedToken.idUser) {
      User.getOneUser(idUser)
        .then(result => {
          if (!result[0]) {
            throw 'idUser invalid';
          } else {
            next();
          }
        })
        .catch(error => res.status(500).json({ error: error }));
    } else {
      throw 'idUser invalid';
    }
  } catch (error) {
    res.status(401).json({ error: error })
  }
};