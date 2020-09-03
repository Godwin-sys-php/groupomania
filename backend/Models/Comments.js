const Base = require('./Base');

class Comments extends Base {
  constructor() {
    super();
  }

  add(toAdd) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "INSERT INTO comments SET ?", toAdd,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  getAllComment(idArticle) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "SELECT comments.* FROM comments LEFT JOIN articles ON comments.idArticle= articles.idArticle WHERE articles.idArticle= ?", idArticle,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  getOneComment(idComment) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "SELECT * FROM comments WHERE idComment= ?", idComment,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  update(toSet, idComment) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "UPDATE comments SET ? WHERE idComment= ?", [toSet, idComment],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  delete(idComment) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "DELETE FROM comments WHERE idComment= ?", idComment,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
}

module.exports = new Comments();