const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const protectToXss = require('sanitize-html');
const config = require('../config.json');

const fs = require('fs');

const User = require('../Models/Users');

const moment = require('moment');

exports.signup = (req, res) => {
  try {
    bcrypt.hash(req.body.password.trim(), 10)
      .then(hash => {
        const userToInsert = {
          pseudo: protectToXss(req.body.pseudo.trim().toLowerCase()),
          name: protectToXss(req.body.name.trim()),
          email: protectToXss(req.body.email.trim()),
          password: hash,
          pdpUrl: `${req.protocol}://${req.get('host')}/photo_de_profiles/default.jpg`,
          isAdmin: 0,
          createAt: moment.now()
        };
  
        User.add(userToInsert)
          .then(result => res.status(201).json({ create: true, ...result }))
          .catch(error => res.status(500).json({ create: false, error: true }));
      })
      .catch((error) => res.status(500).json({ error: true, create: false }));
  } catch (error) {
    res.status(400).json({ error: true, create: false });
  }
};

exports.login = (req, res) => {
  try {
    User.login(req.body.identifiant)
      .then(result => {
        if (result.length === 0) {
          res.status(404).json({ identifiant: false, password: false });
        } else {
          bcrypt.compare(req.body.password.trim(), result[0].password)
            .then((valid) => {
              if (!valid) {
                res.status(401).json({ identifiant: true, password: false });
              } else {
  
                res.status(200).json({
                  identifiant: true,
                  password: true,
                  idUser: result[0].idUser,
                  token: jwt.sign({ idUser: result[0].idUser }, config.token, {
                    expiresIn: "300h",
                  }),
                });
              }
            })
            .catch((error) => res.status(500).json({ error: true }));
        }
      })
      .catch((error) => res.status(500).json({ error: true }));
  } catch (error) {
    res.status(400).json({ error: true });
  }
};

exports.update = (req, res) => {
  try {
    if (req.body.password && req.body.password.trim() !== "") {
      bcrypt.hash(req.body.password.trim(), 10)
        .then(hash => {
          let toSet = typeof req.files !== 'undefined' ? {
            pseudo: protectToXss(req.body.pseudo.trim().toLowerCase()),
            name: protectToXss(req.body.name.trim()),
            email: protectToXss(req.body.email.trim()),
            pdpUrl: `${req.protocol}://${req.get('host')}/photo_de_profiles/${req.file.filename}`,
            password: hash
          } : {
            pseudo: protectToXss(req.body.pseudo.trim().toLowerCase()),
            name: protectToXss(req.body.name.trim()),
            email: protectToXss(req.body.email.trim()),
            password: hash
          };
          
          if (typeof req.files !== 'undefined') {
            User.getOneUser(req.params.id)
              .then((result) => {
                const user = result[0];
                const filename = user.pdpUrl.split("/photo_de_profiles/")[1];
                
                filename !== "default.jpg" ? fs.unlinkSync(`photo_de_profiles/${filename}`) : () => { };
      
                User.update(toSet, req.params.id)
                  .then((results) => res.status(200).json({ update: true, ...results }))
                  .catch((error) => res.status(500).json({ update: false, error: error }));
              })
              .catch((error) => res.status(500).json({ update: false, error: error }));
          } else {
            User.update(toSet, req.params.id)
              .then((results) => res.status(200).json({ update: true, ...results }))
              .catch((error) => res.status(500).json({ update: false, error: error }));
          }
        })
        .catch((error) => res.status(500).json({ error: error, update: false }));
    } else {
      let toSet = req.files !== null ? {
        pseudo: protectToXss(req.body.pseudo.trim()),
        name: protectToXss(req.body.name.trim()),
        email: protectToXss(req.body.email.trim()),
        pdpUrl: `${req.protocol}://${req.get('host')}/photo_de_profiles/${req.file.filename}`
      } : {
        pseudo: protectToXss(req.body.pseudo.trim()),
        name: protectToXss(req.body.name.trim()),
        email: protectToXss(req.body.email.trim())
      };
      if (req.files !== null) {
        User.getOneUser(req.params.id)
          .then((result) => {
            const user = result[0];
            const filename = user.pdpUrl.split("/photo_de_profiles/")[1];
            
            filename !== "default.jpg" ? fs.unlinkSync(`photo_de_profiles/${filename}`) : () => { };
  
            User.update(toSet, req.params.id)
              .then((results) => res.status(200).json({ update: true, ...results }))
              .catch((error) => res.status(500).json({ update: false, error: error }));
          })
          .catch((error) => res.status(500).json({ update: false, error: error }));
      } else {
        User.update(toSet, req.params.id)
          .then((results) => res.status(200).json({ update: true, ...results }))
          .catch((error) => res.status(500).json({ update: false, error: error }));
      }
    }
  } catch (error) {
    res.status(400).json({ update: false });
  }
};

exports.get = (req, res) => {
  try {
    User.getOneUser(req.params.id)
      .then((result) => {
        delete result[0].password;
        res.status(200).json({ get: true, userInfo: result[0] });
      })
      .catch((error) => res.status(500).json({ get: false, error: error }));
  } catch (error) {
    res.status(400).json({ get: false });
  }
};

exports.getArticles = (req, res) => {
  try {
    User.getArticles(req.params.id, req.query.nbr)
      .then(results => { res.status(200).json({ get: true, results: results }) })
      .catch((error) => res.status(500).json({ get: false, error: error }));
  } catch (error) {
    res.status(400).json({ get: false });
  }
};

exports.delete = (req, res) => {
  try {
    User.getOneUser(req.params.id)
      .then(results => {
        const filename = results[0].pdpUrl.split("/photo_de_profiles/")[1];
        if (filename !== "default.jpg") {
          fs.unlinkSync(`photo_de_profiles/${filename}`);
        }
        User.delete(req.params.id)
          .then(result => res.status(200).json({ delete: true, ...result }))
          .catch(error => res.status(500).json({ delete: false, error: error }));
      })
      .catch(error => res.status(500).json({ delete: false, error: error }));
  } catch (error) {
    res.status(400).json({ delete: false });
  }
};