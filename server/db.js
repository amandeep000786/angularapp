var pgp = require("pg-promise")();


var pgConnStr = 'postgres://postgres:root@localhost:5432/postgres'; //Development Mode


var db = pgp(pgConnStr);
module.exports = db;