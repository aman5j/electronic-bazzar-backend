// var mysql=require("mysql")
// var pool=mysql.createPool({
//  host:'localhost',
//  port:3306,
//  user:'root',
//  password:'1234',
//  database:'electronicsdb',
//  connectionLimit:100,
//  multipleStatements:true
// })
// module.exports=pool

require('dotenv').config(); // This must be at the very top
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const pool = mysql.createPool({
  host: process.env.TIDB_HOST,
  port: process.env.TIDB_PORT,
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  connectionLimit: 10,
  ssl: {
    minVersion: 'TLSv1.2',
    // Assuming isrgrootx1.pem is in your root folder
    ca: fs.readFileSync(path.join(__dirname, "../isrgrootx1.pem")), 
    rejectUnauthorized: true
  },
  multipleStatements: true
});

module.exports = pool.promise();