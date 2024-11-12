require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
});

module.exports = pool;
