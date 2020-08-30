const mysql = require('mysql');
const config = require('../config.json');

class Base {
  constructor() {
    this.bdd = mysql.createConnection(config);

    this.bdd.connect();
  }
}

module.exports = Base;