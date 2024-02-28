const {Pool} = require("pg");
const pool = new Pool({
    host:"localhost",
    port:"5432",
    user:"postgres",
    password:"aj201010",
    database:"newperntodo"
});

module.exports = pool;