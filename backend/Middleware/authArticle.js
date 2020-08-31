const config = require('../config.json'); 
const jwt = require('jsonwebtoken');
const Articles = require('../Models/Articles');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const idArticle = req.params.id;

    const decodedToken = jwt.verify(token, config.token);

    Articles.getOneArticle(idArticle)
      .then(result => {
        if (!result[0]) {
          throw 'idArticle invalid';
        } else {
          if (decodedToken.idUser == result[0].idUser) {
            req.idUser = decodedToken.idUser;
            next();
          } else {
            throw 'idUser invalid';
          }
        }
      })
      .catch(error => res.status(500).json({ error: error }));
    
  } catch (error) {
    res.status(401).json({ error: error })
  }
};