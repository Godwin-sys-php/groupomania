const mysql = require('mysql');
const config = require('../config.json');

class Articles {
  constructor() {
    this.bdd = mysql.createConnection(config);

    this.bdd.connect();
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

  get(filter) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "SELECT * FROM articles WHERE ?", filter,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  update(toSet, filter) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "UPDATE articles SET ? WHERE ?", [toSet, filter],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  delete(filter) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "DELETE FROM articles WHERE ?", filter,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
}

module.exports = new Articles;