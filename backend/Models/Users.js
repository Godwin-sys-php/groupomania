const Base = require('./Base');
class Users extends Base {

  constructor() {
    super();
  }
  add(toAdd) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        'INSERT INTO users SET ?', toAdd,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  login(identifiant) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        'SELECT * FROM users WHERE email=? OR pseudo=?', [identifiant.trim(), identifiant.trim()],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  getOneUser(id) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        'SELECT * FROM users WHERE idUser=?', id,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  getArticles(idUser, limit) {
    if (limit > 1) {
      return new Promise((resolve, reject) => {
        this.bdd.query(
          'SELECT articles.* FROM users, articles WHERE users.idUser= articles.idUser AND articles.idUser=? ORDER BY articles.idArticle DESC LIMIT 0, ?', [idUser, parseInt(limit)],
          (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
          }
        );
      });
    } else {
      return new Promise((resolve, reject) => {
        this.bdd.query(
          'SELECT articles.* FROM users, articles WHERE users.idUser= articles.idUser AND articles.idUser=? ORDER BY articles.idArticle DESC', idUser,
          (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
          }
        );
      });
    }
  }
  
  update(toSet, id) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "UPDATE users SET ? WHERE idUser=?", [toSet, id],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  /**
   * À utiliser lors de la modification d'utilisateur pour vérifier si il n'est pas déjà en bdd
   * @param {string} identifiant Pseudo ou email
   * @param {number} id L'id de l'utilisateur a tester
   * @returns {Promise} Un tableau avec les id des l'utilisateurs trouvé
   */
  verify(identifiant, id) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "SELECT idUser FROM users WHERE (email=? OR pseudo=?) AND idUser<>?", [identifiant, identifiant, id],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "DELETE u, a, c FROM users u LEFT JOIN articles a ON a.idUser=u.idUser LEFT JOIN comments c ON c.idArticle= a.idArticle WHERE u.idUser=?", [id],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

}

module.exports = new Users;