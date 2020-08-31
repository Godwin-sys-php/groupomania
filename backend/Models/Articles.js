const Base = require('./Base');

class Articles extends Base {
  constructor() {
    super();
  }

  add(toAdd) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "INSERT INTO articles SET ?", toAdd,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  getAllArticle() {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "SELECT * FROM articles",
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  getOneArticle(id) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "SELECT * FROM articles WHERE idArticle= ?", id,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  update(toSet, id) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "UPDATE articles SET ? WHERE idArticle=?", [toSet, id],
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
        "DELETE articles, comments FROM articles LEFT JOIN comments ON comments.idArticle= articles.idArticle WHERE articles.idArticle= ?", id,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
}

module.exports = new Articles;