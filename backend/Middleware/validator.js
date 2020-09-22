const validator = require("validator");// Le validateur
const passwordValidator = require("password-validator");// Le validateur de mot de passe

const User = require('../Models/Users');

module.exports = (req, res, next) => {
  try {
    const schema = new passwordValidator();
    schema
      .is().min(8)
      .has().uppercase()
      .has().lowercase()
      .has().digits(2);
    
    
    if (validator.isEmail(req.body.email) && schema.validate(req.body.password) && req.body.pseudo.length >= 4 && req.body.name.length > 4) {
      User.login(req.body.email)
        .then(results => {
          if (results.length > 0) {
            res.status(403).json({ existEmail: true });
          } else {
            User.login(req.body.pseudo)
              .then(results => {
                if (results.length > 0) {
                  res.status(403).json({ existPseudo: true });
                } else {
                  next();
                }
              })
              .catch(error => res.status(500).json({ error: error }));
          }
        })
        .catch(error => res.status(500).json({ error: error }));
    } else {
      res.status(403).json({ valideForm: false });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};