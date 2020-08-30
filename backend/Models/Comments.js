const mysql = require('mysql');
const config = require('../config.json');

class Comments {
  constructor() {
    this.bdd = mysql.createConnection(config);

    this.bdd.connect();
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

  get(filter) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "SELECT * FROM comments WHERE ?", filter,
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
        "UPDATE comments SET ? WHERE ?", [toSet, filter],
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
        "DELETE FROM comments WHERE ?", filter,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
}

module.exports = new Comments();